/**
 * 添加样式
 * @param {HTMLElement} container
 * @param {string} text
 */
function appendStyleText(container, text) {
  const style = document.createElement("style");
  style.innerText = text;
  container.appendChild(style);
}
async function index() {
  {
    window.CESIUM_BASE_URL =
      "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
    const container = document.createElement("div");
    container.attachShadow({ mode: "open" });
    {
      const response = await fetch(`${CESIUM_BASE_URL}/Widgets/widgets.css`);
      {
        const text = await response.text();
        appendStyleText(container.shadowRoot, text);
      }
    }
    {
      await import(`${CESIUM_BASE_URL}/Cesium.js`);
      {
        new Cesium.Viewer(container.shadowRoot);
      }
    }
    {
      const body = document.body;
      {
        body.appendChild(container);
      }
    }
  }
}
index();
