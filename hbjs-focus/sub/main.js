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


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

const fn_getPageIndex = () => {
    let kvsa = document.cookie.split(';');
    let rv = '';
    for (let kvs of kvsa) {
        // 'pgi=333345'.match(/pgi=(\d+)/)?.at(1);
        rv = kvs.match(/pgi=(\d+)/)?.at(1);
    }
    return +rv;
};

const fn_savePageIndex = () => {
    if (_cpd) {
        document.cookie = `pgi=${_cpd.mi}`;
    }
};

const fn_updatePinRect = () => {
    if (_cpd) {
        let ey = _cpd.mbtn.offsetTop;
        _pinRect.style.top = `${ey}px`;
    }
};

const fn_focusPage = () => {
    if (_cpd) {
        _cpd.pge?.focus({preventScroll: true});
    }
};


/** @type {IPageData} */
let _cpd = null;
let _btwr = false;

const fn_twr1_stop = () => {
    _btwr = false;
    _twr1.stop();
};

const fn_twr1_cbf = (et, cv) => {
    if (et === hfTween.ET_UPDATE) {
        _pageCont.scrollTo(0, cv);
    } else if (et === hfTween.ET_END) {
        window.setTimeout(() => {
            _btwr = false;
        }, 100);
    }
};

const _twr1 = new hfTween(0, 32,
    new hfEaseExponential(hfEasingKind.easeInOut), fn_twr1_cbf);


const fn_ggonly = () => {
    if (_cpd) {
        let begin = _pageCont.scrollTop;
        let end = _cpd.pge.offsetTop;
        let max = _pageCont.scrollHeight - _pageCont.clientHeight;
        if (end > max) end = max;
        if (begin !== end) {
            _btwr = true;
            _twr1.fromTo(begin, end);
        }
    }
};

const fn_ggwave = (bs=true) => {
    if (_cpd) {
        if (bs) fn_savePageIndex();
        fn_updatePinRect();
        fn_focusPage();
        fn_ggonly();
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
        if (pd !== _cpd) {
            _cpd = pd;
            fn_ggwave();
        } else {
            fn_focusPage();
        }
    } else {
        dcs.log(`[#App(Error) Page not found] ${btn.textContent}`);
    }
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

const fn_initPages = () => {
    _pageCont.innerHTML = '';

    for (let pd of _pageDataArr) {
        let rhs = fn_getMatchingPageType(pd.pgtp);
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
        Reflect.defineProperty(pd.pge, 'pd', {value: pd});
    }
};

const fn_initPageCont = () => {
    /**
     * @param {HTMLElement} te
     * @returns
     */
    const fn_findParent = (te) => {
        let re = te;
        do {
            if (re?.getAttribute('class') === 'c_page') {
                // dcs.log('찾음');
                break;
            }
            // dcs.log('>>> ' + re);
            re = re.parentElement;
        } while (re instanceof HTMLElement);

        return re;
    };
    _pageCont.addEventListener('focusin', (fe) => {
        if (fe.relatedTarget === null) return;

        // dcs.log('focusin');
        fe.stopPropagation();
        // fe.stopImmediatePropagation();
        // fe.preventDefault();

        let re = fn_findParent(fe.target);
        let pd = re.pd;
        if (pd !== _cpd) {
            // dcs.log('~~~~');
            _cpd = pd;
            fn_savePageIndex();
            fn_updatePinRect();
            fn_ggonly();
        }
    });

    /* //#처음꺼
    _pageCont.addEventListener('focusin', (fe) => {
        if (fe.relatedTarget === null) return;

        dcs.log('focusin');
        fe.stopPropagation();
        // fe.stopImmediatePropagation();
        // fe.preventDefault();

        const mcc = 'rgb(127, 255, 212)';
        for (let pd of _pageDataArr) {
            let st = getComputedStyle(pd.pge);
            if (st.borderColor === mcc) {
                if (pd !== _cpd) {
                    dcs.log('~~~~');
                    _cpd = pd;
                    fn_savePageIndex();
                    fn_updatePinRect();
                    fn_ggonly();
                }

                break;
            }
        }
    });*/

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

    let pi = fn_getPageIndex();
    let pd = _pageDataArr.at(pi);
    if (pd) {
        _cpd = pd;
        fn_ggwave(false);
    }

    dcs.log('[#App(Initialized)]');
};


fn_initOnce();