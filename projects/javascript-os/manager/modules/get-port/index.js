const portfinder = require("portfinder");
const log = require("server/modules/log");
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
