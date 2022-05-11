<template>
  <a-layout>
    <Sider
      class="sider"
      @displaySearch="displaySearch"
      @displayWelcome="displayWelcome"
      @displayEdit="displayEdit"
      @displayRecent="displayRecent"
      @login="login"
    ></Sider>
    <Content
      class="content"
      @displaySearch="displaySearch"
      :displaySearch="state.displaySearch"
      :displayWelcome="state.displayWelcome"
      :displayEdit="state.displayEdit"
      :displayRecent="state.displayRecent"
    ></Content>
  </a-layout>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({
  displaySearch: false,
  displayWelcome: true,
  displayEdit: false,
  displayRecent: false,
});
function displaySearch(value) {
  state.displaySearch = value;
}
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
