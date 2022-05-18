const axios = require("axios");

async function get_api_keys() {
  const response = await axios({
    method: "GET",
    url: "/api_keys",
    baseURL: "https://api.ngrok.com",
    headers: {
      "ngrok-version": 2,
      authorization: `Bearer ${API_KEY}`,
    },
  });
}
index();
async function index() {
  const API_KEY = "29L5yWTwnh8aXVxj4";
  try {
    const response = await axios({
      method: "GET",
      url: "/tunnels",
      baseURL: "https://api.ngrok.com",
      headers: {
        "ngrok-version": 2,
        authorization: `Bearer ${API_KEY}`,
      },
    });
    console.log("response.data", response.data);
  } catch (error) {
    console.log("error", error);
  }
}
