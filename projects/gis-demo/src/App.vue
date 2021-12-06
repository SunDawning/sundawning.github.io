<script setup>
  import{ref,onMounted}from"vue";
  import * as Cesium from"cesium";
  function init(container){
      // 深圳市房屋统一编码地址 http://61.144.226.124:10000/AddressWeb/#/
      let viewer=new Cesium.Viewer(container,{
	  baseLayerPicker:false,
	  homeButton:false,
	  sceneModePicker:false,
	  geocoder:false,
      });
      // 在SCENE3D模式下获取
      viewer.camera.setView({destination:{x: -2403336.9226434263, y: 5382248.523583019, z: 2429527.748840435}});
      viewer.imageryLayers.removeAll();
      viewer.scene.mode=Cesium.SceneMode.SCENE2D;
      // https://sandcastle.cesium.com/index.html?src=Cartographic%20Limit%20Rectangle.html
      viewer.scene.globe.cartographicLimitRectangle=Cesium.Rectangle.fromDegrees(113.698237, 22.459566, 114.693814, 23.267567);
      [
          // 街道图
	  "http://61.144.226.123:10000/geoserver/gwc/service/tms/1.0.0/shenzhen%3Ashenzhenwgb@EPSG%3A4326@png/{z}/{x}/{reverseY}.png",
        "./assets/61.144.226.123@10000/geoserver/gwc/service/tms/1.0.0/shenzhen@3A@shenzhenwgb@EPSG@3A@4326@png/",
        // 房屋图
	  "http://61.144.226.123:10000/geoserver/gwc/service/tms/1.0.0/shenzhen%3AWgbLoudongExt@EPSG%3A4326@png/{z}/{x}/{reverseY}.png"
      ].forEach(function(url){
        viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
          url:url,
          minimumLevel:9,
          maximumLevel:18,
          tilingScheme:new Cesium.GeographicTilingScheme(),
          rectangle:Cesium.Rectangle.fromDegrees(113.698237, 22.459566, 114.693814, 23.267567)
        }));
      });
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
