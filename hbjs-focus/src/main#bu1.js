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

// /** @type {HTMLDivElement[]} */
// const _pgeArr = Array.from(_pageCont.querySelectorAll('div.c_page'));
// let _pgeArr = null;

/** @type {PageData[]} */
const _pageDataArr = [];

/** @type {HTMLSpanElement} */
const _pinbt = _leftMenuCont.querySelector('span.c_pinbt');


const fn_twr_cbf = (_, cv) => {
    _pageCont.scrollTo(0, cv);
};
const _tween = new hfTween(0, 36, new hfEaseExponential(hfEasingKind.easeInOut), fn_twr_cbf);


let _bCloseLeftCont = true;
_pinbt.addEventListener(hfEventTypes.CLICK, (pe) => {
    if (_bCloseLeftCont) {
        let stl = _leftMenuCont.style;
        stl.width = '37px';
        _bCloseLeftCont = false;
    } else {
        let stl = _leftMenuCont.style;
        stl.width = '';
        _bCloseLeftCont = true;
    }
});


//~~~~~~~~~~
(() => {
    /**
     * @param {PointerEvent} pe
     */
    const fn_hbt_cl = (pe) => {
        // let btn = pe.currentTarget;
        // // dcs.log(btn.tin, btn.tnm, btn.di);
        // // dcs.log(Number.parseInt(btn.tin));
        // let pge = _pgeArr.at(btn.di);
        // // dcs.log(pge, pge.offsetTop);
        // let end = pge.offsetTop;
        // // dcs.log(typeof end, _pageCont.scrollTo);
        // dcs.log(_pageCont);
        // // _pageCont.scrollTo(0, 100);
        // _pageCont.scrollTo(0, end);

        let btn = pe.currentTarget;
        let pge = _pageDataArr.at(btn.di).pge;
        // _pageCont.scrollTo(0, pge.offsetTop);

        let begin = _pageCont.scrollTop;
        let end = pge.offsetTop;
        let max = _pageCont.scrollHeight - _pageCont.clientHeight;
        if (end > max) end = max;
        _tween.fromTo(begin, end);
    };

    let hts = _pageCont.innerHTML;
    _pageCont.innerHTML = '';

    /** @type {string[]} */
    let tsb = [];
    let i = 0;
    for (let btn of _lmbtnArr) {
        let txt = btn.textContent;
        let tin = txt.substring(0, 2);
        let tnm = txt.substring(4);

        // Reflect.defineProperty(btn, 'tin', {
        //     // configurable: false, enumerable: false, writable: false,
        //     value: tin
        // });
        Reflect.defineProperty(btn, 'tin', {value: tin});
        Reflect.defineProperty(btn, 'tnm', {value: tnm});
        Reflect.defineProperty(btn, 'di', {value: i++});
        // dcs.log(Reflect.getOwnPropertyDescriptor(btn, 'tin'));
        // dcs.log(btn.tin);
        // btn.tin = 99

        let rhs = hts;
        rhs = rhs.replace(/(tabindex=")01(")/, (_, t2, t3) => {
            let rv = `${t2}${tin}${t3}`;
            return rv;
        });
        rhs = rhs.replace(/("c_tname">)hfCommon(<)/, (_, t2, t3) => {
            let rv = `${t2}${tnm}${t3}`;
            return rv;
        });
        tsb.push(rhs);

        btn.addEventListener(hfEventTypes.CLICK, fn_hbt_cl);

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
    i = 0;
    for (let pge of pgeArr) {
        let pd = _pageDataArr.at(i++);
        dcs.log(pd.mbtn.textContent);
        pd.pge = pge;
    }

})();





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
