const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const axios = require("axios");
const child_process = require("child_process");
const Router = require("koa-router");
const router = new Router();
const querystring = require("qs");
const path = require("path");
// 检查版本
router.get(/^\/api\/check-new-version/, async function (context) {
  const { method, url, headers, params } = context.request;
  let realURL = url.substring(1);
  log("realURL", realURL);
  const message = child_process.execSync("git pull && pnpm install", {
    cwd: path.resolve(__dirname, "../"),
    encoding: "utf-8",
  });
  log(message);
  context.response.body = { message };
  context.response.headers = { "content-type": "application/json" };
});
// 反馈：比对验证码
router.get("/api/feedback", async function (context) {
  const response = await axios({
    url: "http://tool.chacuo.net/?m=tool&act=caption&rnd=685194894",
    method: "GET",
    responseType: "arraybuffer",
    headers: {
      cookie: "PHPSESSID=n8e6qsktgtmtj8amcvvj1imo42",
    },
  });
  context.response.body = response.data;
  context.response.headers = response.headers;
});
router.post("/api/feedback", async function (context) {
  const { url } = context.request;
  let realURL = url.substring(1);
  log("realURL", realURL);
  let data = await paresPostData(context);
  data = JSON.parse(data);
  log("data", data);
  const { description, yzm } = data;
  let subject = "Diigo反馈";
  let to = "jobsimi@qq.com";
  let options = {
    url: "http://tool.chacuo.net/mailsend",
    method: "POST",
    data: querystring.stringify({
      data: description,
      type: "send",
      arg: `t=${to}_s=${subject}_yzm=${yzm}`,
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-requested-with": "XMLHttpRequest",
      cookie: "PHPSESSID=n8e6qsktgtmtj8amcvvj1imo42",
    },
  };
  log("options", options);
  const response = await axios(options);
  log("response.headers", response.headers);
  log("response.data", response.data);
  // 1. 返回html
  // <!Doctype html>
  // <html lang="zh_cn">
  // 2. 返回发送失败
  // {
  //   status: 1,
  //   info: 'ok',
  //   data: [ '<h3 class="red">发送失败！</h3><div>请输入正确验证码！<div>' ]
  // }
  // 3. 返回发送成功
  // {
  //   status: 1,
  //   info: 'ok',
  //   data: [
  //     '<h3 class="blue">发送成功！</h3><div><u>当前时间：2022-05-15 18:46:43&lt;/br&gt;</u></div><div><u>mx记录解析成功:157.255.173.201</u></div><div><u>连接到:157.255.173.201成功！</u></div><div><u>邮件[jobsimi@qq.com]发送成功！</u></div>'
  //   ]
  // }
  context.response.headers = {
    "content-type": "applicatiion/json",
  };
  // log("response.data", typeof response.data);
  if (typeof response.data === "string") {
    context.response.body = {
      success: false,
      message: "提交失败",
    };
    return;
  }
  if (response.data.data[0].match("请输入正确验证码")) {
    context.response.body = {
      success: false,
      message: "请输入正确验证码",
    };
    return;
  }
  if (response.data.data[0].match("发送成功")) {
    context.response.body = {
      success: true,
      message: "提交成功",
    };
    return;
  }
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
  log("response.headers", response.headers);
  log("response.data", response.data);
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
