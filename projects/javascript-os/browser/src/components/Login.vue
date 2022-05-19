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
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { insert as saveToDatabase } from "browser/src/modules/login";
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
    const response = await axios({
      method: "POST",
      url: "http://sundawning.vaiwan.cn/api/javascript-os/login",
      data: {
        password,
      },
    });
    const { data } = response;
    const { success } = data;
    if (success === false) {
      message.error(data.message);
      return;
    }
  } catch (error) {
    message.error(error.message);
    return;
  }
  saveToDatabase(password);
  console.log("router", router);
  // 重定向页面
  // redirect_to(router);
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
</script>
<style scoped>
form {
  padding: 64px;
}
.ant-form-item {
  text-align: center;
}
</style>
