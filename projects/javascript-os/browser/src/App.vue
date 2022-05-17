<template>
  <div v-if="state.login">程序</div>
  <div v-else>登录页面</div>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({
  login: false,
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
