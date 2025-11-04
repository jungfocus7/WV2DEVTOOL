// const _tgtpl = `
// <g transform="scale(1.0 1.0)">
//   <use href="#d_rc1" fill="{$fill}"/>
//   <text x="25" y="25" font-family="Arial" font-size="11"
//     fill="blue" text-anchor="middle" font-weight="bolder"
//     dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
// </g>`.trim();


class CellItem {
    static #sd = Object.seal({
        svgrt: null,
        drc: null,
    });
    static readForInit(svgrt, drc) {
        const sd = this.#sd;
        // console.log(sd);
        sd.svgrt = svgrt;
        sd.drc = drc;
        // console.log(sd.svgrt, sd.drc);
    };

    /**
     * @param {SVGSVGElement} svgrt
     * @param {number} width
     * @param {number} height
     * @param {number} x
     * @param {number} y
     * @param {string} fill
     */
    constructor(svgrt, width, height, x, y, fcr, txt) {
        const md = this.#md;
        md.svgrt = svgrt;
        md.rct.width = width;
        md.rct.height = height;
        md.rct.x = x;
        md.rct.y = y;
        md.fcr = fcr;
        md.txt = txt;
        md.svgrt.insertAdjacentHTML('beforeend', `
<g transform="scale(1.0 1.0)">
  <use href="#d_rc1" fill="${md.fcr}"/>
  <text x="25" y="25" font-family="Arial" font-size="11"
    fill="blue" text-anchor="middle" font-weight="bolder"
    dominant-baseline="central" clip-path="url(#d_cp1)">${md.txt}</text>
</g>
        `.trim());
        md.sge = md.svgrt.lastElementChild;
        // this.setSize(md.aw, md.ah);
        this.applyFromRect();
        Object.seal(this);
    };
    #md = Object.seal({
        /** @type {SVGSVGElement} */
        svgrt: null,
        dw: 50, dh: 50,
        rct: new DOMRect(100, 100, 0, 0),
        fcr: '#ff0000',
        txt: '',
        /** @type {SVGGElement} */
        sge: null,
    });

    applyFromRect() {
        const md = this.#md;
        let px = md.rct.width / md.dw;
        let py = md.rct.height / md.dh;
        let val = `translate(${md.rct.left}, ${md.rct.top}), scale(${px}, ${py})`;
        md.sge.setAttribute('transform', val);
    }

    get rect() {
        return this.#md.rct;
    }

    get width() {
        return this.#md.rct.width;
    }

    get height() {
        return this.#md.rct.height;
    }

    get x() {
        return this.#md.rct.left;
    }

    get y() {
        return this.#md.rct.top;
    }

    setWidth(tv, bp=true) {
        this.#md.rct.width = tv;
        if (bp) this.applyFromRect();
    }

    setHeight(tv, bp=true) {
        this.#md.rct.height = tv;
        if (bp) this.applyFromRect();
    }

    setX(tv, bp=true) {
        this.#md.rct.x = tv;
        if (bp) this.applyFromRect();
    }

    setY(tv, bp=true) {
        this.#md.rct.y = tv;
        if (bp) this.applyFromRect();
    }

    // /**
    //  * @param {SVGGraphicsElement} sge
    //  * @param {number} rw (RealWidth)
    //  * @param {number} rh (RealHeight)
    //  * @return
    //  */
    // getSize() {
    //     const md = this.#md;
    //     const trsf = md.sge.transform;
    //     const mat = trsf.baseVal.getItem(0).matrix;
    //     return {
    //         width: md.dw * mat.a,
    //         height: md.dh * mat.d,
    //     };
    // };

    // /**
    //  * @param {number} aw ApplyWidth
    //  * @param {number} ah ApplyHeight
    //  */
    // setSize(aw, ah) {
    //     const md = this.#md;
    //     md.aw = aw;
    //     md.ah = ah;
    //     let px = md.aw / md.dw;
    //     let py = md.ah / md.dh;
    //     md.sge.setAttribute('transform', `scale(${px}, ${py})`);
    // };

}
Object.freeze(CellItem);


/** @type {SVGSVGElement} */
const _svgrt = document.getElementById('svgrt_1');
// console.log(_svgrt);

/** @type {DOMRect} */
const _drc = _svgrt.getBoundingClientRect();
// console.log(_drc);

CellItem.readForInit(_svgrt, _drc);
/** @type {CellItem[]} */
const _cella = [];

