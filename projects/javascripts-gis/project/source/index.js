async function index() {
  {
    window.CESIUM_BASE_URL =
      "https://cdnjs.cloudflare.com/ajax/libs/cesium/1.94.3";
    const container = document.createElement("div");
    container.attachShadow({ mode: "open" });
    {
      const response = await fetch(`${CESIUM_BASE_URL}/Widgets/widgets.css`);
      {
        const style = document.createElement("style");
        style.innerText = await response.text();
        container.shadowRoot.appendChild(style);
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
