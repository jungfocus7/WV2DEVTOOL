import { hfSVGHelper } from "./hfSVGHelper.js";


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
        // gd.te = gd.ge.children[1];
        // console.log(gd);
        // console.log(gd.te.x);
        // console.log(gd.te.toString());
        // console.log(hfSVGHelper.get_val(gd.te.x));
        // SVGTextElement
        // this.set_size(150, 150);
        // console.log(gd.ge.transform);
        // console.log(' ' + hfSVGHelper.get_w(gd.re));
        // console.log(' ' + hfSVGHelper.get_h(gd.re));
        // hfSVGHelper.set_h(gd.re, 100)
        // console.log(getComputedStyle(gd.re));
        // console.log(getComputedStyle(gd.re).fill);
        // gd.re.style.fill = 'rgb(00, 00, 00)';
        // console.log(getComputedStyle(gd.re).getPropertyValue('fill'));
        // console.log(getComputedStyle(gd.re).getPropertyValue('x'));
        // console.log(getComputedStyle(gd.re).getPropertyValue('width'));
        // window._xx = gd.ge.transform;


        // const x0 = gd.ge.transform;
        // const x1 = x0.baseVal;
        // const x2 = x1.getItem(0);
        // x2.setTranslate(0, 0)

        // console.log(x2);
        // /** @type {SVGMatrix} */
        // const x3 = x2.matrix;
        // console.log(x3);
        // window._x3 = x3;


        // const x4 = new DOMMatrix();
        // x4.translate(-10, 0);
        // x2.matrix = x4;

        // console.log(x3);
        // const x4 = x3.translate(-80, -80);
        // console.log(x3);
        // console.log(x4);
        // window._xx = x3;
        // console.log(x2.matrix);
        // x2.matrix = x3;
        // x2.setMatrix(x4);
        // console.log(x2.matrix);
        // console.log(x3, x4);

        // console.log(this.get_x(), this.get_y());

        window.addEventListener('mousemove', (me) => {
            // console.log(me.clientX);
            // console.log(this.#gd);
            // this.set_x(me.clientX);
            // this.set_y(me.clientY);
            this.set_width(me.clientX);
            this.set_height(me.clientY);
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


    // /**
    //  * @param {number} tw
    //  * @param {number} th
    //  */
    // set_size(tw, th) {
    //     const gd = this.#gd;
    //     hfSVGHelper.set_width(gd.re, tw);
    //     hfSVGHelper.set_height(gd.re, th);
    //     let tx = tw / 2;
    //     let ty = th / 2;
    //     hfSVGHelper.set_x(gd.te, tx);
    //     hfSVGHelper.set_y(gd.te, ty);

    //     // hfSVGHelper.set_val(gd.re.width, tw);
    //     // hfSVGHelper.set_val(gd.re.height, th);
    //     // let tx = tw / 2;
    //     // let ty = th / 2;
    //     // hfSVGHelper.set_val(gd.te.x, tx);
    //     // hfSVGHelper.set_val(gd.te.y, ty);
    //     // console.log('' + hfSVGHelper.get_w(this.#gd.re));
    // }

    // set_location(tx, ty) {
    //     // const gd = this.#gd;
    //     // hfSVGHelper.set_width(gd.re, tw);
    //     // hfSVGHelper.set_height(gd.re, th);
    //     // let tx = tw / 2;
    //     // let ty = th / 2;
    //     // hfSVGHelper.set_x(gd.te, tx);
    //     // hfSVGHelper.set_y(gd.te, ty);
    // }

});