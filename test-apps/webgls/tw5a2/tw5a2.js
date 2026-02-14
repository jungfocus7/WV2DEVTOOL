(() => {
    /** @type {HTMLCanvasElement} */
    let _cvs = document.querySelector('canvas#d_cvs');
    _cvs.width = 300;
    _cvs.height = 300;

    /** @type {WebGL2RenderingContext} */
    let _wgl = _cvs.getContext('webgl2');

    const vsSource = `#version 300 es
        in vec2 a_position;
        in vec3 a_color;
        uniform vec2 u_resolution;
        uniform vec2 u_pivot;
        uniform float u_angle;
        out vec3 v_color;
        void main() {
            // 1. 회전 행렬 정의
            float s = sin(u_angle);
            float c = cos(u_angle);
            mat2 rotation = mat2(c, s, -s, c);

            // 2. 중심축 회전: 원점으로 이동 -> 회전 -> 복귀
            vec2 centeredPosition = a_position - u_pivot;
            vec2 rotatedPosition = (rotation * centeredPosition) + u_pivot;

            // 3. Clip Space 변환
            vec2 zeroToOne = rotatedPosition / u_resolution;
            vec2 clipSpace = (zeroToOne * 2.0) - 1.0;
            gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
            v_color = a_color;
        }
    `;

    const fsSource = `#version 300 es
        precision highp float;
        in vec3 v_color;
        out vec4 outColor;
        void main() {
            outColor = vec4(v_color, 1.0);
        }
    `;

    function createShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }

    const program = _wgl.createProgram();
    _wgl.attachShader(program, createShader(_wgl, _wgl.VERTEX_SHADER, vsSource));
    _wgl.attachShader(program, createShader(_wgl, _wgl.FRAGMENT_SHADER, fsSource));
    _wgl.linkProgram(program);

    const positionAttributeLocation = _wgl.getAttribLocation(program, "a_position");
    const colorAttributeLocation = _wgl.getAttribLocation(program, "a_color");
    const resolutionUniformLocation = _wgl.getUniformLocation(program, "u_resolution");
    const angleUniformLocation = _wgl.getUniformLocation(program, "u_angle");
    const pivotUniformLocation = _wgl.getUniformLocation(program, "u_pivot");

    const vao = _wgl.createVertexArray();
    _wgl.bindVertexArray(vao);

    const positionBuffer = _wgl.createBuffer();
    _wgl.bindBuffer(_wgl.ARRAY_BUFFER, positionBuffer);

    /**
     * 사각형 데이터 및 중심점 정보 반환
     * @param {number} tw, th, tx, ty - 크기 및 위치
     * @param {number[]} c1, c2, c3, c4 - 각 모서리 색상 [r, g, b]
     * @returns {{data: number[], pivot: number[]}} 정점 배열과 중심점 좌표
     */
    const fn_newRectsGrad = (tw, th, tx, ty, c1, c2, c3, c4) => {
        const x1 = tx, x2 = tx + tw;
        const y1 = ty, y2 = ty + th;
        return {
            data: [
                x1, y1, ...c1,  x2, y1, ...c2,  x1, y2, ...c3,
                x1, y2, ...c3,  x2, y1, ...c2,  x2, y2, ...c4
            ],
            pivot: [tx + tw / 2, ty + th / 2]
        };
    };

    const rectInfo = fn_newRectsGrad(80, 80, 110, 110, [1,0,0], [0,1,0], [0,0,1], [1,1,0]);

    _wgl.bufferData(_wgl.ARRAY_BUFFER, new Float32Array(rectInfo.data), _wgl.STATIC_DRAW);

    _wgl.enableVertexAttribArray(positionAttributeLocation);
    _wgl.vertexAttribPointer(positionAttributeLocation, 2, _wgl.FLOAT, false, 20, 0);
    _wgl.enableVertexAttribArray(colorAttributeLocation);
    _wgl.vertexAttribPointer(colorAttributeLocation, 3, _wgl.FLOAT, false, 20, 8);

    let angle = 0;
    function render() {
        angle += 0.02;
        _wgl.viewport(0, 0, _cvs.width, _cvs.height);
        _wgl.clearColor(0, 0, 0, 0);
        _wgl.clear(_wgl.COLOR_BUFFER_BIT);

        _wgl.useProgram(program);
        _wgl.bindVertexArray(vao);

        _wgl.uniform2f(resolutionUniformLocation, _cvs.width, _cvs.height);
        _wgl.uniform1f(angleUniformLocation, angle);
        _wgl.uniform2f(pivotUniformLocation, rectInfo.pivot[0], rectInfo.pivot[1]);

        _wgl.drawArrays(_wgl.TRIANGLES, 0, rectInfo.data.length / 5);
        requestAnimationFrame(render);
    }

    render();
})();



















