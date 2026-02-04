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

    const _vertextShaderCode = `#version 300 es
in vec2 a_pos;
in vec2 a_uv;
uniform vec2 u_res;
uniform vec2 u_ctp;
uniform float u_rad;
out vec2 v_uv;
void main() {
    // vec2 p1 = a_pos / u_res;
    // vec2 p2 = p1 * 2.0;
    // gl_Position = vec4(p2.x - 1.0, 1.0 - p2.y, 0, 1);
    // v_uv = a_uv;


    // // 픽셀 좌표를 NDC(-1 ~ 1)로 한 번에 변환
    // gl_Position = vec4(((a_pos / u_res) * 2.0) - 1.0, 0.0, 1.0);
    // // Y축 뒤집기 (선택 사항: 현재 JS에서 top이 위라면 필요)
    // gl_Position.y *= -1.0;
    // v_uv = a_uv;


    // float tc = cos(u_rad);
    // float ts = sin(u_rad);
    // mat2 rv = mat2(tc, ts, -ts, tc);

    // vec2 rp = rv * a_pos;
    // vec2 sp = floor(rp) + 0.5;
    // vec2 zto = sp / u_res;
    // vec2 cs = (zto * 2.0) - 1.0;

    // gl_Position = vec4(cs * vec2(1, -1), 0, 1);
    // v_uv = a_uv;


    float tc = cos(u_rad);
    float ts = sin(u_rad);
    mat2 rv = mat2(tc, ts, -ts, tc);

    vec2 rp = (rv * (a_pos - u_ctp)) + u_ctp;
    vec2 zto = rp / u_res;
    vec2 cs = (zto * 2.0) - 1.0;

    gl_Position = vec4(cs * vec2(1, -1), 0, 1);
    v_uv = a_uv;
}
    `.trim();

    const _fragmentShaderCode = `#version 300 es
precision highp float;
uniform sampler2D u_tex;
in vec2 v_uv;
out vec4 f_clr;
void main() {
    f_clr = texture(u_tex, v_uv);
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
    let _ul_ctp = _wgl.getUniformLocation(_program, 'u_ctp');
    let _ul_rad = _wgl.getUniformLocation(_program, 'u_rad');

    let drct = new DOMRect(10, 10, 580.0, 400.0);
    let rad = 0.0;

    const fn_render = () => {
        let wiw = window.innerWidth - 8;
        let wih = window.innerHeight - 8;

        _cvs.width = wiw;
        _cvs.height = wih;

        _wgl.viewport(0, 0, wiw, wih);
        _wgl.clearColor(0.3, 0.2, 0.1, 1);
        _wgl.clear(_wgl.COLOR_BUFFER_BIT);

        // _wgl.bindBuffer(_wgl.ARRAY_BUFFER, _posbff);

        let ctx = wiw / 2;
        let cty = wih / 2;

        drct.x = Math.floor(ctx - (drct.width / 2));
        drct.y = Math.floor(cty - (drct.height / 2));
        // console.log(drct);
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
        _wgl.uniform2f(_ul_ctp, ctx, cty);
        _wgl.uniform1f(_ul_rad, rad);

        // _wgl.bindTexture(_wgl.TEXTURE_2D, _texture);
        _wgl.drawArrays(_wgl.TRIANGLES, 0, 6);
    };


    let _texture = _wgl.createTexture();
    let _heImage = new Image();
    _heImage.addEventListener('load', (_) => {
        // console.log(_heImage.width);
        // drct.width = _heImage.width;
        // drct.height = _heImage.height;

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

    // window.addEventListener('mousemove', (me) => {
    //     drct.x = me.clientX;
    //     drct.y = me.clientY;
    //     fn_render();
    // });

    window.addEventListener('mousemove', (me) => {
        rad += 0.01;

        fn_render();
    });

})();












//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// (() => {
//     /** @type {HTMLCanvasElement} */
//     let _cvs = document.querySelector('canvas#d_cvs');
//     // console.log('_cvs:', _cvs);


//     /** @type {WebGL2RenderingContext} */
//     let _wgl = _cvs.getContext('webgl2');
//     // console.log('_wgl:', _wgl);


//     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     /**
//      * @param {number} type
//      * @param {string} code
//      * @returns
//      */
//     const fn_createShader = (type, code) => {
//         let ro = _wgl.createShader(type);
//         _wgl.shaderSource(ro, code);
//         _wgl.compileShader(ro);
//         return ro;
//     };

//     const _vertextShaderCode = `#version 300 es
// in vec2 a_pos;
// in vec2 a_uv;
// out vec2 v_uv;
// void main() {
//     gl_Position = vec4(a_pos, 0, 1);
//     v_uv = a_uv;
// }
//     `.trim();

