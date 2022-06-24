if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建时间日期栏
 * @param {HTMLElement} container
 * @param {string} [options.to]
 * @param {HTMLElement} detail_offsetElement
 * @returns object
 */
SunDawningGIS.HTMLElementManager_createLocaleDateTimeElementManager =
  async function (
    container,
    { to = "appendChild", detail_offsetElement = document.body } = {}
  ) {
    const SELF = {};
    await import("./HTMLElement_createDateContainer.js");
    const date_container =
      await SunDawningGIS.HTMLElement_createDateContainer();
    // 显示在网页里
    container[to](date_container);
    // 时间日期详情页面
    let date_time_detail_manager;
    async function toggleDateTimeDetailContainer() {
      if (date_time_detail_manager) {
        date_time_detail_manager.destroy();
        date_time_detail_manager = null;
        return;
      }
      await import("./HTMLElementManager_createDateTimeDetailManager.js");
      date_time_detail_manager =
        await SunDawningGIS.HTMLElementManager_createDateTimeDetailManager({
          offsetElement: detail_offsetElement,
          onOutsidePointerDown: onPointerDown,
        });
    }
    // 事件
    async function onPointerDown(event) {
      console.log("onPointerDown", event);
      await toggleDateTimeDetailContainer();
    }
    date_container.addEventListener("pointerdown", onPointerDown);
    // 时间
    await import("./HTMLElementManager_createLocaleTimeElementManager.js");
    const localeTimeElementManager =
      SunDawningGIS.HTMLElementManager_createLocaleTimeElementManager(
        date_container.shadowRoot.querySelector("div").shadowRoot
      );
    // 日期
    await import("./HTMLElementManager_createLocaleDateElementManager.js");
    const localeDateElementManager =
      SunDawningGIS.HTMLElementManager_createLocaleDateElementManager(
        date_container.shadowRoot.querySelector("div").shadowRoot
      );
    /**
     * 销毁
     */
    SELF.destroy = function () {
      // 日期
      localeDateElementManager.destroy();
      // 时间
      localeTimeElementManager.destroy();
      // 事件
      date_container.removeEventListener("pointerdown", onPointerDown);
      // 从网页里移除
      date_container.remove();
      Object.keys(SELF).forEach(function (key) {
        SELF[key] = null;
        delete SELF[key];
      });
    };
    return SELF;
  };