_cella.push(new CellItem(_svgrt, 100, 100, 0, 0, '#ff0000', '박종명'));
_cella.push(new CellItem(_svgrt, 100, 100, 100, 0, '#00ff00', '임헌진'));


// console.log('>>> ' + _cella[1].x);

window.addEventListener('mousemove', (me) => {
    let tx = me.clientX - _drc.left;
    let ty = me.clientY - _drc.top;
    _cella[0].setWidth(tx, false);
    _cella[0].setHeight(ty, false);
    _cella[0].applyFromRect();
    _cella[1].setX(tx, false);
    _cella[1].setY(ty, false);
    _cella[1].applyFromRect();
});




// const _xx = new CellItem(_svgrt, 100, 100, 0, 0, '#00ff00');
// console.log(_xx.getSize());


// _svgrt.insertAdjacentHTML('beforeend', `
// <g transform="scale(1.0 1.0)">
//   <use href="#d_rc1" fill="red"/>
//   <text x="25" y="25" font-family="Arial" font-size="11"
//     fill="blue" text-anchor="middle" font-weight="bolder"
//     dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
// </g>`.trim());
// _svgrt.insertAdjacentHTML('beforeend', `
// <g transform="scale(1.0 1.0)">
//   <use href="#d_rc1" fill="green"/>
//   <text x="25" y="25" font-family="Arial" font-size="11"
//     fill="blue" text-anchor="middle" font-weight="bolder"
//     dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
// </g>`.trim());
// _svgrt.insertAdjacentHTML('beforeend', `
// <g transform="scale(1.0 1.0),translate(10 10)">
//   <use href="#d_rc1" fill="blue"/>
//   <text x="25" y="25" font-family="Arial" font-size="11"
//     fill="whitesmoke" text-anchor="middle" font-weight="bolder"
//     dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
// </g>`.trim());

// const _ges = Array.from(_svgrt.children).filter((te) => {
//     return te instanceof SVGGElement;
// });
// console.log(_ges, Array.isArray(_ges));


// fn_setSize(_ges[0], 50, 50, 300, 300);
// fn_setSize(_ges[1], 50, 50, 200, 200);
// fn_setSize(_ges[2], 50, 50, 100, 100);

// const _ge = _ges[2];

// const fn_test = () => {
//     // console.log(_ge.transform.baseVal);
//     // console.log(_ge.getAttribute('transform'));
//     console.log(fn_getSize(_ge, 50, 50));
// };

// window.addEventListener('mousemove', (me) => {
//     let tx = me.clientX - _drc.left;
//     let ty = me.clientY - _drc.top;
//     if (tx < 0) tx = 0;
//     if (ty < 0) ty = 0;

//     // _ge.setAttribute('transform', `translate(${tx} ${ty})`);
//     fn_setSize(_ge, 50, 50, tx, ty);

//     fn_test();
// });















============================================================================================================
// const _tgtpl = `
// <g transform="scale(1.0 1.0)">
//   <use href="#d_rc1" fill="{$fill}"/>
//   <text x="25" y="25" font-family="Arial" font-size="11"
//     fill="blue" text-anchor="middle" font-weight="bolder"
//     dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
// </g>`.trim();


