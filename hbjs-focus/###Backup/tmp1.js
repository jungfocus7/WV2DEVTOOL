import { dcs, hfEventTypes } from "../hbjs/hfCommon.js";
import { hfEasingKind, hfEaseExponential, hfTween } from "../hbjs/hfTween.js";



/** @type {HTMLDivElement} */
const _rootCont = document.querySelector('div.c_rootCont');

/** @type {HTMLDivElement} */
const _leftMenuCont = _rootCont.querySelector('div.c_leftMenuCont');

/** @type {HTMLDivElement} */
const _pageCont = _rootCont.querySelector('div.c_pageCont');

/** @type {HTMLSpanElement} */
const _pinRect = _leftMenuCont.querySelector('span.c_pinRect');

/** @type {HTMLSpanElement} */
const _pinFold = _leftMenuCont.querySelector('span.c_pinFold');


/** @type {IPageData[]} */
const _pageDataArr = (() => {
    let ra = Array.from(_leftMenuCont.querySelectorAll('div.c_mbtn'))
        .map((te, ti) => {
            let txt = te.textContent.trim();
            let pgtnm = txt.substring(3);

            /** @type {string} */
            let dts = te.dataset['dts']?.trim();
            let jar = dts?.split(',');
            // dcs.log(dts, jar);
            let pnm = jar.at(0);
            let ptp = jar.at(1);
            // dcs.log(pnm, ptp);
            let purl = (pnm) ? `./pages/${pnm}.js` : null;
            // dcs.log(purl);

            /** @type {IPageData} */
            let pd = {
                rootCont: _rootCont,
                leftMenuCont: _leftMenuCont,
                pageCont: _pageCont,

                mbtn: te,
                mi: ti,
                pgtnm,
                pgtp: ptp ?? null,
                pgurl: purl,
                pge: null,

                fn_clear: null,
                fn_stop: null,
                fn_init: null,
            };
            // dcs.log(pd);
            return Object.seal(pd);
        });
    return ra;
})();

/** @type {Map<string, string>} */
const _pgdmpMap = (() => {
    /** @type {HTMLElement[]} */
    let tea = Array.from(_pageCont.querySelectorAll('div.c_pageCont>div.c_page'));
    /** @type {Map<string, string>} */
    let map = new Map();
    for (let te of tea) {
        let dsm = te.dataset;
        if ('tp' in dsm) {
            // dcs.log('>>>>>', dsm.tp);
            map.set(dsm.tp, te.outerHTML);
        }
    }
    return map;
})();
// dcs.log(_pgdmpMap.size);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_getPageIndex = () => {
    let kvsa = document.cookie.split(';');
    let rv = '';
    for (let kvs of kvsa) {
        //kvs.sp
        // 'pgi=333345'.match(/pgi=(\d+)/)?.at(1);
        rv = kvs.match(/pgi=(\d+)/)?.at(1);
    }
    return +rv;
};

const fn_setPageIndex = (i) => {
    document.cookie = `pgi=${i}`;
};
document.addEventListener('focusin', (te) => {
    // dcs.log('어떤 포커스가 들어왔니?', document.activeElement);
    const mcc = 'rgb(127, 255, 212)';
    for (let pd of _pageDataArr) {
        let st = getComputedStyle(pd.pge);
        if (st.borderColor === mcc) {
            let ey = pd.mbtn.offsetTop;
            _pinRect.style.top = `${ey}px`;
            break;
        }
    }

    // let i = 0, j = -1;
    // for (let te of _pageCont.children) {
    //     let st = getComputedStyle(te);
    //     if (st.borderColor === mcc) {
    //         j = i;
    //         break;
    //     }
    //     i++;
    // }
    // if (j > -1) {
    //     let pd = _pageDataArr.at(j);
    //     if (pd) {
    //         let ey = pd.mbtn.offsetTop;
    //         _pinRect.style.top = `${ey}px`;
    //         pd.pge.focus({preventScroll: true});
    //     }
    //     // dcs.log(i);
    // }
});
// window.addEventListener('click', () => {
//     // dcs.log(_pageCont.scrollHeight);
//     // dcs.log(_pageCont.clientHeight);
//     // dcs.log(_pageCont.children);
//     // dcs.log(_pageCont.scrollHeight);
//     // dcs.log(_pageCont.scrollTop);
//     // dcs.log(_pageCont.scrollTop);
//     // dcs.log(_pageCont.children[0].offsetTop);
//     let min = _pageCont.scrollTop;
//     let max = min + 200;
//     dcs.log(min, max);
//     for (let te of _pageCont.children) {
//         // dcs.log(te.offsetTop);
//         let now = te.offsetTop;
//         if ((now >= min) && (now < max)) {
//             dcs.log('찾았다.', te)
//             break;
//         }
//     }
// });
// const fn_focusPage = () => {
//     let max = _pageCont.scrollHeight - _pageCont.clientHeight;
//     // dcs.log(max);
//     let ctr = _pageCont.scrollTop / max;
//     // dcs.log(ctr);
//     let li = _pageDataArr.length - 1;
//     // let i = Math.round(li * ctr);
//     // let i = Math.floor(li * ctr);
//     let i = (_pageCont.clientHeight > 400) ?
//         Math.floor(li * ctr) : Math.ceil(li * ctr);
//     // dcs.log(li, i);

