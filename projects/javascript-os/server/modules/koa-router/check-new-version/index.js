const log = require("server/modules/log");
const check_new_version = require("manager/modules/check-new-version");
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
  const message = await check_new_version();
  log(message);
  context.response.body = { message };
  context.response.headers = { "content-type": "application/json" };
};
