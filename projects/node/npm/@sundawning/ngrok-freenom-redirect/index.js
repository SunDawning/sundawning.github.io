const Ngrok = require("@sundawning/ngrok-random-region");
const Freenom = require("@sundawning/freenom-url-forwarding");
module.exports = { start };
/**
 * 启动ngrok后获取网址并将设置为freenom域名的重定向网址
 * @param {object} options
 * @param {object} options.ngrok
 * @param {object} options.freenom
 * @param {string} options.ngrok.token
 * @param {number} options.ngrok.port
 * @param {string} options.freenom.username
 * @param {string} options.freenom.password
 * @param {string} options.freenom.domain
 * @returns
 */
async function start({
  ngrok: { token, port },
  freenom: { username, password, domain },
} = {}) {
  const url = await Ngrok.start({ token, port, proto: "http" });
  return await Freenom.redirect({ username, password, domain, url });
}
