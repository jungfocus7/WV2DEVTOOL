import { hfEventTypes, hfStyleHelper } from "./hfCommon.js";


const hfScrollLogicType = Object.freeze({
    HORIZONTAL: "horizontal",
    VERTICAL: "vertical",
});


/**
 * @typedef {object} IScrollLogicConstructorArguments
 * @property {hfScrollLogicType} logicType
 * @property {HTMLDivElement} heTarget
 * @property {string} targetStyle
 * @property {string} thumbHtml
 */

/**
 * @typedef {object} IScrollLogic
 * @property {(args: IScrollLogicConstructorArguments) => IScrollLogic} constructor
 * @property {() => number} getScrollSizeRatio
 * @property {(val: number, bApply: boolean=true) => void} setScrollSizeRatio
 * @property {() => number} getScrollPositionRatio
 * @property {(val: number, bApply: boolean=true) => void} setScrollPositionRatio
 */

/** @type {IScrollLogic} */
const hfScrollLogic = Object.freeze(class {
    #MINV = 30.0;

    #md = Object.seal({
        logicType: '',

        /** @type {HTMLDivElement} */
        heTarget: null,
        /** @type {HTMLDivElement} */
        heThumb: null,
        /** @type {HTMLSpanElement} */
        heSpan: null,

        /** @type {DOMRect} */
        rctGround: null,
        /** @type {DOMRect} */
        rctThumb: null,

        scrollSizeRatio: 1.0,
        scrollPositionRatio: 0.0,

        mdp: NaN,

        fn_mouseDownHandler: null,
        fn_resizeHandler: null,
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

        md.heThumb = md.heTarget.querySelector('div');
        md.heSpan = md.heThumb.querySelector('span');
        md.heSpan.innerText = '';

        md.rctGround = hfStyleHelper.getRect(md.heTarget);
        md.rctThumb = hfStyleHelper.getRect(md.heThumb);

        md.fn_mouseDownHandler = this.#fn_mouseDown.bind(this);
        md.fn_resizeHandler = this.#fn_resize.bind(this);

        md.heTarget.addEventListener(hfEventTypes.MOUSE_DOWN, md.fn_mouseDownHandler);
        window.addEventListener(hfEventTypes.RESIZE, md.fn_resizeHandler);

        Object.seal(this);
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
     * Thumb 스크롤 정보 표시
     */
    #fn_printSpanLog() {
        const md = this.#md;

        let ssr = 100 * md.scrollSizeRatio;
        let spr = 100 * md.scrollPositionRatio;
        md.heSpan.innerText = `${ssr.toFixed(1)}%/${spr.toFixed(1)}%`;
    }

    get #groundCheckSize() {
        const md = this.#md;

        let rv = 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            rv = md.rctGround.height;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            rv = md.rctGround.width;

        return rv;
    }

    get #thumbCheckSize() {
        const md = this.#md;

        let rv = 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            rv = md.rctThumb.height;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            rv = md.rctThumb.width;

        return rv;
    }

    set #thumbCheckSize(val) {
        const md = this.#md;

        let tv = Number.isFinite(val) ? val : 0.0;
        if (md.logicType === hfScrollLogicType.VERTICAL)
            md.rctThumb.height = tv;
        else if (md.logicType === hfScrollLogicType.HORIZONTAL)
            md.rctThumb.width = tv;
    }


    /**
     * @param {MouseEvent} te
     */
    #fn_mouseDown(te) {

    }

    /**
     * @param {Event} te
     */
    #fn_resize(te) {

    }

});




