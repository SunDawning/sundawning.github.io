<script setup>
  import Map from "./components/Map.vue";
  import Content from "./components/Content.vue";
</script>

<template>
  <div class="main">
    <Map></Map>
    <Content></Content>
  </div>
</template>

<style>
  .main{
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
  }
  body{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
  }
  html{
    line-height: 1.15;
  }
</style>
