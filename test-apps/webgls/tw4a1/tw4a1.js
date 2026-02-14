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
        uniform vec2 u_mouse;
        void main() {
            // 첫 번째 꼭짓점(위)만 마우스에 따라 움직이게 조건부 연산
            vec4 pos = a_position;
            if (a_position.y > 0.0) {
                pos.xy = u_mouse;
                // pos.x = -1.0;
                // pos.x = 0.0 + (980.0 / 2.0);
                // pos.y = 0.1;
            }
            gl_Position = pos;
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


    // 마우스 위치를 저장할 변수와 Uniform 위치 찾기
    let _mousePos = {x: 0, y: 0};
    let _uMouseLoc = _wgl.getUniformLocation(_program, 'u_mouse');

    const fn_render = () => {
        // _wgl.clear(_wgl.COLOR_BUFFER_BIT | _wgl.DEPTH_BUFFER_BIT);
        _wgl.clear(_wgl.COLOR_BUFFER_BIT);
        _wgl.useProgram(_program);

        // GPU의 u_mouse 변수에 현재 마우스 좌표 전달
        _wgl.uniform2f(_uMouseLoc, _mousePos.x, _mousePos.y);

        _wgl.bindVertexArray(_vao);
        _wgl.drawArrays(_wgl.TRIANGLES, 0, 3);
    };

    // 마우스 이벤트 등록 (좌표 변환 포함)
    window.addEventListener('mousemove', (me) => {
        // console.log(me);
        _mousePos.x = ((me.clientX / window.innerWidth) * 2) - 1;
        _mousePos.y = ((me.clientY / window.innerHeight) * -2) + 1;

        fn_render();


        // // console.log(me.clientX, window.innerWidth);
        // let caw = window.innerWidth;
        // let chw = caw / 2.0;
        // let cx = me.clientX;
        // // console.log(chw, cx, -(chw - cx));
        // let rx = -((chw - cx) / chw);
        // // console.log(rx, chw);

        // console.log(caw, cx);
    });

    fn_render();

})();



