if (globalThis.SunDawningGIS === undefined) {
  globalThis.SunDawningGIS = {};
}
/**
 * 创建本地时间的元素
 * @returns HTMLElement
 */
SunDawningGIS.createLocaleTimeElement = function (container) {
  const SELF = {};
  const locale_time_element = document.createElement("div");
  let id;
  function animate() {
    const locale_time = new Date()
      .toLocaleTimeString()
      .split(":")
      .slice(0, 2)
      .join(":");
    if (locale_time_element.innerHTML !== locale_time) {
      locale_time_element.innerHTML = locale_time;
    }
    id = requestAnimationFrame(animate);
  }
  animate();
  container.appendChild(locale_time_element);
  /**
   * 销毁
   */
  SELF.destroy = function () {
    locale_time_element.remove();
    cancelAnimationFrame(id);
    Object.keys(SELF).forEach(function (key) {
      delete SELF[key];
    });
  };
  return SELF;
};
