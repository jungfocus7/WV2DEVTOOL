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
uniform vec2 u_res;
// uniform float u_maxsz;
uniform vec2 u_maxsz;
uniform vec2 u_ratio;
uniform float u_imgAspt;
uniform float u_rad;
uniform float u_scale;
in vec2 v_uv;
out vec4 f_clr;

void main() {
    // // 1. 회전 중심 (0.5, 0.5)
    // vec2 pivot = vec2(0.5);

    // // 2. 역회전 행렬 계산 (이미지를 돌리기 위해 반대로 회전)
    // float c = cos(-u_rad);
    // float s = sin(-u_rad);
    // mat2 inv_rv = mat2(c, s, -s, c);

    // // 3. 좌표 역계산: (좌표 - 중심) -> 스케일 역산 -> 회전 -> 중심 복귀
    // // v_uv = v_uv / u_maxsz;
    // vec2 uv = ((v_uv - pivot) / u_scale) * inv_rv + pivot;
    // // vec2 uv = ((v_uv - pivot) * inv_rv) + pivot;

    // // 4. 사각형 밖은 투명하게 (선택 사항)
    // if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;

    // f_clr = texture(u_tex, uv);


    // vec2 pivot = vec2(0.5);

    // // 1. 커진 도화지(v_uv)에서 원본 이미지 비율 영역으로 수축
    // vec2 st = (v_uv - pivot) / u_ratio + pivot;

    // // 2. 역회전 행렬
    // float c = cos(-u_rad);
    // float s = sin(-u_rad);
    // mat2 inv_rv = mat2(c, s, -s, c);

    // // 3. 스케일 및 회전 적용
    // vec2 uv = ((st - pivot) / u_scale) * inv_rv + pivot;

    // // 4. 투명 영역 처리
    // if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;

    // f_clr = texture(u_tex, uv);



    // vec2 pivot = vec2(0.5);

    // // 1. 캔버스 비율 계산 (예: 1.5)
    // float aspect = u_res.x / u_res.y;

    // // 2. 비율 보정 (x축을 캔버스 비율에 맞춰 늘림)
    // vec2 st = (v_uv - pivot) / u_ratio;
    // st.x *= aspect; // 회전 전 비율 보정

    // // 3. 역회전 행렬 적용
    // float c = cos(-u_rad);
    // float s = sin(-u_rad);
    // mat2 inv_rv = mat2(c, s, -s, c);
    // vec2 uv = (st / u_scale) * inv_rv;

    // // 4. 비율 보정 해제 및 원복
    // uv.x /= aspect;
    // uv += pivot;

    // if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
    // f_clr = texture(u_tex, uv);



    // vec2 pivot = vec2(0.5);

    // // 1. 도화지 대비 이미지 수축
    // vec2 st = (v_uv - pivot) / u_ratio;

    // // 2. 종횡비 보정 (회전 전)
    // st.y /= u_imgAspt;

    // // 3. 회전 연산
    // float c = cos(-u_rad);
    // float s = sin(-u_rad);
    // mat2 inv_rv = mat2(c, s, -s, c);
    // vec2 uv = (st / u_scale) * inv_rv;

    // // 4. 종횡비 복원 (회전 후) 및 원복
    // uv.y *= u_imgAspt;
    // uv += pivot;

    // if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
    // f_clr = texture(u_tex, uv);


    vec2 pivot = vec2(0.5);
    vec2 imgSize = vec2(580.0, 400.0); // 이미지의 실제 픽셀 크기 전달 필요

    // 1. 기존과 동일하게 회전/스케일 좌표 계산
    vec2 st = (v_uv - pivot) / u_ratio;
    st.y /= u_imgAspt;
    float c = cos(-u_rad);
    float s = sin(-u_rad);
    mat2 inv_rv = mat2(c, s, -s, c);
    vec2 uv = (st / u_scale) * inv_rv;
    uv.y *= u_imgAspt;
    uv += pivot;

    // 2. [핵심] 계산된 UV를 이미지 픽셀 단위로 툭툭 끊어지게 만듦 (Floor 연산)
    // 이렇게 하면 확대 시 픽셀 입자가 화면과 평행한 정사각형으로 보입니다.
    uv = floor(uv * imgSize) / imgSize;

    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) discard;
    f_clr = texture(u_tex, uv);
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
    _wgl.vertexAttribPointer(_al_pos, 2, _wgl.FLOAT, false, 16, 0);

    let _al_uv = _wgl.getAttribLocation(_program, 'a_uv');
    _wgl.enableVertexAttribArray(_al_uv);
    _wgl.vertexAttribPointer(_al_uv, 2, _wgl.FLOAT, false, 16, 8);

    let _ul_res = _wgl.getUniformLocation(_program, 'u_res');
    let _ul_maxsz = _wgl.getUniformLocation(_program, 'u_maxsz');
    let _ul_ratio = _wgl.getUniformLocation(_program, 'u_ratio');
    let _ul_imgAspt = _wgl.getUniformLocation(_program, 'u_imgAspt');
    let _ul_ctp = _wgl.getUniformLocation(_program, 'u_ctp');
    let _ul_rad = _wgl.getUniformLocation(_program, 'u_rad');
    let _ul_scale = _wgl.getUniformLocation(_program, 'u_scale');

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



