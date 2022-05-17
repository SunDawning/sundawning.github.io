const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const Router = require("koa-router");
const router = new Router();
const log = require("./modules/log");
const router_get_api_check_new_version = require("./modules/koa-router/check-new-version");
const router_get_https = require("./modules/koa-router/get-http");
const router_post_https = require("./modules/koa-router/post-http");
const fs = require("fs");
const argv = require("./modules/argv");
const { port } = argv();
[
  // 检查版本
  {
    method: "GET",
    path: /^\/api\/check-new-version/,
    middleware: router_get_api_check_new_version,
  },
  // GET http或https，用于CORS请求
  {
    method: "GET",
    path: /^\/https?:\/\//,
    middleware: router_get_https,
  },
  // POST https://www.diigo.com
  {
    method: "POST",
    path: /^\/https?:\/\//,
    middleware: router_post_https,
  },
].forEach(function ({ method, path, middleware }) {
  router[method.toLowerCase()](path, middleware);
});
app.use(router.routes());
app.use(cors());
const server = app.listen(port);
log(`启动HTTP服务器 http://localhost:${server.address().port}`);
