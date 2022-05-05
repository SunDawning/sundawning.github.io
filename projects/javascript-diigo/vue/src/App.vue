<template>
  <LayoutSider v-if="status.login" @login="login"></LayoutSider>
  <Login v-else @login="login"></Login>
</template>

<script setup>
import { reactive } from "vue";
const status = reactive({
  login: false,
});
function login(value) {
  // console.log(value, status.login);
  status.login = value;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>


