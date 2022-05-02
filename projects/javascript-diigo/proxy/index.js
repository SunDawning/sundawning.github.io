const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const axios = require("axios");
/**
 * 格式化输出时间
 * 形如：hour:minute:second
 */
function formatTime(timestamp) {
  let date;
  if (timestamp) {
    date = new Date(timestamp);
  } else {
    date = new Date();
  }
  let year = date.getFullYear();
  let month = double(date.getMonth());
  let day = double(date.getDay());
  let hour = double(date.getHours());
  let minute = double(date.getMinutes());
  let second = double(date.getSeconds());
  let timezone = formatTimeZone(date);
  return `[${year}-${month}-${day} ${hour}:${minute}:${second} ${timezone}]`;
}
/**
 * 个位数变以零开头的两位数
 * js中格式化时间一位数变成两位数_minton-CSDN博客: https://blog.csdn.net/u013103102/article/details/53636097
 */
function double(number) {
  return (Array(2).join(0) + number).slice(-2);
}
/**
 * 得到格式化的时区
 * 形如：UTC+08:00
 * JavaScript getTimezoneOffset() 方法: https://www.w3school.com.cn/jsref/jsref_getTimezoneOffset.asp
 */
function formatTimeZone(date) {
  let timezoneOffset = date.getTimezoneOffset();
  let absTimezoneOffset = Math.abs(timezoneOffset);
  let hour = double(Math.floor(absTimezoneOffset / 60));
  let minute = double(absTimezoneOffset - hour * 60);
  if (timezoneOffset > 0) {
    return `UTC-${hour}:${minute}`;
  } else if ((timezoneOffset = 0)) {
    return "UTC+00:00";
  } else {
    return `UTC+${hour}:${minute}`;
  }
}
app.use(cors()); // CORS
app.use(async function (context) {
  const { method, url, headers, params } = context.request;
  const { _cookie } = headers;
  console.log(`${formatTime()} ${method} ${url}`);
  //   console.log(context);
  if (url.startsWith("/interact_api/load_user_items")) {
    const { data, headers } = await axios.get(`https://www.diigo.com` + url, {
      params: {
        sort: "updated",
      },
      headers: {
        "X-Requested-With": "X-Requested-With",
        cookie: _cookie,
      },
    });
    context.response.body = data;
    context.response.type = headers["content-type"];
    return;
  }
  context.response.body = "hello";
});
app.listen(3001);
