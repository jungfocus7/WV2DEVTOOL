(() => {
    /** @type {HTMLCanvasElement} */
    let _cvs = document.querySelector('canvas#d_cvs');
    // console.log('_cvs:', _cvs);

    /** @type {WebGL2RenderingContext} */
    let _wgl = _cvs.getContext('webgl2');
    // console.log('_wgl:', _wgl);


    // _wgl.clearColor(0.0, 0.2, 0.0, 1.0);
    // _wgl.clear(_wgl.COLOR_BUFFER_BIT | _wgl.DEPTH_BUFFER_BIT);


    //###01) 정점 데이터 정의 (x, y 좌표)
    /** @type {Float32Array} */
    let _vertexArr = new Float32Array([
        0.0, 0.5,
        -0.5, -0.5,
        0.5, -0.5,
    ]);

    //###02) Buffer 생성 및 데이터 전송
    /** @type {WebGLBuffer} */
    let _wbuf = _wgl.createBuffer();
    _wgl.bindBuffer(_wgl.ARRAY_BUFFER, _wbuf);
    _wgl.bufferData(_wgl.ARRAY_BUFFER, _vertexArr, _wgl.STATIC_DRAW);

    //###03) VAO(Vertex Array Object) 생성 - 상태를 기록하는 상자
    /** @type {WebGLVertexArrayObject} */
    let _vao = _wgl.createVertexArray();
    _wgl.bindVertexArray(_vao);


    let _codeVertexShader = `#version 300 es
        in vec4 a_position;
        void main() {
            gl_Position = a_position;
        }
    `.trim();

    /** @type {WebGLShader} */
    let _gsdVertext = _wgl.createShader(_wgl.VERTEX_SHADER);
    _wgl.shaderSource(_gsdVertext, _codeVertexShader);
    _wgl.compileShader(_gsdVertext);


    let _codeFragmentShader = `#version 300 es
        precision highp float;
        out vec4 outColor;
        void main() {
            outColor = vec4(1, 0.5, 0, 1); // 오렌지색
        }
    `.trim();

    /** @type {WebGLShader} */
    let _gsdFragment = _wgl.createShader(_wgl.FRAGMENT_SHADER);
    _wgl.shaderSource(_gsdFragment, _codeFragmentShader);
    _wgl.compileShader(_gsdFragment);


    /** @type {WebGLProgram} */
    let _program = _wgl.createProgram();
    _wgl.attachShader(_program, _gsdVertext);
    _wgl.attachShader(_program, _gsdFragment);
    _wgl.linkProgram(_program);


    //###04) 셰이더의 'a_position' 변수 위치 찾기 및 활성화
    let _pal = _wgl.getAttribLocation(_program, 'a_position');
    _wgl.enableVertexAttribArray(_pal);
    _wgl.vertexAttribPointer(_pal, 2, _wgl.FLOAT, false, 0, 0);


    _cvs.width = _cvs.clientWidth;
    _cvs.height = _cvs.clientHeight;

    // GPU에게 바뀐 해상도(그릴 영역)를 알려줌
    _wgl.viewport(0, 0, _cvs.width, _cvs.height);

    _wgl.clearColor(0.0, 0.2, 0.0, 1.0);
    _wgl.clear(_wgl.COLOR_BUFFER_BIT | _wgl.DEPTH_BUFFER_BIT);


    _wgl.useProgram(_program);
    _wgl.bindVertexArray(_vao);
    _wgl.drawArrays(_wgl.TRIANGLES, 0, 3);

})();





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// (() => {
//     // /** @type {HTMLCanvasElement} */
//     // let _cvs = document.querySelector('canvas#d_cvs');
//     /** @type {HTMLCanvasElement} */
//     let _cvs = document.querySelector('canvas#d_cvs');
//     // console.log('_cvs:', _cvs);

//     // /** @type {WebGL2RenderingContext} */
//     let _wgl = _cvs.getContext('webgl2');
//     // console.log('_wgl:', _wgl);


//     _wgl.clearColor(0.0, 0.2, 0.0, 1.0);
//     _wgl.clear(_wgl.COLOR_BUFFER_BIT | _wgl.DEPTH_BUFFER_BIT);

//     let _vertexArr = new Float32Array([
//         0.0, 0.5,
//         -0.5, -0.5,
//         0.5, -0.5,
//     ]);

//     let _wgbf = _wgl.createBuffer();
//     _wgl.bindBuffer(_wgl.ARRAY_BUFFER, _wgbf);
//     _wgl.bufferData(_wgl.ARRAY_BUFFER, _vertexArr, _wgl.STATIC_DRAW);

// })();





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// (() => {
//     _wgl.clearColor(0.0, 0.2, 0.0, 1.0);
//     _wgl.clear(_wgl.COLOR_BUFFER_BIT | _wgl.DEPTH_BUFFER_BIT);

//     let vertexArr = new Float32Array([
//         0.0, 0.5,
//         -0.5, -0.5,
//         0.5, -0.5,
//     ]);

//     // let gv = 0.0;
//     // const fn_loop = () => {
//     //     requestAnimationFrame(fn_loop);
//     //     _wgl.clearColor(0.0, gv, 0.0, 1.0);
//     //     _wgl.clear(_wgl.COLOR_BUFFER_BIT | _wgl.DEPTH_BUFFER_BIT);
//     //     gv += 0.001; if (gv > 1.0) gv = 0.0;
//     //     console.log(gv);
//     // };
//     // fn_loop();

// })();