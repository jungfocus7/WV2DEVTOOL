// const _md = Object.seal({
//     /** @type {HTMLDivElement} */
//     cvs: document.querySelector('canvas.c_cvs'),
// });

// _md.cvs;

(() => {
    /** @type {HTMLCanvasElement} */
    const _cvs = document.querySelector('canvas.c_cvs');
    // console.log('_cvs:', _cvs);

    /** @type {WebGL2RenderingContext} */
    const _wgl = _cvs.getContext("webgl2");
    // console.log('_wgl:', _wgl);

    /** @type {HTMLSpanElement} */
    const _info = document.querySelector('span.c_info');


    let red = 0.0;
    let green = 0.0;
    let blue = 0.0;
    let alpha = 1.0;

    // // Set clear color to black, fully opaque
    // _wgl.clearColor(red, green, blue, alpha);
    // // Clear the color buffer with specified clear color
    // _wgl.clear(_wgl.COLOR_BUFFER_BIT);

    // const fn_loop = () => {
    //     requestAnimationFrame(fn_loop);
    //     // red += 0.001
    //     _wgl.clearColor(red, green, blue, alpha);
    //     _wgl.clear(_wgl.COLOR_BUFFER_BIT);
    // };
    // requestAnimationFrame(fn_loop);


    /**
     * @param {number} tv
     * @returns
     */
    const fn_calcHalf = (tv) => {
        if (tv > 4) {
            if ((tv % 2) === 0) {
                return (tv / 2) - 1;
            } else {
                return tv / 2;
            }
        } else {
            return tv;
        }
    };

    /**
     * @param {number} hv
     * @param {number} ov
     * @returns
     */
    const getev = (hv, ov) => {
        let rv = hv - ov;
        if (rv < 0) {
            if (rv === -1)
                return 0;
            else
                return (ov - hv) - 1;
        } else {
            return rv;
        }
        // if (ev <= -1) {
        //     return 0;
        // } else {
        //     return ov;
        // }
        // if ((tv <= 0) && (tv >= -1)) {
        //     return 0;
        // } else {
        //     return tv;
        // }
    };

    _cvs.addEventListener('mousemove', (pe) => {
        let cw = _cvs.clientWidth;
        let ch = _cvs.clientHeight;
        // console.log(cw, ch);

        let ox = pe.offsetX;
        let oy = pe.offsetY;
        // console.log(ox, oy);

        let hw = fn_calcHalf(cw);
        let hh = fn_calcHalf(ch);
        // console.log(hw, hh);

        // let ex = getev(hw - ox);
        // if (ex <= -1) ex = ox - hw;
        // let ey = getev(hh - oy);
        // if (ey <= -1) ey = oy - hh;
        // // console.log(ex, ey);

        let ex = getev(hw, ox);
        // console.log(hh, ey);
        let ey = getev(hh, oy);
        // console.log(ex, ey);

        // console.log(
        //     getev(149, 147),
        //     getev(149, 148),
        //     getev(149, 149),
        //     getev(149, 150),
        //     getev(149, 151),
        //     getev(149, 152));

        let rx = ex / hw;
        // let ry = ey / hh;
        // console.log(rx);

        // red = rx;
        // green = ry;
        alpha = rx;
        _wgl.clearColor(red, green, blue, alpha);
        _wgl.clear(_wgl.COLOR_BUFFER_BIT);


        _info.textContent = `
${red.toFixed(1)}, ${green.toFixed(1)}, ${blue.toFixed(1)}, ${alpha.toFixed(1)}
        `.trim();

    });




    // let txa = Object.entries(_wgl);
    // console.log(txa);

    // let tya = Object.getPrototypeOf(_wgl);
    // console.log(tya);

    // let tza = Object.getPrototypeOf(tya);
    // console.log(tza);



})();

