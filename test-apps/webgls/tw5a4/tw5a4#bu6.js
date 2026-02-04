(() => {
    const _cvs = document.querySelector('canvas#d_cvs');
    const _wgl = _cvs.getContext('webgl2', { antialias: false, alpha: false });

    const fn_shader = (t, c) => {
        let s = _wgl.createShader(t);
        _wgl.shaderSource(s, c);
        _wgl.compileShader(s);
        if (!_wgl.getShaderParameter(s, _wgl.COMPILE_STATUS)) console.error(_wgl.getShaderInfoLog(s));
        return s;
    };

    const vs = `#version 300 es
    layout(location = 0) in vec2 a_p;
    void main() { gl_Position = vec4(a_p, 0, 1); }`.trim();

    const fs = `#version 300 es
    precision highp float;
    uniform sampler2D u_t;
    uniform vec2 u_r;      // Canvas size (pixel)
    uniform vec2 u_is;     // Image size
    uniform vec2 u_c;      // Center (pixel)
    uniform float u_a;     // Angle
    uniform float u_s;     // Scale
    out vec4 f_c;

    void main() {
        // [핵심] 화면의 물리적 픽셀 위치를 정수로 고정하여 '알갱이' 모양 변형 차단
        vec2 p = vec2(floor(gl_FragCoord.x), floor(gl_FragCoord.y));

        // y축 반전 보정 (WebGL 좌표계 대응)
        vec2 d = p - vec2(u_c.x, u_r.y - u_c.y);

        // 역회전 및 역스케일
        float cosA = cos(-u_a);
        float sinA = sin(-u_a);
        mat2 inv_rot = mat2(cosA, sinA, -sinA, cosA);

        // 원본 이미지 인덱스 계산
        vec2 rawPos = (inv_rot * d) / u_s + (u_is * 0.5);
        ivec2 imgIdx = ivec2(floor(rawPos));

        // 샘플링 범위 체크
        if (imgIdx.x < 0 || imgIdx.x >= int(u_is.x) || imgIdx.y < 0 || imgIdx.y >= int(u_is.y)) {
            discard;
        }

        // texelFetch로 주변색 섞임 방지
        f_c = texelFetch(u_t, imgIdx, 0);
    }`.trim();

    const _pgm = _wgl.createProgram();
    _wgl.attachShader(_pgm, fn_shader(_wgl.VERTEX_SHADER, vs));
    _wgl.attachShader(_pgm, fn_shader(_wgl.FRAGMENT_SHADER, fs));
    _wgl.linkProgram(_pgm);

    const _buf = _wgl.createBuffer();
    _wgl.bindBuffer(_wgl.ARRAY_BUFFER, _buf);
    _wgl.bufferData(_wgl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), _wgl.STATIC_DRAW);
    _wgl.enableVertexAttribArray(0);
    _wgl.vertexAttribPointer(0, 2, _wgl.FLOAT, false, 0, 0);

    let rad = 0.0, sc = 1.0, _img = new Image();

    const fn_draw = () => {
        const dpr = window.devicePixelRatio || 1;
        const w = Math.round(window.innerWidth * dpr);
        const h = Math.round(window.innerHeight * dpr);

        _cvs.width = w; _cvs.height = h;
        _cvs.style.width = window.innerWidth + 'px';
        _cvs.style.height = window.innerHeight + 'px';

        _wgl.viewport(0, 0, w, h);
        _wgl.clearColor(0, 0, 0, 1);
        _wgl.clear(_wgl.COLOR_BUFFER_BIT);

        _wgl.useProgram(_pgm);
        _wgl.uniform2f(_wgl.getUniformLocation(_pgm, 'u_r'), w, h);
        _wgl.uniform2f(_wgl.getUniformLocation(_pgm, 'u_is'), _img.width, _img.height);
        _wgl.uniform2f(_wgl.getUniformLocation(_pgm, 'u_c'), w / 2, h / 2);
        _wgl.uniform1f(_wgl.getUniformLocation(_pgm, 'u_a'), rad);
        _wgl.uniform1f(_wgl.getUniformLocation(_pgm, 'u_s'), sc);

        _wgl.drawArrays(_wgl.TRIANGLES, 0, 3);
    };

    _img.onload = () => {
        const t = _wgl.createTexture();
        _wgl.bindTexture(_wgl.TEXTURE_2D, t);
        _wgl.texImage2D(_wgl.TEXTURE_2D, 0, _wgl.RGBA, _wgl.RGBA, _wgl.UNSIGNED_BYTE, _img);
        _wgl.texParameteri(_wgl.TEXTURE_2D, _wgl.TEXTURE_MIN_FILTER, _wgl.NEAREST);
        _wgl.texParameteri(_wgl.TEXTURE_2D, _wgl.TEXTURE_MAG_FILTER, _wgl.NEAREST);
        fn_draw();
    };
    _img.src = './img-c.png';

    window.onkeydown = (e) => {
        if (e.code === 'KeyA') rad -= 0.05;
        if (e.code === 'KeyD') rad += 0.05;
        if (e.code === 'KeyW') sc *= 1.1;
        if (e.code === 'KeyS') sc /= 1.1;
        fn_draw();
    };
    window.onresize = fn_draw;
})();