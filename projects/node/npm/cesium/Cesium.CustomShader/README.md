2022-07-08 10:02:30

# 资料

## CustomShader Documentation

https://github.com/CesiumGS/cesium/tree/main/Documentation/CustomShaderGuide

## shader 之 cesium 内置变量、常量、函数

https://www.cnblogs.com/s313139232/p/14317366.html

## Cesium 矩阵变换实现本地坐标转世界坐标

https://blog.csdn.net/wml00000/article/details/125290386

```js
// 获取A点对应的世界坐标
let posA = Cesium.Cartesian3.fromDegrees(0, 0.0, 0.0);
console.log("A点世界坐标:", posA);
// 本地坐标到世界坐标的变换矩阵
let localToWorldMatrix = Cesium.Transforms.eastNorthUpToFixedFrame(posA);
// 通过矩阵的逆，求出世界坐标到本地坐标的变换矩阵
let worldToLocalMatrix = Cesium.Matrix4.inverse(
  localToWorldMatrix,
  new Cesium.Matrix4()
);

// 将B点世界坐标转换到A点本地坐标系下的坐标
let posB = Cesium.Cartesian3.fromDegrees(2, 1.0, 0.0);
console.log("B点世界坐标:", posB);
let localPosB = Cesium.Matrix4.multiplyByPoint(
  worldToLocalMatrix,
  posB,
  new Cesium.Cartesian3()
);
console.log("B点本地坐标（以A为原点的本地坐标系）:", localPosB);

// 将B点本地坐标（A为原点的本地坐标系）转世界坐标
let worldPointB = Cesium.Matrix4.multiplyByPoint(
  localToWorldMatrix,
  localPosB,
  new Cesium.Cartesian3()
);
console.log("B点世界坐标:", worldPointB);
console.log(
  "B点世界坐标（经纬度格式）:",
  Cesium.Cartographic.fromCartesian(worldPointB)
);
```
