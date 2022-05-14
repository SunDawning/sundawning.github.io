<template>
  <a-menu mode="horizontal" @select="select" :selectedKeys="selectedKeys">
    <Logo menu_item_key="欢迎"></Logo>
    <a-menu-item key="新建书签">
      <span>新建书签</span>
    </a-menu-item>
    <a-menu-item key="最近书签">
      <span>最近书签</span>
    </a-menu-item>
    <a-sub-menu>
      <template #title>更多</template>
      <a-menu-item key="Public">
        <span>Public</span>
      </a-menu-item>
      <a-menu-item key="检查版本">
        <span>检查版本</span>
      </a-menu-item>
      <a-menu-item key="退出登录">
        <span>退出登录</span>
      </a-menu-item>
    </a-sub-menu>
  </a-menu>
</template>
<script setup>
import { drop } from "../modules/auth";
import { getUserName } from "../modules/auth";
import axios from "../modules/axios";
import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
defineProps({
  selectedKeys: Array,
});
const emit = defineEmits();
async function select({ item, key, selectedKeys }) {
  // console.log("{ item, key, selectedKeys }", { item, key, selectedKeys });
  // 链接跳转：打开Public Library
  if (key === "Public") {
    const username = getUserName();
    if (username === undefined) {
      return;
    }
    return window.open(`https://www.diigo.com/profile/${username}`);
  }
  if (key === "检查版本") {
    try {
      const response = await axios({
        method: "GET",
        url: "/api/check-new-version",
      });
      console.log("response", response);
      const { data } = response;
      message.success(data.message);
    } catch (error) {
      console.error(error);
      message.error(error.message);
    }
    return;
  }
  // 1. 关闭所有内容：欢迎、新增书签、最近书签等等
  ["displaySearch", "displayWelcome", "displayEdit", "displayRecent"].forEach(
    function (item) {
      emit(item, false);
    }
  );
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
