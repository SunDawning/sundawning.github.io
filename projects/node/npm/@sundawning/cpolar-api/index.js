const axios = require("axios");
const sleep = require("sleep-promise");
const qs = require("qs");
axios.defaults.baseURL = "https://dashboard.cpolar.com";
module.exports = { untilGetURL, getCookie };
/**
 * 直到获取到网址
 * @param {object} [options]
 * @param {string} options.email cpolar登录时的邮箱。
 * @param {string} options.password cpolar登录时的密码。
 * @param {function} options.filter 过滤函数 function({proto})
 * @param {number} [options.timeout = 60 * 1000] 间隔的时间，单位是毫秒。
 * @returns 筛选的网址，得到符合筛选条件的第一个网址。
 */
async function untilGetURL({
  email,
  password,
  filter = function ({ proto }) {
    return proto === "https";
  },
  timeout = 60 * 1000,
} = {}) {
  let final_url; // 网址
  const cookie = await getCookie({ email, password });
  console.log("cookie", cookie);
  if (cookie === "") {
    console.log("没有获取到有效的cookie");
    return;
  }
  async function getURL() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "/status",
        headers: {
          cookie,
        },
      });
      const matches = data.matchAll(
        /<th scope="row"><a href=".*" target="_blank">(.*)<\/a><\/th>/g
      );
      // [
      //   { public_url: "tcp://2.tcp.vip.cpolar.cn:12158", proto: "tcp" },
      //   { public_url: "http://7634c6a2.r2.vip.cpolar.cn", proto: "http" },
      //   { public_url: "https://7634c6a2.r2.vip.cpolar.cn", proto: "https" },
      // ]
      let tunnels = [];
      for (const match of matches) {
        const url = match[1];
        const { protocol } = new URL(url);
        tunnels.push({
          public_url: url,
          proto: protocol.replace(":", ""),
        });
      }
      if (tunnels.length === 0) {
        return;
      }
      console.log("data", tunnels);
      tunnels = tunnels.filter(filter);
      const { public_url: url } = tunnels[0];
      console.log("url", url);
      final_url = url;
      return url;
    } catch (error) {
      console.log(error.message);
      return;
    }
  }
  // 轮询ngrok的网址
  while ((await getURL()) === undefined) {
    console.log("sleep", new Date());
    await sleep(timeout);
  }
  return final_url;
}
/**
 * POST登录后会302，不能follow redirect，不然cookie无效。
 * @returns string
 */
async function getCookie({ email, password }) {
  let cookie = "";
  try {
    console.log("POST /login，出现302时，不跳转，拿到cookie");
    await axios({
      method: "POST",
      url: "/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify({
        login: email,
        password: password,
      }),
      maxRedirects: 0,
    });
  } catch (error) {
    const { headers } = error.response;
    console.log(headers);
    headers["set-cookie"].forEach(function (item) {
      cookie = cookie + item.split(";")[0];
    });
  }
  return cookie;
}
