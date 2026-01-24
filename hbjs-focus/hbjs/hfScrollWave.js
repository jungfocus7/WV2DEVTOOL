import { dcs, hfEventTypes, hfStyleHelper } from "./hfCommon.js";



//#region [Signature Definitions]
/**
 * @typedef {object} IScrollWaveConstructorArguments
 * @property {"vertical" | "horizontal" | "both"} logicType
 * @property {HTMLDivElement} heGround
 */
//#endregion


//#region [hfScrollWaveType]
const hfScrollWaveType = Object.freeze({
    VERTICAL: 'vertical',
    HORIZONTAL: 'horizontal',
    BOTH: 'both',
});
//#endregion


//#region [hfScrollTargetArea]
class hfScrollTargetArea {
    #md = Object.seal({
        /** @type {DOMRect} */
        viewportBounds: null,

        /** @type {DOMRect} */
        bodyBounds: null,
    });

    /**
     * @param {DOMRect} rctViewport
     * @param {DOMRect} rctBody
     */
    constructor(rctViewport, rctBody) {
        const md = this.#md;
        md.viewportBounds = rctViewport;
        md.bodyBounds = rctBody;

        Object.seal(this);
    }

    //#region ViewportBounds
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
        md.viewportBounds.width = tv;
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
        md.viewportBounds.height = tv;
    }

    /**
     * @returns {number}
     */
    get viewportLeft() {
        const md = this.#md;
        return md.viewportBounds.left;
    }

    /**
     * @param {number} tv
     */
    set viewportLeft(tv) {
        const md = this.#md;
        md.viewportBounds.x = tv;
    }

    /**
     * @returns {number}
     */
    get viewportTop() {
        const md = this.#md;
        return md.viewportBounds.top;
    }

    /**
     * @param {number} tv
     */
    set viewportTop(tv) {
        const md = this.#md;
        md.viewportBounds.y = tv;
    }
    //#endregion

    //#region BodyBounds
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
        md.bodyBounds.width = tv;
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
        md.bodyBounds.height = tv;
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
    }

    /**
     * @param {number} spr (Scroll Position Ratio)
     */
    fn_calcBodyLeft(spr) {
        const md = this.#md;

        let df = md.viewportBounds.width - md.bodyBounds.width;
        if (df > 0.0) df = 0.0;

        let tv = df * spr;
        md.bodyBounds.x = tv;
    }

    /**
     * @param {number} spr (Scroll Position Ratio)
     */
    fn_calcBodyTop(spr) {
        const md = this.#md;

        let df = md.viewportBounds.height - md.bodyBounds.height;
        if (df > 0.0) df = 0.0;

        let tv = df * spr;
        md.bodyBounds.y = tv;
    }
    //#endregion

};
Object.freeze(hfScrollTargetArea);
//#endregion


//#region [hfScrollWave]
class hfScrollWave extends EventTarget {
    /**
     * 비율값 계산
     * @param {number} v1
     * @param {number} v2
     */
    static #fn_calcRatio(v1, v2) {
        let rv = v1 / v2;
        if (Number.isFinite(rv)) {
            if (rv < 0.0) rv = 0.0;
            else if (rv > 1.0) rv = 1.0;
        } else {
            rv = 0.0;
        }

