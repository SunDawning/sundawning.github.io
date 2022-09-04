const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
module.exports = {
  create,
  selects,
  select,
  insert,
  update,
  remove,
  total,
  createDatabase,
};
/**
 * 创建数据库
 * @param {string} filename
 * @returns
 */
async function create({ filename }) {
  return await sqlite.open({
    filename,
    driver: sqlite3.Database,
  });
}
/**
 * 创建表
 */
async function createTable({ database, table_name }) {
  return await database.run(
    `CREATE TABLE IF NOT EXISTS ${table_name} ( key INTEGER PRIMARY KEY AUTOINCREMENT )`
  );
}
/**
 * 查询
 */
async function selects({ database, table_name }) {
  await createTable({ database, table_name }); // 创建表
  const rows = await database.all(`SELECT * from ${table_name}`);
  rows.forEach(function (row) {
    removeNull(row); // 删除null
  });
  return rows;
}
/**
 * 查询
 * @returns
 */
async function select({ database, table_name, key }) {
  if (key === undefined) {
    return;
  }
  await createTable({ database, table_name }); // 创建表
  const row = await database.get(
    `SELECT * from ${table_name} WHERE key = ${key}`
  );
  removeNull(row); // 删除null
  return row;
}
// 删除null
function removeNull(row) {
  Object.keys(row).forEach(function (key) {
    if (row[key] === null) {
      delete row[key];
    }
  });
}

/**
 * 增加
 */
async function insert({ database, table_name, row }) {
  await createTable({ database, table_name }); // 创建表
  row.key = null; // key设置为nulll
  // 新增数据
  const header = Object.keys(row);
  await addColumns({ database, table_name, column_names: header }); // 新增字段
  const columns = header.join(", ");
  const values = Object.values(row)
    .map(function (item) {
      // null => "null";
      if (item === null) {
        return "null";
      }
      if (typeof item !== "string") {
        item = JSON.stringify(item);
      }
      return JSON.stringify(item);
    })
    .join(", ");
  const result = await database.run(
    `INSERT INTO ${table_name} (${columns}) VALUES (${values})`
  );
  if (result === undefined) {
    return;
  }
  return result.lastID;
}
/**
 * 添加列
 */
async function addColumns({ database, table_name, column_names }) {
  const table_info = await database.all(`PRAGMA table_info([${table_name}])`);
  const _column_names = table_info.map(function ({ name }) {
    return name;
  });
  for (let c = 0; c < column_names.length; c = c + 1) {
    const column_name = column_names[c];
    if (_column_names.includes(column_name) === false) {
      await database.exec(
        `ALTER TABLE ${table_name} ADD COLUMN ${column_name} TEXT`
      );
    }
  }
}
/**
 * 修改
 */
async function update({ database, table_name, key, row }) {
  const exists = await select({
    database,
    table_name,
    key,
  });
  // 没有数据
  if (exists === undefined) {
    return;
  }
  const column_names = Object.keys(row);
  for (let c = 0; c < column_names.length; c = c + 1) {
    const column_name = column_names[c];
    const column_value = row[column_name];
    await database.run(
      `UPDATE ${table_name} SET ${column_name} = "${column_value}" WHERE key = ${key}`
    );
  }
}
/**
 * 删除
 */
async function remove({ database, table_name, key }) {
  const exists = await select({
    database,
    table_name,
    key,
  });
  // 没有数据
  if (exists === undefined) {
    return;
  }
  return await database.run(`DELETE FROM ${table_name} WHERE key = ${key}`);
}
/**
 * 创建数据库
 */
async function createDatabase({ filename, table_name }) {
  const database = await create({
    filename,
  });
  return {
    database,
    selects: async function () {
      return await selects({ database, table_name });
    },
    select: async function (key) {
      return await select({ database, table_name, key });
    },
    insert: async function (row) {
      return await insert({ database, table_name, row });
    },
    update: async function (key, row) {
      return await update({ database, table_name, key, row });
    },
    remove: async function (key) {
      return await remove({ database, table_name, key });
    },
    total: async function () {
      return await total({ database, table_name });
    },
  };
}
/**
 * 表里的数据总数
 */
async function total({ database, table_name }) {
  await createTable({ database, table_name }); // 创建表
  return (await database.get(`SELECT COUNT(key) from ${table_name}`))[
    "COUNT(key)"
  ];
}
