const log = require("../../log");
const paresPostData = require("../../paresPostData");
const axios = require("axios");
/**
 * POST https://www.diigo.com
 * 路由
 * POST /http://或GET /https://
 * @param context
 */
module.exports = async function (context) {
  const { method, url, headers, params } = context.request;
  // console.log("context.request", context.request);
  if ((method === "POST") === false) {
    return;
  }
  let realURL = url.substring(1);
  log("realURL", realURL);
  if (headers) {
    ["referer", "host", "origin"].forEach(function (key) {
      delete headers[key];
    });
    ["Cookie"].forEach(function (key) {
      key = key.toLowerCase();
      if (headers[`_${key}`] === undefined) {
        return;
      }
      headers[key] = headers[`_${key}`];
      delete headers[`_${key}`];
    });
  }
  let options = {
    url: realURL,
    method,
    params,
    headers,
    data: await paresPostData(context),
  };
  log("options", options);
  let response = await axios(options);
  context.response.body = response.data;
  context.response.headers = response.headers;
};
