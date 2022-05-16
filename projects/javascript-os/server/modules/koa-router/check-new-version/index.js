const log = require("../../log");
const child_process = require("child_process");
const path = require("path");
/**
 * 检查版本
 * 路由
 * GET /api/check-new-version
 * @param context
 */
module.exports = async function (context) {
  const { url, method } = context.request;
  if ((method === "GET") === false) {
    return;
  }
  let realURL = url.substring(1);
  log("realURL", realURL);
  const message = child_process.execSync("git pull && pnpm install", {
    cwd: path.resolve(__dirname, "../../../manager"),
    encoding: "utf-8",
  });
  log(message);
  context.response.body = { message };
  context.response.headers = { "content-type": "application/json" };
};