// (() => {
//     /** @type {HTMLCanvasElement} */
//     let _cvs = document.querySelector('canvas#d_cvs');

//     // 캔버스 크기 설정
//     _cvs.width = 300;
//     _cvs.height = 300;

//     /** @type {WebGL2RenderingContext} */
//     let _wgl = _cvs.getContext('webgl2');

//     const vsSource = `#version 300 es
//         in vec2 a_position;
//         in vec3 a_color;
//         uniform vec2 u_resolution;
//         out vec3 v_color;
//         void main() {
//             vec2 zeroToOne = a_position / u_resolution;
//             vec2 zeroToTwo = zeroToOne * 2.0;
//             vec2 clipSpace = zeroToTwo - 1.0;
//             gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
//             v_color = a_color;
//         }
//     `;

//     const fsSource = `#version 300 es
//         precision highp float;
//         in vec3 v_color;
//         out vec4 outColor;
//         void main() {
//             outColor = vec4(v_color, 1.0);
//         }
//     `;

//     /**
//      * @param {WebGL2RenderingContext} gl
//      * @param {number} type
//      * @param {string} source
//      * @returns {WebGLShader}
//      */
//     function createShader(gl, type, source) {
//         const shader = gl.createShader(type);
//         gl.shaderSource(shader, source);
//         gl.compileShader(shader);
//         return shader;
//     }

//     const program = _wgl.createProgram();
//     _wgl.attachShader(program, createShader(_wgl, _wgl.VERTEX_SHADER, vsSource));
//     _wgl.attachShader(program, createShader(_wgl, _wgl.FRAGMENT_SHADER, fsSource));
//     _wgl.linkProgram(program);

//     const positionAttributeLocation = _wgl.getAttribLocation(program, "a_position");
//     const colorAttributeLocation = _wgl.getAttribLocation(program, "a_color");
//     const resolutionUniformLocation = _wgl.getUniformLocation(program, "u_resolution");

//     const vao = _wgl.createVertexArray();
//     _wgl.bindVertexArray(vao);

//     const positionBuffer = _wgl.createBuffer();
//     _wgl.bindBuffer(_wgl.ARRAY_BUFFER, positionBuffer);

//     /**
//      * 사각형 생성을 위한 정점 및 색상 데이터 생성
//      * @param {number} tw - 너비
//      * @param {number} th - 높이
//      * @param {number} tx - X 좌표
//      * @param {number} ty - Y 좌표
//      * @param {number} r - 빨강 (0.0 ~ 1.0)
//      * @param {number} g - 초록 (0.0 ~ 1.0)
//      * @param {number} b - 파랑 (0.0 ~ 1.0)
//      * @returns {number[]} 정점당 5개 요소(x,y,r,g,b)가 포함된 배열
//      */
//     const fn_newRects = (tw, th, tx, ty, r, g, b) => {
//         const x1 = tx, x2 = tx + tw;
//         const y1 = ty, y2 = ty + th;
//         return [
//             x1, y1, r, g, b,  x2, y1, r, g, b,  x1, y2, r, g, b,
//             x1, y2, r, g, b,  x2, y1, r, g, b,  x2, y2, r, g, b
//         ];
//     };

