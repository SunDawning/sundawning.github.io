if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
if (globalThis.SunDawningGIS.UI === undefined) {
  globalThis.SunDawningGIS.UI = {};
}
/**
 * 给根节点添加全局样式
 */
async function appendRootStyle(root) {
  await import("./library/HTMLElement_appendStyleText.js");
  SunDawningGIS.HTMLElement_appendStyleText(
    root,
    `
body{
  margin:0;
}
  `
  );
}
/**
 * @param {HTMLElement} root
 * @param {function} getImageryProvider
 * @returns Cesium.CesiumWidget
 */
async function createEarth(root, getImageryProvider) {
  globalThis.CESIUM_BASE_URL =
    "https://cdn.bootcdn.net/ajax/libs/cesium/1.94.3";
  await import(
    "./library/CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
  );
  SunDawningGIS.cesiumWidget =
    await SunDawningGIS.CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
      root,
      CESIUM_BASE_URL,
      {
        imageryProvider: await getImageryProvider(CESIUM_BASE_URL),
      }
    );
  return SunDawningGIS.cesiumWidget;
}
/**
 * 设置右键菜单
 */
function setRightKeyMenu() {
  document.documentElement.oncontextmenu = function (event) {
    console.log("document.documentElement.oncontextmenu", event);
  };
}
/**
 * 创建UI，在右上角输出相机的视角，鼠标移动停下随即更新
 * @param {HTMLElement} root
 * @param {Cesium.Viewer||Cesium.CesiumWidget} cesiumWidget
 */
async function create_ui_printCesiumCameraSetViewOptionsOnMoveEnd(
  root,
  cesiumWidget
) {
  await import(
    "./library/HTMLElementManager_printCesiumCameraSetViewOptionsOnMoveEnd.js"
  );
  SunDawningGIS.UI.HTMLElementManager_printCesiumCameraSetViewOptionsOnMoveEnd =
    await SunDawningGIS.HTMLElementManager_printCesiumCameraSetViewOptionsOnMoveEnd(
      root,
      cesiumWidget
    );
}
globalThis.onload = async function () {
  SunDawningGIS.root = document.body;
  appendRootStyle(SunDawningGIS.root);
  await import(
    "./library/CesiumImageryProvider_getArcGISWorldImageryProviderByBaseURL.js"
  );
  const cesiumWidget = await createEarth(
    SunDawningGIS.root,
    SunDawningGIS.CesiumImageryProvider_getArcGISWorldImageryProviderByBaseURL
  );
  cesiumWidget.camera.setView({
    destination: {
      x: -2924819.4945182353,
      y: 9022799.347751182,
      z: 4775396.196561911,
    },
    orientation: {
      heading: 0,
      pitch: -1.3768327359474233,
      roll: 0,
    },
  });
  // 底部工具栏
  await import("./library/HTMLElement_createWindows10TaskbarContainer.js");
  const taskbar_container =
    await SunDawningGIS.HTMLElement_createWindows10TaskbarContainer();
  SunDawningGIS.root.appendChild(taskbar_container);
  // 时间日期栏
  await import(
    "./library/HTMLElementManager_createLocaleDateTimeElementManager.js"
  );
  SunDawningGIS.UI.dateManager =
    await SunDawningGIS.HTMLElementManager_createLocaleDateTimeElementManager(
      taskbar_container.shadowRoot.querySelector("div").shadowRoot,
      {
        detail_offsetElement: taskbar_container.shadowRoot.querySelector("div"),
      }
    );
};
