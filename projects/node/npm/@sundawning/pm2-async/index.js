const pm2 = require("pm2");
/**
 * @see https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/
 */
module.exports = {
  disconnect,
  connect,
  start,
  list,
};
function disconnect() {
  return new Promise(function (resolve, reject) {
    pm2.disconnect();
  });
}
function connect() {
  return new Promise(function (resolve, reject) {
    pm2.connect(function (error) {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}
function start(options) {
  return new Promise(function (resolve, reject) {
    pm2.start(options, function (error, apps) {
      if (error) {
        reject(error);
        return;
      }
      resolve(apps);
    });
  });
}
function list() {
  return new Promise(function (resolve, reject) {
    pm2.list(function (error, list) {
      if (error) {
        reject(error);
        return;
      }
      resolve(list);
    });
  });
}
