import { dcs, hfEventTypes } from "../hbjs/hfCommon.js";
import { hfEasingKind, hfEaseExponential, hfTween } from "../hbjs/hfTween.js";


/** @type {HTMLDivElement} */
const _rootCont = document.querySelector('div.c_rootCont');

/** @type {HTMLDivElement} */
const _leftMenuCont = _rootCont.querySelector('div.c_leftMenuCont');

/** @type {HTMLDivElement} */
const _pageCont = _rootCont.querySelector('div.c_pageCont');

/** @type {HTMLButtonElement[]} */
const _lmbtnArr = Array.from(_leftMenuCont.querySelectorAll('button.c_mbtn'));

/** @type {PageData[]} */
const _pageDataArr = [];

/** @type {HTMLSpanElement} */
const _pinRect = _leftMenuCont.querySelector('span.c_pinRect');

/** @type {HTMLSpanElement} */
const _pinFold = _leftMenuCont.querySelector('span.c_pinFold');



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_twr1_cbf = (_, cv) => {
    _pinRect.style.top = `${cv}px`;
};
const _twr1 = new hfTween(0, 16, new hfEaseExponential(hfEasingKind.easeOut), fn_twr1_cbf);


const fn_comp_pageMngr = () => {
    let hts = _pageCont.innerHTML;
    _pageCont.innerHTML = '';

    /** @type {string[]} */
    let tsb = [];
    for (let btn of _lmbtnArr) {
        let tin = btn.tin;
        let tnm = btn.tnm;

        let rhs = hts;
        rhs = rhs.replace(/<!--[\s\S]+?-->/g, () => {
            return '';
        });
        rhs = rhs.replace(/(tabindex=")01(")/, (_, t2, t3) => {
            let rv = `${t2}${tin}${t3}`;
            return rv;
        });
        rhs = rhs.replace(/("c_tname">)hfCommon(<)/, (_, t2, t3) => {
            let rv = `${t2}${tnm}${t3}`;
            return rv;
        });
        tsb.push(rhs);

        _pageDataArr.push({
           rootCont: _rootCont,
           leftMenuCont: _leftMenuCont,
           pageCont: _pageCont,
           mbtn: btn,
           pge: null,
        });
    }

    _pageCont.innerHTML = tsb.join('');

    let pgeArr = Array.from(_pageCont.querySelectorAll('div.c_page'));
    let i = 0;
    for (let pge of pgeArr) {
        let pd = _pageDataArr.at(i++);
        pd.pge = pge;
    }
};

const fn_comp_scrollMngr = () => {
    // /**
    //  * @param {number} cst
    //  */
    // const fn_fge = (cst) => {
    //     let rv = -1;
    //     for (let pd of _pageDataArr) {
    //         let ost = pd.pge.offsetTop;
    //         let ds = Math.abs(cst - ost);
    //         if (ds <= 150) {
    //             rv = ost;
    //             pd.pge.focus({preventScroll: true});
    //             break;
    //         }
    //     }

    //     // dcs.log(rv);
    // };
    const fn_fge = () => {
        // _pageCont.scrollTop
        // _pageCont.scrollHeight
        // _pageCont.clientHeight
        let rv = _pageCont.scrollTop / (_pageCont.scrollHeight - _pageCont.clientHeight);
        dcs.log(rv);
    };

    let pst = _pageCont.scrollTop;
    const fn_scroll = () => {
        // dcs.log(_pageCont.scrollTop
        //     , _pageCont.scrollHeight
        //     , _pageCont.clientHeight);
        // let xxx = _pageCont.scrollHeight - _pageCont.clientHeight;
        // dcs.log(xxx);
        // return;
        let cst = _pageCont.scrollTop;
        let ds = Math.abs(cst - pst);
        pst = cst;
        // dcs.log(cst, ds);
        if (ds > 0) {
            // dcs.log(cst, _pageDataArr.at(1).pge.offsetTop);
            // fn_fge(cst);
            // dcs.log(cst, csh, _pageCont.heigh);
            fn_fge();
        }
    };
    _pageCont.addEventListener('scroll', fn_scroll);
};

