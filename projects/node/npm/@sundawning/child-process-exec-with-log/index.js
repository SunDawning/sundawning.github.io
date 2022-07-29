const log = require("@sundawning/console-log-timestamp");
const child_process = require("child_process");
/**
 * 异步执行命令，并输出到主进程里。
 * @param {string} command
 * @param {object} options
 * @param {function} callback
 */
module.exports = function (
  command,
  { isLogCommand = true, ...options } = {},
  callback
) {
  if (isLogCommand === true) {
    log("执行命令", command);
  }
  console.log("options", options);
  const child = child_process.exec(command, options, callback);
  ["stderr", "stdout", "stdin"].forEach(function (location) {
    child[location].pipe(process[location]);
  });
};
