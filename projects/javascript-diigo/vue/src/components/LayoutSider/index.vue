<template>
  <a-layout>
    <Sider
      class="sider"
      @displayWelcome="displayWelcome"
      @displayEdit="displayEdit"
      @displayRecent="displayRecent"
      @login="login"
    ></Sider>
    <Content
      class="content"
      :displayWelcome="state.displayWelcome"
      :displayEdit="state.displayEdit"
      :displayRecent="state.displayRecent"
    ></Content>
  </a-layout>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({
  displayWelcome: true,
  displayEdit: false,
  displayRecent: false,
});
function displayWelcome(value) {
  state.displayWelcome = value;
}
function displayEdit(value) {
  state.displayEdit = value;
}
function displayRecent(value) {
  state.displayRecent = value;
}
const emit = defineEmits();
function login(value) {
  emit("login", value);
}
</script>
<style scoped>
.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
.sider {
  overflow: auto;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
.content {
  margin-left: 104px;
}
</style>
