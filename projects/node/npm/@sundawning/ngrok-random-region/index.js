const ngrok = require("ngrok");
const random_number = require("@sundawning/get-random-int");
module.exports = { start };
/**
 * 启动ngrok
 * @param {string} options.token
 * @param {number} [options.port = 8080]
 * @param {string} [options.proto = "http"]
 * @returns
 */
async function start({
  token,
  port = 8080,
  proto = "http",
  regions = ["us", "eu", "au", "ap"],
} = {}) {
  if (token === undefined) {
    console.log("缺失token权限");
    return;
  }
  const url = await ngrok.connect({
    proto,
    addr: port,
    authtoken: token,
    region: regions[random_number({ min: 0, max: regions.length - 1 })],
  });
  console.log("启动ngrok内网穿透服务器", proto, port, "=>", url);
  return url;
}
