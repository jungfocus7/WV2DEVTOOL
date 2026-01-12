import { hfEventTypes, hfStyleHelper } from "./hfCommon.js";



//#region [Signature Definitions]
/**
 * @enum {string}
 */
const hfScrollLogicType = Object.freeze({
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
});


/**
 * @callback ScrollLogicCallbackFunction
 * @param {string} cbt - CallbackType
 * @param {number} sr - ScrollSizeRatio
 * @param {number} pr - ScrollPositionRatio
 * @returns {void}
 */

/**
 * @typedef {object} IScrollLogicConstructorArguments
 * @property {hfScrollLogicType} logicType
 * @property {HTMLDivElement} heTarget
 * @property {string} targetStyle
 * @property {string} thumbHtml
 * @property {ScrollLogicCallbackFunction} cbf
 */

/**
 * @typedef {object} IScrollLogic
 * @property {(args: IScrollLogicConstructorArguments) => IScrollLogic} constructor
 * @property {() => number} getScrollSizeRatio
 * @property {(val: number, bApply: boolean) => void} setScrollSizeRatio
 * @property {() => number} getScrollPositionRatio
 * @property {(val: number, bApply: boolean) => void} setScrollPositionRatio
 */
//#endregion


/** @type {IScrollLogic} */
class hfScrollLogic {
    static #MINV = 30.0;

    #md = Object.seal({
        logicType: '',

        /** @type {HTMLDivElement} */
        heTarget: null,
        /** @type {HTMLDivElement} */
        heThumb: null,
        /** @type {HTMLSpanElement} */
        heSpan: null,

        /** @type {ScrollLogicCallbackFunction} */
        cbf: null,

        /** @type {DOMRect} */
        rctGround: null,
        /** @type {DOMRect} */
        rctThumb: null,

        scrollSizeRatio: 1.0,
        scrollPositionRatio: 0.0,

        /**
         * MouseMoveHandler
         * @type {EventListener}
         */
        fn_mmh: null,
        /**
         * MouseUpHandler
         * @type {EventListener}
         */
        fn_muh: null,
        /**
         * MouseDownHandler
         * @type {EventListener}
         */
        fn_mdh: null,
        /**
         * ResizeHandler
         * @type {EventListener}
         */
        fn_rsh: null,

