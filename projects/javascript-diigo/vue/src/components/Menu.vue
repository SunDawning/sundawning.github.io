<template>
  <a-menu theme="dark" mode="inline" @select="select">
    <div class="logo">
      <a-menu-item key="Logo"></a-menu-item>
    </div>
    <a-menu-item key="新建书签">
      <span>新建书签</span>
    </a-menu-item>
    <a-menu-item key="最近书签">
      <span>最近书签</span>
    </a-menu-item>
    <a-menu-item key="退出登录">
      <span>退出登录</span>
    </a-menu-item>
  </a-menu>
</template>
<script setup>
import { drop } from "../modules/auth";
const emit = defineEmits();
function select({ item, key, selectedKeys }) {
  // console.log("{ item, key, selectedKeys }", { item, key, selectedKeys });
  emit("displayWelcome", false);
  emit("displayEdit", false);
  emit("displayRecent", false);
  if (key === "Logo") {
    emit("displayWelcome", true);
    return;
  }
  if (key === "新建书签") {
    emit("displayEdit", true);
    return;
  }
  if (key === "最近书签") {
    emit("displayRecent", true);
    return;
  }
  if (key === "退出登录") {
    drop();
    emit("login", false);
    return;
  }
}
</script>
<style scoped>
.logo {
  height: 64px;
  background-color: white;
  background-image: url(../assets/logo.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}
.logo >>> li {
  height: 100%;
  margin: 0;
  background-color: #ffffff00 !important;
}
</style>
