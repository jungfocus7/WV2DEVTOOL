(() => {
const canvas = document.querySelector('canvas');
const _wgl = canvas.getContext('webgl2');

// 1. 셰이더 소스 (GLSL)
const vsSource = `#version 300 es
  in vec2 a_position;
  void main() { gl_Position = vec4(a_position, 0, 1); }`;

const fsSource = `#version 300 es
  precision highp float;
  out vec4 outColor;
  void main() { outColor = vec4(1, 0.5, 0, 1); }`;

// 2. 셰이더 컴파일 및 프로그램 링크 (유틸리티 함수화 권장)
function createShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src); gl.compileShader(s);
  return s;
}
const program = _wgl.createProgram();
_wgl.attachShader(program, createShader(_wgl, _wgl.VERTEX_SHADER, vsSource));
_wgl.attachShader(program, createShader(_wgl, _wgl.FRAGMENT_SHADER, fsSource));
_wgl.linkProgram(program);

// 3. 버퍼에 데이터 넣기 (삼각형 좌표)
const positions = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
const buffer = _wgl.createBuffer();
_wgl.bindBuffer(_wgl.ARRAY_BUFFER, buffer);
_wgl.bufferData(_wgl.ARRAY_BUFFER, positions, _wgl.STATIC_DRAW);

// 4. VAO 설정 (데이터 해석 방법 정의)
const vao = _wgl.createVertexArray();
_wgl.bindVertexArray(vao);
const posLoc = _wgl.getAttribLocation(program, "a_position");
_wgl.enableVertexAttribArray(posLoc);
_wgl.vertexAttribPointer(posLoc, 2, _wgl.FLOAT, false, 0, 0);

// 5. 그리기
_wgl.clearColor(0, 0, 0, 1);
_wgl.clear(_wgl.COLOR_BUFFER_BIT);
_wgl.useProgram(program);
_wgl.drawArrays(_wgl.TRIANGLES, 0, 3);

})();












// console.log(1004);

// /** @type {HTMLCanvasElement} */
// const _cvs = document.querySelector("canvas.c_cvs");
// // console.log(_cvs);

// const _cvw = _cvs.clientWidth;
// const _cvh = _cvs.clientHeight;
// _cvs.width = _cvw;
// _cvs.height = _cvh;

// const _ctx = _cvs.getContext("2d");
// _ctx.fillStyle = "red"; // Set the fill color
// _ctx.fillRect(10, 10, 50, 50);


// const fn_draw = (px, py) => {
//     _ctx.clearRect(0, 0, _cvw, _cvh);
//     // for (let i = 0; i < 1000000; i++)
//     //     _ctx.fillRect(px, py, 50, 50);
//     _ctx.beginPath();
//     for (let i = 0; i < 10000; i++) {
//         _ctx.rect(px, py, 50, 50);
//     }
//     _ctx.fill(); // 한 번에 칠하기
// };

// _cvs.addEventListener('mousemove', (pe) => {
//     fn_draw(pe.offsetX, pe.offsetY);
// });