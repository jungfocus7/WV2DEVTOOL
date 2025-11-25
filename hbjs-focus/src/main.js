import { dcs } from "../hbjs/hfCommon.js";
import { hfEasingKind, hfEaseBounce, hfTween } from "../hbjs/hfTween.js";
import "./_defs.js";
import { _page01 } from "./pages/page01.js";
import { _page02 } from "./pages/page02.js";
import { _page03 } from "./pages/page03.js";
import { _page04 } from "./pages/page04.js";



/** @type {GlobalDataObject} */
const _gdo = Object.seal({
    rootCont: document.querySelector('div.c_rootCont'),
    leftMenuCont: null,
    pageCont: null,

    pageDataArr: [],
});

const fn_twr_cbf = (_, cv) => {
    dcs.log(cv);
};
const _twr = new hfTween(0, 36, new hfEaseBounce(hfEasingKind.easeOut), fn_twr_cbf);

(() => {
    const gd = _gdo;

    gd.leftMenuCont = gd.rootCont.querySelector('div.c_leftMenuCont');
    gd.pageCont = gd.rootCont.querySelector('div.c_pageCont');

    // hfCommon
    _page01.fn_initOnce(gd);

    // hfCountTask
    _page02.fn_initOnce(gd);

    // hfFrameRepeater
    _page03.fn_initOnce(gd);

    // hfNumberRanger
    _page04.fn_initOnce(gd);


    gd.leftMenuCont.insertAdjacentHTML('beforeend', `
<span class="c_mobt"></span>
    `.trim());

    window.addEventListener('click', () => {
        _twr.fromTo(0, 1);
    });
})();















// import { hfEasingKind, hfEaseBounce, hfTween } from "./hbjs/hfTween.js";


// /**
//  * GlobalDataObject
//  */
// const _gdo = Object.seal({
//     /**
//      * DIV Root
//      * @type {HTMLDivElement}
//      */
//     droot: document.querySelector('div.c_root'),

//     /**
//      * DIV Contents Container
//      * @type {HTMLDivElement}
//      */
//     dcontainer: null,

//     /**
//      * @type {HTMLDivElement}
//      */
//     dfooter: null,

//     /**
//      * @type {HTMLCollection}
//      */
//     pgea: null,

//     /**
//      * @type {hfTween}
//      */
//     twr: null,

//     /**
//      * @type {NodeListOf<HTMLButtonElement>}
//      */
//     btns: null,

//     /**
//      * @type {HTMLDivElement}
//      */
//     hwk: null,

// });

// (() => {
//     _gdo.dcontainer = _gdo.droot.querySelector('div.c_pageCont');
//     _gdo.dfooter = _gdo.droot.querySelector('div.c_footer');
//     _gdo.pgea = Array.from(_gdo.dcontainer.children);

//     if ((_gdo.pgea === null) || (_gdo.pgea.length === 0)) {
//         console.log('## Empty Elements');
//         return;
//     }

//     let i = 0, tes = [];
//     for (const pge of _gdo.pgea) {
//         let tnm = pge.getAttribute('src');
//         // console.log(tnm);
//         let ei = tnm.lastIndexOf('.html');
//         tnm = tnm.substring(20, ei);
//         let tag = `<button class="c_bt" data-pi="${i}"><span>${tnm}</span></button>`;
//         tes.push(tag);
//         i++;
//     }
//     tes.push('<div class="c_hwk"></div>');
//     _gdo.dfooter.innerHTML = tes.join('');

//     const fn_twr_cbf = (_, cv) => {
//         _gdo.dcontainer.scrollTo(cv, 0);
//     };
//     _gdo.twr = new hfTween(0, 36, new hfEaseBounce(hfEasingKind.easeOut), fn_twr_cbf);
//     _gdo.btns = Array.from(_gdo.dfooter.querySelectorAll('button.c_bt'));

//     _gdo.hwk = _gdo.dfooter.lastElementChild;
//     // console.log(_gdo.hwk);

//     const fn_getPageIndex = () => {
//         let kvsa = document.cookie.split(';');
//         let rv = '';
//         for (let kvs of kvsa) {
//             //'pgi=333345'.match(/pgi=(\d+)/)?.at(1);
//             rv = kvs.match(/pgi=(\d+)/)?.at(1);
//         }
//         return +rv;
//     };

//     const fn_setPageIndex = (pi) => {
//         document.cookie = `pgi=${pi}`;
//     };

//     const fn_goFrom = (pi) => {
//         if (Number.isFinite(pi) === false) return;
//         if ((pi < 0) || (pi >= _gdo.pgea.length)) return;

//         const pge = _gdo.pgea.at(pi);
//         let begin = _gdo.dcontainer.scrollLeft;
//         let change = pge.offsetLeft;
//         let max = _gdo.dcontainer.scrollWidth - _gdo.dcontainer.clientWidth;
//         if (change > max) change = max;
//         _gdo.twr.fromTo(begin, change);
//     };

//     /**
//      * @param {HTMLButtonElement} btn
//      */
//     const fn_going_hwk = (btn) => {
//         if (btn == null) return;

//         let drc0 = _gdo.dfooter.getBoundingClientRect();
//         let drc = btn.getBoundingClientRect();
//         // console.log(drc0, drc);

//         let rw = drc.width;
//         let rx = drc.left - drc0.left;
//         // console.log(rw, rx);

//         let st = _gdo.hwk.style;
//         st.width = `${rw}px`;
//         st.left = `${rx}px`;
//     };

//     const fn_clh = (me) => {
//         let btn = me.currentTarget;
//         let pi = +btn.dataset.pi;
//         fn_setPageIndex(pi);
//         fn_goFrom(pi);
//         fn_going_hwk(btn);
//     };
//     for (let btn of _gdo.btns) {
//         btn.addEventListener('click', fn_clh);
//     }

//     let pi = fn_getPageIndex();
//     if ((Number.isFinite(pi) === false) || ((pi < 0) || (pi >= _gdo.pgea.length))) {
//         pi = 0;
//     }
//     fn_goFrom(pi);
//     fn_going_hwk(_gdo.btns.at(pi));

// })();
