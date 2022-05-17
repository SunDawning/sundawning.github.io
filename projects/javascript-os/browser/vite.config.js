import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const fs = require("fs");
const log = require("server/modules/log");
const minimist = require("minimist");
const argv = minimist(minimist(process.argv)["_"]);
const { proxy_port } = argv;

let proxy = {};

log("代理服务器端口", proxy_port);
if (proxy_port) {
  ["/http://", "/https://", "/api"].forEach(function (item) {
    proxy[item] = {
      target: "http://localhost:" + proxy_port,
      changeOrigin: true,
    };
  });
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: proxy,
  },
});
