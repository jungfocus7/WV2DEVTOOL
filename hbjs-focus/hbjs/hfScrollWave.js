import { hfEventTypes, hfStyleHelper, dcs } from "./hfCommon.js";



//#region [01)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~]
/**
 * @typedef {object} IScrollTargetArea
 * @property {number} viewportWidth
 * @property {number} viewportHeight
 * @property {number} vwr (Viewport Width Ratio)
 * @property {number} vhr (Viewport Height Ratio)
 * @property {number} hspr (Horizontal Scroll Position Ratio)
 * @property {number} vspr (Vertical Scroll Position Ratio)
 * @property {number} bodyWidth
 * @property {number} bodyHeight
 * @property {number} bodyLeft
 * @property {number} bodyTop
 * @property {(spr: number) => void} fn_set_hspr
 * @property {(spr: number) => void} fn_set_vspr
 */

/**
 * @typedef {object} IScrollWaveConstructorArguments
 * @property {IScrollTargetArea} targetArea
 * @property {"vertical" | "horizontal" | "both"} scrollType
 * @property {HTMLDivElement} heGround
 */

const hfRatioHelper = Object.freeze({
    /**
     * 비율값이 (0 ~ 1)사이에 있는지 체크하고 반환
     * @param {number} tv
     * @param {string} dc ('b'(begin): 0.0, 'e'(end): 1.0)
     * @returns
     */
    fn_check(tv, dc='b') {
        const bv = 0.0;
        const ev = 1.0;

        let rv = tv;
        if (Number.isFinite(rv)) {
            if (rv < bv) rv = bv;
            else if (rv > ev) rv = ev;
        } else {
            if (dc === 'b') rv = bv;
            else if (dc === 'e') rv = ev;
        }

        return rv;
    },

    /**
     * 비율값 계산
     * @param {number} v1
     * @param {number} v2
     * @param {string} dc ('b'(begin): 0.0, 'e'(end): 1.0)
     */
    fn_calc(v1, v2, dc='b') {
        let rv = hfRatioHelper.fn_check(v1 / v2, dc);
        return rv;
    },
});

const hfValueHelper = Object.freeze({
    /**
     * 최소값으로 체크후 설정
     * @param {number} tv
     * @param {number} gv
     * @returns
     */
    fn_checkMinVal(tv, gv) {
        if ((Number.isFinite(tv) === false) ||
            (Number.isFinite(gv) === false)) return 0;

        return (tv < gv) ? gv : tv;
    },
});

const hfScrollType = Object.freeze({
    NONE: 'none',
    BOTH: 'both',
    HORIZONTAL: 'horizontal',
    VERTICAL: 'vertical',
});
//#endregion


//#region [02)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~]
/** @implements {IScrollTargetArea} */
class hfScrollTargetArea {
    #md = Object.seal({
        /**
         * Viewport Bounds
         * @type {DOMRect}
         */
        viewportBounds: null,

        /**
         * Body Bounds
         * @type {DOMRect}
         */
        bodyBounds: null,

        /**
         * Viewport Width Ratio
         */
        vwr: 1.0,

        /**
         * Viewport Height Ratio
         */
        vhr: 1.0,

        /**
         * Horizontal Scroll Position Ratio
         */
        hspr: 0.0,