const fn_comp_fold = () => {
    let bc = true;
    let fn_clh = (_) => {
        if (bc) {
            let stl = _leftMenuCont.style;
            stl.width = '32px';
            bc = false;
        } else {
            let stl = _leftMenuCont.style;
            stl.width = '';
            bc = true;
        }
    };
    _pinFold.addEventListener(hfEventTypes.CLICK, fn_clh);
};

/**
 * @param {PointerEvent} pe
 */
const fn_btn_cl = (pe) => {
    /** @type {HTMLButtonElement} */
    let btn = pe.currentTarget;
    let ey = btn.offsetTop;
    _pinRect.style.top = `${ey}px`;
    // dcs.log(btn.pi, _pageDataArr.at(btn.pi));
    // _pageDataArr.at(btn.pi)?.pge.focus({preventScroll: true});
    //pge.focus({preventScroll: false});
};

const fn_initOnce = () => {
    let i = 0;
    for (let btn of _lmbtnArr) {
        let txt = btn.textContent;
        let tin = txt.substring(0, 2);
        let tnm = txt.substring(3);
        Reflect.defineProperty(btn, 'tin', {value: tin});
        Reflect.defineProperty(btn, 'tnm', {value: tnm});
        Reflect.defineProperty(btn, 'pi', {value: i});
        btn.addEventListener(hfEventTypes.CLICK, fn_btn_cl);
        if (i === 0) {
            btn.click();
        }
        ++i;
    }

    fn_comp_pageMngr();
    fn_comp_scrollMngr();
    fn_comp_fold();
};

fn_initOnce();

























// (() => {
//     const fn_getPageIndex = () => {
//         let kvsa = document.cookie.split(';');
//         let rv = '';
//         for (let kvs of kvsa) {
//             //'pgi=333345'.match(/pgi=(\d+)/)?.at(1);
//             rv = kvs.match(/pgi=(\d+)/)?.at(1);
//             if (rv) break;
//         }
//         return +rv;
//     };

//     const fn_setPageIndex = (pi) => {
//         document.cookie = `pgi=${pi}`;
//     };


//     let _bCloseLeftCont = true;
//     let fn_pinbt_cl = (_) => {
//         if (_bCloseLeftCont) {
//             let stl = _leftMenuCont.style;
//             stl.width = '37px';
//             _bCloseLeftCont = false;
//         } else {
//             let stl = _leftMenuCont.style;
//             stl.width = '';
//             _bCloseLeftCont = true;
//         }
//     };
//     _pinbt.addEventListener(hfEventTypes.CLICK, fn_pinbt_cl);


//     /**
//      * @param {HTMLDivElement} pge
//      */
//     const fn_ggwave = (pge) => {
//         let begin = _pageCont.scrollTop;
//         let end = pge.offsetTop;
//         let max = _pageCont.scrollHeight - _pageCont.clientHeight;
//         if (end > max) end = max;
//         _tween.fromTo(begin, end);

//         pge.focus({preventScroll: false});
//     };

//     /**
//      * @param {PointerEvent} pe
//      */
//     const fn_hbt_cl = (pe) => {
//         let btn = pe.currentTarget;
//         let pi = btn.pi;
//         let pge = _pageDataArr.at(btn.pi).pge;

//         fn_setPageIndex(pi);
//         fn_ggwave(pge);
//     };

//     let hts = _pageCont.innerHTML;
//     _pageCont.innerHTML = '';

//     /** @type {string[]} */
//     let tsb = [];
//     let i = 0;
//     for (let btn of _lmbtnArr) {
//         let txt = btn.textContent;
//         let tin = txt.substring(0, 2);
//         let tnm = txt.substring(4);

//         Reflect.defineProperty(btn, 'tin', {value: tin});
//         Reflect.defineProperty(btn, 'tnm', {value: tnm});
//         Reflect.defineProperty(btn, 'pi', {value: i++});

//         let rhs = hts;
//         rhs = rhs.replace(/(tabindex=")01(")/, (_, t2, t3) => {
//             let rv = `${t2}${tin}${t3}`;
//             return rv;
//         });
//         rhs = rhs.replace(/("c_tname">)hfCommon(<)/, (_, t2, t3) => {
//             let rv = `${t2}${tnm}${t3}`;
//             return rv;
//         });
//         tsb.push(rhs);

