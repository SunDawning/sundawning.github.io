const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const axios = require("axios");
const child_process = require("child_process");
const Router = require("koa-router");
const router = new Router();
const querystring = require("qs");
const path = require("path");
[
  // 检查版本
  {
    method: "GET",
    path: /^\/api\/check-new-version/,
    middleware: router_get_api_check_new_version,
  },
  // GET http或https，用于CORS请求
  {
    method: "GET",
    path: /^\/https?:\/\//,
    middleware: router_get_https,
  },
  // POST https://www.diigo.com
  {
    method: "POST",
    path: /^\/https?:\/\//,
    middleware: router_post_https,
  },
].forEach(function ({ method, path, middleware }) {
  router[method.toLowerCase()](path, middleware);
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
/**
 * 检查版本
 * 路由
 * GET /api/check-new-version
 * @param context
 */
async function router_get_api_check_new_version(context) {
  const { url, method } = context.request;
  if ((method === "GET") === false) {
    return;
  }
  let realURL = url.substring(1);
  log("realURL", realURL);
  const message = child_process.execSync("git pull && pnpm install", {
    cwd: path.resolve(__dirname, "../"),
    encoding: "utf-8",
  });
  log(message);
  context.response.body = { message };
  context.response.headers = { "content-type": "application/json" };
}
/**
 * GET http或https，用于CORS请求
 * 路由
 * GET /http://或GET /https://
 * @param context
 * @returns
 */
async function router_get_https(context) {
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
  log("response.headers", response.headers);
  log("response.data", response.data);
  context.response.body = response.data;
  context.response.headers = response.headers;
}
/**
 * POST https://www.diigo.com
 * 路由
 * POST /http://或GET /https://
 * @param context
 */
async function router_post_https(context) {
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
}
