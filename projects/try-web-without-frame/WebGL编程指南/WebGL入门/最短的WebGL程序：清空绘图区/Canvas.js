export class Canvas extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
    this.canvas = this.shadowRoot.querySelector("canvas");
  }
  render() {
    const template = document.createElement("template");
    template.innerHTML = `
      <canvas width="400" height="400">请使用能支持“canvas”功能的浏览</canvas>          
      `;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
