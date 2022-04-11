const { Canvas } = await import("Canvas");
class HelloPoint1 extends Canvas {
  constructor() {
    super();
    this.gl = this.canvas.getContext("webgl");
    import("drawARedPoint").then(function ({ drawARedPoint }) {
      drawARedPoint(this.gl);
    });
  }
}
window.customElements.define("hello-point1", HelloPoint1);
