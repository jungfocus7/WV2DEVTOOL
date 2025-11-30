import { dcs, hfEventTypes } from "../hbjs/hfCommon.js";
import { hfEasingKind, hfEaseExponential, hfTween } from "../hbjs/hfTween.js";
// import _page01 from "./pages/page01.js";



/** @type {HTMLDivElement} */
const _rootCont = document.querySelector('div.c_rootCont');

/** @type {HTMLDivElement} */
const _leftMenuCont = _rootCont.querySelector('div.c_leftMenuCont');

/** @type {HTMLDivElement} */
const _pageCont = _rootCont.querySelector('div.c_pageCont');

// /** @type {HTMLButtonElement[]} */
// const _lmbtnArr = Array.from(_leftMenuCont.querySelectorAll('button.c_mbtn'));
// (() => {
//     // Array.from(_leftMenuCont.querySelectorAll('button.c_mbtn'))
//     //     .forEach((te, ti, ta) => {
//     //         dcs.log(te, ti)
//     //     });
//     // let x0 = _leftMenuCont.querySelectorAll('button.c_mbtn');
//     // dcs.log(x0.entries().length);
//     let ra = Array.from(_leftMenuCont.querySelectorAll('button.c_mbtn'))
//         .map((te, ti) => {
//             // dcs.log(te.toString(), ti);
//             /** @type {PageData} */
//             let pd = {
//                 rootCont: _rootCont,
//                 leftMenuCont: _leftMenuCont,
//                 pageCont: _pageCont,
//                 mbtn: te,
//                 mi: ti,
//                 pge: null,
//                 txa: null,
//                 ftbtns: null,
//                 fn_clear: null,
//                 fn_stop: null,
//                 fn_init: null,
//             };
//             // dcs.log(1, Object.seal(pd) === Object.seal(pd));
//             // dcs.log(2, Object.seal(pd) === pd);
//             // dcs.log(3, Object.is(pd, pd));
//             // dcs.log(4, Object.is(pd, Object.seal(pd)));
//             return Object.seal(pd);
//         });
//     dcs.log(ra);
//     return ra;
// })();

// /** @type {PageData[]} */
// const _pageDataArr = [];

/** @type {HTMLSpanElement} */
const _pinRect = _leftMenuCont.querySelector('span.c_pinRect');

/** @type {HTMLSpanElement} */
const _pinFold = _leftMenuCont.querySelector('span.c_pinFold');

/** @type {PageData[]} */
const _pageDataArr = (() => {
    let ra = Array.from(_leftMenuCont.querySelectorAll('button.c_mbtn'))
        .map((te, ti) => {
            /** @type {PageData} */
            let pd = {
                rootCont: _rootCont,
                leftMenuCont: _leftMenuCont,
                pageCont: _pageCont,
                mbtn: te,
                mi: ti,
                pge: null,
                txa: null,
                ftbtns: null,
                fn_clear: null,
                fn_stop: null,
                fn_init: null,
            };
            return Object.seal(pd);
        });
    return ra;
})();


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_initPages = () => {
    let hts = _pageCont.innerHTML;
    _pageCont.innerHTML = '';

    let l = _lmbtnArr.length;
    for (let i = 0; i < l; i++) {
        let pd = _pageDataArr.at(i);
        if (pd) {
            let btn = _lmbtnArr.at(i);
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
            _pageCont.insertAdjacentHTML('beforeend', rhs);

            pd.rootCont = _rootCont;
            pd.leftMenuCont = _leftMenuCont;
            pd.pageCont = _pageCont;

            pd.mbtn = btn;
            pd.pge = _pageCont.lastElementChild;

            pd.fn_init();
        }
    }
};

const fn_focusPage = () => {
    let max = _pageCont.scrollHeight - _pageCont.clientHeight;
    let ctr = _pageCont.scrollTop / max;
    // dcs.log(ctr);
    let li = _pageDataArr.length - 1;
    let i = Math.round(li * ctr);
    // dcs.log(li, i);

    let pd = _pageDataArr.at(i);
    pd.pge.focus({preventScroll: true});

    let ey = pd.mbtn.offsetTop;
    _pinRect.style.top = `${ey}px`;
    pd.pge.focus({preventScroll: true});
};

