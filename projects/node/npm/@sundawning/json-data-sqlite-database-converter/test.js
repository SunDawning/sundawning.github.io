const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const { JSONDataToSQLiteTable, SQLiteTableToJSONData } = require("./index");
async function index() {
  // 新增数据库
  const sqlite_database = await sqlite.open({
    filename: require("path").resolve(__dirname, "./database.db"),
    driver: sqlite3.Database,
  });
  // 表名
  const table_name = "hello";
  // 第一条数据
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
  );
  // 第二条数据
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
  );
  // 新增数据（每执行一次将会新增数据）
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
  );
  // 转换为JSON
  console.log(await SQLiteTableToJSONData(sqlite_database, table_name));
}
index();
