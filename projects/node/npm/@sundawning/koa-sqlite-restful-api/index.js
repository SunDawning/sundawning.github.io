module.exports = { start };
const log = require("@sundawning/console-log-timestamp");
const { createDatabase } = require("@sundawning/sqlite-database");
const Koa = require("koa");
const Router = require("koa-router");
const parsePostData = require("@sundawning/koa-post-data-parser");
/**
 * 使用 Koa 来启动 HTTP 服务器，使用 SQLite 作为数据库，来提供 RESTful API。
 * @param {object} options
 * @param {object} options.koa Koa的配置
 * @param {object} options.sqlite SQLite的配置
 * @param {number} [options.koa.port = 8080] Koa服务器的端口号
 * @param {string} options.sqlite.filename SQLite数据库文件的绝对路径
 * @param {string} options.sqlite.table_name SQLite数据库表的名称
 * @returns {object} { koa: { app, router }, sqlite: { database } }
 */
async function start({
  koa: { port = 8080 },
  sqlite: { filename, table_name },
} = {}) {
  // 数据库
  const database = await createDatabase({
    filename,
    table_name,
  });
  const { select, insert, update, remove, total, selectPage } = database;
  // HTTP服务器
  const app = new Koa();
  app.listen(port);
  console.log(`app.listen(${port})`);
  const router = new Router();
  router.use(async function (context, next) {
    const { method, url, headers } = context;
    log(`${method} ${url} ${headers["user-agent"]}`);
    await next();
  });
  router.get(`/api/${table_name}`, async function (context) {
    let { current = 1, pageSize = 10 } = context.query;
    current = parseInt(current);
    pageSize = parseInt(pageSize);
    const rows = await selectPage(current, pageSize);
    context.response.body = {
      pagination: {
        current,
        pageSize,
        pageTotal: rows.length,
        total: await total(),
      },
      dataSource: rows,
    };
  });
  router.post(`/api/${table_name}`, async function (context) {
    const post_data = await parsePostData(context);
    log("post_data", post_data);
    const json_data = JSON.parse(post_data);
    const lastID = await insert(json_data); // 保存到数据库
    if (lastID === undefined) {
      context.response.status = 400;
      return;
    }
    context.response.body = await select(lastID);
  });
  router.get(`/api/${table_name}/:key`, async function (context) {
    context.response.body = await select(context.params.key);
  });
  router.patch(`/api/${table_name}/:key`, async function (context) {
    const post_data = await parsePostData(context);
    log("post_data", post_data);
    const json_data = JSON.parse(post_data);
    const key = context.params.key;
    await update(key, json_data);
    context.response.body = await select(key);
  });
  router.delete(`/api/${table_name}/:key`, async function (context) {
    const key = context.params.key;
    await remove(key);
    context.response.status = 204;
  });
  app.use(router.routes());
  return { koa: { app, router }, sqlite: { database } };
}
