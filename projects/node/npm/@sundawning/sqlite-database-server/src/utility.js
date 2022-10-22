const Koa = require("koa");
const Router = require("koa-router");
const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const koa_body = require("koa-body");
const fs = require("fs-extra");
async function start({
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
  app.use(koa_body());
  app.use(async function (context, next) {
    const { method, url, headers } = context;
    console.log(`${method} ${url} ${headers["user-agent"]}`);
    if (method === "POST") {
      console.log("context.request.body", context.request.body);
    }
    await next();
  });
  const databases_map = new Map();
  router.post("/api/databases/:database_name", async function (context) {
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
    if (databases_map.has(database_name) === false) {
      databases_map.set(
        database_name,
        await sqlite.open({
          filename: database_filename,
          driver: sqlite3.Database,
        })
      );
    }
    const database = databases_map.get(database_name);
    const database_result = await database[method](sql);
    console.log("database_result", database_result);
    context.response.body = database_result;
  });
  app.use(router.routes());
}
module.exports = { start };
