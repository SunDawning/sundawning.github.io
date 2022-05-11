<template>
  <a-layout>
    <a-layout-header>
      <a-input-search
        placeholder="搜索所有书签"
        enter-button
        @search="onSearch"
      />
    </a-layout-header>
    <a-layout-content>
      <Welcome v-if="displayWelcome"></Welcome>
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
defineProps({
  displayWelcome: Boolean,
  displayEdit: Boolean,
  displayRecent: Boolean,
});
function onSearch(value, event) {
  console.log("value", value);
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
