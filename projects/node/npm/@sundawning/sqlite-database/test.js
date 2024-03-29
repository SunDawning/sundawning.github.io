const {
  create,
  selects,
  select,
  insert,
  update,
  remove,
  total,
  selectPage,
} = require("./index");
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
  await update({
    database,
    table_name,
    key,
    row: { title: "content", status: "DONE" },
  }); // 修改
  await update({
    database,
    table_name,
    key,
    row: { KEY: "KEY" },
  }); // 修改“KEY”，会被忽略，因为已经存在key，列名不区分大小写。
  console.log("selects", await selects({ database, table_name })); // 查询
  await remove({ database, table_name, key }); // 删除
  console.log("selects", await selects({ database, table_name })); // 查询
  console.log("total", await total({ database, table_name }));
}
index();
