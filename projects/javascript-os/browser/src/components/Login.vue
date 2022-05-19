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
const form = reactive({
  password: "",
});
function finish(values) {
  console.log("finish", values);
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
