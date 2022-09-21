const Koa = require("koa");
const Router = require("koa-router");
async function index({ port = 28080 } = {}) {
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
}
index();
