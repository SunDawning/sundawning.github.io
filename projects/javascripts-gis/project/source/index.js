async function index() {
  window.CESIUM_BASE_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
  await import(`${CESIUM_BASE_URL}/Cesium.js`);
  const container = document.createElement("div");
  document.body.appendChild(container);
  {
    const response = await fetch(`${CESIUM_BASE_URL}/Widgets/widgets.css`);
    {
      const style = document.createElement("style");
      style.innerText = await response.text();
      container.appendChild(style);
    }
  }
  new Cesium.Viewer(container);
}
index();