class CellItem {
    static #sd = Object.seal({
        svgrt: null,
        drc: null,
    });
    static readForInit(svgrt, drc) {
        const sd = this.#sd;
        // console.log(sd);
        sd.svgrt = svgrt;
        sd.drc = drc;
        // console.log(sd.svgrt, sd.drc);
    };

    /**
     * @param {SVGSVGElement} svgrt
     * @param {number} width
     * @param {number} height
     * @param {number} x
     * @param {number} y
     * @param {string} fill
     */
    constructor(svgrt, width, height, x, y, fcr, txt) {
        const md = this.#md;
        md.svgrt = svgrt;
        md.rct.width = width;
        md.rct.height = height;
        md.rct.x = x;
        md.rct.y = y;
        md.fcr = fcr;
        md.txt = txt;
        md.svgrt.insertAdjacentHTML('beforeend', `
<g transform="scale(1.0 1.0)">
  <use href="#d_rc1" fill="${md.fcr}"/>
  <text x="25" y="25" font-family="Arial" font-size="11"
    fill="blue" text-anchor="middle" font-weight="bolder"
    dominant-baseline="central" clip-path="url(#d_cp1)">${md.txt}</text>
</g>
        `.trim());
        md.sge = md.svgrt.lastElementChild;
        // this.setSize(md.aw, md.ah);
        this.#applyRect();
        Object.seal(this);
    };
    #md = Object.seal({
        /** @type {SVGSVGElement} */
        svgrt: null,
        dw: 50, dh: 50,
        rct: new DOMRect(100, 100, 0, 0),
        fcr: '#ff0000',
        txt: '',
        /** @type {SVGGElement} */
        sge: null,
    });

    #applyRect() {
        const md = this.#md;
        let px = md.rct.width / md.dw;
        let py = md.rct.height / md.dh;
        let val = `scale(${px}, ${py}), translate(${md.rct.left}, ${md.rct.top})`;
        md.sge.setAttribute('transform', val);
    }

    // /**
    //  * @param {SVGGraphicsElement} sge
    //  * @param {number} rw (RealWidth)
    //  * @param {number} rh (RealHeight)
    //  * @return
    //  */
    // getSize() {
    //     const md = this.#md;
    //     const trsf = md.sge.transform;
    //     const mat = trsf.baseVal.getItem(0).matrix;
    //     return {
    //         width: md.dw * mat.a,
    //         height: md.dh * mat.d,
    //     };
    // };

    // /**
    //  * @param {number} aw ApplyWidth
    //  * @param {number} ah ApplyHeight
    //  */
    // setSize(aw, ah) {
    //     const md = this.#md;
    //     md.aw = aw;
    //     md.ah = ah;
    //     let px = md.aw / md.dw;
    //     let py = md.ah / md.dh;
    //     md.sge.setAttribute('transform', `scale(${px}, ${py})`);
    // };

}
Object.freeze(CellItem);


/** @type {SVGSVGElement} */
const _svgrt = document.getElementById('svgrt_1');
// console.log(_svgrt);

/** @type {DOMRect} */
const _drc = _svgrt.getBoundingClientRect();
// console.log(_drc);

CellItem.readForInit(_svgrt, _drc);
/** @type {CellItem[]} */
const _cella = [];

_cella.push(new CellItem(_svgrt, 100, 100, 0, 0, '#ff0000', '박종명'));
_cella.push(new CellItem(_svgrt, 100, 100, 100, 0, '#00ff00', '임헌진'));

// const _xx = new CellItem(_svgrt, 100, 100, 0, 0, '#00ff00');
// console.log(_xx.getSize());


// _svgrt.insertAdjacentHTML('beforeend', `
// <g transform="scale(1.0 1.0)">
//   <use href="#d_rc1" fill="red"/>
//   <text x="25" y="25" font-family="Arial" font-size="11"
//     fill="blue" text-anchor="middle" font-weight="bolder"
//     dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
// </g>`.trim());
// _svgrt.insertAdjacentHTML('beforeend', `
// <g transform="scale(1.0 1.0)">
//   <use href="#d_rc1" fill="green"/>
//   <text x="25" y="25" font-family="Arial" font-size="11"
//     fill="blue" text-anchor="middle" font-weight="bolder"
//     dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
// </g>`.trim());
// _svgrt.insertAdjacentHTML('beforeend', `
// <g transform="scale(1.0 1.0),translate(10 10)">
//   <use href="#d_rc1" fill="blue"/>
//   <text x="25" y="25" font-family="Arial" font-size="11"
//     fill="whitesmoke" text-anchor="middle" font-weight="bolder"
//     dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
// </g>`.trim());

// const _ges = Array.from(_svgrt.children).filter((te) => {
//     return te instanceof SVGGElement;
// });
// console.log(_ges, Array.isArray(_ges));


// fn_setSize(_ges[0], 50, 50, 300, 300);
// fn_setSize(_ges[1], 50, 50, 200, 200);
// fn_setSize(_ges[2], 50, 50, 100, 100);

// const _ge = _ges[2];

// const fn_test = () => {
//     // console.log(_ge.transform.baseVal);
//     // console.log(_ge.getAttribute('transform'));
//     console.log(fn_getSize(_ge, 50, 50));
// };

// window.addEventListener('mousemove', (me) => {
//     let tx = me.clientX - _drc.left;
//     let ty = me.clientY - _drc.top;
//     if (tx < 0) tx = 0;
//     if (ty < 0) ty = 0;

//     // _ge.setAttribute('transform', `translate(${tx} ${ty})`);
//     fn_setSize(_ge, 50, 50, tx, ty);

//     fn_test();
// });