<template>
  <a-form @submit="login">
    <a-form-item label="Cookie" name="cookie">
      <a-textarea auto-size></a-textarea>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit">登录</a-button>
    </a-form-item>
  </a-form>
</template>
<script setup>
import axios from "axios";
const emit = defineEmits(["login"]);
if (localStorage.getItem("diigo_cookie")) {
  login();
}
async function login() {
  const { data } = await axios.get("http://localhost:3001/outliner/list", {
    headers: {
      _cookie: localStorage.getItem("diigo_cookie"),
    },
  });
  const { code } = data;
  if (code === 0) {
    localStorage.removeItem("diigo_cookie");
    return;
  }
  emit("login", true);
}
</script>
<style scoped>
form {
  padding: 64px;
}
</style>
