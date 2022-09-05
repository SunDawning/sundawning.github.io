const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const {
  encodeRow,
  decodeRow,
  encodeTable,
  decodeTable,
} = require("@sundawning/sqlite-base64");
module.exports = {
  create,
  selects,
  select,
  insert,
  update,
  remove,
  total,
  selectPage,
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
async function selects({ database, table_name, decoded }) {
  await createTable({ database, table_name }); // 创建表
  const rows = await database.all(`SELECT * from ${table_name}`);
  rows.forEach(function (row) {
    removeNull(row); // 删除null
    if (decoded === true) {
      decodeRow(row); // 解码
    }
  });
  return rows;
}
/**
 * 分页查询
 * @param {number} {options.current} 当前页，默认从1开始。
 */
async function selectPage({
  database,
  table_name,
  pageSize = 10,
  current = 1,
  decoded,
} = {}) {
  await createTable({ database, table_name }); // 创建表
  current = parseInt(current);
  pageSize = parseInt(pageSize);
  const offset = (current - 1) * pageSize;
  const rows = await database.all(
    `SELECT * FROM ${table_name} ORDER BY key LIMIT ${pageSize} OFFSET ${offset}`
  );
  rows.forEach(function (row) {
    removeNull(row); // 删除null
    if (decoded === true) {
      decodeRow(row); // 解码
    }
  });
  return rows;
}
/**
 * 查询
 * @returns
 */
async function select({ database, table_name, key, decoded }) {
  if (key === undefined) {
    return;
  }
  await createTable({ database, table_name }); // 创建表
  const row = await database.get(
    `SELECT * from ${table_name} WHERE key = ${key}`
  );
  removeNull(row); // 删除null
  if (decoded === true) {
    decodeRow(row); // 解码
  }
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
async function insert({ database, table_name, row, encoded }) {
  await createTable({ database, table_name }); // 创建表
  if (encoded === true) {
    encodeRow(row); // 编码
  }
  row.key = null; // key设置为nulll
  // 新增数据
  const column_names = Object.keys(row);
  await addColumns({ database, table_name, column_names }); // 新增字段
  const columns = column_names.join(", ");
  const values = Object.values(row)
    .map(function (item) {
      // null => "null";
      if (item === null) {
        return "null";
      }
      if (typeof item !== "string") {
        item = JSON.stringify(item);
      }
      return `"${item}"`;
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
 * 列名不区分大小写
 * [Error: SQLITE_ERROR: duplicate column name: KEY]
 */
async function addColumns({ database, table_name, column_names }) {
  const table_info = await database.all(`PRAGMA table_info([${table_name}])`);
  const _column_names = table_info.map(function ({ name }) {
    return name.toLowerCase();
  });
  for (let c = 0; c < column_names.length; c = c + 1) {
    const column_name = column_names[c];
    if (_column_names.includes(column_name.toLowerCase()) === false) {
      // console.log("添加列", column_names);
      await database.exec(
        `ALTER TABLE ${table_name} ADD COLUMN ${column_name} TEXT`
      );
    }
  }
}
/**
 * 修改
 */
async function update({ database, table_name, key, row, encoded }) {
  const exists = await select({
    database,
    table_name,
    key,
  });
  // 没有数据
  if (exists === undefined) {
    return;
  }
  // 删除key属性，不允许修改key。
  delete row.key;
  if (encoded === true) {
    encodeRow(row); // 编码
  }
  const column_names = Object.keys(row);
  await addColumns({ database, table_name, column_names }); // 添加列
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
async function createDatabase({ filename, table_name, encoded } = {}) {
  const database = await create({
    filename,
  });
  const decoded = encoded;
  return {
    database,
    selects: async function () {
      return await selects({ database, table_name, decoded });
    },
    select: async function (key) {
      return await select({ database, table_name, key, decoded });
    },
    insert: async function (row) {
      return await insert({ database, table_name, row, encoded });
    },
    update: async function (key, row) {
      return await update({ database, table_name, key, row, encoded });
    },
    remove: async function (key) {
      return await remove({ database, table_name, key });
    },
    total: async function () {
      return await total({ database, table_name });
    },
    selectPage: async function (current, pageSize) {
      return await selectPage({
        database,
        table_name,
        pageSize,
        current,
        decoded,
      });
    },
    encodeTable: async function () {
      return await encodeTable({ database, table_name });
    },
    decodeTable: async function () {
      return await decodeTable({ database, table_name });
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
