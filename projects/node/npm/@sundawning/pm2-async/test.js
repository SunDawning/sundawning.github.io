const pm2 = require("./index");
async function index() {
  await pm2.connect();
  console.log("list", await pm2.list());
  await pm2.disconnect();
}
index();
