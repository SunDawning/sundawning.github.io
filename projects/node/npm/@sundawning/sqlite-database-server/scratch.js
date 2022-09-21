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
}
index();