//     const positions = [
//         ...fn_newRects(40, 40, 10, 10, 1, 0, 0),   // 빨강
//         ...fn_newRects(40, 40, 60, 10, 0, 1, 0),   // 초록
//         ...fn_newRects(40, 40, 110, 10, 0, 0, 1),  // 파랑
//         ...fn_newRects(40, 40, 160, 10, 1, 1, 0),  // 노랑
//         ...fn_newRects(40, 40, 210, 10, 1, 0, 1)   // 보라
//     ];

//     _wgl.bufferData(_wgl.ARRAY_BUFFER, new Float32Array(positions), _wgl.STATIC_DRAW);

//     // Stride: 5개 요소 * 4바이트 = 20바이트
//     _wgl.enableVertexAttribArray(positionAttributeLocation);
//     _wgl.vertexAttribPointer(positionAttributeLocation, 2, _wgl.FLOAT, false, 20, 0);

//     // Color Offset: 좌표(x,y) 2개 뒤인 8바이트 지점
//     _wgl.enableVertexAttribArray(colorAttributeLocation);
//     _wgl.vertexAttribPointer(colorAttributeLocation, 3, _wgl.FLOAT, false, 20, 8);

//     _wgl.viewport(0, 0, _cvs.width, _cvs.height);
//     _wgl.clearColor(0, 0, 0, 0);
//     _wgl.clear(_wgl.COLOR_BUFFER_BIT);

//     _wgl.useProgram(program);
//     _wgl.bindVertexArray(vao);
//     _wgl.uniform2f(resolutionUniformLocation, _cvs.width, _cvs.height);

//     _wgl.drawArrays(_wgl.TRIANGLES, 0, positions.length / 5);
// })();




















// (() => {
//     /** @type {HTMLCanvasElement} */
//     let _cvs = document.querySelector('canvas#d_cvs');
//     _cvs.width = 300;
//     _cvs.height = 300;
//     // console.log('_cvs:', _cvs);

//     /** @type {WebGL2RenderingContext} */
//     let _wgl = _cvs.getContext('webgl2');
//     // console.log('_wgl:', _wgl);



//     const vsSource = `#version 300 es
//         in vec2 a_position;
//         in vec3 a_color;
//         uniform vec2 u_resolution;
//         out vec3 v_color;
//         void main() {
//             vec2 zeroToOne = a_position / u_resolution;
//             vec2 zeroToTwo = (zeroToOne * 2.0) - 1.0;
//             vec2 clipSpace = zeroToTwo - 1.0;
//             gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
//             v_color = a_color;
//         }
//     `;

//     const fsSource = `#version 300 es
//         precision highp float;
//         in vec3 v_color;
//         out vec4 outColor;
//         void main() {
//             outColor = vec4(v_color, 1.0);
//         }
//     `;

//     function createShader(gl, type, source) {
//         const shader = gl.createShader(type);
//         gl.shaderSource(shader, source);
//         gl.compileShader(shader);
//         return shader;
//     }

//     const program = _wgl.createProgram();
//     _wgl.attachShader(program, createShader(_wgl, _wgl.VERTEX_SHADER, vsSource));
//     _wgl.attachShader(program, createShader(_wgl, _wgl.FRAGMENT_SHADER, fsSource));
//     _wgl.linkProgram(program);

//     const positionAttributeLocation = _wgl.getAttribLocation(program, "a_position");
//     const resolutionUniformLocation = _wgl.getUniformLocation(program, "u_resolution");
//     const colorLoc = _wgl.getAttribLocation(program, "a_color");

//     const vao = _wgl.createVertexArray();
//     _wgl.bindVertexArray(vao);

//     const positionBuffer = _wgl.createBuffer();
//     _wgl.bindBuffer(_wgl.ARRAY_BUFFER, positionBuffer);


// /**
//      * 사각형 생성을 위한 정점 및 색상 데이터 생성
//      * @param {number} tw - Rectangle Width
//      * @param {number} th - Rectangle Height
//      * @param {number} tx - Start X Position
//      * @param {number} ty - Start Y Position
//      * @param {number} r - Color Red (0.0 to 1.0)
//      * @param {number} g - Color Green (0.0 to 1.0)
//      * @param {number} b - Color Blue (0.0 to 1.0)
//      * @returns {number[]} 6개의 정점 데이터 (정점당 x, y, r, g, b 총 30개 요소)
//      */
//     const fn_newRects = (tw, th, tx, ty, r, g, b) => {
//         const x1 = tx;
//         const x2 = tx + tw;
//         const y1 = ty;
//         const y2 = ty + th;

