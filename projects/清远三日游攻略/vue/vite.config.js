import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const plugins = [vue()];

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
