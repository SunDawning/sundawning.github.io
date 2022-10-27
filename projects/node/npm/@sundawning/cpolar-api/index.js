const axios = require("axios");
const sleep = require("sleep-promise");
module.exports = { untilGetURL };
/**
 * 直到获取到网址
 * @param {object} [options]
 * @param {string} options.session cpolar的session，登录后会在cookie里得到。
 * @param {function} options.filter 过滤函数 function({proto})
 * @param {number} [options.timeout = 60 * 1000] 间隔的时间，单位是毫秒。
 * @returns 筛选的网址，得到符合筛选条件的第一个网址。
 */
async function untilGetURL({
  session,
  filter = function ({ proto }) {
    return proto === "https";
  },
  timeout = 60 * 1000,
} = {}) {
  let final_url;
  async function getURL() {
    try {
      const { data } = await axios({
        method: "GET",
        url: "https://dashboard.cpolar.com/status",
        headers: {
          cookie: `session=${session}`,
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
