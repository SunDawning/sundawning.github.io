import { Component } from "Component";
export class Canvas extends Component {
  constructor() {
    super(`
    <canvas width="400" height="400">请使用能支持“canvas”功能的浏览</canvas>          
    `);
    this.canvas = this.shadowRoot.querySelector("canvas");
  }
}
