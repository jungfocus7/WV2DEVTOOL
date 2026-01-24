// import { hfEventTypes, hfStyleHelper } from "./hfCommon.js";



// //#region [Signature Definitions]
// // /**
// //  * @enum {string} hfScrollLogicType
// //  */
// const hfScrollLogicType = Object.freeze({
//     VERTICAL: 'vertical',
//     HORIZONTAL: 'horizontal',
//     BOTH: 'both',
// });


// /**
//  * @callback ScrollLogicCallbackFunction
//  * @param {string} cbt - CallbackType
//  * @param {number} sr - ScrollSizeRatio
//  * @param {number} pr - ScrollPositionRatio
//  * @returns {void}
//  */

// /**
//  * @typedef {object} IScrollLogicConstructorArguments
//  * @property {hfScrollLogicType} logicType
//  * @property {HTMLDivElement} heTarget
//  * @property {string} targetStyle
//  * @property {string} thumbHtml
//  * @property {ScrollLogicCallbackFunction} cbf
//  */

// /**
//  * @typedef {object} IScrollLogic
//  * @property {(args: IScrollLogicConstructorArguments) => IScrollLogic} constructor
//  * @property {() => number} getScrollSizeRatio
//  * @property {(val: number, bApply: boolean) => void} setScrollSizeRatio
//  * @property {() => number} getScrollPositionRatio
//  * @property {(val: number, bApply: boolean) => void} setScrollPositionRatio
//  */
// //#endregion


// /** @type {IScrollLogic} */
// class hfScrollLogic {
//     static #MINV = 30.0;

//     #md = Object.seal({
//         logicType: '',

//         /** @type {HTMLDivElement} */
//         heTarget: null,
//         /** @type {HTMLDivElement} */
//         heThumb: null,
//         /** @type {HTMLSpanElement} */
//         heSpan: null,

//         /** @type {ScrollLogicCallbackFunction} */
//         cbf: null,

//         /** @type {DOMRect} */
//         rctGround: null,
//         /** @type {DOMRect} */
//         rctThumb: null,

//         scrollSizeRatio: 1.0,
//         scrollPositionRatio: 0.0,

//         /**
//          * MouseMoveHandler
//          * @type {EventListener}
//          */
//         fn_mmh: null,
//         /**
//          * MouseUpHandler
//          * @type {EventListener}
//          */
//         fn_muh: null,
//         /**
//          * MouseDownHandler
//          * @type {EventListener}
//          */
//         fn_mdh: null,
//         /**
//          * ResizeHandler
//          * @type {EventListener}
//          */
//         fn_rsh: null,

//         mdp: NaN,
//     });

//     /**
//      * @param {IScrollLogicConstructorArguments} args
//      */
//     constructor(args) {
//         const md = this.#md;

//         md.logicType = args.logicType ?? hfScrollLogicType.VERTICAL;
//         md.heTarget = args.heTarget;

//         if (args.targetStyle) {
//             md.heTarget.setAttribute('style', args.targetStyle);
//         } else {
// //             md.heTarget.setAttribute('style', `
// // width: 20px; height: 100%;
// // background-color: #595959;
// // position: static; display: inline-block;
// // overflow-x: hidden; overflow-y: hidden;
// // font-size: 0px; cursor: pointer;
// //             `.trim());
//         }

//         if (args.thumbHtml) {
//             md.heTarget.innerHTML = args.thumbHtml;
//         } else {
//             const uq1 = (md.logicType == hfScrollLogicType.VERTICAL) ? ' rotate(-90deg)' : '';
//             md.heTarget.innerHTML = `
// <div style="background-color: #748B96;
//     position: relative;
//     width: 100%; height: 100%;
//     left: 0px; top: 0px;
//     pointer-events: none; overflow: visible;
//     box-sizing: border-box; font-size: 0px;
//     border: 3px solid #595959;">
//     <span style="
//         position: relative;
//         display: inline-block;
//         width: auto; height: auto;
//         left: 50%; top: 50%;
//         transform: translate(-50%, -50%)${uq1};
//         user-select: none; white-space: nowrap;
//         font-family: 'Consolas', 'monospace', 'monaco';
//         font-size: 10px; color: #ffffff66;"></span>
// </div>
//             `.trim();
//         }

//         md.cbf = args.cbf;

//         md.heThumb = md.heTarget.querySelector('div');
//         md.heSpan = md.heThumb.querySelector('span');
//         md.heSpan.innerText = '';

//         md.rctGround = hfStyleHelper.getRect(md.heTarget);
//         md.rctThumb = hfStyleHelper.getRect(md.heThumb);

