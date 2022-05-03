import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

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

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: plugins,
  server: {
    proxy: {
      "/diigo-api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: function (path) {
          return path.replace(/^\/diigo-api/, "");
        },
      },
    },
  },
});