//         btn.addEventListener(hfEventTypes.CLICK, fn_hbt_cl);

//         _pageDataArr.push({
//            rootCont: _rootCont,
//            leftMenuCont: _leftMenuCont,
//            pageCont: _pageCont,
//            mbtn: btn,
//            pge: null,
//         });
//     }

//     _pageCont.innerHTML = tsb.join('');


//     let pgeArr = Array.from(_pageCont.querySelectorAll('div.c_page'));
//     i = 0;
//     for (let pge of pgeArr) {
//         let pd = _pageDataArr.at(i++);
//         // dcs.log(pd.mbtn.textContent);
//         pd.pge = pge;
//     }

//     let pi = fn_getPageIndex();
//     if (Number.isFinite(pi) &&
//         ((pi >= 0) || (pi < _pageDataArr.length))) {
//         let pge = _pageDataArr.at(pi).pge;
//         fn_ggwave(pge);
//     }


//     // let psv = 0;
//     // const fn_scroll = (_) => {
//     //     let csv = _pageCont.scrollTop;
//     //     let dst = Math.abs(csv - psv);
//     //     if (dst > 0) {
//     //         // dcs.log('>> ', dst);
//     //         // dcs.log('>> ', csv);
//     //         // let dy = 99999;
//     //         // for (let pd of _pageDataArr) {
//     //         //     let ty = Math.abs(pd.pge.offsetTop - csv);
//     //         //     if (ty < dy) {
//     //         //         dy = ty;
//     //         //     }
//     //         //     // dcs.log(ty, csv);
//     //         // }
//     //         // dcs.log(dy);

//     //         // for (let pd of _pageDataArr) {
//     //         //     let ty = Math.abs(pd.pge.offsetTop - csv);
//     //         //     if (ty < dy) {
//     //         //         dy = ty;
//     //         //     }
//     //         //     // dcs.log(ty, csv);
//     //         // }
//     //     }
//     //     psv = csv;
//     // };
//     // _pageCont.addEventListener('scroll', fn_scroll);
//     // dcs.log(1);
//     // _pageCont.addEventListener('scroll', (te) => {
//     //     let osy = _pageDataArr.at(0).pge.offsetTop;
//     //     dcs.log(osy, _pageCont.scrollTop);
//     //     // dcs.log(te);
//     //     // for (let pge of pgeArr) {
//     //     //     let pd = _pageDataArr.at(i++);
//     //     //     // dcs.log(pd.mbtn.textContent);
//     //     //     pd.pge = pge;
//     //     // }
//     // });

// })();













// import "./_defs.js";
// import { _page01 } from "./pages/page01.js";
// import { _page02 } from "./pages/page02.js";


// /** @type {GlobalDataObject} */
// const _gdo = Object.seal({
//     rootCont: document.querySelector('div.c_rootCont'),
//     leftMenuCont: null,
//     pageCont: null,
//     pageDataArr: [],
// });

// (() => {
//     const gd = _gdo;

//     gd.leftMenuCont = gd.rootCont.querySelector('div.c_leftMenuCont');
//     gd.pageCont = gd.rootCont.querySelector('div.c_pageCont');

//     // hfCommon
//     _page01.fn_initOnce(gd);

//     // hfCountTask
//     _page02.fn_initOnce(gd);


//     gd.leftMenuCont.insertAdjacentHTML('beforeend', `
// <span class="c_mobt"></span>
//     `.trim());
// })();








// // import { hfEasingKind, hfEaseBounce, hfTween } from "./hbjs/hfTween.js";


// // /**
// //  * GlobalDataObject
// //  */
// // const _gdo = Object.seal({
// //     /**
// //      * DIV Root
// //      * @type {HTMLDivElement}
// //      */
// //     droot: document.querySelector('div.c_root'),

// //     /**
// //      * DIV Contents Container
// //      * @type {HTMLDivElement}
// //      */
// //     dcontainer: null,

// //     /**
// //      * @type {HTMLDivElement}
// //      */
// //     dfooter: null,

// //     /**
// //      * @type {HTMLCollection}
// //      */
// //     pgea: null,

