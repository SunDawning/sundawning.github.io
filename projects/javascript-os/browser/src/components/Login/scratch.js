const axios = require("axios");
index();
async function index() {
  const serverList = await getServerList();
  console.log("serverList", serverList);
  const response = await axios({
    method: "POST",
    url: "/api/javascript-os/login",
    baseURL: "https://b898-183-240-6-199.ngrok.io",
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
  const urls = [
    "https://raw.githubusercontent.com/SunDawning/javascript-ngrok-server-list/main/server.json",
    "https://bitbucket.org/SunDawning/javascript-ngrok-server-list/raw/main/server.json",
  ];
  const total = urls.length;
  for (let c = 0; c < total; c = c + 1) {
    try {
      const response = await axios({
        method: "GET",
        url: "https://raw.githubusercontent.com/SunDawning/javascript-ngrok-server-list/main/server.json",
      });
      return response.data;
    } catch (error) {
      continue;
    }
  }
  return;
}
