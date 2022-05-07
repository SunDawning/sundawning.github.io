<template>
  <a-layout>
    <Sider
      class="sider"
      @displayRecent="displayRecent"
      @login="login"
      @displayEdit="displayEdit"
    ></Sider>
    <Content
      class="content"
      :displayRecent="state.displayRecent"
      :displayEdit="state.displayEdit"
    ></Content>
  </a-layout>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({
  displayRecent: false,
  displayEdit: false,
});
function displayRecent(value) {
  state.displayRecent = value;
}
function displayEdit(value) {
  state.displayEdit = value;
}
const emit = defineEmits(["login"]);
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
