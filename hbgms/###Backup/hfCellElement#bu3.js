export const hfCellElement = Object.freeze(class {
//#region [Initialize]
    /**
     * hfCellElement
     * @param {SVGSVGElement} rt
     * @param {number} rw
     * @param {number} rh
     */
    constructor(rt, rw=100, rh=100, rx=0, ry=0) {
        const gd = this.#gd;
        gd.rt = rt;
        this.#initOnce(rw, rh, rx, ry);
        Object.seal(this);
    }
    #gd = Object.seal({
        /** @type {SVGSVGElement} */
        rt: null,
        /** @type {SVGGElement} */
        ge: null,
        /** @type {SVGRectElement} */
        re: null,
        /** @type {SVGTextElement} */
        te: null,
        /** @type {DOMRect} */
        drc: new DOMRect(0, 0, 10, 10),
        /** @type {number} */
        mg: 4,
    });

    /**
     * @param {number} rw
     * @param {number} rh
     */
    #initOnce(rw, rh, rx, ry) {
        const gd = this.#gd;
        const tpls = `
<g transform="translate(0, 0)">
    <rect width="50" height="50" fill="#4CAF50" rx="0"
        style="pointer-events: none;"/>
    <text x="25" y="25" font-family="Arial" font-size="14"
        fill="white" text-anchor="middle"
        dominant-baseline="central"
        style="pointer-events: none; user-select: none;">확인</text>
</g>
        `.trim();
        gd.rt.insertAdjacentHTML('beforeend', tpls);
        gd.ge = gd.rt.lastElementChild;
        gd.re = gd.ge.firstElementChild;
        gd.te = gd.ge.lastElementChild;
        // console.log(gd.ge, gd.re, gd.te);

        this.set_width(rw);
        this.set_height(rh);
        this.set_x(rx);
        this.set_y(ry);
        console.log(rx, ry);
    }
//#endregion

//#region [Size]
    /** @returns {DOMRect} */
    get_rect() {
        const gd = this.#gd;
        return gd.drc;
    }

    /** @returns {number} */
    get_width() {
        const gd = this.#gd;
        // return gd.re.width.baseVal.value;
        return gd.drc.width;
    }

    /** @returns {number} */
    get_height() {
        const gd = this.#gd;
        // return gd.re.height.baseVal.value;
        return gd.drc.height;
    }

    /** @param {number} tv */
    set_width(tv) {
        const gd = this.#gd;
        gd.drc.width = tv;
        gd.re.width.baseVal.value = tv - gd.mg - gd.mg;
        gd.re.x.baseVal.value = gd.mg;
        gd.te.x.baseVal.getItem(0).value = Math.round(tv / 2);
    }

    /** @param {number} tv */
    set_height(tv) {
        const gd = this.#gd;
        gd.drc.height = tv;
        gd.re.height.baseVal.value = tv - gd.mg - gd.mg;
        gd.re.y.baseVal.value = gd.mg;
        gd.te.y.baseVal.getItem(0).value = Math.round(tv / 2);
    }
//#endregion

//#region [Location]
    /** @returns {number} */
    get_x() {
        const gd = this.#gd;
        const tf = gd.ge.transform.baseVal.getItem(0);
        return tf.matrix.e;
    }

    /** @returns {number} */
    get_y() {
        const gd = this.#gd;
        const tf = gd.ge.transform.baseVal.getItem(0);
        return tf.matrix.f;
    }

    /** @param {number} tv */
    set_x(tv) {
        const gd = this.#gd;
        gd.drc.x = tv;
        const tf = gd.ge.transform.baseVal.getItem(0);
        tf.matrix.e = tv;
    }

    /** @param {number} tv */
    set_y(tv) {
        const gd = this.#gd;
        gd.drc.y = tv;
        const tf = gd.ge.transform.baseVal.getItem(0);
        tf.matrix.f = tv;
    }
//#endregion

});







// hfCellElement.xxx = 'ddd';
// Object.freeze(hfCellElement);
// // hfCellElement.xxx = 'ddd';
// export { hfCellElement };
// // export {
// //     Object.freeze(hfCellElement) as hfCellElement:
// // }