//         return [
//             // 첫 번째 삼각형
//             x1, y1, r, g, b,
//             x2, y1, r, g, b,
//             x1, y2, r, g, b,
//             // 두 번째 삼각형
//             x1, y2, r, g, b,
//             x2, y1, r, g, b,
//             x2, y2, r, g, b
//         ];
//     };
//     const positions = [
//         ...fn_newRects(40, 40, 10, 10, 1, 0, 0),   // 빨강
//         ...fn_newRects(40, 40, 60, 10, 0, 1, 0),   // 초록
//         ...fn_newRects(40, 40, 110, 10, 0, 0, 1),  // 파랑
//         ...fn_newRects(40, 40, 160, 10, 1, 1, 0),  // 노랑
//         ...fn_newRects(40, 40, 210, 10, 1, 0, 1)   // 보라
//     ];
//     console.log(positions.length / 2);

//     _wgl.bufferData(_wgl.ARRAY_BUFFER, new Float32Array(positions), _wgl.STATIC_DRAW);

//     _wgl.enableVertexAttribArray(positionAttributeLocation);
//     _wgl.vertexAttribPointer(positionAttributeLocation, 2, _wgl.FLOAT, false, 20, 0);

//     _wgl.enableVertexAttribArray(colorLoc);
//     _wgl.vertexAttribPointer(colorLoc, 3, _wgl.FLOAT, false, 20, 8);

//     _wgl.viewport(0, 0, _cvs.width, _cvs.height);
//     _wgl.clearColor(0, 0, 0, 0);
//     _wgl.clear(_wgl.COLOR_BUFFER_BIT);
//     _wgl.useProgram(program);
//     _wgl.bindVertexArray(vao);
//     _wgl.uniform2f(resolutionUniformLocation, _cvs.width, _cvs.height);
//     _wgl.drawArrays(_wgl.TRIANGLES, 0, positions.length / 5);


// })();

















// (() => {
//     /** @type {HTMLCanvasElement} */
//     const _cvs = document.querySelector('canvas#d_cvs');
//     con
//     _cvs.width = 300;
//     _cvs.height = 300;


//     /** @type {WebGL2RenderingContext} */
//     const _wgl = _cvs.getContext('webgl2');

//     const vsSource = `#version 300 es
//         in vec2 a_position;
//         uniform vec2 u_resolution;
//         void main() {
//             vec2 zeroToOne = a_position / u_resolution;
//             vec2 clipSpace = (zeroToOne * 2.0) - 1.0;
//             gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
//         }`;

//     const fsSource = `#version 300 es
//         precision highp float;
//         out vec4 outColor;
//         void main() { outColor = vec4(1, 0, 0, 1); }`;

//     const createShader = (gl, type, source) => {
//         const shader = gl.createShader(type);
//         gl.shaderSource(shader, source);
//         gl.compileShader(shader);
//         return shader;
//     };

//     const program = _wgl.createProgram();
//     _wgl.attachShader(program, createShader(_wgl, _wgl.VERTEX_SHADER, vsSource));
//     _wgl.attachShader(program, createShader(_wgl, _wgl.FRAGMENT_SHADER, fsSource));
//     _wgl.linkProgram(program);

//     const positionLoc = _wgl.getAttribLocation(program, "a_position");
//     const resLoc = _wgl.getUniformLocation(program, "u_resolution");

//     const vao = _wgl.createVertexArray();
//     _wgl.bindVertexArray(vao);

//     const posBuffer = _wgl.createBuffer();
//     _wgl.bindBuffer(_wgl.ARRAY_BUFFER, posBuffer);

//     // 중앙 정렬 좌표 (가로 여백 45px, 세로 여백 100px)
//     const positions = new Float32Array([
//         // 왼쪽 사각형 (x: 45~145, y: 100~200)
//         45, 100,  145, 100,  45, 200,
//         45, 200,  145, 100,  145, 200,

