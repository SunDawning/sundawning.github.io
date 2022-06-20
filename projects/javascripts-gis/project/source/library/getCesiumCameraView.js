if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 得到相机的视角，使用camera.setView
 * @param {Cesium.Camera} camera
 * @returns object
 */
SunDawningGIS.getCesiumCameraView = function (camera) {
  return {
    destination: camera.position,
    orientation: {
      heading: camera.heading,
      pitch: camera.pitch,
      roll: camera.roll,
    },
  };
};
