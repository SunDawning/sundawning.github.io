import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

/**
 * 路由
 */
import { createRouter, createWebHashHistory } from "vue-router";
import HomeFaviconIcon from "../public/favicon.ico";
import DiigoFaviconIcon from "./applications/Diigo/vue/public/favicon.ico";
const login_path = "/Login"; // 登录页面的地址
const router = createRouter({
  history: createWebHashHistory(), // 指定路由的模式
  routes: [
    {
      path: "/",
      component: { template: "<div>首页</div>" }, // runtime-core.esm-bundler.js:38 [Vue warn]: Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".
      meta: { title: "系统", icon: HomeFaviconIcon },
    },
    {
      path: login_path,
      component: function () {
        return import("./components/Login/index.vue");
      },
      meta: {
        title: "登录",
        icon: "https://g.csdnimg.cn/static/logo/favicon.ico",
      },
    },
    {
      path: "/Diigo",
      component: function () {
        return import("./applications/Diigo/vue/src/App.vue");
      },
      meta: {
        title: "Diigo",
        icon: DiigoFaviconIcon,
      },
    },
  ],
});
import { select as getLoginToken } from "browser/src/modules/login";
router.beforeEach(function (to, from, next) {
  console.log("访问", to.fullPath, to);
  const { meta } = to;
  const { fullPath, path } = to;
  // 1. 登录页面不需要登录
  if (path === login_path) {
    setPageMeta(meta); // 修改页面标题和图标
    return next();
  }
  // 2. 其他页面都要登录
  const token = getLoginToken();
  if (token === null) {
    console.log("没有权限，需要登录"); // 不需要修改页面标题和图标
    return next(login_path + "?redirect=" + encodeURIComponent(fullPath)); // 跳转到登录页面
  }
  setPageMeta(meta); // 修改页面标题和图标
  next();
});
/**
 * 修改页面标题和图标
 * @param {object} meta
 */
function setPageMeta(meta) {
  if (meta) {
    const { title, icon } = meta;
    if (title) {
      document.title = title;
    }
    if (icon) {
      document.querySelector("link[rel='icon']").href = icon;
    }
  }
}
app.use(router);

app.mount("#app");
