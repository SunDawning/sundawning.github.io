const Koa = require("koa");
const Router = require("koa-router");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const koa_body = require("koa-body");
const fs = require("fs-extra");
async function index({
  port = 28080,
  databases_directory = path.resolve(__dirname, "./databases"),
} = {}) {
  // 文件夹
  await fs.ensureDir(databases_directory);
  // 服务器
  const app = new Koa();
  console.log("app", app);
  const server = app.listen(port);
  console.log("server", JSON.stringify(server));
  console.log("server.address()", server.address());
  const router = new Router();
  console.log("router", JSON.stringify(router));
  app.use(router.routes());
  router.get("/hello", async function (context) {
    context.response.body = "hello";
  });
  router.post("/api/databases", koa_body(), async function (context) {
    console.log("context.request.body", context.request.body);
    const { name: database_name } = context.request.body;
    if (database_name === undefined) {
      context.response.status = 400;
      console.log("missing", "database_name");
      return;
    }
    const database_filename = path.resolve(
      databases_directory,
      `./${database_name}.db`
    );
    console.log("database_filename", database_filename);
    if ((await fs.pathExists(database_filename)) === true) {
      console.log("database_filename", "exists");
      context.response.status = 204;
      return;
    }
    const database = await sqlite.open({
      filename: database_filename,
      driver: sqlite3.Database,
    });
    await database.close();
    context.response.status = 201;
  });
  router.post(
    "/api/databases/:database_name",
    koa_body(),
    async function (context) {
      console.log("context.request.body", context.request.body);
      const { database_name } = context.params;
      if (database_name === undefined) {
        context.response.status = 400;
        console.log("missing", "database_name");
        return;
      }
      const { sql, method = "all" } = context.request.body;
      if (sql === undefined) {
        context.response.status = 400;
        console.log("missing", "sql");
        return;
      }
      const database_filename = path.resolve(
        databases_directory,
        `./${database_name}.db`
      );
      console.log("database_filename", database_filename);
      const database = await sqlite.open({
        filename: database_filename,
        driver: sqlite3.Database,
      });
      const database_result = await database[method](sql);
      console.log("database_result", database_result);
      await database.close();
      context.response.body = database_result;
    }
  );
  router.post(
    "/api/databases/:database_name/tables",
    koa_body(),
    async function (context) {
      console.log("context.request.body", context.request.body);
      const { database_name } = context.params;
      if (database_name === undefined) {
        context.response.status = 400;
        console.log("missing", "database_name");
        return;
      }
      const { name: table_name } = context.request.body;
      if (table_name === undefined) {
        context.response.status = 400;
        console.log("missing", "table_name");
        return;
      }
      const database_filename = path.resolve(
        databases_directory,
        `./${database_name}.db`
      );
      console.log("database_filename", database_filename);
      const database = await sqlite.open({
        filename: database_filename,
        driver: sqlite3.Database,
      });
      const database_result = await database.all(
        `CREATE TABLE IF NOT EXISTS ${table_name} ( key INTEGER PRIMARY KEY AUTOINCREMENT )`
      );
      console.log("database_result", database_result);
      await database.close();
      context.response.status = 201;
    }
  );
  router.get(
    "/api/databases/:database_name/tables/:table_name",
    koa_body(),
    async function (context) {
      console.log("context.request.body", context.request.body);
      const { database_name, table_name } = context.params;
      if (database_name === undefined || database_name === ":database_name") {
        context.response.status = 400;
        console.log("missing", "database_name");
        return;
      }
      if (table_name === undefined || table_name === ":table_name") {
        context.response.status = 400;
        console.log("missing", "table_name");
        return;
      }
      const database_filename = path.resolve(
        databases_directory,
        `./${database_name}.db`
      );
      console.log("database_filename", database_filename);
      const database = await sqlite.open({
        filename: database_filename,
        driver: sqlite3.Database,
      });
      const database_result = await database.all(`SELECT * FROM ${table_name}`);
      console.log("database_result", database_result);
      await database.close();
      context.response.body = database_result;
    }
  );
}
index();
