export const hfCellElement = Object.freeze(class {
    /**
     * hfCellElement
     * @param {SVGSVGElement} rt
     */
    constructor(rt) {
        const gd = this.#gd;
        gd.rt = rt;
        this.#initOnce();
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
    });

    #initOnce() {
        const gd = this.#gd;
        const tp = `
<g transform="translate(40, 40)">
    <rect width="50" height="50" fill="#4CAF50" rx="0"
        style="pointer-events: none;"/>
    <text x="25" y="25" font-family="Arial" font-size="14"
        fill="white" text-anchor="middle"
        dominant-baseline="central"
        style="pointer-events: none; user-select: none;">확인</text>
</g>
        `.trim();
        gd.rt.insertAdjacentHTML('beforeend', tp);
        gd.ge = gd.rt.lastElementChild;
        gd.re = gd.ge.firstElementChild;
        gd.te = gd.ge.lastElementChild;
        // console.log(gd.ge, gd.re, gd.te);


        window.addEventListener('mousemove', (me) => {
            // console.log(me.clientX);
            // console.log(this.#gd);
            // this.set_x(me.clientX);
            // this.set_y(me.clientY);
            this.set_width(me.clientX);
            this.set_height(me.clientY);

            let rw = this.get_width();
            let rh = this.get_height();

            const drc = gd.te.getBoundingClientRect();
            let tw = drc.width;
            let th = drc.height;

            if ((tw > rw) || (th > rh))
                gd.te.style.visibility = 'collapse';
            else
                gd.te.style.visibility = 'visible';
        });

    }


//#region [Size]
    /** @returns {number} */
    get_width() {
        const gd = this.#gd;
        return gd.re.width.baseVal.value;
    }

    /** @returns {number} */
    get_height() {
        const gd = this.#gd;
        return gd.re.height.baseVal.value;
    }

    /** @param {number} tv */
    set_width(tv) {
        const gd = this.#gd;
        gd.re.width.baseVal.value = tv;
        gd.te.x.baseVal.getItem(0).value = Math.round(tv / 2);
    }

    /** @param {number} tv */
    set_height(tv) {
        const gd = this.#gd;
        gd.re.height.baseVal.value = tv;
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
        const tf = gd.ge.transform.baseVal.getItem(0);
        tf.matrix.e = tv;
    }

    /** @param {number} tv */
    set_y(tv) {
        const gd = this.#gd;
        const tf = gd.ge.transform.baseVal.getItem(0);
        tf.matrix.f = tv;
    }
//#endregion

});