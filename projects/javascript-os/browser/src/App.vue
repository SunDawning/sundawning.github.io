<template>
  <a-layout>
    <a-layout-header>
      <a-row :style="{ height: '100%', alignItems: 'center' }">
        <a-button><a href="/">首页</a></a-button>
      </a-row>
    </a-layout-header>
    <a-layout-content>
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
<script>
document.title = "系统";
import favicon from "/favicon.ico";
import setFavicon from "browser/src/modules/setFavicon";
setFavicon(favicon);
</script>
