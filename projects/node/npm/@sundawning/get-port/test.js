const get_port = require("./index");
const log = require("@sundawning/console-log-timestamp");
index();
async function index() {
  const port_0 = await get_port();
  log("查找到可用端口", port_0);
  const port_1 = await get_port({ port: port_0 + 1 });
  log("查找到可用端口", port_1);
}
