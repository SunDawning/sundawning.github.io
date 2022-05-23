const axios = require("axios");
index();
async function index() {
  const serverList = await getServerList();
  console.log("serverList", serverList);
  const response = await axios({
    method: "POST",
    url: "https://b898-183-240-6-199.ngrok.io/api/javascript-os/login",
    data: {
      password: "123456",
    },
  });
  console.log("response.data", response.data);
}
/**
 * 获取在线服务器的列表
 */
async function getServerList() {
  const urls = makeArrayToRandom([
    "https://raw.githubusercontent.com/SunDawning/javascript-ngrok-server-list/main/server.json",
    "https://bitbucket.org/SunDawning/javascript-ngrok-server-list/raw/main/server.json",
  ]);
  const total = urls.length;
  for (let c = 0; c < total; c = c + 1) {
    const url = urls[c];
    console.log("url", url);
    try {
      const response = await axios({
        method: "GET",
        url,
      });
      return response.data;
    } catch (error) {
      continue;
    }
  }
  return;
}
/**
 * 将数组打乱
 * @see https://blog.csdn.net/xm_law/article/details/83691125
 * @param {array} arr
 * @returns array
 */
function makeArrayToRandom(arr) {
  for (var i = 0; i < arr.length; i++) {
    var iRand = parseInt(arr.length * Math.random());
    var temp = arr[i];
    arr[i] = arr[iRand];
    arr[iRand] = temp;
  }
  return arr;
}
