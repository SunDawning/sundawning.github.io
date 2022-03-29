export class Component extends HTMLElement {
  constructor(innerHTML) {
    super();
    this.attachShadow({ mode: "open" });
    this.render(innerHTML);
  }
  render(innerHTML) {
    const template = document.createElement("template");
    template.innerHTML = innerHTML;
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
