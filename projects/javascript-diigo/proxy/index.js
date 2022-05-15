const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const axios = require("axios");
const child_process = require("child_process");
const Router = require("koa-router");
const router = new Router();
// 检查版本
router.get(/^\/api\/check-new-version/, async function (context) {
  const { method, url, headers, params } = context.request;
  let realURL = url.substring(1);
  log("realURL", realURL);
  const message = child_process.execSync("git pull", {
    cwd: __dirname,
    encoding: "utf-8",
  });
  log(message);
  context.response.body = { message };
  context.response.headers = { "content-type": "application/json" };
});
// GET http或https，用于CORS请求
router.get(/^\/https?:\/\//, async function (context) {
  const { method, url, headers, params } = context.request;
  let realURL = url.substring(1);
  log("realURL", realURL);
  if (headers) {
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
  // log("response.headers", headers);
  // log("response.data", response.data);
  context.response.body = response.data;
  context.response.headers = response.headers;
});
// POST https://www.diigo.com
router.post(/^\/https:\/\/www.diigo.com/, async function (context) {
  const { method, url, headers, params } = context.request;
  // console.log("context.request", context.request);
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
});
app.use(router.routes());
app.use(cors());
app.listen(3001);
/**
 * 打印，不同于console.log，带有时间戳。
 */
function log() {
  process.stdout.write(`[${new Date().toLocaleString()}] `);
  console.log.apply(null, arguments);
}
/**
 * koa处理post请求
 * @see https://www.jianshu.com/p/8ead763ed4c0
 * @param {*} ctx
 * @returns
 */
function paresPostData(ctx) {
  return new Promise((resolve, reject) => {
    try {
      let postData = "";
      ctx.req.addListener("data", (data) => {
        postData += data;
      });
      ctx.req.on("end", () => {
        resolve(postData);
      });
    } catch (err) {
      reject(err);
    }
  });
}
