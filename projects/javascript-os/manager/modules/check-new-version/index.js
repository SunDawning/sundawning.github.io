const log = require("server/modules/log");
const child_process = require("child_process");
const path = require("path");
/**
 * git pull && pnpm install
 * @returns
 */
module.exports = async function () {
  return new Promise(function (resolve, reject) {
    const command = "git pull && pnpm install";
    log("执行命令", command);
    const child = child_process.exec(command, {
      cwd: path.resolve(__dirname, "../../"),
      encoding: "utf-8",
    });
    child.stdout.on("data", function (data) {
      log(data);
      resolve(data);
    });
  });
};