class ScrollLogic extends EventTarget {
    constructor(parms) {
        super();
        this.#logicType = parms.logicType;
        this.#elTarget = parms.target;
        if (parms.useTargetStyle === true) {
            if (typeof parms.targetStyle == 'string') {
                this.#elTarget.setAttribute('style', parms.targetStyle);
            }
            else {
                this.#elTarget.setAttribute('style', `
width: 20px; height: 100%;
background-color: #595959;
position: static; display: inline-block;
overflow-x: hidden; overflow-y: hidden;
font-size: 0px; cursor: pointer;
                `.trim());
            }
        }
        if (typeof parms.thumbHtml == 'string') {
            this.#elTarget.innerHTML = parms.thumbHtml;
        }
        else {
            const uq1 = parms.logicType === ScrollLogicType.VERTICAL ? 'rotate(-90deg)' : '';
            this.#elTarget.innerHTML = `
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
        transform: translate(-50%, -50%) ${uq1};
        user-select: none; white-space: nowrap;
        font-family: 'Consolas', 'monospace', 'monaco';
        font-size: 10px; color: #ffffff66;"></span>
</div>
            `.trim();
        }
        this.#elThumb = this.#elTarget.querySelector('div');
        this.#elSpan = this.#elThumb.querySelector('span');
        this.#elSpan.innerText = '';
        this.#rctGround = fn_getRect(this.#elTarget);
        this.#rctThumb = fn_getRect(this.#elThumb);
        this.#elTarget.addEventListener(hfEventTypes.MOUSE_DOWN, this.#fn_mouseDown);
        window.addEventListener(hfEventTypes.RESIZE, this.#fn_resize);
        Object.seal(this);
    }
    static #MINV = 30.0;
    #logicType = null;
    #elTarget = null;
    #elThumb = null;
    #elSpan = null;
    #rctGround = null;
    #rctThumb = null;
    #scrollSizeRatio = 1.0;
    #scrollPositionRatio = 0.0;
    #mdp = NaN;
    #fn_printSpanLog() {
        const ssr = 100 * this.#scrollSizeRatio;
        const spr = 100 * this.#scrollPositionRatio;
        this.#elSpan.innerText = `${ssr.toFixed(1)}%/${spr.toFixed(1)}%`;
    }
    get #groundCheckSize() {
        let rv = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = this.#rctGround.height;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = this.#rctGround.width;
        return rv;
    }
    get #thumbCheckSize() {
        let rv = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = this.#rctThumb.height;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = this.#rctThumb.width;
        return rv;
    }
    set #thumbCheckSize(val) {
        if (Number.isFinite(val) === false)
            val = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            this.#rctThumb.height = val;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            this.#rctThumb.width = val;
    }
    get #thumbCheckLocation() {
        let rv = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = this.#rctThumb.top;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = this.#rctThumb.left;
        return rv;
    }
    set #thumbCheckLocation(val) {
        if (Number.isFinite(val) === false)
            val = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            this.#rctThumb.y = val;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            this.#rctThumb.x = val;
    }
    #fn_setCheckSize(el, val) {
        if (Number.isFinite(val) === false)
            val = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            fn_setHeight(el, val);
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            fn_setWidth(el, val);
    }
    #fn_setCheckLocation(el, val) {
        if (Number.isFinite(val) === false)
            val = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            fn_setTop(el, val);
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            fn_setLeft(el, val);
    }
    #fn_getScrollSize() {
        let ss = this.#groundCheckSize - this.#thumbCheckSize;
        if (ss < 0.0)
            ss = 0.0;
        return ss;
    }
    #fn_setThumbSize(val, bApply = true) {
        if (val === this.#thumbCheckSize)
            return;
        const bv = ScrollLogic.#MINV;
        const ev = this.#groundCheckSize;
        let cv = val;
        if (cv < bv)
            cv = bv;
        else if (cv > ev)
            cv = ev;
        this.#thumbCheckSize = cv;
        const sv = this.#fn_getScrollSize() * this.#scrollPositionRatio;
        this.#thumbCheckLocation = sv;
        if (bApply === true) {
            this.#fn_setCheckSize(this.#elThumb, this.#thumbCheckSize);
            this.#fn_setCheckLocation(this.#elThumb, this.#thumbCheckLocation);
        }
    }
    #fn_setThumbPosition(val, bApply = true) {
        if (val === this.#thumbCheckLocation)
            return;
        const bv = 0.0;
        const ev = this.#fn_getScrollSize();
        let cv = val;
        if (cv < bv)
            cv = bv;
        else if (cv > ev)
            cv = ev;
        this.#thumbCheckLocation = cv;
        let vr = (cv - bv) / (ev - bv);
        if (Number.isFinite(vr) === false)
            vr = bv;
        this.#scrollPositionRatio = vr;
        if (bApply === true)
            this.#fn_setCheckLocation(this.#elThumb, this.#thumbCheckLocation);
    }
    fn_getScrollSizeRatio() {
        let rv = this.#scrollSizeRatio;
        if (Number.isFinite(rv) === false)
            rv = 0.0;
        else {
            if (rv < 0.0)
                rv = 0.0;
            else if (rv > 1.0)
                rv = 1.0;
        }
        return rv;
    }
    fn_setScrollSizeRatio(val, bApply = true) {
        if (Number.isFinite(val) === false)
            val = 0.0;
        else {
            if (val < 0.0)
                val = 0.0;
            else if (val > 1.0)
                val = 1.0;
        }
        this.#scrollSizeRatio = val;
        const sz = this.#groundCheckSize * this.#scrollSizeRatio;
        this.#fn_setThumbSize(sz, bApply);
        this.#fn_printSpanLog();
    }
    fn_getScrollPositionRatio() {
        let rv = this.#scrollPositionRatio;
        if (Number.isFinite(rv) === false)
            rv = 0.0;
        else {
            if (rv < 0.0)
                rv = 0.0;
            else if (rv > 1.0)
                rv = 1.0;
        }
        return rv;
    }
    fn_setScrollPositionRatio(val, bApply = true) {
        if (Number.isFinite(val) === false)
            val = 0.0;
        else {
            if (val < 0.0)
                val = 0.0;
            else if (val > 1.0)
                val = 1.0;
        }
        if (val === this.#scrollPositionRatio)
            return;
        this.#scrollPositionRatio = val;
        const bv = 0.0;
        const ev = this.#fn_getScrollSize();
        let cv = ev * this.#scrollPositionRatio;
        if (cv < bv)
            cv = bv;
        else if (cv > ev)
            cv = ev;
        this.#thumbCheckLocation = cv;
        this.#fn_printSpanLog();
        if (bApply === true)
            this.#fn_setCheckLocation(this.#elThumb, this.#thumbCheckLocation);
    }
    #fn_updateAfterResized(bApply = true) {
        const bv = ScrollLogic.#MINV;
        const ev = this.#groundCheckSize;
        let cv = ev * this.#scrollSizeRatio;
        if (cv < bv)
            cv = bv;
        else if (cv > ev)
            cv = ev;
        this.#thumbCheckSize = cv;
        const cp = this.#fn_getScrollSize() * this.#scrollPositionRatio;
        this.#thumbCheckLocation = cp;
        if (bApply === true) {
            this.#fn_setCheckSize(this.#elThumb, this.#thumbCheckSize);
            this.#fn_setCheckLocation(this.#elThumb, this.#thumbCheckLocation);
        }
        this.#fn_printSpanLog();
    }
    #fn_clientValue(e) {
        let rv = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = e.clientY;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = e.clientX;
        return rv;
    }
    #fn_offsetValue(e) {
        let rv = 0.0;
        if (this.#logicType === ScrollLogicType.VERTICAL)
            rv = e.offsetY;
        else if (this.#logicType === ScrollLogicType.HORIZONTAL)
            rv = e.offsetX;
        return rv;
    }
    #fn_mouseMove = (e) => {
        if (e.buttons !== 1) {
            this.#fn_mouseUp();
            return;
        }
        if (this.#scrollSizeRatio === 1.0)
            return;
        const cv = this.#fn_clientValue(e) - this.#mdp;
        this.#fn_setThumbPosition(cv);
        this.#fn_printSpanLog();
        this.dispatchEvent(new Event(hfEventTypes.SCROLL));
    };
    #fn_mouseUp = (e) => {
        window.removeEventListener(hfEventTypes.MOUSE_MOVE, this.#fn_mouseMove);
        window.removeEventListener(hfEventTypes.MOUSE_UP, this.#fn_mouseUp);
        window.removeEventListener(hfEventTypes.BLUR, this.#fn_mouseUp);
    };
    #fn_mouseDown = (e) => {
        if (e.button !== 0)
            return;
        window.addEventListener(hfEventTypes.MOUSE_MOVE, this.#fn_mouseMove);
        window.addEventListener(hfEventTypes.MOUSE_UP, this.#fn_mouseUp);
        window.addEventListener(hfEventTypes.BLUR, this.#fn_mouseUp);
        if (fn_containsRect(this.#rctThumb, e.offsetX, e.offsetY) === true) {
            this.#mdp = this.#fn_clientValue(e) - this.#thumbCheckLocation;
            this.#fn_mouseMove(e);
        }
        else {
            const cv = this.#fn_offsetValue(e) - (this.#thumbCheckSize / 2);
            this.#fn_setThumbPosition(cv);
            this.#fn_printSpanLog();
            this.#mdp = this.#fn_clientValue(e) - this.#thumbCheckLocation;
            this.dispatchEvent(new Event(hfEventTypes.SCROLL));
        }
    };
    #fn_resize = (e) => {
        fn_updateRect(this.#elTarget, this.#rctGround);
        this.#fn_updateAfterResized();
    };
}
Object.freeze(ScrollLogic);
export { ScrollLogic, ScrollLogicType };
