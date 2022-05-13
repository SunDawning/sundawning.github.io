<template>
  <a-layout>
    <a-layout-header>
      <a-auto-complete
        :options="state.options"
        @search="updateAutoCompleteOptions"
        @select="onSearch"
      >
        <a-input-search
          placeholder="搜索所有书签"
          enter-button
          @search="onSearch"
          allowClear
        />
      </a-auto-complete>
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
import { select, insert } from "../modules/autocomplete";
import { onMounted } from "vue";
const state = reactive({
  search: {},
  options: [],
});
defineProps({
  displaySearch: Boolean,
  displayWelcome: Boolean,
  displayEdit: Boolean,
  displayRecent: Boolean,
});
const emit = defineEmits();
onMounted(function () {
  // 更新自动补全列表
  updateAutoCompleteOptions("");
});
function onSearch(value, event) {
  console.log("value", value, JSON.stringify(value));
  // 不搜索空白的内容
  if (value === undefined) {
    return;
  }
  if (value === "") {
    return;
  }
  // 显示搜索的列表
  emit("displaySearch", true);
  // 开始搜索
  state.search = { what: value, count: 20 };
  setTimeout(function () {
    // 取消搜索框焦点
    const input = document.querySelector(".ant-layout-header input");
    if (input === null) {
      return;
    }
    input.blur();
    // 保存关键词
    insert(value);
  }, 0);
  // 取消菜单栏的选择
  emit("selectedKeys", [""]);
}
/**
 * 更新自动补全列表
 */
function updateAutoCompleteOptions(value) {
  const database = select();
  state.options = database
    .filter(function (option) {
      return option.startsWith(value);
    })
    .map(function (option) {
      return { value: option };
    });
  // console.log("state.options", state.options);
}
</script>
<style scoped>
.ant-layout-header {
  display: flex;
  align-items: center;
}
.ant-layout-header .ant-select-auto-complete {
  width: 100%;
}
.ant-layout-content {
  padding: 8px;
}
.ant-layout-footer {
  text-align: center;
}
</style>