        return rv;
    }

    static #MINV = 30.0;

    #md = Object.seal({
        /**
         * TargetArea
         * @type {hfScrollTargetArea}
         */
        targetArea: null,
        /**
         * LogicType
         * @type {string}
         */
        logicType: '',

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
         * Scroll Width Ratio
         */
        swr: 1.0,
        /**
         * Scroll Height Ratio
         */
        shr: 1.0,

        /**
         * Width Scroll Position Ratio
         */
        wspr: 0.0,
        /**
         * Height Scroll Position Ratio
         */
        hspr: 0.0,

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

        md.targetArea = null;
        md.logicType = args.logicType ?? hfScrollWaveType.VERTICAL;
        md.heGround = args.heGround;
        md.heThumb = md.heGround.querySelector('div');
        md.heSpan = md.heThumb.querySelector('span');
        md.heSpan.innerText = '';

        md.rctGround = hfStyleHelper.getRect(md.heGround);
        md.rctThumb = hfStyleHelper.getRect(md.heThumb);

        md.fn_mmh = this.#fn_mouseMove.bind(this);
        md.fn_muh = this.#fn_mouseUp.bind(this);
        md.fn_mdh = this.#fn_mouseDown.bind(this);
        md.fn_rsh = this.#fn_resize.bind(this);

        md.heGround.addEventListener(hfEventTypes.MOUSE_DOWN, md.fn_mdh);
        md.heGround.addEventListener(hfEventTypes.RESIZE, md.fn_rsh);

        Object.seal(this);
    }

    /**
     * Thumb 스크롤 정보 표시
     */
    #fn_printSpanLog() {
        const md = this.#md;

        if (md.logicType === hfScrollWaveType.VERTICAL) {
            let txt = `${md.shr.toFixed(1)}/${md.shr.toFixed(1)}`;
            md.heSpan.innerText = txt;
        } else if (md.logicType === hfScrollWaveType.HORIZONTAL) {
            let txt = `${md.swr.toFixed(1)}/${md.swr.toFixed(1)}`;
            md.heSpan.innerText = txt;
        } else if (md.logicType === hfScrollWaveType.BOTH) {
            let tx1 = `${md.swr.toFixed(1)}/${md.swr.toFixed(1)}`;
            let tx2 = `${md.shr.toFixed(1)}/${md.shr.toFixed(1)}`;
            md.heSpan.innerText = `${tx1}\n${tx2}`;
        }
    }

    /**
     * Height Scroll 사이즈 반환
     */
    #fn_calcHeightScrollSize() {
        const md = this.#md;

        let rv = md.rctGround.height - md.rctThumb.height;
        if (rv < 0.0) rv = 0.0;

        return rv;
    }

    /**
     * Width Scroll 사이즈 반환
     */
    #fn_calcWidthScrollSize() {
        const md = this.#md;

        let rv = md.rctGround.width - md.rctThumb.width;
        if (rv < 0.0) rv = 0.0;

        return rv;
    }

    /**
     * ???
     * @param {number} ty
     */
    #fn_updateThumbTop(ty) {
        const md = this.#md;

        dcs.log('>>>2', md.shr);
        if ((md.shr < 1.0) && (ty !== md.rctThumb.top)) {
            let by = 0.0;
            let ey = this.#fn_calcHeightScrollSize();

            let cy = ty;
            if (cy < by) cy = by;
            else if (cy > ey) cy = ey;
            md.rctThumb.y = cy;

            let v1 = cy - by;
            let v2 = ey - by;
            let spr = hfScrollWave.#fn_calcRatio(v1, v2);
            md.hspr = spr;

            md.targetArea.fn_calcBodyTop(spr);

            hfStyleHelper.setTop(md.heThumb, cy);
            this.#fn_printSpanLog();

            this.dispatchEvent(new Event(hfEventTypes.SCROLL));
        }
    }

    /**
     * ???
     * @param {number} tx
     */
    #fn_updateThumbLeft(tx) {
        const md = this.#md;

        if ((md.swr < 1.0) && (tx !== md.rctThumb.top)) {
            let bx = 0.0;
            let ex = this.#fn_calcWidthScrollSize();

            let cx = tx;
            if (cx < bx) cx = bx;
            else if (cx > ex) cx = ex;
            md.rctThumb.x = cx;

            let v1 = cx - bx;
            let v2 = ex - bx;
            let spr = hfScrollWave.#fn_calcRatio(v1, v2);
            md.wspr = spr;

            md.targetArea.fn_calcBodyLeft(spr);

            hfStyleHelper.setLeft(md.heThumb, cx);
            this.#fn_printSpanLog();

            this.dispatchEvent(new Event(hfEventTypes.SCROLL));
        }
    }

    /**
     * ???
     * @param {number} tx
     * @param {number} ty
     */
    #fn_updateThumbPosition(tx, ty) {
    }

    /**
     * 마우스 무브
     * @param {PointerEvent} pe
     * @returns
     */
    #fn_mouseMove(pe) {
        if (pe.buttons !== 1) {
            return
        }

        const md = this.#md;

        if (md.logicType === hfScrollWaveType.VERTICAL) {
            let ty = pe.clientY - md.mdy;
            this.#fn_updateThumbTop(ty);
        } else if (md.logicType === hfScrollWaveType.HORIZONTAL) {
        } else if (md.logicType === hfScrollWaveType.BOTH) {
        }
    }

    /**
     * 마우스 업
     * @param {PointerEvent} _
     */
    #fn_mouseUp(_) {
        const md = this.#md;

        window.removeEventListener(hfEventTypes.MOUSE_MOVE, md.fn_mmh);
        window.removeEventListener(hfEventTypes.MOUSE_UP, md.fn_muh);
        window.removeEventListener(hfEventTypes.BLUR, md.fn_muh);
    }

    /**
     * 마우스 다운
     * @param {PointerEvent} pe
     */
    #fn_mouseDown(pe) {
        if (pe.buttons !== 1) {
            return
        }

        const md = this.#md;

        window.addEventListener(hfEventTypes.MOUSE_MOVE, md.fn_mmh);
        window.addEventListener(hfEventTypes.MOUSE_UP, md.fn_muh);
        window.addEventListener(hfEventTypes.BLUR, md.fn_muh);

        if (hfStyleHelper.containsRect(md.rctThumb, pe.offsetX, pe.offsetY)) {
            if (md.logicType === hfScrollWaveType.VERTICAL) {
                //
                md.mdy = pe.clientY - md.rctThumb.top;
            } else if (md.logicType === hfScrollWaveType.HORIZONTAL) {
                //
                md.mdx = pe.clientX - md.rctThumb.left;
            } else if (md.logicType === hfScrollWaveType.BOTH) {
                md.mdx = pe.clientX - md.rctThumb.left;
                md.mdy = pe.clientY - md.rctThumb.top;
            }
        } else {
            if (md.logicType === hfScrollWaveType.VERTICAL) {
                //
                let ty = pe.clientY - (md.rctThumb.height / 2);
                this.#fn_updateThumbTop(ty);
                //
                md.mdy = pe.clientY - md.rctThumb.top;
            } else if (md.logicType === hfScrollWaveType.HORIZONTAL) {
                let tx = pe.clientX - (md.rctThumb.width / 2);
                //
                this.#fn_updateThumbLeft(tx);
                md.mdx = pe.clientX - md.rctThumb.left;
                //
            } else if (md.logicType === hfScrollWaveType.BOTH) {
                let tx = pe.clientX - (md.rctThumb.width / 2);
                let ty = pe.clientY - (md.rctThumb.height / 2);
                this.#fn_updateThumbPosition(tx, ty);
                md.mdx = pe.clientX - md.rctThumb.left;
                md.mdy = pe.clientY - md.rctThumb.top;
            }
        }
    }

    /**
     * ??
     * @param {Event} _
     */
    #fn_resize(_) {
        dcs.log('빌런');
    }

    /**
     *
     * @param {number} tw
     * @param {number} th
     */
    fn_updateViewportSize(tw, th) {
        const md = this.#md;

        md.targetArea.viewportWidth = tw;
        md.targetArea.viewportHeight = th;
        md.targetArea.fn_calcBodyLeft(md.wspr);
        md.targetArea.fn_calcBodyTop(md.hspr);
    }

};
Object.freeze(hfScrollWave);
//#endregion


export {
    hfScrollWaveType,
    hfScrollWave,
};

