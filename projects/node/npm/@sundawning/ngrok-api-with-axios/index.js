const axios = require("axios");
const sleep = require("sleep-promise");
module.exports = { untilGetURL };
/**
 * 直到获取到网址
 * @param {object} [options]
 * @param {string} options.API_KEY ngrok的API_KEY @see https://ngrok.com/docs/api#api-tunnels-list
 * @param {function} options.filter 过滤函数 function({region, proto})
 * @param {number} [options.timeout = 60 * 1000] 间隔的时间，单位是毫秒。
 * @returns 筛选的网址，得到符合筛选条件的第一个网址。
 */
async function untilGetURL({
  API_KEY,
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
        url: "/tunnels",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Ngrok-Version": "2",
        },
        baseURL: "https://api.ngrok.com",
      });
      console.log("data", data);
      let { tunnels } = data;
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
