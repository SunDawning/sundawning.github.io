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
  selects,
  select,
  insert,
  update,
  remove,
  total,
  selectPage,
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
  await insert({
    database,
    table_name,
    row: { deleted: true },
  });
  console.log("key", key);
  console.log("selects", await selects({ database, table_name })); // 查询
  console.log("total", await total({ database, table_name }));
  console.log(
    "selectPage",
    await selectPage({ database, table_name, pageSize: 1, current: 1 })
  ); // 分页查询
  await select({ database, table_name, key }); // 查询
  await update({ database, table_name, key, row: { title: "content" } }); // 修改
  console.log("selects", await selects({ database, table_name })); // 查询
  await remove({ database, table_name, key }); // 删除
  console.log("selects", await selects({ database, table_name })); // 查询
  console.log("total", await total({ database, table_name }));
}
index();
```

首次执行时：

```js
key 1
selects [
  { key: 1, createTime: '1662265343067', title: 'title' },
  { key: 2, deleted: 'true' }
]
total 2
selectPage [ { key: 1, createTime: '1662265343067', title: 'title' } ]
selects [
  { key: 1, createTime: '1662265343067', title: 'content' },
  { key: 2, deleted: 'true' }
]
selects [ { key: 2, deleted: 'true' } ]
total 1
```

第二次执行时：

```js
key 3
selects [
  { key: 2, deleted: 'true' },
  { key: 3, createTime: '1662265343067', title: 'title' },
  { key: 4, deleted: 'true' }
]
total 3
selectPage [ { key: 2, deleted: 'true' } ]
selects [
  { key: 2, deleted: 'true' },
  { key: 3, createTime: '1662265343067', title: 'content' },
  { key: 4, deleted: 'true' }
]
selects [ { key: 2, deleted: 'true' }, { key: 4, deleted: 'true' } ]
total 2
```
