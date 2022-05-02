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
const emit = defineEmits(["login"]);
function login() {
  emit("login", true);
}
</script>
<style scoped>
form {
  padding: 64px;
}
</style>
