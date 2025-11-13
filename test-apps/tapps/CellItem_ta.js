/**
 * @typedef {object} CellItem_ta__args
 * @property {number} width
 * @property {number} height
 * @property {number} x
 * @property {number} y
 * @property {string} crcd
 * @property {string} crnm
 */

class CellItem_ta {
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
     * @param {CellItem_ta__args} args
     */
    constructor({width, height, x, y, crcd, crnm}) {
        const std = CellItem_ta.#std;
        const md = this.#md;
        md.rct.width = width;
        md.rct.height = height;
        md.rct.x = x;
        md.rct.y = y;
        md.crcd = crcd;
        md.crnm = crnm;
        std.svgrt.insertAdjacentHTML('beforeend', `
<g transform="translate(0,0),scale(1,1)" clip-path="url(#d_cp1)"
  style="user-select: none; cursor: pointer;">
  <rect width="100" height="100" x="0" y="0" fill="${md.crnm}"/>
  <rect width="100" height="40" x="0" y="60" fill="whitesmoke"/>
  <text x="50" y="72" font-family="Arial" font-size="10" pointer-events="none"
    fill="black" text-anchor="middle" font-weight="bolder"
    dominant-baseline="central">${md.crcd}</text>
  <text x="50" y="89" font-family="Arial" font-size="9" pointer-events="none"
    fill="black" text-anchor="middle" font-weight="bolder"
    dominant-baseline="central">${md.crnm}</text>
</g>
        `.trim());
        md.sge = std.svgrt.lastElementChild;
        this.applyFromRect();
        Object.seal(this);
    };
    #md = Object.seal({
        dw: 100, dh: 100,
        rct: new DOMRect(100, 100, 0, 0),
        crcd: '#000000',
        crnm: 'black',
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

    getColorInfo() {
        const md = this.#md;
        return `${md.crcd}\n${md.crnm}`;
    }

};
Object.freeze(CellItem_ta);

export {
    CellItem_ta
};