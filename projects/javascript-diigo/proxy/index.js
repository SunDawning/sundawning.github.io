const Koa = require("koa");
const app = new Koa();
const cors = require("@koa/cors");
const axios = require("axios");
app.use(cors()); // CORS
app.use(async function (context) {
  const { method, url, headers, params } = context.request;
  // console.log("context.request", context.request);
  console.log(`[${new Date().toLocaleString()}] ${method} ${url}`);
  if (url.startsWith("/https://www.diigo.com")) {
    delete headers.referer;
    delete headers.host;
    headers.cookie = headers["_cookie"];
    delete headers["_cookie"];
    const diigo_response = await axios({
      url: url.substring(1),
      method,
      params,
      headers: headers,
    });
    context.response.body = diigo_response.data;
    context.response.type = diigo_response.headers["content-type"];
    return;
  }
  constext.response.body = "hello";
});
app.listen(3001);
