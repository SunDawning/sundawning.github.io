const log = require("../../../server/modules/log");
const child_process = require("child_process");
/**
 * 异步执行命令
 * @param {string} command
 */
module.exports = function (command) {
  log("执行命令", command);
  const child = child_process.exec(command);
  ["stderr", "stdout", "stdin"].forEach(function (location) {
    child[location].pipe(process[location]);
  });
};