//         md.fn_mmh = this.#fn_mouseMove.bind(this);
//         md.fn_muh = this.#fn_mouseUp.bind(this);
//         md.fn_mdh = this.#fn_mouseDown.bind(this);
//         md.fn_rsh = this.#fn_resize.bind(this);

//         md.heTarget.addEventListener(hfEventTypes.MOUSE_DOWN, md.fn_mdh);
//         window.addEventListener(hfEventTypes.RESIZE, md.fn_rsh);

//         Object.seal(this);
//     }


//     //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     /**
//      * Thumb 스크롤 정보 표시
//      */
//     #fn_printSpanLog() {
//         const md = this.#md;

//         // let srp = 100 * md.scrollSizeRatio;
//         // let prp = 100 * md.scrollPositionRatio;
//         // md.heSpan.innerText = `${srp.toFixed(1)}%/${prp.toFixed(1)}%`;

//         let txt = `${md.scrollSizeRatio.toFixed(1)}/${md.scrollPositionRatio.toFixed(1)}`;
//         md.heSpan.innerText = txt;
//     }

//     /**
//      * Ground Size (get)
//      */
//     get #groundCheckSize() {
//         const md = this.#md;

//         let rv = 0.0;
//         if (md.logicType === hfScrollLogicType.VERTICAL) {
//             rv = md.rctGround.height;
//         } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//             rv = md.rctGround.width;
//         } else if (md.logicType === hfScrollLogicType.BOTH) {
//             //
//         }

//         return rv;
//     }

//     /**
//      * Thumb Size (getter)
//      */
//     get #thumbCheckSize() {
//         const md = this.#md;

//         let rv = 0.0;
//         if (md.logicType === hfScrollLogicType.VERTICAL) {
//             rv = md.rctThumb.height;
//         } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//             rv = md.rctThumb.width;
//         } else if (md.logicType === hfScrollLogicType.BOTH) {
//             //
//         }

//         return rv;
//     }

//     /**
//      * Thumb Size (setter)
//      */
//     set #thumbCheckSize(val) {
//         const md = this.#md;

//         let tv = val;
//         if (Number.isFinite(tv)) {
//             if (md.logicType === hfScrollLogicType.VERTICAL) {
//                 md.rctThumb.height = tv;
//             } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//                 md.rctThumb.width = tv;
//             } else if (md.logicType === hfScrollLogicType.BOTH) {
//                 //
//             }
//         }
//     }

//     /**
//      * Thumb Position (getter)
//      */
//     get #thumbCheckPosition() {
//         const md = this.#md;

//         let rv = 0.0;
//         if (md.logicType === hfScrollLogicType.VERTICAL) {
//             rv = md.rctThumb.top;
//         } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//             rv = md.rctThumb.left;
//         } else if (md.logicType === hfScrollLogicType.BOTH) {
//             //
//         }

//         return rv;
//     }

//     /**
//      * Thumb Position (setter)
//      */
//     set #thumbCheckPosition(val) {
//         const md = this.#md;

//         let cv = val;
//         if (Number.isFinite(cv)) {
//             let bv = 0.0;
//             let ev = this.#fn_getScrollSize();
//             if (cv < bv) cv = bv;
//             else if (cv > ev) cv = ev;
//         } else {
//             cv = 0.0;
//         }

//         if (md.logicType === hfScrollLogicType.VERTICAL) {
//             md.rctThumb.y = cv;
//         } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//             md.rctThumb.x = cv;
//         } else if (md.logicType === hfScrollLogicType.BOTH) {
//             //
//         }
//     }

//     /**
//      * HtmlElement Size 적용
//      * @param {number} val
//      */
//     #fn_applyElementSize(val) {
//         const md = this.#md;

//         let tv = val;
//         if (Number.isFinite(tv)) {
//             if (md.logicType === hfScrollLogicType.VERTICAL) {
//                 hfStyleHelper.setHeight(md.heThumb, tv);
//             } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//                 hfStyleHelper.setWidth(md.heThumb, tv);
//             } else if (md.logicType === hfScrollLogicType.BOTH) {
//                 //
//             }
//         }
//     }

//     /**
//      * HtmlElement Position 적용
//      * @param {number} val
//      */
//     #fn_applyElementPosition(val) {
//         const md = this.#md;

//         let tv = val;
//         if (Number.isFinite(tv)) {
//             if (md.logicType === hfScrollLogicType.VERTICAL) {
//                 hfStyleHelper.setTop(md.heThumb, tv);
//             } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//                 hfStyleHelper.setLeft(md.heThumb, tv);
//             } else if (md.logicType === hfScrollLogicType.BOTH) {
//                 //
//             }
//         }
//     }

