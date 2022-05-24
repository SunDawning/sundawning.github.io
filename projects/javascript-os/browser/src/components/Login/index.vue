<template>
  <a-form @finish="finish" :model="form">
    <a-form-item label="密码" name="password" :rules="[{ required: true }]">
      <a-textarea
        auto-size
        allowClear
        v-model:value="form.password"
      ></a-textarea>
    </a-form-item>
    <a-form-item>
      <a-space :size="8">
        <a-button type="primary" html-type="submit">登录</a-button>
        <a-button type="primary" @click="anonymous">游客登录</a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import {
  insert as saveToDatabase,
  drop as deleteFromDatabase,
} from "browser/src/modules/login";
import axios from "browser/src/modules/axios";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
const form = reactive({
  password: "",
});
const router = useRouter();
async function finish(values) {
  console.log("finish", values);
  const { password } = values;
  try {
    const response = await login({ password });
    const { data } = response;
    const { success } = data;
    if (success === false) {
      message.error(data.message);
      deleteFromDatabase();
      return;
    }
  } catch (error) {
    message.error(error.message);
    return;
  }
  saveToDatabase(password);
  console.log("router", router);
  // 重定向页面
  redirect_to(router);
}
/**
 * 游客登录
 */
function anonymous() {
  saveToDatabase("anonymous");
  redirect_to(router);
}
</script>
<script>
/**
 * 重定向页面
 * @param router 路由
 */
function redirect_to(router) {
  const route = router.currentRoute.value;
  let { redirect } = route.query;
  if (redirect === undefined) {
    redirect = "/";
  } else {
    redirect = decodeURIComponent(redirect);
  }
  console.log("重定向到", redirect);
  router.push(redirect);
}
/**
 * 将密码发送到授权服务器，如果登录成功则返回数据，否则抛出错误
 * @param {number} options.password
 * @returns
 */
async function login({ password }) {
  const serverList = await getServerList();
  console.log("serverList", serverList);
  if (serverList === undefined) {
    throw { message: "无法获取授权服务器列表" };
  }
  const baseURLs = makeArrayToRandom(serverList);
  const total = baseURLs.length;
  for (let c = 0; c < total; c = c + 1) {
    const baseURL = baseURLs[c];
    console.log("baseURL", baseURL);
    try {
      const response = await axios({
        method: "POST",
        url: `${baseURL}/api/javascript-os/login`,
        data: { password },
      });
      return response;
    } catch (error) {
      continue;
    }
  }
  throw { message: "授权服务器无法连接" };
}
/**
 * 获取在线服务器的列表
 */
async function getServerList() {
  const urls = makeArrayToRandom([
    "https://raw.githubusercontent.com/SunDawning/javascript-ngrok-server-list/main/server.json",
    "https://bitbucket.org/SunDawning/javascript-ngrok-server-list/raw/main/server.json",
  ]);
  const total = urls.length;
  for (let c = 0; c < total; c = c + 1) {
    const url = urls[c];
    console.log("url", url);
    try {
      const response = await axios({
        method: "GET",
        url,
      });
      return response.data;
    } catch (error) {
      continue;
    }
  }
  return;
}
/**
 * 将数组打乱
 * @see https://blog.csdn.net/xm_law/article/details/83691125
 * @param {array} arr
 * @returns array
 */
function makeArrayToRandom(arr) {
  for (var i = 0; i < arr.length; i++) {
    var iRand = parseInt(arr.length * Math.random());
    var temp = arr[i];
    arr[i] = arr[iRand];
    arr[iRand] = temp;
  }
  return arr;
}
</script>
<style scoped>
form {
  padding: 64px;
}
.ant-form-item {
  text-align: center;
}
</style>
