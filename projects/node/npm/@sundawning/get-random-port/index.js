const get_random_int = require("@sundawning/get-random-int");
const get_port = require("@sundawning/get-port");
/**
 * 获取随机可用的端口
 */
module.exports = async function () {
  return await get_port({ port: get_random_int({ min: 3000, max: 65535 }) });
};
