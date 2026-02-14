(() => {
    /** @type {HTMLCanvasElement} */
    let _cvs = document.querySelector('canvas#d_cvs');
    // console.log('_cvs:', _cvs);


    /** @type {WebGL2RenderingContext} */
    let _wgl = _cvs.getContext('webgl2');
    // console.log('_wgl:', _wgl);


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * @param {number} type
     * @param {string} code
     * @returns
     */
    const fn_createShader = (type, code) => {
        let ro = _wgl.createShader(type);
        _wgl.shaderSource(ro, code);
        _wgl.compileShader(ro);
        return ro;
    };

    const _vertextShaderCode = `
#version 300 es
in vec2 a_pos;
in vec2 a_uv;
uniform vec2 u_res;
out vec2 v_uv;
void main() {
    vec2 cs = (a_pos / u_res) * 2.0 - 1.0;
    gl_Position = vec4(cs * vec2(1, -1), 0, 1);
    v_uv = a_uv;
}
    `.trim();

    const _fragmentShaderCode = `
#version 300 es
precision highp float;
uniform sampler2D u_tex;
uniform vec2 u_res;      // 화면 해상도 (wiw, wih)
uniform vec2 u_imgSize;  // 이미지 실제 크기 (580, 400)
uniform vec2 u_ctp;      // 이미지 중심점 (화면 중앙)
uniform float u_rad;     // 회전 라디안
uniform float u_scale;   // 확대 배율
out vec4 f_clr;

void main() {
    // 1. 화면 픽셀 좌표를 이미지 중심점으로 이동 (Y축 반전 처리)
    vec2 screenPos = gl_FragCoord.xy;
    screenPos.y = u_res.y - screenPos.y;
    vec2 delta = screenPos - u_ctp;

    // 2. 역회전 연산 (픽셀 알갱이는 고정하고 데이터 위치만 계산)
    float c = cos(-u_rad);
    float s = sin(-u_rad);
    mat2 inv_rot = mat2(c, s, -s, c);

    // 3. 스케일 적용 후 원본 이미지 좌표로 복구
    vec2 rawPos = (inv_rot * delta) / u_scale;
    vec2 originPos = rawPos + (u_imgSize * 0.5);

    // 4. [핵심] 정수 인덱싱 (이게 있어야 픽셀이 안 돌아감)
    ivec2 i_uv = ivec2(floor(originPos));

    // 5. 영역 체크 및 데이터 추출 (texelFetch 사용)
    if (i_uv.x < 0 || i_uv.x >= int(u_imgSize.x) || i_uv.y < 0 || i_uv.y >= int(u_imgSize.y)) {
        discard;
    }

    // 데이터 무결성 보존 (보간 없이 픽셀값 그대로 가져옴)
    f_clr = texelFetch(u_tex, i_uv, 0);
}


// #version 300 es
// precision highp float;
// uniform sampler2D u_tex;
// uniform vec2 u_ratio;
// uniform vec2 u_imgSize; // 하드코딩 대신 유니폼 사용
// uniform float u_imgAspt;
// uniform float u_rad;
// uniform float u_scale;
// in vec2 v_uv;
// out vec4 f_clr;

// void main() {
//     vec2 pivot = vec2(0.5);

//     // 1. 회전/스케일 역연산
//     vec2 st = (v_uv - pivot) / u_ratio;
//     st.y /= u_imgAspt;

//     float c = cos(-u_rad);
//     float s = sin(-u_rad);
//     mat2 inv_rv = mat2(c, s, -s, c);

//     vec2 uv = (st / u_scale) * inv_rv;
//     uv.y *= u_imgAspt;
//     uv += pivot;

//     // 2. [핵심] 픽셀 데이터 무결성 보존 로직
//     // 계산된 UV를 이미지의 실제 픽셀 개수(u_imgSize)와 매칭시켜
//     // 정수 인덱스로 변환했다가 다시 0~1 사이의 중앙값으로 복원합니다.
//     vec2 pixelPos = uv * u_imgSize;
//     vec2 gridUv = (floor(pixelPos) + 0.5) / u_imgSize;

//     // 3. 영역 밖 처리 및 샘플링
//     if (gridUv.x < 0.0 || gridUv.x > 1.0 || gridUv.y < 0.0 || gridUv.y > 1.0) discard;

//     // 위 main 함수 마지막 줄 대신 사용
//     ivec2 i_uv = ivec2(floor(uv * u_imgSize));
//     if (i_uv.x < 0 || i_uv.x >= int(u_imgSize.x) || i_uv.y < 0 || i_uv.y >= int(u_imgSize.y)) discard;
//     f_clr = texelFetch(u_tex, i_uv, 0);
// }
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
    _wgl.vertexAttribPointer(_al_pos, 2, _wgl.FLOAT, false, 16, 0);

    let _al_uv = _wgl.getAttribLocation(_program, 'a_uv');
    _wgl.enableVertexAttribArray(_al_uv);
    _wgl.vertexAttribPointer(_al_uv, 2, _wgl.FLOAT, false, 16, 8);

    let _ul_res = _wgl.getUniformLocation(_program, 'u_res');
    let _ul_ratio = _wgl.getUniformLocation(_program, 'u_ratio');
    let _ul_imgAspt = _wgl.getUniformLocation(_program, 'u_imgAspt');
    let _ul_ctp = _wgl.getUniformLocation(_program, 'u_ctp');
    let _ul_rad = _wgl.getUniformLocation(_program, 'u_rad');
    let _ul_scale = _wgl.getUniformLocation(_program, 'u_scale');
    let _ul_imgSize = _wgl.getUniformLocation(_program, 'u_imgSize');

    let drct = new DOMRect(10, 10, 580.0, 400.0);
    let maxsz;
    let rad = 0.0;
    let scale = 1.0;

    const fn_render = () => {
        let wiw = window.innerWidth - 8;
        let wih = window.innerHeight - 8;

        _cvs.width = wiw;
        _cvs.height = wih;

        _wgl.viewport(0, 0, wiw, wih);
        _wgl.clearColor(0.3, 0.2, 0.1, 1);
        _wgl.clear(_wgl.COLOR_BUFFER_BIT);

        let ctx = wiw / 2;
        let cty = wih / 2;

        drct.x = Math.floor(ctx - (drct.width / 2));
        drct.y = Math.floor(cty - (drct.height / 2));
        _wgl.bufferData(_wgl.ARRAY_BUFFER, new Float32Array([
            drct.left,  drct.top,        0.0, 0.0,
            drct.right, drct.top,        1.0, 0.0,
            drct.left,  drct.bottom,     0.0, 1.0,
            drct.left,  drct.bottom,     0.0, 1.0,
            drct.right, drct.top,        1.0, 0.0,
            drct.right, drct.bottom,     1.0, 1.0
        ]), _wgl.STATIC_DRAW);

        _wgl.useProgram(_program);
        _wgl.uniform2f(_ul_res, wiw, wih);
        // _wgl.uniform1f(_ul_maxsz, maxsz);
        let rtx = _heImage.width / maxsz;
        let rty = _heImage.height / maxsz;
        _wgl.uniform2f(_ul_ratio, rtx, rty);
        _wgl.uniform1f(_ul_imgAspt, _heImage.width / _heImage.height);
        _wgl.uniform2f(_ul_ctp, ctx, cty);
        _wgl.uniform1f(_ul_rad, rad);
        _wgl.uniform1f(_ul_scale, scale);
        _wgl.uniform2f(_ul_imgSize, _heImage.width, _heImage.height);

        _wgl.drawArrays(_wgl.TRIANGLES, 0, 6);
    };


    let _texture = _wgl.createTexture();
    let _heImage = new Image();
    _heImage.addEventListener('load', (_) => {
        maxsz = Math.sqrt(Math.pow(_heImage.width, 2) + Math.pow(_heImage.height, 2));
        drct.width = maxsz;
        drct.height = maxsz;

        _wgl.bindTexture(_wgl.TEXTURE_2D, _texture);
        _wgl.texImage2D(_wgl.TEXTURE_2D, 0, _wgl.RGBA, _wgl.RGBA, _wgl.UNSIGNED_BYTE, _heImage);
        _wgl.texParameteri(_wgl.TEXTURE_2D, _wgl.TEXTURE_MIN_FILTER, _wgl.NEAREST);
        _wgl.texParameteri(_wgl.TEXTURE_2D, _wgl.TEXTURE_MAG_FILTER, _wgl.NEAREST);

        fn_render();
    });
    _heImage.src = './img-c.png';

    window.addEventListener('resize', (_) => {
        fn_render();
    });

    window.addEventListener('keydown', (ke) => {
        switch(ke.code) {
            case 'KeyA': {
                rad -= 0.01;
                fn_render();
                break;
            }
            case 'KeyD': {
                rad += 0.01;
                fn_render();
                break;
            }
            case 'KeyW': {
                scale += 0.1;
                fn_render();
                break;
            }
            case 'KeyS': {
                scale -= 0.1;
                fn_render();
                break;
            }
        }
    });

})();



