JSON 数据与 SQLite 表相互转换

2022-09-04 12:32:01

# 安装

```sh
pnpm add @sundawning/json-data-sqlite-database-converter
```

# 使用

```js
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const {
  JSONDataToSQLiteTable,
  SQLiteTableToJSONData,
} = require("@sundawning/json-data-sqlite-database-converter");
async function index() {
  // 新增数据库
  const sqlite_database = await sqlite.open({
    filename: require("path").resolve(__dirname, "./database.db"),
    driver: sqlite3.Database,
  });
  // 表名
  const table_name = "hello";
  // 第一条数据
  console.log(
    await JSONDataToSQLiteTable(
      [
        {
          key: 0,
          createTime: 1662265343067,
          title: "title",
        },
      ],
      sqlite_database,
      table_name
    )
  );
  // 第二条数据
  console.log(
    await JSONDataToSQLiteTable(
      [
        {
          key: 1,
          updateTime: 1662265346056,
          content: "content",
          deleted: true,
        },
      ],
      sqlite_database,
      table_name
    )
  );
  // 新增数据（每执行一次将会新增数据）
  console.log(
    await JSONDataToSQLiteTable(
      [
        {
          updateTime: 1662265346056,
          content: "content",
          deleted: true,
        },
      ],
      sqlite_database,
      table_name
    )
  );
  // 转换为JSON
  console.log(await SQLiteTableToJSONData(sqlite_database, table_name));
}
index();
```

首次执行时：

```js
0
1
2
[
  { key: 0, createTime: "1662265343067", title: "title" },
  {
    key: 1,
    updateTime: "1662265346056",
    content: "content",
    deleted: "true",
  },
  {
    key: 2,
    updateTime: "1662265346056",
    content: "content",
    deleted: "true",
  },
];
```

第二次执行时：

```js
undefined
undefined
3
[
  { key: 0, createTime: "1662265343067", title: "title" },
  {
    key: 1,
    updateTime: "1662265346056",
    content: "content",
    deleted: "true",
  },
  {
    key: 2,
    updateTime: "1662265346056",
    content: "content",
    deleted: "true",
  },
  {
    key: 3,
    updateTime: "1662265346056",
    content: "content",
    deleted: "true",
  },
];
```
