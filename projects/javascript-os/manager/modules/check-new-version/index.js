const log = require("../../../server/modules/log");
const child_process = require("child_process");
const path = require("path");
/**
 * git pull && pnpm install
 * @returns
 */
module.exports = function () {
  const command = "git pull && pnpm install";
  log("执行命令", command);
  return child_process.execSync(command, {
    cwd: path.resolve(__dirname, "../../"),
    encoding: "utf-8",
  });
};