//         // 오른쪽 사각형 (x: 155~255, y: 100~200)
//         155, 100,  255, 100,  155, 200,
//         155, 200,  255, 100,  255, 200
//     ]);

//     _wgl.bufferData(_wgl.ARRAY_BUFFER, positions, _wgl.STATIC_DRAW);
//     _wgl.enableVertexAttribArray(positionLoc);
//     _wgl.vertexAttribPointer(positionLoc, 2, _wgl.FLOAT, false, 0, 0);

//     _wgl.viewport(0, 0, _cvs.width, _cvs.height);
//     _wgl.clearColor(0, 0, 0, 0);
//     _wgl.clear(_wgl.COLOR_BUFFER_BIT);
//     _wgl.useProgram(program);
//     _wgl.uniform2f(resLoc, _cvs.width, _cvs.height);
//     _wgl.drawArrays(_wgl.TRIANGLES, 0, 12);
// })();




















// (() => {
//     /** @type {HTMLCanvasElement} */
//     let _cvs = document.querySelector('canvas#d_cvs');
//     // console.log('_cvs:', _cvs);

//     /** @type {WebGL2RenderingContext} */
//     let _wgl = _cvs.getContext('webgl2');
//     // console.log('_wgl:', _wgl);



//     const vsSource = `#version 300 es
//         in vec2 a_position;
//         uniform vec2 u_resolution;
//         void main() {
//             vec2 zeroToOne = a_position / u_resolution;
//             vec2 zeroToTwo = zeroToOne * 2.0;
//             vec2 clipSpace = zeroToTwo - 1.0;
//             gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
//         }
//     `;

//     const fsSource = `#version 300 es
//         precision highp float;
//         out vec4 outColor;
//         void main() {
//             outColor = vec4(1, 0, 0, 1);
//         }
//     `;

//     function createShader(gl, type, source) {
//         const shader = gl.createShader(type);
//         gl.shaderSource(shader, source);
//         gl.compileShader(shader);
//         return shader;
//     }

//     const program = _wgl.createProgram();
//     _wgl.attachShader(program, createShader(_wgl, _wgl.VERTEX_SHADER, vsSource));
//     _wgl.attachShader(program, createShader(_wgl, _wgl.FRAGMENT_SHADER, fsSource));
//     _wgl.linkProgram(program);

//     const positionAttributeLocation = _wgl.getAttribLocation(program, "a_position");
//     const resolutionUniformLocation = _wgl.getUniformLocation(program, "u_resolution");

//     const vao = _wgl.createVertexArray();
//     _wgl.bindVertexArray(vao);

//     const positionBuffer = _wgl.createBuffer();
//     _wgl.bindBuffer(_wgl.ARRAY_BUFFER, positionBuffer);

//     // 중앙 정렬 계산 (전체 폭 210px: 100+10+100)
//     const positions = [
//         50, 100, 150, 100, 50, 200, 50, 200, 150, 100, 150, 200,     // 왼쪽 사각형
//         160, 100, 260, 100, 160, 200, 160, 200, 260, 100, 260, 200  // 오른쪽 사각형
//     ];
//     _wgl.bufferData(_wgl.ARRAY_BUFFER, new Float32Array(positions), _wgl.STATIC_DRAW);
//     _wgl.enableVertexAttribArray(positionAttributeLocation);
//     _wgl.vertexAttribPointer(positionAttributeLocation, 2, _wgl.FLOAT, false, 0, 0);

//     _wgl.viewport(0, 0, _cvs.width, _cvs.height);
//     _wgl.clearColor(0, 0, 0, 0);
//     _wgl.clear(_wgl.COLOR_BUFFER_BIT);
//     _wgl.useProgram(program);
//     _wgl.bindVertexArray(vao);
//     _wgl.uniform2f(resolutionUniformLocation, _cvs.width, _cvs.height);
//     _wgl.drawArrays(_wgl.TRIANGLES, 0, 12);


// })();



