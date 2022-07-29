if (Cesium.Plugins === undefined) {
  Cesium.Plugins = {};
}
if (Cesium.Plugins.SunDawning === undefined) {
  Cesium.Plugins.SunDawning = {};
}
/**
 * 打印当前视角
 * @param {Cesium.Viewer} viewer
 */
Cesium.Plugins.SunDawning.log_camera_view = function (viewer) {
  let { mode } = viewer.scene;
  viewer.scene.mode = Cesium.SceneMode.SCENE3D;
  let { camera } = viewer;
  const view = {
    destination: camera.position,
    orientation: {
      heading: camera.heading,
      pitch: camera.pitch,
      roll: camera.roll,
    },
  };
  viewer.selectedEntity = new Cesium.Entity({
    name: "当前视角",
    description: JSON.stringify(view, null, 4),
  });
  console.log(JSON.stringify(view));
  viewer.scene.mode = mode;
};
