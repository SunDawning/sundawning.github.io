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
import axios from "axios";
const form = reactive({
  password: "",
});
async function finish({ values }) {
  console.log("finish", values);
  const { password } = values;
  localStorage.setItem("javascript-os-password", password);
  // https://open.dingtalk.com/document/resourcedownload/http-intranet-penetration
  const response = await axios({
    method: "POST",
    url: "http://abc.vaiwan.cn/api/javascript-os-password/login",
    data: {
      time: new Date().getTime(),
      password: password,
    },
  });
  const { data } = response;
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
