import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

/**
 * 插件
 */
let plugins = [vue()];

/**
 * ant-design-vue
 */
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
plugins.push(
  Components({
    resolvers: [AntDesignVueResolver()],
  })
);

/**
 * 代理
 * 应对接口跨域
 */
let server = { proxy: {} };
let { proxy } = server;
/**
 * Diigo网站所提供的接口
 */
proxy["/https://www.diigo.com"] = {
  target: "http://localhost:3001",
  changeOrigin: true,
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: plugins,
  server: server,
});
