<template>
  <a-menu mode="inline" @select="select">
    <Logo menu_item_key="欢迎"></Logo>
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
  // 1. 关闭所有内容：欢迎、新增书签、最近书签等等
  emit("displayWelcome", false);
  emit("displayEdit", false);
  emit("displayRecent", false);
  // 2. 打开相应内容：登录、欢迎、新增书签、最近书签等等
  // 2.1 打开相应内容：登录等等
  if (key === "退出登录") {
    drop();
    emit("login", false);
    return;
  }
  // 2.2 打开相应内容：欢迎、新增书签、最近书签等等
  emit(
    {
      欢迎: "displayWelcome",
      新建书签: "displayEdit",
      最近书签: "displayRecent",
    }[key],
    true
  );
}
</script>
