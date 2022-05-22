const axios = require("axios");
index();
async function index() {
  const response = await axios({
    method: "POST",
    url: "/api/javascript-os/login",
    baseURL: "http://sundawning.vaiwan.cn",
    data: {
      password: "123456",
    },
  });
  console.log("response.data", response.data);
}
