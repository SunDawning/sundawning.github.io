const axios = require("axios");
index();
async function index() {
  {
    const response = await axios({
      method: "GET",
      url: "https://raw.githubusercontent.com/SunDawning/javascript-ngrok-server-list/main/server.json",
      // https://bitbucket.org/SunDawning/javascript-ngrok-server-list/raw/main/server.json
    });
    console.log("response.data", response.data);
  }
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
