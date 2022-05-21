import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

/**
 * 路由
 */
import { createRouter, createWebHistory } from "vue-router";
const routes = [];
import HomeFaviconIcon from "../public/favicon.ico";
import DiigoFaviconIcon from "./applications/Diigo/vue/public/favicon.ico";
[
  {
    path: "/login",
    component: "./components/Login.vue",
    meta: {
      title: "登录",
      icon: "https://g.csdnimg.cn/static/logo/favicon.ico",
    },
  },
  {
    path: "/Diigo",
    component: "./applications/Diigo/vue/src/App.vue",
    meta: {
      title: "Diigo",
      icon: DiigoFaviconIcon,
    },
  },
].forEach(function (options) {
  const { component } = options;
  if (component) {
    options.component = function () {
      return import(component);
    };
  }
  routes.push(options);
});
routes.push({
  path: "/",
  component: { template: "<div>首页</div>" }, // runtime-core.esm-bundler.js:38 [Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".
  meta: { title: "系统", icon: HomeFaviconIcon },
});
const router = createRouter({
  history: createWebHistory(), // 指定路由的模式
  routes,
});
import { select as getLoginToken } from "browser/src/modules/login";
router.beforeEach(function (to, from, next) {
  console.log("访问", to.fullPath, to);
  const { meta } = to;
  if (meta) {
    const { title, icon } = meta;
    if (title) {
      document.title = title;
    }
    if (icon) {
      document.querySelector("link[rel='icon']").href = icon;
    }
  }
  const { fullPath, path } = to;
  // 1. 登录页面不需要登录
  if (path === "/login") {
    return next();
  }
  // 2. 其他页面都要登录
  const token = getLoginToken();
  if (token === null) {
    console.log("没有权限，需要登录");
    return next("/login?redirect=" + encodeURIComponent(fullPath)); // 跳转到登录页面
  }
  next();
});
app.use(router);

app.mount("#app");
