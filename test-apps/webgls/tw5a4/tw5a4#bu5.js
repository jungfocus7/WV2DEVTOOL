(() => {
    /** @type {HTMLCanvasElement} */
    let _cvs = document.querySelector('canvas#d_cvs');
    /** @type {WebGL2RenderingContext} */
    let _wgl = _cvs.getContext('webgl2');

    const fn_createShader = (type, code) => {
        let ro = _wgl.createShader(type);
        _wgl.shaderSource(ro, code);
        _wgl.compileShader(ro);
        if (!_wgl.getShaderParameter(ro, _wgl.COMPILE_STATUS)) {
            console.error(_wgl.getShaderInfoLog(ro));
        }
        return ro;
    };

    const _vertextShaderCode = `
#version 300 es
in vec2 a_pos;
uniform vec2 u_res;

void main() {
    // 화면 좌표(0~width)를 WebGL NDC(-1~1)로 변환
    vec2 cs = (a_pos / u_res) * 2.0 - 1.0;
    gl_Position = vec4(cs * vec2(1, -1), 0, 1);
}

        `.trim();

    const _fragmentShaderCode = `
#version 300 es
precision highp float;
uniform sampler2D u_tex;
uniform vec2 u_res;      // 캔버스 크기
uniform vec2 u_imgSize;  // 이미지 원본 크기
uniform vec2 u_ctp;      // 회전 중심점
uniform float u_rad;     // 회전 각도
uniform float u_scale;   // 확대 배율
out vec4 f_clr;

void main() {
    // 1. 화면상의 절대 픽셀 좌표 (Y축 반전)
    vec2 screenPos = vec2(gl_FragCoord.x, u_res.y - gl_FragCoord.y);

    // 2. 중심점 기준 상대 좌표 계산 및 역회전/역스케일
    vec2 delta = screenPos - u_ctp;
    float c = cos(-u_rad);
    float s = sin(-u_rad);
    mat2 inv_rot = mat2(c, s, -s, c);

    // 3. 원본 이미지상의 정수 좌표(Pixel Index) 도출
    vec2 rawPos = (inv_rot * delta) / u_scale + (u_imgSize * 0.5);
    ivec2 i_uv = ivec2(floor(rawPos));

    // 4. 영역 체크 및 픽셀 데이터 직접 추출
    if (i_uv.x < 0 || i_uv.x >= int(u_imgSize.x) || i_uv.y < 0 || i_uv.y >= int(u_imgSize.y)) discard;
    f_clr = texelFetch(u_tex, i_uv, 0);
}
            `.trim();

    let _program = _wgl.createProgram();
    _wgl.attachShader(_program, fn_createShader(_wgl.VERTEX_SHADER, _vertextShaderCode));
    _wgl.attachShader(_program, fn_createShader(_wgl.FRAGMENT_SHADER, _fragmentShaderCode));
    _wgl.linkProgram(_program);

    let _vao = _wgl.createVertexArray();
    _wgl.bindVertexArray(_vao);
    let _posbff = _wgl.createBuffer();
    _wgl.bindBuffer(_wgl.ARRAY_BUFFER, _posbff);

    let _al_pos = _wgl.getAttribLocation(_program, 'a_pos');
    _wgl.enableVertexAttribArray(_al_pos);
    _wgl.vertexAttribPointer(_al_pos, 2, _wgl.FLOAT, false, 0, 0);

    let _ul_res = _wgl.getUniformLocation(_program, 'u_res');
    let _ul_imgSize = _wgl.getUniformLocation(_program, 'u_imgSize');
    let _ul_ctp = _wgl.getUniformLocation(_program, 'u_ctp');
    let _ul_rad = _wgl.getUniformLocation(_program, 'u_rad');
    let _ul_scale = _wgl.getUniformLocation(_program, 'u_scale');

    let rad = 0.0;
    let scale = 1.0;
    let _heImage = new Image();

    const fn_render = () => {
        let wiw = window.innerWidth - 8;
        let wih = window.innerHeight - 8;
        _cvs.width = wiw; _cvs.height = wih;
        _wgl.viewport(0, 0, wiw, wih);
        _wgl.clearColor(0.3, 0.2, 0.1, 1);
        _wgl.clear(_wgl.COLOR_BUFFER_BIT);

        let ctx = wiw / 2;
        let cty = wih / 2;

        // 화면 전체를 덮는 사각형 (이미지가 회전해도 잘리지 않게 충분히 크게 설정)
        _wgl.bufferData(_wgl.ARRAY_BUFFER, new Float32Array([
            0, 0, wiw, 0, 0, wih, 0, wih, wiw, 0, wiw, wih
        ]), _wgl.STATIC_DRAW);

        _wgl.useProgram(_program);
        _wgl.uniform2f(_ul_res, wiw, wih);
        _wgl.uniform2f(_ul_imgSize, _heImage.width, _heImage.height);
        _wgl.uniform2f(_ul_ctp, ctx, cty);
        _wgl.uniform1f(_ul_rad, rad);
        _wgl.uniform1f(_ul_scale, scale);

        _wgl.drawArrays(_wgl.TRIANGLES, 0, 6);
    };

    _heImage.addEventListener('load', () => {
        let tex = _wgl.createTexture();
        _wgl.bindTexture(_wgl.TEXTURE_2D, tex);
        _wgl.texImage2D(_wgl.TEXTURE_2D, 0, _wgl.RGBA, _wgl.RGBA, _wgl.UNSIGNED_BYTE, _heImage);
        _wgl.texParameteri(_wgl.TEXTURE_2D, _wgl.TEXTURE_MIN_FILTER, _wgl.NEAREST);
        _wgl.texParameteri(_wgl.TEXTURE_2D, _wgl.TEXTURE_MAG_FILTER, _wgl.NEAREST);
        fn_render();
    });
    _heImage.src = './img-c.png';

    window.addEventListener('keydown', (ke) => {
        if (ke.code === 'KeyA') rad -= 0.05;
        if (ke.code === 'KeyD') rad += 0.05;
        if (ke.code === 'KeyW') scale += 0.1;
        if (ke.code === 'KeyS') scale -= 0.1;
        fn_render();
    });
})();