let _btwr = false;
const fn_initPageCont = () => {
    let pst = _pageCont.scrollTop;
    _pageCont.addEventListener('scroll', (_) => {
        if (_btwr) return;

        let cst = _pageCont.scrollTop;
        let ds = Math.abs(cst - pst);
        // dcs.log(pst, cst, ds);
        pst = cst;
        if (ds > 0) {
            fn_focusPage();
        }
    });

    _pageCont.addEventListener('mousedown', (me) => {
        // dcs.log('mousedown', me);
        me.stopPropagation();
        // me.stopImmediatePropagation();

        fn_twr1_stop();
        if (me.target === me.currentTarget) {
            me.preventDefault();
            fn_focusPage();
        }
    });

    _pageCont.addEventListener('mousewheel', (me) => {
        // dcs.log('mousewheel', me);
        me.stopPropagation();
        // me.stopImmediatePropagation();

        fn_twr1_stop();
    });


    // window.addEventListener('mousedown', (_) => {
    //    dcs.log('window.mousedown');
    // });

    // window.addEventListener('mousewheel', (_) => {
    //    dcs.log('window.mousewheel');
    // });
};

const fn_initPins = () => {
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

const fn_twr1_stop = () => {
    _twr1.stop();
    _btwr = false;
};
const fn_twr1_cbf = (et, cv) => {
    // dcs.log(et, cv);
    if (et === hfTween.ET_UPDATE) {
        _pageCont.scrollTo(0, cv);
    } else if (et === hfTween.ET_END) {
        window.setTimeout(() => {
            _btwr = false;
            fn_focusPage();
        }, 100);
    }
};
const _twr1 = new hfTween(0, 32
    , new hfEaseExponential(hfEasingKind.easeInOut), fn_twr1_cbf);

/**
 * @param {HTMLDivElement} pge
 */
const fn_ggwave = (pge) => {
    let begin = _pageCont.scrollTop;
    let end = pge.offsetTop;
    let max = _pageCont.scrollHeight - _pageCont.clientHeight;
    if (end > max) end = max;

    if (begin === end) {
        fn_focusPage();
    } else {
        _btwr = true;
        _twr1.fromTo(begin, end);
    }
};

/**
 * @param {PointerEvent} pe
 */
const fn_btn_cl = (pe) => {
    /** @type {HTMLButtonElement} */
    let btn = pe.currentTarget;
    let pd = _pageDataArr.at(btn.pi);
    if (pd) {
        let ey = btn.offsetTop;
        _pinRect.style.top = `${ey}px`;
        fn_ggwave(pd.pge);
    } else {
        dcs.log(`[#App(Error)] No page ${btn.textContent}`);
    }
};

const fn_importPages = async () => {
    let fp = './pages/', ep = '.js';
    for (let pd of _pageDataArr) {
        // dcs.log(1004);
    }
    /** @type {PageInterface} */
    let pglg = (await import(`${fp}page01${ep}`)).default;
    dcs.log(pglg);
    // _pageDataArr.push((await import(`${fp}page01${ep}`)).default);
    // _pageDataArr.push((await import(`${fp}page02${ep}`)).default);
    // _pageDataArr.push((await import(`${fp}page03${ep}`)).default);
    // _pageDataArr.push((await import(`${fp}page04${ep}`)).default);
    // _pageDataArr.push((await import(`${fp}page05${ep}`)).default);
    // _pageDataArr.push((await import(`${fp}page06${ep}`)).default);
    // _pageDataArr.push((await import(`${fp}page07${ep}`)).default);
    // _pageDataArr.push((await import(`${fp}page08${ep}`)).default);
};

const fn_initOnce = async () => {
    await fn_importPages();

    return;
    let i = 0;
    for (let btn of _lmbtnArr) {
        let txt = btn.textContent;
        let tin = txt.substring(0, 2);
        let tnm = txt.substring(3);
        Reflect.defineProperty(btn, 'tin', {value: tin});
        Reflect.defineProperty(btn, 'tnm', {value: tnm});
        Reflect.defineProperty(btn, 'pi', {value: i++});
        btn.addEventListener(hfEventTypes.CLICK, fn_btn_cl);
    }

    fn_initPages();
    fn_initPageCont();
    fn_initPins();

    let pd = _pageDataArr.at(0);
    if (pd) {
        let ey = pd.mbtn.offsetTop;
        _pinRect.style.top = `${ey}px`;
        pd.pge.focus({preventScroll: true});
    }

    dcs.log('[#App(Initialized)]');
};

fn_initOnce();



// window.addEventListener('message', (te) => {
//     console.log(te);
//     console.log('받았다');

// });