//     /**
//      * Scroll 사이즈 반환
//      */
//     #fn_getScrollSize() {
//         let gs = this.#groundCheckSize;
//         let rv = gs - this.#thumbCheckSize;
//         if (rv < 0.0) rv = 0.0;
//         else if (rv > gs) rv = gs;

//         return rv;
//     }

//     /**
//      * Thumb 사이즈 설정
//      * @param {number} val
//      * @param {boolean} bApply
//      */
//     #fn_setThumbSize(val, bApply=true) {
//         const md = this.#md;

//         if (val === this.#thumbCheckSize) return;

//         let cs = val;
//         if (Number.isFinite(cs)) {
//             let bs = hfScrollLogic.#MINV;
//             let es = this.#groundCheckSize;
//             if (cs < bs) cs = bs;
//             else if (cs > es) cs = es;
//         } else {
//             cs = 0.0;
//         }
//         this.#thumbCheckSize = cs;

//         let cp = this.#fn_getScrollSize() * md.scrollPositionRatio;
//         this.#thumbCheckPosition = cp;

//         if (bApply) {
//             this.#fn_applyElementSize(cs);
//             this.#fn_applyElementPosition(cp);
//         }
//     }

//     /**
//      * Thumb 포지션 설정
//      * @param {number} val
//      * @param {boolean} bApply
//      * @returns
//      */
//     #fn_setThumbPosition(val, bApply=true) {
//         const md = this.#md;

//         if (val === this.#thumbCheckPosition) return;

//         let bp = 0.0;
//         let ep = this.#fn_getScrollSize();
//         let cp = val;
//         if (Number.isFinite(cp)) {
//             if (cp < bp) cp = bp;
//             else if (cp > ep) cp = ep;
//         } else {
//             cp = 0.0;
//         }
//         this.#thumbCheckPosition = cp;

//         let cr = (cp - bp) / (ep - bp);
//         if (Number.isFinite(cr)) {
//             if (cr < 0.0) cr = 0.0;
//             else if (cr > 1.0) cr = 1.0;
//         } else {
//             cr = 0.0;
//         }
//         md.scrollPositionRatio = cr;

//         if (bApply) {
//             this.#fn_applyElementPosition(cp);
//         }
//     }

//     /**
//      * Scroll 사이즈 비율 반환
//      * @returns
//      */
//     fn_getScrollSizeRatio() {
//         const md = this.#md;

//         let rv = md.scrollSizeRatio;
//         if (Number.isFinite(rv)) {
//             if (rv < 0.0) rv = 0.0;
//             else if (rv > 1.0) rv = 1.0;
//         } else {
//             rv = 0.0;
//         }

//         return rv;
//     }

//     /**
//      * Scroll 사이즈 비율 설정
//      * @param {number} val
//      * @param {boolean} bApply
//      */
//     fn_setScrollSizeRatio(val, bApply=true) {
//         const md = this.#md;

//         let cv = val;
//         if (Number.isFinite(cv)) {
//             if (cv < 0.0) cv = 0.0;
//             else if (cv > 1.0) cv = 1.0;
//         } else {
//             cv = 1.0;
//         }
//         md.scrollSizeRatio = cv;

//         let cs = this.#groundCheckSize * md.scrollSizeRatio;
//         this.#fn_setThumbSize(cs, bApply);

//         this.#fn_printSpanLog();
//     }

//     /**
//      * Scroll 포지션 비율 반환
//      * @returns
//      */
//     fn_getScrollPositionRatio() {
//         const md = this.#md;

//         let rv = md.scrollPositionRatio;
//         if (Number.isFinite(rv)) {
//             if (rv < 0.0) rv = 0.0;
//             else if (rv > 1.0) rv = 1.0;
//         } else {
//             rv = 0.0;
//         }

//         return rv;
//     }

//     /**
//      * Scroll 포지션 비율 설정
//      * @param {number} val
//      * @param {boolean} bApply
//      * @returns
//      */
//     fn_setScrollPositionRatio(val, bApply=true) {
//         const md = this.#md;

//         if (val === md.scrollPositionRatio) return;

//         let cr = val;
//         if (Number.isFinite(cr)) {
//             if (cr < 0.0) cr = 0.0;
//             else if (cr > 1.0) cr = 1.0;
//         } else {
//             cr = 0.0;
//         }
//         md.scrollPositionRatio = cr;

//         let bp = 0.0;
//         let ep = this.#fn_getScrollSize();
//         let cp = ep * md.scrollPositionRatio;
//         if (Number.isFinite(cp)) {
//             if (cp < bp) cp = bp;
//             else if (cp > ep) cp = ep;
//         } else {
//             cp = 0.0;
//         }
//         this.#thumbCheckPosition = cp;