//     const _fragmentShaderCode = `#version 300 es
// precision highp float;
// uniform sampler2D u_tex;
// in vec2 v_uv;
// out vec4 f_clr;
// void main() {
//     f_clr = texture(u_tex, v_uv);
// }
//     `.trim();


//     let _program = _wgl.createProgram();
//     _wgl.attachShader(_program, fn_createShader(_wgl.VERTEX_SHADER, _vertextShaderCode));
//     _wgl.attachShader(_program, fn_createShader(_wgl.FRAGMENT_SHADER, _fragmentShaderCode));
//     _wgl.linkProgram(_program);

//     let _vao = _wgl.createVertexArray();
//     _wgl.bindVertexArray(_vao);

//     let _posbff = _wgl.createBuffer();
//     _wgl.bindBuffer(_wgl.ARRAY_BUFFER, _posbff);


//     let _al_pos = _wgl.getAttribLocation(_program, 'a_pos');
//     _wgl.enableVertexAttribArray(_al_pos);
//     _wgl.vertexAttribPointer(_al_pos, 2, _wgl.FLOAT, false, 16, 0);

//     let _al_uv = _wgl.getAttribLocation(_program, 'a_uv');
//     _wgl.enableVertexAttribArray(_al_uv);
//     _wgl.vertexAttribPointer(_al_uv, 2, _wgl.FLOAT, false, 16, 8);


//     const fn_render = () => {
//         let wiw = window.innerWidth - 8;
//         let wih = window.innerHeight - 8;

//         _cvs.width = wiw;
//         _cvs.height = wih;

//         _wgl.viewport(0, 0, wiw, wih);
//         _wgl.clearColor(0.3, 0.2, 0.1, 1);
//         _wgl.clear(_wgl.COLOR_BUFFER_BIT);

//         /**
//          * 정수 좌표를 NDC로 직접 변환 (나눗셈 오차 최소화)
//          * @param {number} tx
//          * @param {number} ty
//          * @returns
//          */
//         const fn_gtn = (tx, ty) => {
//             return {
//                 x: ((tx / wiw) * 2) - 1,
//                 y: 1 - ((ty / wih) * 2),
//             };
//         };
//         let p1 = fn_gtn(10, 10),
//             p2 = fn_gtn(310, 10),
//             p3 = fn_gtn(10, 210),
//             p4 = fn_gtn(310, 210);
//         console.log(p1, p2, p3, p4);
//         // p4.y = -1;

//         _wgl.bindBuffer(_wgl.ARRAY_BUFFER, _posbff);
//         _wgl.bufferData(_wgl.ARRAY_BUFFER, new Float32Array([
//             p1.x, p1.y, 0, 0, p2.x, p2.y, 1, 0, p3.x, p3.y, 0, 1,
//             p3.x, p3.y, 0, 1, p2.x, p2.y, 1, 0, p4.x, p4.y, 1, 1
//         ]), _wgl.DYNAMIC_DRAW);

//         _wgl.useProgram(_program);
//         _wgl.bindTexture(_wgl.TEXTURE_2D, _texture);
//         _wgl.drawArrays(_wgl.TRIANGLES, 0, 6);
//     };


//     let _texture = _wgl.createTexture();
//     let _heImage = new Image();
//     _heImage.addEventListener('load', (_) => {
//         _wgl.bindTexture(_wgl.TEXTURE_2D, _texture);
//         _wgl.texImage2D(_wgl.TEXTURE_2D, 0, _wgl.RGBA, _wgl.RGBA, _wgl.UNSIGNED_BYTE, _heImage);
//         _wgl.texParameteri(_wgl.TEXTURE_2D, _wgl.TEXTURE_MIN_FILTER, _wgl.NEAREST);
//         _wgl.texParameteri(_wgl.TEXTURE_2D, _wgl.TEXTURE_MAG_FILTER, _wgl.NEAREST);

//         fn_render();
//     });
//     _heImage.src = './img-c.png';

//     window.addEventListener('resize', (_) => {
//         fn_render();
//     });

// })();