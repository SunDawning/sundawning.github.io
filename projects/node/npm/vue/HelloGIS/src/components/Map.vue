<script setup>
  import{onMounted}from"vue";
  import * as Cesium from"cesium";
  window.Cesium=Cesium;
  function init(container){
      // 深圳市房屋统一编码地址 http://61.144.226.124:10000/AddressWeb/#/
      // Cesium隐藏控件_MZ_的博客-CSDN博客: https://blog.csdn.net/shijie_nihao/article/details/100065997
      let viewer=new Cesium.Viewer(container,{
          baseLayerPicker:false,
          homeButton:false,
          sceneModePicker:false,
          geocoder:false,
          timeline:false,
          fullscreenButton:false,
          animation:false,
          navigationHelpButton:false,
      });
      // 版权控件的显示隐藏
      viewer._cesiumWidget._creditContainer.style.display="none";
      // 点击获取经纬度
      let handler=new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
      handler.setInputAction(function(event){
	  let cartesian=viewer.camera.pickEllipsoid(event.position,viewer.scene.globe.ellipsoid);
	  let cartographic=Cesium.Cartographic.fromCartesian(cartesian);
	  let longitude=Cesium.Math.toDegrees(cartographic.longitude);
	  let latitude=Cesium.Math.toDegrees(cartographic.latitude);
	  let height=viewer.camera.positionCartographic.height;
	  let position=[longitude,latitude,height];
	  console.log("点击获取经纬度",position);
      },Cesium.ScreenSpaceEventType.LEFT_CLICK);
      viewer.camera.setView({destination:Cesium.Cartesian3.fromDegrees(113.9517791569233,22.530534267425537,500)});
      viewer.imageryLayers.removeAll();
      viewer.scene.mode=Cesium.SceneMode.SCENE2D;
      // https://sandcastle.cesium.com/index.html?src=Cartographic%20Limit%20Rectangle.html
      viewer.scene.globe.cartographicLimitRectangle=Cesium.Rectangle.fromDegrees(113.698237, 22.459566, 114.693814, 23.267567);
      [
          // 街道图
          "http://61.144.226.123:10000/geoserver/gwc/service/tms/1.0.0/shenzhen%3Ashenzhenwgb@EPSG%3A4326@png/{z}/{x}/{reverseY}.png",
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
      init(document.querySelector("#map"));
  });
</script>

<template>
  <div class="map" id="map"></div>
</template>

<style>
  #map{
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
  }
</style>