//         if (bApply) {
//             this.#fn_applyElementPosition(cp);
//         }

//         this.#fn_printSpanLog();
//     }

//     #fn_updateAfterResized(bApply=true) {
//         const md = this.#md;

//         let bs = hfScrollLogic.#MINV;
//         let es = this.#groundCheckSize;
//         let cs = es * md.scrollSizeRatio;
//         if (Number.isFinite(cs)) {
//             if (cs < bs) cs = bs;
//             else if (cs > es) cs = es;
//         } else {
//             cs = es;
//         }
//         this.#thumbCheckSize = cs;

//         let cp = this.#fn_getScrollSize() * md.scrollPositionRatio;
//         this.#thumbCheckPosition = cp;

//         if (bApply) {
//             this.#fn_applyElementSize(cs);
//             this.#fn_applyElementPosition(cp);
//         }

//         this.#fn_printSpanLog();
//     }

//     /**
//      * Mouse client coordinates
//      * @param {PointerEvent} pe
//      * @returns
//      */
//     #fn_clientXorY(pe) {
//         const md = this.#md;

//         let rv = 0.0;
//         if (md.logicType === hfScrollLogicType.VERTICAL) {
//             rv = pe.clientY;
//         } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//             rv = pe.clientX;
//         } else if (md.logicType === hfScrollLogicType.BOTH) {
//             //
//         }

//         return rv;
//     }

//     /**
//      * Mouse offset coordinates
//      * @param {PointerEvent} pe
//      * @returns
//      */
//     #fn_offsetXorY(pe) {
//         const md = this.#md;

//         let rv = 0.0;
//         if (md.logicType === hfScrollLogicType.VERTICAL) {
//             rv = pe.offsetY;
//         } else if (md.logicType === hfScrollLogicType.HORIZONTAL) {
//             rv = pe.offsetX;
//         } else if (md.logicType === hfScrollLogicType.BOTH) {
//             //
//         }

//         return rv;
//     }

//     /**
//      * ??
//      * @param {PointerEvent} pe
//      * @returns
//      */
//     #fn_mouseMove(pe) {
//         const md = this.#md;

//         if (pe.buttons !== 1) {
//             md.fn_muh(null);
//             return
//         }

//         // if (md.scrollSizeRatio === 1.0) return;

//         if (md.scrollSizeRatio < 1.0) {
//             let cp = this.#fn_clientXorY(pe) - md.mdp;
//             this.#fn_setThumbPosition(cp);

//             this.#fn_printSpanLog();

//             md.cbf?.(hfEventTypes.SCROLL, md.scrollSizeRatio, md.scrollPositionRatio);
//         }
//     }

//     /**
//      * ??
//      * @param {PointerEvent} _
//      */
//     #fn_mouseUp(_) {
//         const md = this.#md;

//         window.removeEventListener(hfEventTypes.MOUSE_MOVE, md.fn_mmh);
//         window.removeEventListener(hfEventTypes.MOUSE_UP, md.fn_muh);
//         window.removeEventListener(hfEventTypes.BLUR, md.fn_muh);
//     }

//     /**
//      * ??
//      * @param {PointerEvent} pe
//      */
//     #fn_mouseDown(pe) {
//         const md = this.#md;

//         if (pe.button !== 0) {
//             return
//         }

//         window.addEventListener(hfEventTypes.MOUSE_MOVE, md.fn_mmh);
//         window.addEventListener(hfEventTypes.MOUSE_UP, md.fn_muh);
//         window.addEventListener(hfEventTypes.BLUR, md.fn_muh);

//         if (hfStyleHelper.containsRect(md.rctThumb, pe.offsetX, pe.offsetY)) {
//             md.mdp = this.#fn_clientXorY(pe) - this.#thumbCheckPosition;
//             // this.#fn_mouseMove(pe);
//         } else {
//             let cp = this.#fn_offsetXorY(pe) - (this.#thumbCheckSize / 2);
//             this.#fn_setThumbPosition(cp);
//             md.mdp = this.#fn_clientXorY(pe) - this.#thumbCheckPosition;

//             this.#fn_printSpanLog();

//             md.cbf?.(hfEventTypes.SCROLL, md.scrollSizeRatio, md.scrollPositionRatio);
//         }
//     }

//     /**
//      * ??
//      * @param {Event} _
//      */
//     #fn_resize(_) {
//         const md = this.#md;

//         hfStyleHelper.updateRect(md.heTarget, md.rctGround);
//         this.#fn_updateAfterResized();
//     }

// };
// Object.freeze(hfScrollLogic);


// export {
//     hfScrollLogicType,
//     hfScrollLogic,
// };

