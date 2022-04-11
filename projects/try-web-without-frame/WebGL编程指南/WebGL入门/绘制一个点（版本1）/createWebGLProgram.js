/**
 * 创建WebGL程序
 * @param {object} gl WebGL对象
 * @param {string} vertex 顶点着色器的文本
 * @param {string} fragment 片元着色器的文本
 * @returns WebGL程序
 */
export function createWebGLProgram(gl, vertex, fragment) {
  const program = gl.createProgram();
  [
    {
      type: gl.VERTEX_SHADER,
      source: vertex,
    },
    {
      type: gl.FRAGMENT_SHADER,
      source: fragment,
    },
  ].forEach(function ({ type, source }) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    gl.attachShader(program, shader);
  });
  gl.linkProgram(program);
  gl.useProgram(program);
  return program;
}
