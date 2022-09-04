const { create, selects, select, insert, update, remove } = require("./index");
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
    row: {
      createTime: 1662282365981,
      updateTime: 1662282365981,
      title: "SQLite表的行与Object转换",
      content: "一个Object对应表里的一行。",
    },
  });
  console.log(key);
  console.log(await selects({ database, table_name })); // 查询
  await select({ database, table_name, key }); // 查询
  await update({ database, table_name, key, row: { title: "content" } }); // 修改
  console.log(await selects({ database, table_name })); // 查询
  await remove({ database, table_name, key }); // 删除
  console.log(await selects({ database, table_name })); // 查询
}
index();