//     let pd = _pageDataArr.at(i);
//     let ey = pd.mbtn.offsetTop;
//     _pinRect.style.top = `${ey}px`;
//     pd.pge?.focus({preventScroll: true});
// };
const fn_focusPage = () => {
    // let min = _pageCont.scrollTop;
    // let max = min + 200;
    // let i = 0, j = -1;
    // for (let te of _pageCont.children) {
    //     let now = te.offsetTop;
    //     if ((now >= min) && (now < max)) {
    //         j = i;
    //         break;
    //     }
    //     i++;
    // }
    // if (j > -1) {
    //     let pd = _pageDataArr.at(j);
    //     let ey = pd.mbtn.offsetTop;
    //     _pinRect.style.top = `${ey}px`;
    //     pd.pge?.focus({preventScroll: true});
    // }
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
            // fn_focusPage();
        }
    });

    _pageCont.addEventListener('mousedown', (me) => {
        // dcs.log('mousedown', me);
        me.stopPropagation();
        // me.stopImmediatePropagation();

        fn_twr1_stop();
        if (me.target === me.currentTarget) {
            me.preventDefault();
            // fn_focusPage();
        }
    });

    _pageCont.addEventListener('mousewheel', (me) => {
        // dcs.log('mousewheel', me);
        me.stopPropagation();
        // me.stopImmediatePropagation();

        fn_twr1_stop();
    });
};

const fn_importPages = async () => {
    for (let pd of _pageDataArr) {
        if (pd.pgurl !== null) {
            try {
                /** @type {IPageWork} */
                let rmd = (await import(pd.pgurl)).default;
                pd.fn_clear = rmd.fn_clear;
                pd.fn_stop = rmd.fn_stop;
                pd.fn_init = rmd.fn_init;
            } catch (err) {
                dcs.log(err);
            }
        }
    }
};

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
 * @param {string} ttp
 */
const fn_getMatchingPageType = (ttp) => {
    if (_pgdmpMap.has(ttp)) {
        return _pgdmpMap.get(ttp);
    } else {
        return '<span style="font-size: 22px;">NotType</span>';
    }
};

/**
 * @param {PointerEvent} pe
 */
const fn_mbtn_clh = (pe) => {
    /** @type {HTMLButtonElement} */
    let btn = pe.currentTarget;
    /** @type {IPageData} */
    let pd = btn.pd;
    if (pd) {
        fn_setPageIndex(pd.mi);
        fn_ggwave(pd.pge);
    } else {
        dcs.log(`[#App(Error)] No page ${btn.textContent}`);
    }
};

const fn_initPages = () => {
    // let hts = _pageCont.innerHTML;
    _pageCont.innerHTML = '';

    for (let pd of _pageDataArr) {
        let rhs = fn_getMatchingPageType(pd.pgtp);
        // dcs.log(rhs);
        if (!rhs) continue;

        rhs = rhs.replace(/<!--[\s\S]+?-->/g, () => {
            return '';
        });
        rhs = rhs.replace(/(tabindex=")01(")/, (_, t2, t3) => {
            let rv = `${t2}${pd.mi}${t3}`;
            return rv;
        });
        rhs = rhs.replace(/("c_tname">)XXXXXX(<)/, (_, t2, t3) => {
            let rv = `${t2}${pd.pgtnm}${t3}`;
            return rv;
        });
        _pageCont.insertAdjacentHTML('beforeend', rhs);

        pd.mbtn.addEventListener(hfEventTypes.CLICK, fn_mbtn_clh);
        pd.pge = _pageCont.lastElementChild;
        try {
            pd.fn_init?.(pd);
        } catch (err) {
            dcs.log(err);
        }

        Reflect.defineProperty(pd.mbtn, 'pd', {value: pd});
    }
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

const fn_initOnce = async () => {
    await fn_importPages();
    fn_initPages();
    fn_initPageCont();
    fn_initPins();

    // let pi = fn_getPageIndex();
    // let pd = _pageDataArr.at(pi);
    // if (pd) {
    //     fn_ggwave(pd.pge);
    //     // let ey = pd.mbtn.offsetTop;
    //     // _pinRect.style.top = `${ey}px`;
    //     // pd.pge.focus({preventScroll: true});
    // }

    dcs.log('[#App(Initialized)]');
};


fn_initOnce();



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// _rootCont.addEventListener('mousewheel', (e) => {
//     e.preventDefault();
//     // console.log(1004);
// });

