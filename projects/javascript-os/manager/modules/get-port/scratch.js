const get_port = require("./index");
index();
async function index() {
  const port = await get_port();
  await get_port({ port: port + 1 });
}
