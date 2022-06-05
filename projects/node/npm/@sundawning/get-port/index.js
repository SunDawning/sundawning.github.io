const portfinder = require("portfinder");
/**
 * 查找可用的端口
 * @param {object} options
 * @param {number} options.port 开始的端口
 * @param {number} options.stopPort 结束的端口
 */
module.exports = function ({ port, stopPort } = {}) {
  return new Promise(function (resolve, reject) {
    portfinder.getPort({ port, stopPort }, function (error, port) {
      if (error) {
        reject(error);
        return;
      }
      resolve(port);
    });
  });
};
