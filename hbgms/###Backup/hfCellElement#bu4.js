/**
 * @type {hfCellElement}
 */
export const hfCellElement = Object.freeze(class {
    // /**
    //  * @param {SVGSVGElement} rt
    //  * @param {string} fc
    //  * @param {number} rw
    //  * @param {number} rh
    //  * @param {number} rx
    //  * @param {number} ry
    //  */
    // constructor(rt, fc, rw=100, rh=100, rx=0, ry=0) {
    //     const gd = this.#gd;
    //     gd.rt = rt;
    //     this.#initOnce(fc, rw, rh, rx, ry);
    //     Object.seal(this);
    // }
    /**
     * @param {hfCellElement_args} args
     */
    constructor(args) {
        const gd = this.#gd;
        gd.rt = args.srt;
        this.#initOnce(fc, rw, rh, rx, ry);
        Object.seal(this);
    }

    /** @type {hfCellElement_gd} */
    #gd = Object.seal({
        srt: null,
        ge: null,
        re: null,
        te: null,
        drc: new DOMRect(0, 0, 10, 10),
        mg: 4,
    });

    /**
     * @param {string} fc
     * @param {number} rw
     * @param {number} rh
     * @param {number} rx
     * @param {number} ry
     * @param {string} fc
     */
    #initOnce(fc, rw, rh, rx, ry) {
        const gd = this.#gd;
        const tpls = `
<g transform="translate(0, 0)">
    <rect width="50" height="50" fill="${fc}" rx="0"
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
        this.#checkArea();
    }

    #checkArea() {
        const gd = this.#gd;
        let rw = this.get_width();
        let rh = this.get_height();

        const drc = gd.te.getBoundingClientRect();
        let tw = drc.width;
        let th = drc.height;

        if ((tw > rw) || (th > rh))
            gd.te.style.visibility = 'collapse';
        else
            gd.te.style.visibility = 'visible';
    }

//#region [Size]
    get_rect() {
        const gd = this.#gd;
        return gd.drc;
    }

    /** @returns {number} */
    get_width() {
        const gd = this.#gd;
        return gd.drc.width;
    }

    /** @returns {number} */
    get_height() {
        const gd = this.#gd;
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
    get_x() {
        const gd = this.#gd;
        const tf = gd.ge.transform.baseVal.getItem(0);
        return tf.matrix.e;
    }

    get_y() {
        const gd = this.#gd;
        const tf = gd.ge.transform.baseVal.getItem(0);
        return tf.matrix.f;
    }

    set_x(tv) {
        const gd = this.#gd;
        gd.drc.x = tv;
        const tf = gd.ge.transform.baseVal.getItem(0);
        tf.matrix.e = tv;
    }

    set_y(tv) {
        const gd = this.#gd;
        gd.drc.y = tv;
        const tf = gd.ge.transform.baseVal.getItem(0);
        tf.matrix.f = tv;
    }
//#endregion

});


// const _xx = new hfCellElement(null, 100, 100, 10, 10);
// _xx.get_width








