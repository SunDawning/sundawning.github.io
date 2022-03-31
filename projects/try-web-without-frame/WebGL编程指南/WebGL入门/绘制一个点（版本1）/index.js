const { Canvas } = await import("Canvas");
class HelloPoint1 extends Canvas {
  constructor() {
    super();
    const gl = this.canvas.getContext("webgl");
    {
      const program = gl.createProgram();
      [
        {
          type: gl.VERTEX_SHADER,
          source: `
void main(){
gl_Position=vec4(0.0,0.0,0.0,1.0);
gl_PointSize=10.0;
}
          `,
        },
        {
          type: gl.FRAGMENT_SHADER,
          source: `
void main(){
gl_FragColor=vec4(1.0,0.0,0.0,1.0);
}
            `,
        },
      ].forEach(function ({ type, source }) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        gl.attachShader(program, shader);
      });
      gl.linkProgram(program);
      gl.useProgram(program);
    }
    gl.clearColor(0, 0, 0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
window.customElements.define("hello-point1", HelloPoint1);
