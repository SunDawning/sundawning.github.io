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
import { useRouter, useRoute } from "vue-router";
const form = reactive({
  password: "",
});
const router = useRouter();
const route = useRoute();
async function finish(values) {
  console.log("finish", values);
  const { password } = values;
  localStorage.setItem("javascript-os-password", password);
  console.log("router", router);
  console.log("route", route);
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
