<script setup>
  import{ref,onMounted}from"vue";
  import{Viewer}from"cesium";
  function init(container){
      let viewer=new Viewer(container);
  }
  onMounted(function(){
      init(document.querySelector("#container"));
  });
</script>

<template>
  <div id="container"></div>
</template>

<style>
  #container{
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;      
  }
</style>
