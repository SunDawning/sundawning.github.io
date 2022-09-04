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
  selectPage,
  createDatabase,
  encode,
  decode,
  encodeTable,
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
async function selects({ database, table_name, decoded = true }) {
  await createTable({ database, table_name }); // 创建表
  const rows = await database.all(`SELECT * from ${table_name}`);
  rows.forEach(function (row) {
    removeNull(row); // 删除null
    if (decoded === true) {
      decode(row); // 解码
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
    decode(row); // 解码
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
  decode(row); // 解码
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
 * 编码
 * @param {object} row
 * @returns
 * @example
 * encode({a:btoa})
 * {YQ==: 'ZnVuY3Rpb24gYnRvYSgpIHsgW25hdGl2ZSBjb2RlXSB9'}
 */
function encode(row) {
  function _encode(value) {
    console.log("value", value);
    return btoa(String(value)).replaceAll("=", "_");
  }
  Object.keys(row).forEach(function (key) {
    if (key === "key") {
      return;
    }
    row[_encode(key)] = _encode(row[key]);
    delete row[key];
  });
  return row;
}
/**
 * 解码
 * @param {object} row
 * @returns
 * @example
 * decode({YQ==: 'ZnVuY3Rpb24gYnRvYSgpIHsgW25hdGl2ZSBjb2RlXSB9'})
 * {a: 'function btoa() { [native code] }'}
 */
function decode(row) {
  function _decode(value) {
    return atob(value.replaceAll("_", "="));
  }
  Object.keys(row).forEach(function (key) {
    if (key === "key") {
      return;
    }
    row[_decode(key)] = _decode(row[key]);
    delete row[key];
  });
  return row;
}
/**
 * 编码整张表
 */
async function encodeTable({ database, table_name }) {
  const rows = await selects({ database, table_name, decoded: false });
  console.log(rows);
  const template_table_name = `tmp_${table_name}`;
  await database.exec(
    `ALTER TABLE ${table_name} RENAME TO ${template_table_name}`
  );
  try {
    for (let c = 0; c < rows.length; c = c + 1) {
      const row = rows[c];
      console.log("row");
      await insert({ database, table_name, row });
    }
    await database.exec(`DROP TABLE tmp_${table_name}`);
  } catch (error) {
    await database.exec(`DROP TABLE ${table_name}`);
    await database.exec(
      `ALTER TABLE ${template_table_name} RENAME TO ${table_name}`
    );
    console.error(error);
  }
}
/**
 * 增加
 */
async function insert({ database, table_name, row }) {
  await createTable({ database, table_name }); // 创建表
  encode(row); // 编码
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
  encode(row); // 编码
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
    selectPage: async function (current, pageSize) {
      return await selectPage({ database, table_name, pageSize, current });
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
