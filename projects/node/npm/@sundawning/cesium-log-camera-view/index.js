if (Cesium.SunDawning === undefined) {
  Cesium.SunDawning = {};
}
/**
 * 打印当前视角
 * @param {Cesium.Viewer} viewer
 */
Cesium.SunDawning.log_camera_view = function (viewer) {
  let mode = viewer.scene.mode;
  viewer.scene.mode = Cesium.SceneMode.SCENE3D;
  let camera = viewer.camera;
  console.log(
    JSON.stringify({
      destination: camera.position,
      orientation: {
        heading: camera.heading,
        pitch: camera.pitch,
        roll: camera.roll,
      },
    })
  );
  viewer.scene.mode = mode;
};
