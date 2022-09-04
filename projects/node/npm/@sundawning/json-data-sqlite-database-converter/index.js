module.exports = { JSONDataToSQLiteTable, SQLiteTableToJSONData };
/**
 * 将JSON数据保存到SQLite数据库的表里
 * 列的类型为TEXT
 * @param {Array} json_data JSON数据
 * @param {*} sqlite_database SQLite数据库
 * @param {*} table_name 表名
 * @returns {number} lastID 数据库表里的最后一条数据的ID
 */
async function JSONDataToSQLiteTable(json_data, sqlite_database, table_name) {
  // 创建表
  await sqlite_database.exec(
    `CREATE TABLE IF NOT EXISTS ${table_name} ( key INTEGER PRIMARY KEY AUTOINCREMENT )`
  );
  // 给JSON数据添加key属性
  json_data.forEach(function (row) {
    // 不存在key属性时，设置为默认null。
    if (row.key === undefined) {
      row.key = null;
      return;
    }
  });
  // 转换JSON数据里的boolean为字符串，即true => "true"
  json_data.forEach(function (row) {
    Object.keys(row).forEach(function (key) {
      if (typeof row[key] === "boolean") {
        row[key] = row[key].toString();
      }
    });
  });
  let lastID;
  // 新增数据
  for (let c = 0; c < json_data.length; c = c + 1) {
    let row = json_data[c];
    // key不是null时
    if (row.key !== null) {
      const exists = await sqlite_database.get(
        `SELECT * FROM ${table_name} WHERE key = ${row.key}`
      );
      // 已经新增过
      if (exists !== undefined) {
        return;
      }
    }
    const header = Object.keys(row);
    // 新增字段
    const table_info = await sqlite_database.all(
      `PRAGMA table_info([${table_name}])`
    );
    const _header = table_info.map(function ({ name }) {
      return name;
    });
    for (let c = 0; c < header.length; c = c + 1) {
      const column_name = header[c];
      if (_header.includes(column_name) === false) {
        await sqlite_database.exec(
          `ALTER TABLE ${table_name} ADD COLUMN ${column_name} TEXT`
        );
      }
    }
    const columns = header.join(", ");
    const values = Object.values(row)
      .map(function (item) {
        return JSON.stringify(item);
      })
      .join(", ");
    const result = await sqlite_database.run(
      `INSERT INTO ${table_name} (${columns}) VALUES (${values})`
    );
    // 记录最后的数据
    if (result.lastID !== undefined) {
      lastID = result.lastID;
    }
  }
  return lastID;
}
/**
 * SQLite数据库的表转换为JSON数据
 * @param {*} sqlite_database SQLite数据库
 * @param {*} table_name 表名
 * @returns
 */
async function SQLiteTableToJSONData(sqlite_database, table_name) {
  const rows = await sqlite_database.all(`SELECT * from ${table_name}`);
  // 删除有null的属性
  rows.forEach(function (row) {
    Object.keys(row).forEach(function (key) {
      if (row[key] === null) {
        delete row[key];
      }
    });
  });
  return rows;
}
