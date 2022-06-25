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
  background-image: url(https://cn.bing.com/th?id=OHR.MostarBridge_ZH-CN5920156936_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
  background-size: cover;
}
  `
  );
}
/**
 * @param {HTMLElement} root
 */
async function createEarth(root) {
  globalThis.CESIUM_BASE_URL =
    "https://cdn.bootcdn.net/ajax/libs/cesium/1.94.3";
  await import(
    "./library/CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot.js"
  );
  await import(
    "./library/CesiumImageryProvider_getArcGISWorldImageryProviderByBaseURL.js"
  );
  const cesiumWidget =
    await SunDawningGIS.CesiumWidget_getCesiumCSSAndCesiumWidgetCreateByBaseURLInShadowRoot(
      root,
      CESIUM_BASE_URL,
      {
        imageryProvider:
          await SunDawningGIS.CesiumImageryProvider_getArcGISWorldImageryProviderByBaseURL(
            CESIUM_BASE_URL
          ),
      }
    );
  // 初始视角
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
  return cesiumWidget;
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
/**
 * 创建工具栏
 * @param {HTMLElement} root
 */
async function createToolbar(root) {
  await import("./library/HTMLElement_createWindows10TaskbarContainer.js");
  const taskbar_container =
    await SunDawningGIS.HTMLElement_createWindows10TaskbarContainer();
  root.appendChild(taskbar_container);
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
  taskbar_container.shadowRoot.querySelector("div").style["z-index"] = 1;
  // 开始
  {
    await import("./library/HTMLElement_createDivWithShadowRoot.js");
    const start_container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
    SunDawningGIS.HTMLElement_appendStyleText(
      start_container.shadowRoot,
      `
div{
  width: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;  
}
div:hover{
  background-color: black;
}    
    `
    );
    taskbar_container.shadowRoot
      .querySelector("div")
      .shadowRoot.appendChild(start_container);
    {
      const _container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
      start_container.shadowRoot.appendChild(_container);
      SunDawningGIS.HTMLElement_appendStyleText(
        _container.shadowRoot,
        `
div{
  background-image: url(https://cn.bing.com/th?id=OHR.MostarBridge_ZH-CN5920156936_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
  background-size: cover;
  width:32px;
  height:32px;
}        
      `
      );
      _container.shadowRoot.appendChild(document.createElement("div"));
    }
  }
  {
    const start_container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
    SunDawningGIS.HTMLElement_appendStyleText(
      start_container.shadowRoot,
      `
div{
  width: 48px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;  
}
div:hover{
  background-color: black;
}    
    `
    );
    taskbar_container.shadowRoot
      .querySelector("div")
      .shadowRoot.appendChild(start_container);
    {
      const _container = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
      start_container.shadowRoot.appendChild(_container);
      SunDawningGIS.HTMLElement_appendStyleText(
        _container.shadowRoot,
        `
div{
  background-image: url(https://cn.bing.com/th?id=OHR.MostarBridge_ZH-CN5920156936_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
  background-size: cover;
  width:32px;
  height:32px;
}        
      `
      );
      _container.shadowRoot.appendChild(document.createElement("div"));
    }
  }
}
globalThis.onload = async function () {
  SunDawningGIS.root = document.body;
  appendRootStyle(SunDawningGIS.root);
  // 界面
  {
    await import("./library/HTMLElement_createDivWithShadowRoot.js");
    const frame = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
    SunDawningGIS.root.appendChild(frame);
    const _frame = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
    frame.shadowRoot.appendChild(_frame);
    SunDawningGIS.HTMLElement_appendStyleText(
      frame.shadowRoot,
      `
div{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);  
  width: 64vw;
  min-width:240px;
  height: 64vh;
  min-height:240px;
}    
    `
    );

    {
      // 顶部栏
      {
        const topbar = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
        _frame.shadowRoot.appendChild(topbar);
        SunDawningGIS.HTMLElement_appendStyleText(
          topbar.shadowRoot,
          `
div{
  height:32px;
  background-color:#3e3d3ced;
  user-select:none;
}
        `
        );
        const _topbar = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
        topbar.shadowRoot.appendChild(_topbar);

        {
          // 标题
          const titlebar = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
          _topbar.shadowRoot.appendChild(titlebar);
          SunDawningGIS.HTMLElement_appendStyleText(
            titlebar.shadowRoot,
            `
div{
  display: flex;
  align-items: center;
  height: 100%;
  color:white;  
}          
          `
          );
          const _titlebar = SunDawningGIS.HTMLElement_createDivWithShadowRoot();
          titlebar.shadowRoot.appendChild(_titlebar);
          {
            // 图标
            const title_icon_bar =
              SunDawningGIS.HTMLElement_createDivWithShadowRoot();
            _titlebar.shadowRoot.appendChild(title_icon_bar);
            const _title_icon_bar = document.createElement("div");
            title_icon_bar.shadowRoot.appendChild(_title_icon_bar);
            SunDawningGIS.HTMLElement_appendStyleText(
              title_icon_bar.shadowRoot,
              `
div{
  width: 24px;
  height: 24px;  
  background-image: url(https://cn.bing.com/th?id=OHR.MostarBridge_ZH-CN5920156936_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
  background-size: cover;  
}            `
            );
          }
          {
            // 标题文本
            const title_text_bar =
              SunDawningGIS.HTMLElement_createDivWithShadowRoot();
            _titlebar.shadowRoot.appendChild(title_text_bar);
            const _title_text_bar = document.createElement("div");
            title_text_bar.shadowRoot.appendChild(_title_text_bar);
            _title_text_bar.innerHTML = `Cesium`;
          }
        }
        {
          // 窗口最大、最小和关闭
          const operationbar =
            SunDawningGIS.HTMLElement_createDivWithShadowRoot();
          _topbar.shadowRoot.appendChild(operationbar);
          SunDawningGIS.HTMLElement_appendStyleText(
            operationbar.shadowRoot,
            `
div{
  position:absolute;
  right:0;
}          
          `
          );
          const _operationbar =
            SunDawningGIS.HTMLElement_createDivWithShadowRoot();
          operationbar.shadowRoot.appendChild(_operationbar);
          {
            // 关闭
            const closebar =
              SunDawningGIS.HTMLElement_createDivWithShadowRoot();
            const _closebar =
              SunDawningGIS.HTMLElement_createDivWithShadowRoot();
            _operationbar.shadowRoot.appendChild(closebar);
          }
        }
      }
      // 主体框
      {
        // 创建地球
        createEarth(_frame.shadowRoot);
      }
    }
  }
  // 底部工具栏
  createToolbar(SunDawningGIS.root);
};
