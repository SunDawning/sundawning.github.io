if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建时间日期详情面板
 * @param {HTMLElement} detail_offsetElement
 * @param {function} onPointerDown 点击时间日期详情之外的区域时，触发点击事件
 * @returns HTMLElement
 */
SunDawningGIS.createDateTimeDetailManager = async function ({
  detail_offsetElement = document.body,
  onPointerDown,
} = {}) {
  const SELF = {};
  await import("./createDateTimeDetailContainer.js");
  let container = await SunDawningGIS.createDateTimeDetailContainer({
    bottom: detail_offsetElement.offsetHeight,
  });
  detail_offsetElement.offsetParent.appendChild(container);
  {
    // 点击时间日期详情之内的区域时，不触发点击事件
    container.addEventListener("pointerdown", function (event) {
      event.stopPropagation();
    });
    // 点击时间日期详情之外的区域时，触发点击事件
    detail_offsetElement.offsetParent.addEventListener(
      "pointerdown",
      onPointerDown
    );
  }
  // 时间
  await import("./createLocaleTimeElementManager.js");
  const localeTimeElementManager = SunDawningGIS.createLocaleTimeElementManager(
    container.shadowRoot.querySelector("div").shadowRoot,
    { hasSeconds: true }
  );
  /**
   * 销毁
   */
  SELF.destroy = function () {
    localeTimeElementManager.destroy();
    // 关闭点击时间日期详情之外的区域时的点击事件
    detail_offsetElement.offsetParent.removeEventListener(
      "pointerdown",
      onPointerDown
    );
    container.remove();
    Object.keys(SELF).forEach(function (key) {
      SELF[key] = null;
      delete SELF[key];
    });
  };
  return SELF;
};
