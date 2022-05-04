<template>
  <a-menu theme="dark" mode="inline" @select="select">
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
const emit = defineEmits(["displayRecent", "login"]);
function select({ item, key, selectedKeys }) {
  // console.log("{ item, key, selectedKeys }", { item, key, selectedKeys });
  if (key === "退出登录") {
    localStorage.removeItem("diigo_cookie");
    window.location.reload();
    return;
  }
  emit("displayRecent", false);
  if (key === "最近书签") {
    emit("displayRecent", true);
    return;
  }
}
</script>
