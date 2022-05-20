<template>
  <router-view></router-view>
</template>
<script>
document.title = "系统";
import favicon from "/favicon.ico";
import setFavicon from "browser/src/modules/setFavicon";
setFavicon(favicon);
</script>
