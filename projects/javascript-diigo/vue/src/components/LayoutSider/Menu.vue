<template>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
    <a-menu-item key="1">
      <pie-chart-outlined />
      <span>新建书签</span>
    </a-menu-item>
    <a-menu-item key="2">
      <pie-chart-outlined />
      <span>最近书签</span>
    </a-menu-item>
  </a-menu>
</template>
