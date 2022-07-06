2022-07-06 22:53:06

Modify 3Dtile vertex shader
https://community.cesium.com/t/modify-3dtile-vertex-shader/18137/5

```js
var viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false,
  selectionIndicator: false,
});
var scene = viewer.scene;
var customShader = new Cesium.CustomShader({
  vertexShaderText: `
void vertexMain(VertexInput vsInput, inout czm_modelVertexOutput vsOutput){
  vsOutput.positionMC.y = 0.1 * vsInput.attributes.positionMC.y;
}
`,
});
var tileset = viewer.scene.primitives.add(
  new Cesium.Cesium3DTileset({
    url: "https://data.mars3d.cn/3dtiles/qx-teh/tileset.json",
    customShader: customShader,
    enableModelExperimental: true,
    debugShowBoundingVolume: true,
  })
);
console.log("tileset", tileset);
viewer.zoomTo(tileset);
```
