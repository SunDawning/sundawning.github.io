import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const fs = require("fs");
const log = require("../server/modules/log");

let proxy = {};
const port = JSON.parse(fs.readFileSync("../server/server.json")).port;
log("代理服务器端口", port);
["/http://", "/https://", "/api"].forEach(function (item) {
  proxy[item] = {
    target: "http://localhost:" + port,
    changeOrigin: true,
  };
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: proxy,
  },
});
