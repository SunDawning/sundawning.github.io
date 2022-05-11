<template>
  <a-layout>
    <a-layout-header>
      <a-input-search
        placeholder="搜索所有书签"
        enter-button
        @search="onSearch"
        allowClear
      />
    </a-layout-header>
    <a-layout-content>
      <Search v-if="displaySearch" :search="state.search"></Search>
      <Welcome v-else-if="displayWelcome"></Welcome>
      <Edit v-else-if="displayEdit"></Edit>
      <Recent v-else-if="displayRecent"></Recent>
    </a-layout-content>
    <a-layout-footer>
      Copyright © 2022 SunDawning
      <a href="mailto:jobsimi@qq.com">jobsimi@qq.com</a>, All Rights Reserved
    </a-layout-footer>
  </a-layout>
</template>
<script setup>
import { reactive } from "vue";
const state = reactive({
  search: {},
});
defineProps({
  displaySearch: Boolean,
  displayWelcome: Boolean,
  displayEdit: Boolean,
  displayRecent: Boolean,
});
const emit = defineEmits();
function onSearch(value, event) {
  console.log("value", value);
  // 不搜索空白的内容
  if (value === "") {
    return;
  }
  // 显示搜索的列表
  emit("displaySearch", true);
  // 开始搜索
  state.search = { what: value, count: 20 };
  // 取消搜索框焦点
  setTimeout(function () {
    const input = document.querySelector(".ant-layout-header input");
    if (input === null) {
      return;
    }
    input.blur();
  }, 0);
}
</script>
<style scoped>
.ant-layout-header {
  display: flex;
  align-items: center;
}
.ant-layout-content {
  padding: 8px;
}
.ant-layout-footer {
  text-align: center;
}
</style>
