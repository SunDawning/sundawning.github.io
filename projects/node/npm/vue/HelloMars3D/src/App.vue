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
.main {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
