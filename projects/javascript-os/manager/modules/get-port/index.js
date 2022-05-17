const portfinder = require("portfinder");
const log = require("server/modules/log");
/**
 * 查找可用的端口
 * @param {number} port 开始的端口
 * @param {number} stopPort 结束的端口
 */
module.exports = function ({ port, stopPort } = {}) {
  return new Promise(function (resolve, reject) {
    portfinder.getPort({ port, stopPort }, function (error, port) {
      if (error) {
        reject(error);
        return;
      }
      resolve(port);
      log("查找到可用端口", port);
    });
  });
};
