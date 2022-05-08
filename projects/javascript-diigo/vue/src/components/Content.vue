<template>
  <a-layout>
    <a-layout-header style="background: #fff; padding: 0" />
    <a-layout-content style="margin: 0 16px">
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
</script>
<style scoped>
.ant-layout-footer {
  text-align: center;
}
</style>
