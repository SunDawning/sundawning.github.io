const portfinder = require("portfinder");
const log = require("server/modules/log");
module.exports = async function () {
  const port = await portfinder.getPortPromise();
  log("查找到可用端口", port);
  return port;
};
