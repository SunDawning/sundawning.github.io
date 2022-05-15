const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const axios = require("axios");
const child_process = require("child_process");
app.use(cors()); // CORS
app.use(async function (context) {
  const { method, url, headers, params } = context.request;
  // console.log("context.request", context.request);
  log(`${method} ${url}`);
  // 以“/api”开头的地址
  if (url.startsWith("/api")) {
    {
      const message = child_process.execSync("git pull", {
        cwd: __dirname,
        encoding: "utf-8",
      });
      log(message);
      const response = {
        data: {
          message,
        },
        headers: {
          "content-type": "application/json",
        },
      };
      context.response.body = response.data;
      context.response.headers = response.headers;
    }
    return;
  }
  // 以“/http:”或“/https:”开头的地址
  if (url.match(/^\/https?:\/\//) === null) {
    log("无法代理该网址，仅支持“/http://”或“/https://”开头的网址：", url);
    return;
  }
  let realURL = url.substring(1);
  log("realURL", realURL);
  if (headers) {
    ["referer", "host", "origin"].forEach(function (key) {
      delete headers[key];
    });
    if (method === "GET") {
      ["content-length", "content-type", "accept-encoding"].forEach(function (
        key
      ) {
        delete headers[key];
      });
    }
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
    responseType: "arraybuffer",
  };
  if (method === "POST") {
    const data = await paresPostData(context);
    log("data", data);
    Object.assign(options, { data });
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
  // log("response.headers", headers);
  // log("response.data", response.data);
  context.response.body = response.data;
  context.response.headers = response.headers;
});
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