        mdp: NaN,
    });

    /**
     * @param {IScrollLogicConstructorArguments} args
     */
    constructor(args) {
        const md = this.#md;

        md.logicType = args.logicType ?? hfScrollLogicType.VERTICAL;
        md.heTarget = args.heTarget;

        if (args.targetStyle) {
            md.heTarget.setAttribute('style', args.targetStyle);
        } else {
            md.heTarget.setAttribute('style', `
width: 20px; height: 100%;
background-color: #595959;
position: static; display: inline-block;
overflow-x: hidden; overflow-y: hidden;
font-size: 0px; cursor: pointer;
            `.trim());
        }

        if (args.thumbHtml) {
            md.heTarget.innerHTML = args.thumbHtml;
        } else {
            const uq1 = (md.logicType == hfScrollLogicType.VERTICAL) ? ' rotate(-90deg)' : '';
            md.heTarget.innerHTML = `
<div style="background-color: #748B96;
    position: relative;
    width: 100%; height: 100%;
    left: 0px; top: 0px;
    pointer-events: none; overflow: visible;
    box-sizing: border-box; font-size: 0px;
    border: 3px solid #595959;">
    <span style="
        position: relative;
        display: inline-block;
        width: auto; height: auto;
        left: 50%; top: 50%;
        transform: translate(-50%, -50%)${uq1};
        user-select: none; white-space: nowrap;
        font-family: 'Consolas', 'monospace', 'monaco';
        font-size: 10px; color: #ffffff66;"></span>
</div>
            `.trim();
        }

        md.cbf = args.cbf;

        md.heThumb = md.heTarget.querySelector('div');
        md.heSpan = md.heThumb.querySelector('span');
        md.heSpan.innerText = '';

        md.rctGround = hfStyleHelper.getRect(md.heTarget);
        md.rctThumb = hfStyleHelper.getRect(md.heThumb);

        md.fn_mmh = this.#fn_mouseMove.bind(this);
        md.fn_muh = this.#fn_mouseUp.bind(this);
        md.fn_mdh = this.#fn_mouseDown.bind(this);
        md.fn_rsh = this.#fn_resize.bind(this);

        md.heTarget.addEventListener(hfEventTypes.MOUSE_DOWN, md.fn_mdh);
        window.addEventListener(hfEventTypes.RESIZE, md.fn_rsh);

        Object.seal(this);
    }


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * Thumb 스크롤 정보 표시
     */
    #fn_printSpanLog() {
        const md = this.#md;

        let srp = 100 * md.scrollSizeRatio;
        let prp = 100 * md.scrollPositionRatio;
        md.heSpan.innerText = `${srp.toFixed(1)}%/${prp.toFixed(1)}%`;
    }

    /**
     * Ground Size (get)
     */
    get #groundCheckSize() {
        const md = this.#md;

        let rv = 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            rv = md.rctGround.height;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            rv = md.rctGround.width;

        return rv;
    }

    /**
     * Thumb Size (getter)
     */
    get #thumbCheckSize() {
        const md = this.#md;

        let rv = 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            rv = md.rctThumb.height;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            rv = md.rctThumb.width;

        return rv;
    }

    /**
     * Thumb Size (setter)
     */
    set #thumbCheckSize(val) {
        const md = this.#md;

        let tv = Number.isFinite(val) ? val : 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            md.rctThumb.height = tv;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            md.rctThumb.width = tv;
    }

    /**
     * Thumb Location (getter)
     */
    get #thumbCheckLocation() {
        const md = this.#md;

        let rv = 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            rv = md.rctThumb.top;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            rv = md.rctThumb.left;

        return rv;
    }

    /**
     * Thumb Location (setter)
     */
    set #thumbCheckLocation(val) {
        const md = this.#md;

        let tv = Number.isFinite(val) ? val : 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            md.rctThumb.y = tv;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            md.rctThumb.x = tv;
    }

    /**
     * HtmlElement Size 적용
     * @param {HTMLElement} he
     * @param {number} val
     */
    #fn_applyElementSize(he, val) {
        const md = this.#md;

        let tv = Number.isFinite(val) ? val : 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            hfStyleHelper.setHeight(he, tv);
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            hfStyleHelper.setWidth(he, tv);
    }

    /**
     * HtmlElement Location 적용
     * @param {HTMLElement} he
     * @param {number} val
     */
    #fn_applyElementLocation(he, val) {
        const md = this.#md;

        let tv = Number.isFinite(val) ? val : 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            hfStyleHelper.setTop(he, tv);
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            hfStyleHelper.setLeft(he, tv);
    }

    /**
     * Scroll 사이즈 반환
     */
    #fn_getScrollSize() {
        let gs = this.#groundCheckSize;
        let rv = gs - this.#thumbCheckSize;
        if (rv < 0.0) rv = 0.0;
        else if (rv > gs) rv = gs;

        return rv;
    }

    /**
     * Thumb 사이즈 설정
     * @param {number} val
     * @param {boolean} bApply
     */
    #fn_setThumbSize(val, bApply=true) {
        const md = this.#md;

        if (val === this.#thumbCheckSize) return;

        let bs = hfScrollLogic.#MINV;
        let es = this.#groundCheckSize;
        let cs = Number.isFinite(val) ? val : 0.0;
        if (cs < bs) cs = bs;
        else if (cs > es) cs = es;
        this.#thumbCheckSize = cs;

        let cl = this.#fn_getScrollSize() * md.scrollPositionRatio;
        this.#thumbCheckLocation = cl;

        if (bApply) {
            this.#fn_applyElementSize(md.heThumb, cs);
            this.#fn_applyElementLocation(md.heThumb, cl);
        }
    }

    /**
     * Thumb 포지션 설정
     * @param {number} val
     * @param {boolean} bApply
     * @returns
     */
    #fn_setThumbLocation(val, bApply=true) {
        const md = this.#md;

        if (val === this.#thumbCheckLocation) return;

        let bl = 0.0;
        let el = this.#fn_getScrollSize();
        let cl = val;
        if (Number.isFinite(cl)) {
            if (cl < bl) cl = bl;
            else if (cl > el) cl = el;
        } else {
            cl = 0.0;
        }
        this.#thumbCheckLocation = cl;

        let cr = (cl - bl) / (el - bl);
        if (Number.isFinite(cr)) {
            if (cr < 0.0) cr = 0.0;
            else if (cr > 1.0) cr = 1.0;
        } else {
            cr = 0.0;
        }
        md.scrollPositionRatio = cr;

        if (bApply) {
            this.#fn_applyElementLocation(md.heThumb, cl);
        }
    }

    /**
     * Scroll 사이즈 비율 반환
     * @returns
     */
    fn_getScrollSizeRatio() {
        const md = this.#md;

        let rv = md.scrollSizeRatio;
        if (Number.isFinite(rv)) {
            if (rv < 0.0) rv = 0.0;
            else if (rv > 1.0) rv = 1.0;
        } else {
            rv = 0.0;
        }

        return rv;
    }

    /**
     * Scroll 사이즈 비율 설정
     * @param {number} val
     * @param {boolean} bApply
     */
    fn_setScrollSizeRatio(val, bApply=true) {
        const md = this.#md;

        let cv = val;
        if (Number.isFinite(cv)) {
            if (cv < 0.0) cv = 0.0;
            else if (cv > 1.0) cv = 1.0;
        } else {
            cv = 0.0;
        }
        md.scrollSizeRatio = cv;

        let cs = this.#groundCheckSize * md.scrollSizeRatio;
        this.#fn_setThumbSize(cs, bApply);

        this.#fn_printSpanLog();
    }

    /**
     * Scroll 포지션 비율 반환
     * @returns
     */
    fn_getScrollPositionRatio() {
        const md = this.#md;

        let rv = md.scrollPositionRatio;
        if (Number.isFinite(rv)) {
            if (rv < 0.0) rv = 0.0;
            else if (rv > 1.0) rv = 1.0;
        } else {
            rv = 0.0;
        }

        return rv;
    }

    /**
     * Scroll 포지션 비율 설정
     * @param {number} val
     * @param {boolean} bApply
     * @returns
     */
    fn_setScrollPositionRatio(val, bApply=true) {
        const md = this.#md;

        if (val === md.scrollPositionRatio) return;

        let cr = val;
        if (Number.isFinite(cr)) {
            if (cr < 0.0) cr = 0.0;
            else if (cr > 1.0) cr = 1.0;
        } else {
            cr = 0.0;
        }
        md.scrollPositionRatio = cr;

        let bl = 0.0;
        let el = this.#fn_getScrollSize();
        let cl = el * md.scrollPositionRatio;
        if (cl < bl) cl = bl;
        else if (cl > el) cl = el;
        this.#thumbCheckLocation = cl;

        if (bApply) {
            this.#fn_applyElementLocation(md.heThumb, cl);
        }

        this.#fn_printSpanLog();

    }

    #fn_updateAfterResized(bApply=true) {
        const md = this.#md;

        let bs = hfScrollLogic.#MINV;
        let es = this.#groundCheckSize;
        let cs = es * md.scrollSizeRatio;
        if (Number.isFinite(cs)) {
            if (cs < bs) cs = bs;
            else if (cs > es) cs = es;
        } else {
            cs = 0.0;
        }
        this.#thumbCheckSize = cs;

        let cl = this.#fn_getScrollSize() * md.scrollPositionRatio;
        this.#thumbCheckLocation = cl;

        if (bApply) {
            this.#fn_applyElementSize(md.heThumb, cs);
            this.#fn_applyElementLocation(md.heThumb, cl);
        }

        this.#fn_printSpanLog();
    }

    /**
     * ??
     * @param {PointerEvent} pe
     * @returns
     */
    #fn_clientXorY(pe) {
        const md = this.#md;

        let rv = 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            rv = pe.clientY;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            rv = pe.clientX;

        return rv;
    }

    /**
     * ??
     * @param {PointerEvent} pe
     * @returns
     */
    #fn_offsetXorY(pe) {
        const md = this.#md;

        let rv = 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            rv = pe.offsetY;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            rv = pe.offsetX;

        return rv;
    }

    /**
     * ??
     * @param {PointerEvent} pe
     * @returns
     */
    #fn_mouseMove(pe) {
        const md = this.#md;

        if (pe.buttons !== 1) {
            md.fn_muh(null);
            return
        }

        if (md.scrollSizeRatio === 1.0) return;

        let cl = this.#fn_clientXorY(pe) - md.mdp;
        this.#fn_setThumbLocation(cl);

        this.#fn_printSpanLog();

        md.cbf(hfEventTypes.SCROLL, md.scrollSizeRatio, md.scrollPositionRatio);
    }

    /**
     * ??
     * @param {PointerEvent} _
     */
    #fn_mouseUp(_) {
        const md = this.#md;

        window.removeEventListener(hfEventTypes.MOUSE_MOVE, md.fn_mmh);
        window.removeEventListener(hfEventTypes.MOUSE_UP, md.fn_muh);
        window.removeEventListener(hfEventTypes.BLUR, md.fn_muh);
    }

    /**
     * ??
     * @param {PointerEvent} pe
     */
    #fn_mouseDown(pe) {
        if (pe.button !== 0) {
            return
        }

        const md = this.#md;

        window.addEventListener(hfEventTypes.MOUSE_MOVE, md.fn_mmh);
        window.addEventListener(hfEventTypes.MOUSE_UP, md.fn_muh);
        window.addEventListener(hfEventTypes.BLUR, md.fn_muh);

        if (hfStyleHelper.containsRect(md.rctThumb, pe.offsetX, pe.offsetY)) {
            md.mdp = this.#fn_clientXorY(pe) - this.#thumbCheckLocation;
            this.#fn_mouseMove(pe);
        } else {
            let cl = this.#fn_offsetXorY(pe) - (this.#thumbCheckSize / 2);
            this.#fn_setThumbLocation(cl);
            md.mdp = this.#fn_clientXorY(pe) - this.#thumbCheckLocation;

            this.#fn_printSpanLog();

            md.cbf(hfEventTypes.SCROLL, md.scrollSizeRatio, md.scrollPositionRatio);
        }
    }

    /**
     * ??
     * @param {Event} _
     */
    #fn_resize(_) {
        const md = this.#md;

        hfStyleHelper.updateRect(md.heTarget, md.rctGround);
        this.#fn_updateAfterResized();
    }

};
Object.freeze(hfScrollLogic);


export {
    hfScrollLogicType,
    hfScrollLogic,
};

