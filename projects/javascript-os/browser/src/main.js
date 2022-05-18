import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

/**
 * 路由
 */
import { createRouter, createWebHistory } from "vue-router";
app.use(
  createRouter({
    history: createWebHistory(), // 指定路由的模式
    routes: [
      {
        path: "/",
        component: { template: "<div>首页</div>" }, // runtime-core.esm-bundler.js:38 [Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".
      },
    ],
  })
);

app.mount("#app");