// //     /**
// //      * @type {hfTween}
// //      */
// //     twr: null,

// //     /**
// //      * @type {NodeListOf<HTMLButtonElement>}
// //      */
// //     btns: null,

// //     /**
// //      * @type {HTMLDivElement}
// //      */
// //     hwk: null,

// // });

// // (() => {
// //     _gdo.dcontainer = _gdo.droot.querySelector('div.c_pageCont');
// //     _gdo.dfooter = _gdo.droot.querySelector('div.c_footer');
// //     _gdo.pgea = Array.from(_gdo.dcontainer.children);

// //     if ((_gdo.pgea === null) || (_gdo.pgea.length === 0)) {
// //         console.log('## Empty Elements');
// //         return;
// //     }

// //     let i = 0, tes = [];
// //     for (const pge of _gdo.pgea) {
// //         let tnm = pge.getAttribute('src');
// //         // console.log(tnm);
// //         let ei = tnm.lastIndexOf('.html');
// //         tnm = tnm.substring(20, ei);
// //         let tag = `<button class="c_bt" data-pi="${i}"><span>${tnm}</span></button>`;
// //         tes.push(tag);
// //         i++;
// //     }
// //     tes.push('<div class="c_hwk"></div>');
// //     _gdo.dfooter.innerHTML = tes.join('');

// //     const fn_twr_cbf = (_, cv) => {
// //         _gdo.dcontainer.scrollTo(cv, 0);
// //     };
// //     _gdo.twr = new hfTween(0, 36, new hfEaseBounce(hfEasingKind.easeOut), fn_twr_cbf);
// //     _gdo.btns = Array.from(_gdo.dfooter.querySelectorAll('button.c_bt'));

// //     _gdo.hwk = _gdo.dfooter.lastElementChild;
// //     // console.log(_gdo.hwk);

// //     const fn_getPageIndex = () => {
// //         let kvsa = document.cookie.split(';');
// //         let rv = '';
// //         for (let kvs of kvsa) {
// //             //'pgi=333345'.match(/pgi=(\d+)/)?.at(1);
// //             rv = kvs.match(/pgi=(\d+)/)?.at(1);
// //         }
// //         return +rv;
// //     };

// //     const fn_setPageIndex = (pi) => {
// //         document.cookie = `pgi=${pi}`;
// //     };

// //     const fn_goFrom = (pi) => {
// //         if (Number.isFinite(pi) === false) return;
// //         if ((pi < 0) || (pi >= _gdo.pgea.length)) return;

// //         const pge = _gdo.pgea.at(pi);
// //         let begin = _gdo.dcontainer.scrollLeft;
// //         let change = pge.offsetLeft;
// //         let max = _gdo.dcontainer.scrollWidth - _gdo.dcontainer.clientWidth;
// //         if (change > max) change = max;
// //         _gdo.twr.fromTo(begin, change);
// //     };

// //     /**
// //      * @param {HTMLButtonElement} btn
// //      */
// //     const fn_going_hwk = (btn) => {
// //         if (btn == null) return;

// //         let drc0 = _gdo.dfooter.getBoundingClientRect();
// //         let drc = btn.getBoundingClientRect();
// //         // console.log(drc0, drc);

// //         let rw = drc.width;
// //         let rx = drc.left - drc0.left;
// //         // console.log(rw, rx);

// //         let st = _gdo.hwk.style;
// //         st.width = `${rw}px`;
// //         st.left = `${rx}px`;
// //     };

// //     const fn_clh = (me) => {
// //         let btn = me.currentTarget;
// //         let pi = +btn.dataset.pi;
// //         fn_setPageIndex(pi);
// //         fn_goFrom(pi);
// //         fn_going_hwk(btn);
// //     };
// //     for (let btn of _gdo.btns) {
// //         btn.addEventListener('click', fn_clh);
// //     }

// //     let pi = fn_getPageIndex();
// //     if ((Number.isFinite(pi) === false) || ((pi < 0) || (pi >= _gdo.pgea.length))) {
// //         pi = 0;
// //     }
// //     fn_goFrom(pi);
// //     fn_going_hwk(_gdo.btns.at(pi));

// // })();
