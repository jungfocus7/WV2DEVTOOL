/**
 * @typedef {object} CellItem_args
 * @property {number} width
 * @property {number} height
 * @property {number} x
 * @property {number} y
 * @property {string} bgcr
 * @property {string} txcr
 * @property {string} txt
 */
class CellItem_tx {
    static #std = Object.seal({
        svgrt: null,
        drc: null,
    });
    static readForInit(svgrt, drc) {
        const std = this.#std;
        // console.log(std);
        std.svgrt = svgrt;
        std.drc = drc;
        // console.log(sd.svgrt, sd.drc);
    };

    /**
     * @param {CellItem_args} args
     */
    constructor({width, height, x, y, bgcr, txcr, txt}) {
        const std = CellItem_tx.#std;
        const md = this.#md;
        md.rct.width = width;
        md.rct.height = height;
        md.rct.x = x;
        md.rct.y = y;
        md.bgcr = bgcr;
        md.txcr = txcr;
        md.txt = txt;
        std.svgrt.insertAdjacentHTML('beforeend', `
<g transform="scale(1.0 1.0)" cursor="pointer">
    <!--use href="#d_rc1" fill="${md.bgcr}"/-->
    <rect id="d_rc1" width="50" height="50" x="0" y="0"
        clip-path="url(#d_cp1)" fill="${md.bgcr}" stroke-width="0" stroke="white"/>
    <text x="25" y="25" font-family="Arial" font-size="11" pointer-events="none"
        fill="${md.txcr}" text-anchor="middle" font-weight="bolder" style="user-select: none;"
        dominant-baseline="central" clip-path="url(#d_cp1)">${md.txt}</text>
</g>
        `.trim());
        md.sge = std.svgrt.lastElementChild;
        this.applyFromRect();
        Object.seal(this);
    };
    #md = Object.seal({
        dw: 50, dh: 50,
        rct: new DOMRect(100, 100, 0, 0),
        bgcr: '#000000',
        txcr: '#ffffff',
        txt: 'Text',
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

    getRect() {
        return this.#md.rct;
    }

    getWidth() {
        return this.#md.rct.width;
    }

    getHeight() {
        return this.#md.rct.height;
    }

    getX() {
        return this.#md.rct.left;
    }

    getY() {
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

}
Object.freeze(CellItem_tx);


/** @type {SVGSVGElement} */
const _svgrt = document.getElementById('svgrt_1');
// console.log(_svgrt);
_svgrt.setAttribute('transform', 'translate(70, 70)');
// console.log(_svgrt.transform);

/** @type {DOMRect} */
const _drc = _svgrt.getBoundingClientRect();
// console.log(_drc);

CellItem_tx.readForInit(_svgrt, _drc);
/** @type {CellItem_tx[]} */
const _cella = [
    new CellItem_tx({
        width: 100, height: 100,
        x: 0, y: 0,
        bgcr: '#ff0000',
        txcr: 'seagreen', txt: '박종명'}),
    new CellItem_tx({
        width: 100, height: 100,
        x: 100, y: 0,
        bgcr: '#00ff00',
        txcr: 'slategray', txt: '임헌진'}),
    new CellItem_tx({
        width: 100, height: 100,
        x: 200, y: 0,
        bgcr: '#0000ff',
        txcr: 'teal', txt: '이중호'}),
    new CellItem_tx({
        width: 100, height: 100,
        x: 300, y: 0,
        bgcr: '#df7f12ff',
        txcr: 'darkslateGray', txt: '정희범'}),
];

window.addEventListener('mousemove', (me) => {
    return;
    const rmx = _drc.width - 100;
    const rmy = _drc.height - 100;
    let tx = me.clientX - _drc.left;
    let ty = me.clientY - _drc.top;
    if (tx < 0) tx = 0;
    else if (tx > rmx) tx = rmx;
    if (ty < 0) ty = 0;
    else if (ty > rmy) ty = rmy;
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