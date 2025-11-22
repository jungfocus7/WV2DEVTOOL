import { hfEasingKind, hfEaseBounce, hfTween } from "./hbjs/hfTween.js";


/**
 * GlobalDataObject
 */
const _gdo = Object.seal({
    /**
     * DIV Root
     * @type {HTMLDivElement}
     */
    droot: document.querySelector('div.c_root'),

    /**
     * DIV Contents Container
     * @type {HTMLDivElement}
     */
    dcontainer: null,

    /**
     * @type {HTMLDivElement}
     */
    dfooter: null,

    /**
     * @type {HTMLCollection}
     */
    pgea: null,

    /**
     * @type {hfTween}
     */
    twr: null,

    /**
     * @type {NodeListOf<HTMLButtonElement>}
     */
    btns: null,

    /**
     * @type {HTMLDivElement}
     */
    hwk: null,

});

(() => {
    _gdo.dcontainer = _gdo.droot.querySelector('div.c_pageCont');
    _gdo.dfooter = _gdo.droot.querySelector('div.c_footer');
    _gdo.pgea = _gdo.dcontainer.children;

    if ((_gdo.pgea === null) || (_gdo.pgea.length === 0)) {
        console.log('## Empty Elements');
        return;
    }

    let i = 0, tes = [];
    for (const pge of _gdo.pgea) {
        let tnm = pge.getAttribute('src');
        // console.log(tnm);
        let bi = 12;
        let ei = tnm.lastIndexOf('.html');
        tnm = tnm.substring(bi, ei);
        let tag = `<button class="c_bt" data-i="${i}"><span>${tnm}</span></button>`;
        tes.push(tag);
        i++;
    }
    tes.push('<div class="c_hwk"></div>');
    _gdo.dfooter.innerHTML = tes.join('');

    const fn_twr_cbf = (_, cv) => {
        _gdo.dcontainer.scrollTo(cv, 0);
    };
    _gdo.twr = new hfTween(0, 36
        , new hfEaseBounce(hfEasingKind.easeOut), fn_twr_cbf);
    _gdo.btns = _gdo.dfooter.querySelectorAll('button.c_bt');

    _gdo.hwk = _gdo.dfooter.lastElementChild;
    // console.log(_gdo.hwk);

    /**
     * @param {HTMLButtonElement} btn
     */
    const fn_going_hwk = (btn) => {
        let drc0 = _gdo.dfooter.getBoundingClientRect();
        let drc = btn.getBoundingClientRect();
        // console.log(drc0, drc);

        let rw = drc.width;
        let rx = drc.left - drc0.left;
        // console.log(rw, rx);

        let st = _gdo.hwk.style;
        st.width = `${rw}px`;
        st.left = `${rx}px`;

        // // let rw = btn.offsetWidth;
        // let rw = Number.parseFloat(getComputedStyle(btn).width);
        // rw = Math.round(rw);
        // console.log(rw);
        // let rx = btn.offsetLeft;
        // // console.log(rw, rx);

        // let st = _gdo.hwk.style;
        // st.width = `${rw}px`;
        // console.log(st.width);
        // st.left = `${rx}px`;

        // return;
        // let drc0 = _gdo.dfooter.getBoundingClientRect();
        // // console.log(drc0);
        // let drc = btn.getBoundingClientRect();
        // // console.log(drc0, drc);

        // let rx = drc.left - drc0.left;
        // console.log(rx);

        // let st = _gdo.hwk.style;
        // st.width = `${drc.width}px`;
        // st.left = `${rx}px`;


        // console.log(btn.clientWidth, btn.clientHeight);
        // console.log(btn.clientLeft, btn.clientTop);
        // console.log(btn.getClientRects());
        // let drc = btn.getBoundingClientRect();
        // console.log(drc);
        // let st = _gdo.hwk.style;
        // st.width = `${drc.width}px`;
        // st.left = `${drc.left - 4}px`;
    };

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

    const fn_goFrom = (i) => {
        if (typeof i !== 'number') return;
        if ((i < 0) || (i >= _gdo.length)) return;

        const pge = _gdo.pgea[i];
        let begin = _gdo.dcontainer.scrollLeft;
        let change = pge.offsetLeft;
        let max = _gdo.dcontainer.scrollWidth - _gdo.dcontainer.clientWidth;
        if (change > max) change = max;
        _gdo.twr.fromTo(begin, change);
    };

    const fn_clh = (me) => {
        let btn = me.currentTarget;
        let i = +btn.dataset.i;
        fn_setPageIndex(i);
        fn_goFrom(i);
        fn_going_hwk(btn);
    };
    for (let btn of _gdo.btns) {
        btn.addEventListener('click', fn_clh);
    }

    let pi = fn_getPageIndex();
    fn_goFrom(pi);
    fn_going_hwk(_gdo.btns[pi]);

})();


