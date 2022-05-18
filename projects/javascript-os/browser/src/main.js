import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

/**
 * 路由
 */
import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(), // 指定路由的模式
  routes: [
    {
      path: "/",
      component: { template: "<div>首页</div>" }, // runtime-core.esm-bundler.js:38 [Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".
    },
    {
      path: "/login",
      component: function () {
        return import("./components/Login.vue");
      },
    },
  ],
});
router.beforeEach(function (to, from, next) {
  console.log("访问", to.fullPath);
  const { fullPath } = to;
  // 1. 登录页面不需要登录
  if (fullPath === "/login") {
    return next();
  }
  // 2. 其他页面都要登录
  const token = localStorage.getItem("token");
  if (token === null) {
    console.log("没有权限，需要登录");
    return next("/login"); // 跳转到登录页面
  }
  next();
});
app.use(router);

app.mount("#app");