        /**
         * Vertical Scroll Position Ratio
         */
        vspr: 0.0,

    });

    /**
     * @param {DOMRect} rctViewport
     * @param {DOMRect} rctBody
     */
    constructor(rctViewport, rctBody) {
        const md = this.#md;

        if ((rctViewport instanceof DOMRect) &&
            (rctBody instanceof DOMRect)) {
            md.viewportBounds = rctViewport;
            md.bodyBounds = rctBody;
            this.#fn_calc_vwr();
            this.#fn_calc_vhr();
            this.#fn_calc_hspr();
            this.#fn_calc_vspr();

            Object.seal(this);
        } else {
            throw 'Constructor arguments is not DOMRect';
        }
    }

    /**
     * Calc Viewport Width Ratio
     */
    #fn_calc_vwr() {
        const md = this.#md;
        let cr = hfRatioHelper.fn_check(
            md.viewportBounds.width / md.bodyBounds.width, 'e');
        md.vwr = cr;
    }

    /**
     * Update Viewport Height Ratio
     */
    #fn_calc_vhr() {
        const md = this.#md;
        let cr = hfRatioHelper.fn_check(
            md.viewportBounds.height / md.bodyBounds.height, 'e');
        md.vhr = cr;
    }

    /**
     * Get Horizontal Scroll Size
     * @returns
     */
    #fn_get_hss() {
        const md = this.#md;
        let rv = md.bodyBounds.width - md.viewportBounds.width;
        if (Number.isFinite(rv)) {
            if (rv < 0.0) rv = 0.0;
        } else {
            rv = 0.0;
        }
        return rv;
    }

    /**
     * Get Vertical Scroll Size
     * @returns
     */
    #fn_get_vss() {
        const md = this.#md;
        let rv = md.bodyBounds.height - md.viewportBounds.height;
        if (Number.isFinite(rv)) {
            if (rv < 0.0) rv = 0.0;
        } else {
            rv = 0.0;
        }
        return rv;
    }

    /**
     * Calc Horizontal Scroll Position Ratio
     */
    #fn_calc_hspr() {
        const md = this.#md;

        let v1 = Math.abs(md.bodyBounds.left);
        let v2 = this.#fn_get_hss();
        md.hspr = hfRatioHelper.fn_calc(v1, v2);
    }

    /**
     * Calc Vertical Scroll Position Ratio
     */
    #fn_calc_vspr() {
        const md = this.#md;

        let v1 = Math.abs(md.bodyBounds.top);
        let v2 = this.#fn_get_vss();
        md.vspr = hfRatioHelper.fn_calc(v1, v2);
    }

    #fn_calc_bodyLeft() {
        const md = this.#md;

        let hss = this.#fn_get_hss();
        let cx = -hss * md.hspr;
        md.bodyBounds.x = cx;
    }

    #fn_calc_bodyTop() {
        const md = this.#md;

        let vss = this.#fn_get_vss();
        let cy = -vss * md.vspr;
        md.bodyBounds.y = cy;
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * @returns {number}
     */
    get viewportWidth() {
        const md = this.#md;
        return md.viewportBounds.width;
    }

    /**
     * @param {number} tv
     */
    set viewportWidth(tv) {
        const md = this.#md;

        let cv = hfValueHelper.fn_checkMinVal(tv, 100);
        md.viewportBounds.width = cv;

        this.#fn_calc_vwr();
        this.#fn_calc_bodyLeft();
    }

    /**
     * @returns {number}
     */
    get viewportHeight() {
        const md = this.#md;
        return md.viewportBounds.height;
    }

    /**
     * @param {number} tv
     */
    set viewportHeight(tv) {
        const md = this.#md;

        let cv = hfValueHelper.fn_checkMinVal(tv, 100);
        md.viewportBounds.height = cv;

        this.#fn_calc_vhr();
        this.#fn_calc_bodyTop();
    }

    /**
     * Viewport Width Ratio
     * @returns {number}
     */
    get vwr() {
        const md = this.#md;
        return md.vwr;
    }

    /**
     * Viewport Height Ratio
     * @returns {number}
     */
    get vhr() {
        const md = this.#md;
        return md.vhr;
    }

    /**
     * Horizontal Scroll Position Ratio
     * @returns {number}
     */
    get hspr() {
        const md = this.#md;
        return md.hspr;
    }

    /**
     * Vertical Scroll Position Ratio
     * @returns {number}
     */
    get vspr() {
        const md = this.#md;
        return md.vspr;
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * @returns {number}
     */
    get bodyWidth() {
        const md = this.#md;
        return md.bodyBounds.width;
    }

    /**
     * @param {number} tv
     */
    set bodyWidth(tv) {
        const md = this.#md;

        let cv = hfValueHelper.fn_checkMinVal(tv, 100);
        md.bodyBounds.width = cv;

        this.#fn_calc_vwr();
        this.#fn_calc_bodyLeft();
    }

    /**
     * @returns {number}
     */
    get bodyHeight() {
        const md = this.#md;
        return md.bodyBounds.height;
    }

    /**
     * @param {number} tv
     */
    set bodyHeight(tv) {
        const md = this.#md;

        let cv = hfValueHelper.fn_checkMinVal(tv, 100);
        md.bodyBounds.height = cv;

        this.#fn_calc_vhr();
        this.#fn_calc_bodyTop();
    }

    /**
     * @returns {number}
     */
    get bodyLeft() {
        const md = this.#md;
        return md.bodyBounds.left;
    }

    /**
     * @param {number} tv
     */
    set bodyLeft(tv) {
        const md = this.#md;
        md.bodyBounds.x = tv;
        this.#fn_calc_hspr();
    }

    /**
     * @returns {number}
     */
    get bodyTop() {
        const md = this.#md;
        return md.bodyBounds.top;
    }

    /**
     * @param {number} tv
     */
    set bodyTop(tv) {
        const md = this.#md;
        md.bodyBounds.y = tv;
        this.#fn_calc_vspr();
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * @param {number} spr (Scroll Position Ratio)
     */
    fn_set_hspr(spr) {
        const md = this.#md;

        if (spr === md.hspr) return;
        md.hspr = spr;

        let hss = this.#fn_get_hss();
        let cx = -hss * spr;
        md.bodyBounds.x = cx;
    }

    /**
     * @param {number} spr (Scroll Position Ratio)
     */
    fn_set_vspr(spr) {
        const md = this.#md;

        if (spr === md.vspr) return;
        md.vspr = spr;

        let vss = this.#fn_get_vss();
        let cy = -vss * spr;
        md.bodyBounds.y = cy;
    }

    /**
     * @param {HTMLElement} he
     */
    fn_applyBodyRectToElement(he) {
        const md = this.#md;

        hfStyleHelper.applyRectToElement(he, md.bodyBounds);
    }

};
Object.freeze(hfScrollTargetArea);
//#endregion


//#region [03)~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~]
class hfScrollWave extends EventTarget {
    static #MINV = 20.0;

    #md = Object.seal({
        /**
         * TargetArea
         * @type {IScrollTargetArea}
         */
        targetArea: null,
        /**
         * ScrollType
         * @type {string}
         */
        scrollType: '',

        /**
         * Track 엘리먼트
         * @type {HTMLDivElement}
         */
        heGround: null,
        /**
         * Thumb 엘리먼트
         * @type {HTMLDivElement}
         */
        heThumb: null,
        /**
         * Span 엘리먼트
         * @type {HTMLSpanElement}
         */
        heSpan: null,

        /**
         * Track 사각형
         * @type {DOMRect}
         */
        rctGround: null,
        /**
         * Thumb 사각형
         * @type {DOMRect}
         */
        rctThumb: null,

        /**
         * Mouse Down X
         */
        mdx: Number.NaN,
        /**
         * Mouse Down Y
         */
        mdy: Number.NaN,

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
    });

    /**
     * 생성자
     * @param {IScrollWaveConstructorArguments} args
     */
    constructor(args) {
        super();

        const md = this.#md;

        md.targetArea = args.targetArea;
        md.scrollType = args.scrollType;
        md.heGround = args.heGround;

        md.heThumb = md.heGround.querySelector('div');
        md.heSpan = md.heThumb.querySelector('span');
        md.heSpan.innerText = '';

        md.rctGround = hfStyleHelper.getRect(md.heGround);
        md.rctThumb = hfStyleHelper.getRect(md.heThumb);

        this.#fn_calcHoriRectThumb();
        this.#fn_calcVertRectThumb();
        this.#fn_applyHoriRectForThumb();
        this.#fn_applyVertRectForThumb();
        this.#fn_printSpanLog();
        this.#fn_checkEnabled();

        md.fn_mmh = this.#fn_mouseMove.bind(this);
        md.fn_muh = this.#fn_mouseUp.bind(this);
        md.fn_mdh = this.#fn_mouseDown.bind(this);
        md.fn_rsh = this.#fn_resize.bind(this);

        md.heGround.addEventListener(hfEventTypes.MOUSE_DOWN, md.fn_mdh);
        window.addEventListener(hfEventTypes.RESIZE, md.fn_rsh);

        Object.seal(this);
    }

    /**
     * Thumb 스크롤 정보 표시
     */
    #fn_printSpanLog() {
        const md = this.#md;

        if (md.scrollType === hfScrollType.BOTH) {
            let phsr = 100 * md.targetArea.vwr;
            let phpr = 100 * md.targetArea.hspr;
            let pvsr = 100 * md.targetArea.vhr;
            let pvpr = 100 * md.targetArea.vspr;
            let txt = `
${phsr.toFixed(1)}%/${phpr.toFixed(1)}%
${pvsr.toFixed(1)}%/${pvpr.toFixed(1)}%
            `.trim();
            md.heSpan.innerText = txt;
        } else if (md.scrollType === hfScrollType.HORIZONTAL) {
            let phsr = 100 * md.targetArea.vwr;
            let phpr = 100 * md.targetArea.hspr;
            let txt = `
${phsr.toFixed(1)}%/${phpr.toFixed(1)}%
            `.trim();
            md.heSpan.innerText = txt;
        } else if (md.scrollType === hfScrollType.VERTICAL) {
            let pvsr = 100 * md.targetArea.vhr;
            let pvpr = 100 * md.targetArea.vspr;
            let txt = `
${pvsr.toFixed(1)}%/${pvpr.toFixed(1)}%
            `.trim();
            md.heSpan.innerText = txt;
        }
    }

    /**
     * @returns
     */
    #fn_getHoriScrollSize() {
        const md = this.#md;

        let rv = md.rctGround.width - md.rctThumb.width;
        if (Number.isFinite(rv)) {
            if (rv < 0.0) rv = 0.0;
        } else {
            rv = 0.0;
        }
        return rv;
    }

    /**
     * @returns
     */
    #fn_getVertScrollSize() {
        const md = this.#md;

        let rv = md.rctGround.height - md.rctThumb.height;
        if (Number.isFinite(rv)) {
            if (rv < 0.0) rv = 0.0;
        } else {
            rv = 0.0;
        }
        return rv;
    }

    /**
     *
     */
    #fn_calcHoriRectThumb() {
        const md = this.#md;

        let cw = md.rctGround.width * md.targetArea.vwr;
        if (cw < hfScrollWave.#MINV) cw = hfScrollWave.#MINV;
        md.rctThumb.width = cw;

        let hss = this.#fn_getHoriScrollSize();
        md.rctThumb.x = hss * md.targetArea.hspr;
    }

    /**
     *
     */
    #fn_calcVertRectThumb() {
        const md = this.#md;

        let ch = md.rctGround.height * md.targetArea.vhr;
        if (ch < hfScrollWave.#MINV) ch = hfScrollWave.#MINV;
        md.rctThumb.height = ch;

        let vss = this.#fn_getVertScrollSize();
        md.rctThumb.y = vss * md.targetArea.vspr;
    }

    /**
     *
     */
    #fn_applyHoriRectForThumb() {
        const md = this.#md;

        hfStyleHelper.setWidth(md.heThumb, md.rctThumb.width);
        hfStyleHelper.setLeft(md.heThumb, md.rctThumb.left);
    }

    /**
     *
     */
    #fn_applyVertRectForThumb() {
        const md = this.#md;

        hfStyleHelper.setHeight(md.heThumb, md.rctThumb.height);
        hfStyleHelper.setTop(md.heThumb, md.rctThumb.top);
    }

    /**
     * @param {number} tx
     * @returns
     */
    #fn_setCheckThumbLeft(tx) {
        const md = this.#md;

        if ((md.targetArea.vwr >= 1.0) || (tx === md.rctThumb.left)) {
            return false;
        } else {
            let bx = 0.0;
            let ex = this.#fn_getHoriScrollSize();
            let cx = tx;
            if (cx < bx) cx = bx;
            else if (cx > ex) cx = ex;
            md.rctThumb.x = cx;

            let v1 = cx - bx;
            let v2 = ex - bx;
            let spr = hfRatioHelper.fn_calc(v1, v2);
            md.targetArea.fn_set_hspr(spr);
            return true;
        }
    }

    /**
     * @param {number} ty
     * @returns
     */
    #fn_setCheckThumbTop(ty) {
        const md = this.#md;

        if ((md.targetArea.vhr >= 1.0) || (ty === md.rctThumb.top)) {
            return false;
        } else {
            let by = 0.0;
            let ey = this.#fn_getVertScrollSize();
            let cy = ty;
            if (cy < by) cy = by;
            else if (cy > ey) cy = ey;
            md.rctThumb.y = cy;

            let v1 = cy - by;
            let v2 = ey - by;
            let spr = hfRatioHelper.fn_calc(v1, v2);
            md.targetArea.fn_set_vspr(spr);
            return true;
        }
    }

    /**
     * @param {number} tx
     * @param {number} ty
     * @returns
     */
    #fn_updateThumbPosition(tx, ty) {
        const md = this.#md;

        let bAfter = false;

        if (this.#fn_setCheckThumbLeft(tx)) {
            hfStyleHelper.setLeft(md.heThumb, md.rctThumb.left);
            bAfter = true;
        }

        if (this.#fn_setCheckThumbTop(ty)) {
            hfStyleHelper.setTop(md.heThumb, md.rctThumb.top);
            bAfter = true;
        }

        if (bAfter) {
            this.#fn_printSpanLog();
            this.dispatchEvent(new Event(hfEventTypes.SCROLL));
        }
    }

    /**
     * @param {number} tx
     */
    #fn_updateThumbLeft(tx) {
        const md = this.#md;

        if (this.#fn_setCheckThumbLeft(tx)) {
            hfStyleHelper.setLeft(md.heThumb, md.rctThumb.left);

            this.#fn_printSpanLog();
            this.dispatchEvent(new Event(hfEventTypes.SCROLL));
        }
    }

    /**
     * @param {number} ty
     */
    #fn_updateThumbTop(ty) {
        const md = this.#md;

        if (this.#fn_setCheckThumbTop(ty)) {
            hfStyleHelper.setTop(md.heThumb, md.rctThumb.top);

            this.#fn_printSpanLog();
            this.dispatchEvent(new Event(hfEventTypes.SCROLL));
        }
    }

    #fn_groundOnOff(bv=false) {
        const md = this.#md;
        let csd = md.heGround.style;
        let csd2 = md.heThumb.style;
        if (bv) {
            csd.setProperty('pointer-events', 'auto');
            csd2.setProperty('visibility', 'visible');
        } else {
            csd.setProperty('pointer-events', 'none');
            csd2.setProperty('visibility', 'hidden');
        }
    }
    #fn_checkEnabled() {
        const md = this.#md;

        if (md.scrollType === hfScrollType.BOTH) {
            if ((md.targetArea.vwr >= 1.0) && (md.targetArea.vhr >= 1.0)) {
                this.#fn_groundOnOff(false);
            } else {
                this.#fn_groundOnOff(true);
            }
        } else if (md.scrollType === hfScrollType.HORIZONTAL) {
            if (md.targetArea.vwr >= 1.0) {
                this.#fn_groundOnOff(false);
            } else {
                this.#fn_groundOnOff(true);
            }
        } else if (md.scrollType === hfScrollType.VERTICAL) {
            if (md.targetArea.vhr >= 1.0) {
                this.#fn_groundOnOff(false);
            } else {
                this.#fn_groundOnOff(true);
            }
        }
    }

    /**
     * Update After Rect
     */
    fn_updateAfterRect() {
        const md = this.#md;

        if (md.scrollType === hfScrollType.BOTH) {
            this.#fn_calcHoriRectThumb();
            this.#fn_calcVertRectThumb();
            this.#fn_applyHoriRectForThumb();
            this.#fn_applyVertRectForThumb();
            this.#fn_checkEnabled();

            this.#fn_printSpanLog();
        } else if (md.scrollType === hfScrollType.HORIZONTAL) {
            this.#fn_calcHoriRectThumb();
            this.#fn_applyHoriRectForThumb();
            this.#fn_checkEnabled();

            this.#fn_printSpanLog();
        } else if (md.scrollType === hfScrollType.VERTICAL) {
            this.#fn_calcVertRectThumb();
            this.#fn_applyVertRectForThumb();
            this.#fn_checkEnabled();

            this.#fn_printSpanLog();
        }
    }

    /**
     * @param {Event} _
     */
    #fn_resize(_) {
        const md = this.#md;

        setTimeout(() => {
            hfStyleHelper.updateRect(md.heGround, md.rctGround);
            this.fn_updateAfterRect();
            this.#fn_checkEnabled();
        });
    }

    /**
     * @param {PointerEvent} pe
     * @returns
     */
    #fn_mouseMove(pe) {
        const md = this.#md;

        if (pe.buttons !== 1) {
            return
        }

        if (md.scrollType === hfScrollType.BOTH) {
            let tx = pe.clientX - md.mdx;
            let ty = pe.clientY - md.mdy;
            this.#fn_updateThumbPosition(tx, ty);
        } else if (md.scrollType === hfScrollType.HORIZONTAL) {
            let tx = pe.clientX - md.mdx;
            this.#fn_updateThumbLeft(tx);
        } else if (md.scrollType === hfScrollType.VERTICAL) {
            let ty = pe.clientY - md.mdy;
            this.#fn_updateThumbTop(ty);
        }
    }

    /**
     * @param {PointerEvent} _
     */
    #fn_mouseUp(_) {
        const md = this.#md;

        window.removeEventListener(hfEventTypes.MOUSE_MOVE, md.fn_mmh);
        window.removeEventListener(hfEventTypes.MOUSE_UP, md.fn_muh);
        window.removeEventListener(hfEventTypes.BLUR, md.fn_muh);
    }

    /**
     * @param {PointerEvent} pe
     */
    #fn_mouseDown(pe) {
        const md = this.#md;

        if (pe.buttons !== 1) {
            return
        }

        window.addEventListener(hfEventTypes.MOUSE_MOVE, md.fn_mmh);
        window.addEventListener(hfEventTypes.MOUSE_UP, md.fn_muh);
        window.addEventListener(hfEventTypes.BLUR, md.fn_muh);

        // if (hfStyleHelper.containsRect(md.rctThumb, pe.offsetX, pe.offsetY)) {
        //     md.mdx = pe.clientX - md.rctThumb.left;
        //     md.mdy = pe.clientY - md.rctThumb.top;
        // } else {
        //     if (md.scrollType === hfScrollType.BOTH) {
        //         let tx = pe.clientX - (md.rctThumb.width / 2);
        //         let ty = pe.clientY - (md.rctThumb.height / 2);
        //         this.#fn_updateThumbPosition(tx, ty);
        //     } else if (md.scrollType === hfScrollType.HORIZONTAL) {
        //         let tx = pe.clientX - (md.rctThumb.width / 2);
        //         this.#fn_updateThumbLeft(tx);
        //     } else if (md.scrollType === hfScrollType.VERTICAL) {
        //         let ty = pe.clientY - (md.rctThumb.height / 2);
        //         this.#fn_updateThumbTop(ty);
        //     }

        //     md.mdx = pe.clientX - md.rctThumb.left;
        //     md.mdy = pe.clientY - md.rctThumb.top;
        // }

        if (hfStyleHelper.containsRect(md.rctThumb, pe.offsetX, pe.offsetY)) {
            if (md.scrollType === hfScrollType.BOTH) {
                md.mdx = pe.clientX - md.rctThumb.left;
                md.mdy = pe.clientY - md.rctThumb.top;
            } else if (md.scrollType === hfScrollType.HORIZONTAL) {
                md.mdx = pe.clientX - md.rctThumb.left;
            } else if (md.scrollType === hfScrollType.VERTICAL) {
                md.mdy = pe.clientY - md.rctThumb.top;
            }
        } else {
            if (md.scrollType === hfScrollType.BOTH) {
                let tx = pe.clientX - (md.rctThumb.width / 2);
                let ty = pe.clientY - (md.rctThumb.height / 2);
                this.#fn_updateThumbPosition(tx, ty);

                md.mdx = pe.clientX - md.rctThumb.left;
                md.mdy = pe.clientY - md.rctThumb.top;
            } else if (md.scrollType === hfScrollType.HORIZONTAL) {
                let tx = pe.clientX - (md.rctThumb.width / 2);
                this.#fn_updateThumbLeft(tx);

                md.mdx = pe.clientX - md.rctThumb.left;
            } else if (md.scrollType === hfScrollType.VERTICAL) {
                let ty = pe.clientY - (md.rctThumb.height / 2);
                this.#fn_updateThumbTop(ty);

                md.mdy = pe.clientY - md.rctThumb.top;
            }
        }
    }

}
Object.freeze(hfScrollWave);
//#endregion


export {
    hfScrollType,
    hfScrollTargetArea,
    hfScrollWave,
};

