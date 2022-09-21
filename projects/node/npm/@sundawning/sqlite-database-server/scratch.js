const Koa = require("koa");
async function index({ port = 8080 } = {}) {
  const app = new Koa();
  console.log("app", app);
  const server = app.listen(port);
  console.log("server", JSON.stringify(server));
  console.log("server.address()", server.address());
}
index();
