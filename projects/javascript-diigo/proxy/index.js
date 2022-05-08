const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const axios = require("axios");
app.use(cors()); // CORS
app.use(async function (context) {
  const { method, url, headers, params } = context.request;
  // console.log("context.request", context.request);
  console.log(`[${new Date().toLocaleString()}] ${method} ${url}`);
  let realURL = url.substring(1);
  console.log("realURL", realURL);
  if (headers) {
    ["referer", "host", "origin"].forEach(function (key) {
      delete headers[key];
    });
    ["Cookie"].forEach(function (key) {
      key = key.toLowerCase();
      if (headers[`_${key}`] === undefined) {
        return;
      }
      headers[key] = headers[`_${key}`];
      delete headers[`_${key}`];
    });
  }
  const diigo_response = await axios({
    url: realURL,
    method,
    params,
    headers: headers,
  });
  context.response.body = diigo_response.data;
  context.response.type = diigo_response.headers["content-type"];
});
app.listen(3001);
