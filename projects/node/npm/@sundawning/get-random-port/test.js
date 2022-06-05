const get_random_port = require("./index");
const log = require("@sundawning/console-log-timestamp");
index();
async function index() {
  log(await get_random_port());
  log(await get_random_port());
}
