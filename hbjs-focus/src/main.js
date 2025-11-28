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

let _btwr = false;
const fn_comp_scrollMngr = () => {
    const fn_fge = () => {
        let max = _pageCont.scrollHeight - _pageCont.clientHeight;
        let ctr = _pageCont.scrollTop / max;
        // dcs.log(ctr);
        let li = _pageDataArr.length - 1;
        let i = Math.round(li * ctr);
        // dcs.log(li, i);

        _pageDataArr.at(i).pge.focus({preventScroll: true});
    };

    let pst = _pageCont.scrollTop;
    const fn_scroll = (_) => {
        if (_btwr) return;

        let cst = _pageCont.scrollTop;
        let ds = Math.abs(cst - pst);
        // dcs.log(pst, cst, ds);
        pst = cst;
        if (ds > 0) {
            fn_fge();
        }
    };
    _pageCont.addEventListener('scroll', fn_scroll);

    // _pageCont.addEventListener('focusin', (e) => {
    //     dcs.log('focus~~', e);
    //     // fn_fge();
    // });
    // _pageCont.addEventListener('mousedown', (me) => {
    //     // me.stopPropagation();
    //     // me.stopImmediatePropagation();
    //     // dcs.log('focus~~', me);
    //     // _pageCont.blur();
    //     // fn_fge();
    //     // dcs.log(document.activeElement)
    //     me.preventDefault();
    //     // _pageDataArr.at(1).pge.focus({preventScroll: true});
    //     fn_fge();
    // });
    window.addEventListener('mousedown', (me) => {
       dcs.log('window');
    });

    _pageCont.addEventListener('mousedown', (me) => {
        // dcs.log('mousedown', me);
        // me.stopPropagation();
        me.stopImmediatePropagation();
        _twr1.stop();
        _btwr = false;
        if (me.target === me.currentTarget) {
            me.preventDefault();
            fn_fge();
        }
    });

    _pageCont.addEventListener('mousewheel', (me) => {
        // dcs.log('mousewheel', me);
        me.stopPropagation();
        _twr1.stop();
        _btwr = false;
    });
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

const fn_twr1_cbf = (et, cv) => {
    // dcs.log(et, cv);
    if (et === hfTween.ET_UPDATE) {
        _pageCont.scrollTo(0, cv);
        // window.setTimeout(() => {
        //     _pageCont.scrollTo(0, cv);
        // }, 100);
        // setTimeout(_pageCont.scrollTo.bind(), 100, 0, cv);
    } else if (et === hfTween.ET_END) {
        window.setTimeout(() => {
            _btwr = false;
            _pageCont.dispatchEvent(new Event('scroll'));
        }, 100);
    }
};
const _twr1 = new hfTween(0, 128
    , new hfEaseExponential(hfEasingKind.easeInOut), fn_twr1_cbf);

/**
 * @param {HTMLDivElement} pge
 */
const fn_ggwave = (pge) => {
    let begin = _pageCont.scrollTop;
    let end = pge.offsetTop;
    let max = _pageCont.scrollHeight - _pageCont.clientHeight;
    if (end > max) end = max;

    // dcs.log(pge, begin, end);
    // _pageCont.style.pointerEvents = 'none';
    // _pageCont.style.overflowY = 'hidden';
    // _pageCont.onfocus = () => {
    //     dcs.log(11);
    // };
    // _twr1.fromTo(begin, end);
    // _pageCont.scrollTo(0, end);
    // _pageCont.scrollIntoView({block: 'center'});
    // pge.scrollIntoView({behavior: 'instant', block: 'center', inline: 'center'});

    _btwr = true;
    _twr1.fromTo(begin, end);
};

/**
 * @param {PointerEvent} pe
 */
const fn_btn_cl = (pe) => {
    /** @type {HTMLButtonElement} */
    let btn = pe.currentTarget;
    let ey = btn.offsetTop;
    _pinRect.style.top = `${ey}px`;

    fn_ggwave(_pageDataArr.at(btn.pi).pge);
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
        ++i;
    }

    fn_comp_pageMngr();
    fn_comp_scrollMngr();
    fn_comp_fold();


    let pd = _pageDataArr.at(0);
    let ey = pd.mbtn.offsetTop;
    _pinRect.style.top = `${ey}px`;
    pd.pge.focus({preventScroll: true});
};

fn_initOnce();

