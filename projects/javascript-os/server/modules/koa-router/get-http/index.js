const log = require("../../log");
const axios = require("axios");
/**
 * GET http或https，用于CORS请求
 * 路由
 * GET /http://或GET /https://
 * @param context
 * @returns
 */
module.exports = async function (context) {
  const { method, url, headers, params } = context.request;
  if ((method === "GET") === false) {
    return;
  }
  let realURL = url.substring(1);
  log(method, "realURL", realURL);
  let responseType;
  if (headers) {
    log("headers", headers);
    if (headers["response-type"]) {
      responseType = headers["response-type"];
      delete headers["response-type"];
    }
    ["referer", "host", "origin"].forEach(function (key) {
      delete headers[key];
    });
    ["content-length", "content-type", "accept-encoding"].forEach(function (
      key
    ) {
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
  };
  if (responseType) {
    options.responseType = responseType;
  }
  log("options", options);
  let response;
  try {
    response = await axios(options);
  } catch (error) {
    log("error", error.code);
    if (error.response === undefined) {
      return;
    }
    // https://www.antdv.com/components/form-cn#API 直接返回404，但携带了数据。
    response = error.response;
  }
  // log("response.headers", response.headers);
  // log("response.data", response.data);
  context.response.body = response.data;
  context.response.headers = response.headers;
};
