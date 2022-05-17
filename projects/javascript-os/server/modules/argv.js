const minimist = require("minimist");
/**
 * 解析命令行的参数为对象
 * @returns object
 */
module.exports = function () {
  return minimist(process.argv);
};
