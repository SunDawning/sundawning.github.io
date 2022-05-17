const get_random_int = require("manager/modules/get-random-int");
/**
 * 获取随机可用的端口
 */
module.exports = async function () {
  return await get_random_int({ min: 3000, max: 65535 });
};
