const VERSION = "0.0.1";
console.log(VERSION);
/**
 * 得到相机的视角，使用camera.setView
 * @param {Cesium.Camera} camera
 * @returns object
 */
function getCesiumCameraView(camera) {
  return {
    destination: camera.position,
    orientation: {
      heading: camera.heading,
      pitch: camera.pitch,
      roll: camera.roll,
    },
  };
}
