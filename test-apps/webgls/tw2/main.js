
const _cvs = document.querySelector('canvas.c_cvs');
console.log(_cvs);

const _wgl = _cvs.getContext("webgl2");
console.log(_wgl);


// 1. 셰이더 소스
const vs = `#version 300 es
in vec4 pos;
uniform float t;
void main() {
    float s = sin(t), c = cos(t);
    mat4 ry = mat4(c,0,s,0, 0,1,0,0, -s,0,c,0, 0,0,0,1); // Y축 회전
    mat4 rx = mat4(1,0,0,0, 0,c,-s,0, 0,s,c,0, 0,0,0,1); // X축 회전
    gl_Position = rx * ry * pos;
}`;
const fs = `#version 300 es
precision highp float;
out vec4 col;
void main() { col = vec4(0.2, 0.6, 1.0, 1.0); }`;

// 2. 셰이더 컴파일 및 프로그램 링크
const createShader = (gl, type, src) => {
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s;
};
const prog = _wgl.createProgram();
_wgl.attachShader(prog, createShader(_wgl, _wgl.VERTEX_SHADER, vs));
_wgl.attachShader(prog, createShader(_wgl, _wgl.FRAGMENT_SHADER, fs));
_wgl.linkProgram(prog); _wgl.useProgram(prog);

// 3. 정육면체 데이터 (12개 삼각형)
const vertices = new Float32Array([
    -0.5,-0.5,-0.5,  0.5,-0.5,-0.5,  0.5, 0.5,-0.5, -0.5,-0.5,-0.5,  0.5, 0.5,-0.5, -0.5, 0.5,-0.5,
    -0.5,-0.5, 0.5,  0.5,-0.5, 0.5,  0.5, 0.5, 0.5, -0.5,-0.5, 0.5,  0.5, 0.5, 0.5, -0.5, 0.5, 0.5,
    -0.5,-0.5,-0.5, -0.5, 0.5,-0.5, -0.5, 0.5, 0.5, -0.5,-0.5,-0.5, -0.5, 0.5, 0.5, -0.5,-0.5, 0.5,
     0.5,-0.5,-0.5,  0.5, 0.5,-0.5,  0.5, 0.5, 0.5,  0.5,-0.5,-0.5,  0.5, 0.5, 0.5,  0.5,-0.5, 0.5,
    -0.5,-0.5,-0.5, -0.5,-0.5, 0.5,  0.5,-0.5, 0.5, -0.5,-0.5,-0.5,  0.5,-0.5, 0.5,  0.5,-0.5,-0.5,
    -0.5, 0.5,-0.5, -0.5, 0.5, 0.5,  0.5, 0.5, 0.5, -0.5, 0.5,-0.5,  0.5, 0.5, 0.5,  0.5, 0.5,-0.5
]);

_wgl.bindBuffer(_wgl.ARRAY_BUFFER, _wgl.createBuffer());
_wgl.bufferData(_wgl.ARRAY_BUFFER, vertices, _wgl.STATIC_DRAW);
const posLoc = _wgl.getAttribLocation(prog, "pos");
_wgl.enableVertexAttribArray(posLoc);
_wgl.vertexAttribPointer(posLoc, 3, _wgl.FLOAT, false, 0, 0);

const tLoc = _wgl.getUniformLocation(prog, "t");
_wgl.enable(_wgl.DEPTH_TEST);

// 4. 애니메이션 루프
function draw(time) {
    _wgl.clear(_wgl.COLOR_BUFFER_BIT | _wgl.DEPTH_BUFFER_BIT);
    _wgl.uniform1f(tLoc, time * 0.001);
    _wgl.drawArrays(_wgl.TRIANGLES, 0, 36);
    requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

// // 1. 정육면체 8개 정점 데이터 생성 및 버퍼 바인딩
// const positions = new Float32Array([-0.5,-0.5,0.5, ...]); // 8개 좌표
// gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

// // 2. 렌더링 루프
// function render(time) {
//     gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
//     gl.uniform1f(u_timeLocation, time * 0.001); // 시간 값 전달
//     gl.drawArrays(gl.TRIANGLES, 0, 36); // 12개 삼각형(6면) 그리기
//     requestAnimationFrame(render);
// }

export {};
