const axios = require("axios");
const fs = require("fs");
const API_KEY = JSON.parse(fs.readFileSync("API_KEY.json")).token;
// console.log("API_KEY", API_KEY);
// get_api_key();
async function get_api_key() {
  const response = await axios({
    method: "GET",
    url: "/api_keys/ak_29L5yWTwnh8aXVxj4GN7yoetl5F",
    baseURL: "https://api.ngrok.com",
    headers: {
      "ngrok-version": 2,
      authorization: `Bearer ${API_KEY}`,
    },
  });
  console.log(response.data);
}
// get_api_keys();
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
  console.log(response.data);
}
index();
async function index() {
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
