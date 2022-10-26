const ngrok = require("./index");
ngrok.untilGetURL({
  API_KEY: "YOUT_API_KEY",
  filter: function ({ region, proto }) {
    return region === "jp" && proto === "https";
  },
  timeout: 10 * 1000,
});
