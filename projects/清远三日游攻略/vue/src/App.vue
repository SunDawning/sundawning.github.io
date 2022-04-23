<template>
  <a-col> <div ref="mapRef"></div></a-col>
</template>
<script setup>
import { ref, onMounted } from "vue";
const mapRef = ref(null);
onMounted(function () {
  init(mapRef.value);
});
</script>
<script>
function init(container) {
  const map = new mars3d.Map(container, {
    scene: {
      center: {
        lat: 22.530534267425537,
        lng: 113.9517791569233,
        alt: 500,
        heading: 0,
        pitch: -90,
      },
      globe: {
        depthTestAgainstTerrain: true,
      },
    },
    terrain: {
      url: "http://data.mars3d.cn/terrain",
      show: true,
    },
    basemaps: [
      {
        name: "高德电子",
        type: "gaode",
        layer: "vec",
        show: true,
      },
    ],
  });
  /**
   * 全球城市白膜(OSM在线)
   * http://mars3d.cn/editor.html?id=layer-tileset/type/osmBuildings
   */
  {
    const tiles3dLayer = new mars3d.layer.OsmBuildingsLayer({
      highlight: {
        type: "click",
        color: "#00FF00",
      },
      popup: "all",
    });
    map.addLayer(tiles3dLayer);
  }
}
</script>
