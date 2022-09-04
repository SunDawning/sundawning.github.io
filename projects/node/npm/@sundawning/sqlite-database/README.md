SQLite 数据库

2022-09-04 16:53:56

# 安装

```sh
pnpm add @sundawning/sqlite-database
```

# 使用

```js
const {
  create,
  select,
  insert,
  update,
  remove,
} = require("@sundawning/sqlite-database");
const path = require("path");
async function index() {
  const database = await create({
    filename: path.resolve(__dirname, "./database.db"),
  }); // 新增数据库
  const table_name = "hello"; // // 表名
  // 新增数据
  const key = await insert({
    database,
    table_name,
    row: { createTime: 1662265343067, title: "title" },
  });
  console.log(await select({ database, table_name })); // 查询
  await select({ database, table_name, key }); // 查询
  await update({ database, table_name, key, row: { title: "content" } }); // 修改
  console.log(await select({ database, table_name })); // 查询
  await remove({ database, table_name, key }); // 删除
  console.log(await select({ database, table_name })); // 查询
}
index();
```

首次执行时：

```js
[{ key: 1, createTime: "1662265343067", title: "title" }][
  { key: 1, createTime: "1662265343067", title: "content" }
];
undefined;
```

第二次执行时：

```js
[{ key: 2, createTime: "1662265343067", title: "title" }][
  { key: 2, createTime: "1662265343067", title: "content" }
];
undefined;
```
