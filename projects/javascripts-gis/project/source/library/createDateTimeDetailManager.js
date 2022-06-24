if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建时间日期详情面板
 * @param {HTMLElement} offsetElement 相对于某个元素进行偏移，该元素即是offsetElement
 * @param {function} onPointerDown 点击时间日期详情之外的区域时，触发点击事件
 * @returns HTMLElement
 */
SunDawningGIS.createDateTimeDetailManager = async function ({
  offsetElement = document.body,
  onPointerDown,
} = {}) {
  const SELF = {};
  await import("./createDateTimeDetailContainer.js");
  let container = await SunDawningGIS.createDateTimeDetailContainer({
    bottom: offsetElement.offsetHeight,
  });
  offsetElement.offsetParent.appendChild(container);
  /**
   * 阻止事件冒泡
   * @see https://www.cnblogs.com/Jacob98/p/11932174.html 三种方法教你HTML实现点击某一个元素之外触发事件
   * @param {Event} event
   */
  function stopPropagation(event) {
    event.stopPropagation();
  }
  {
    // 点击时间日期详情之内的区域时，不触发点击事件
    container.addEventListener("pointerdown", stopPropagation);
    // 点击时间日期详情之外的区域时，触发点击事件
    offsetElement.offsetParent.addEventListener("pointerdown", onPointerDown);
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
    offsetElement.offsetParent.removeEventListener(
      "pointerdown",
      onPointerDown
    );
    container.removeEventListener("pointerdown", stopPropagation);
    container.remove();
    Object.keys(SELF).forEach(function (key) {
      SELF[key] = null;
      delete SELF[key];
    });
  };
  return SELF;
};
