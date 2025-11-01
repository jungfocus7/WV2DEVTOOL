import { hfSVGHelper } from "./hfSVGHelper.js";

export const hfSVGRectRefer = Object.freeze(class {
    /**
     * SVGRectElement 조작하는 클래스
     * @param {SVGRectElement} target
     */
    constructor(target) {
        this.#gd.target = target;
        Object.seal(this);
    }
    #gd = Object.seal({
        /** @type {SVGRectElement} */
        target: null
    });

    get_target() {
        const gd = this.#gd;
        return gd.target;
    }

    get_rct() {
        const gd = this.#gd;
        return gd.target.getBoundingClientRect();
    }

    get_w() {
        const gd = this.#gd;
        return hfSVGHelper.get_val(gd.target.width);
    }
    /**
     * @param {number} tv
     */
    set_w(tv) {
        const gd = this.#gd;
        hfSVGHelper.set_val(gd.target.width, tv);
    }

    get_h() {
        const gd = this.#gd;
        return hfSVGHelper.get_val(gd.target.height);
    }
    /**
     * @param {number} tv
     */
    set_h(tv) {
        const gd = this.#gd;
        hfSVGHelper.set_val(gd.target.height, tv);
    }
    /**
     * @param {number} tw
     * @param {number} th
     */
    set_wh(tw, th) {
        const gd = this.#gd;
        hfSVGHelper.set_val(gd.target.width, tw);
        hfSVGHelper.set_val(gd.target.height, th);
    }


    get_x() {
        const gd = this.#gd;
        return hfSVGHelper.get_val(gd.target.x);
    }
    /**
     * @param {number} tv
     */
    set_x(tv) {
        const gd = this.#gd;
        hfSVGHelper.set_val(gd.target.x, tv);
    }

    get_y() {
        const gd = this.#gd;
        return hfSVGHelper.get_val(gd.target.y);
    }
    /**
     * @param {number} tv
     */
    set_y(tv) {
        const gd = this.#gd;
        hfSVGHelper.set_val(gd.target.y, tv);
    }

    /**
     * @param {number} tx
     * @param {number} ty
     */
    set_xy(tx, ty) {
        const gd = this.#gd;
        hfSVGHelper.set_val(gd.target.x, tx);
        hfSVGHelper.set_val(gd.target.y, ty);
    }

    toString() {
        return `
tw: ${this.get_w()}, th: ${this.get_h()},
tx: ${this.get_x()}, ty: ${this.get_y()},
        `.trim();
    }

});