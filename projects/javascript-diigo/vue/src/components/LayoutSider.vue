<template>
  <a-layout>
    <Sider
      class="sider"
      @displaySearch="displaySearch"
      :selectedKeys="state.selectedKeys"
      @displayWelcome="displayWelcome"
      @displayEdit="displayEdit"
      @displayRecent="displayRecent"
      @displayFeedback="displayFeedback"
      @displayBlogMode="displayBlogMode"
      @login="login"
    ></Sider>
    <Content
      class="content"
      @displaySearch="displaySearch"
      :displaySearch="state.displaySearch"
      @selectedKeys="selectedKeys"
      :displayWelcome="state.displayWelcome"
      :displayEdit="state.displayEdit"
      :displayRecent="state.displayRecent"
      :displayFeedback="state.displayFeedback"
      :displayBlogMode="state.displayBlogMode"
    ></Content>
  </a-layout>
</template>
<script setup>
import { reactive } from "vue";
import Sider from "./Sider.vue";
import Content from "./Content.vue";
const state = reactive({
  displaySearch: false,
  selectedKeys: [""],
  displayWelcome: true,
  displayEdit: false,
  displayRecent: false,
  displayFeedback: false,
  displayBlogMode: false,
});
function displaySearch(value) {
  state.displaySearch = value;
}
function selectedKeys(value) {
  state.selectedKeys = value;
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
function displayFeedback(value) {
  state.displayFeedback = value;
}
function displayBlogMode(value) {
  state.displayBlogMode = value;
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
  position: fixed;
  left: 0;
  bottom: 16px;
  display: flex;
  z-index: 2;
  background: none;
  width: 100%;
  height: 48px;
  justify-content: center;
}
.content {
  margin-bottom: 80px;
}
</style>
