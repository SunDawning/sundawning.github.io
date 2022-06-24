if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 在右上角输出相机的视角，鼠标移动停下随即更新
 * @param {HTMLElement} root
 * @param {Cesium.CesiumWidget||Cesium.Viewer} cesiumWidget
 * @returns object
 */
SunDawningGIS.HTMLElementManager_printCesiumCameraSetViewOptionsOnMoveEnd =
  async function (root, cesiumWidget) {
    let SELF = {};
    await import("./HTMLElement_getShadowRootContainerCreateAndAppend.js");
    const container =
      await SunDawningGIS.HTMLElement_getShadowRootContainerCreateAndAppend(
        root
      );
    {
      await import("./HTMLElement_appendStyleText.js");
      SunDawningGIS.HTMLElement_appendStyleText(
        container.shadowRoot,
        `
  div{
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  white-space: pre;
  }
      `
      );
    }
    const div = document.createElement("div");
    async function logView() {
      await import("./Cesium_getCameraView.js");
      const view = SunDawningGIS.Cesium_getCameraView(cesiumWidget.camera);
      div.innerHTML = JSON.stringify(view, null, 4);
    }
    logView();
    let name = "camera_position" + Math.random();
    cesiumWidget.camera.moveEnd.addEventListener(logView, name);
    {
      await import("./HTMLElement_appendChild.js");
      SunDawningGIS.HTMLElement_appendChild(container.shadowRoot, div);
    }
    /**
     * 销毁
     */
    SELF.destroy = function () {
      cesiumWidget.camera.moveEnd.removeEventListener(logView, name);
      container.remove();
      Object.keys(SELF).forEach(function (key) {
        delete SELF[key];
      });
    };
    return SELF;
  };
