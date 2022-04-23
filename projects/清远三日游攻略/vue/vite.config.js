import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const plugins = [vue()];

/**
 * 复制node_modules包到public
 */
import copy from "rollup-plugin-copy";
plugins.push(
  copy({
    targets: ["mars3d-cesium", "turf", "mars3d", "mars3d-space"].map(function (
      item
    ) {
      return {
        src: `./node_modules/${item}/*`,
        dest: `./public/node_modules/${item}`,
      };
    }),
  })
);

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
  plugins: plugins,
});
