/**
 * 使用WebGL程序绘制一个红色的点
 * @param {object} gl WebGL对象
 */
export async function drawARedPoint(gl) {
  const { createWebGLProgram } = await import("createWebGLProgram");
  createWebGLProgram(
    gl,
    `
void main(){
    gl_Position=vec4(0.0,0.0,0.0,1.0);
    gl_PointSize=10.0;
}
              `,
    `
void main(){
    gl_FragColor=vec4(1.0,0.0,0.0,1.0);
}
                          `
  );
  gl.clearColor(0, 0, 0, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);
}
