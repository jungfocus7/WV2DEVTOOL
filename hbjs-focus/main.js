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
    cea: null,

    /**
     * @type {hfTween}
     */
    twr: null,

    /**
     * @type {NodeListOf<HTMLButtonElement>}
     */
    btns: null,

});

(() => {
    _gdo.dcontainer = _gdo.droot.querySelector('div.c_container');
    _gdo.dfooter = _gdo.droot.querySelector('div.c_footer');
    _gdo.cea = _gdo.dcontainer.children;

    if ((_gdo.cea === null) || (_gdo.cea.length === 0)) {
        console.log('## Empty Elements');
        return;
    }

    let i = 0, tes = [];
    for (let ce of _gdo.cea) {
        let tnm = ce.getAttribute('src');
        // console.log(tnm);
        let bi = 12;
        let ei = tnm.lastIndexOf('.html');
        tnm = tnm.substring(bi, ei);
        let tag = `<button class="c_bt" data-i="${i}"><span>${tnm}</span></button>`;
        tes.push(tag);
        i++;
    }
    _gdo.dfooter.innerHTML = tes.join('');

    _gdo.twr = new hfTween(0, 36, new hfEaseBounce(hfEasingKind.easeOut),
        (_, cv) => {
            _gdo.dcontainer.scrollTo(cv, 0);
        });
    _gdo.btns = _gdo.dfooter.querySelectorAll('button.c_bt');


    const fn_get_pgi = () => {
        let kvsa = document.cookie.split(';');
        let rv = '';
        for (let kvs of kvsa) {
            //kvs.sp
            // 'pgi=333345'.match(/pgi=(\d+)/)?.at(1);
            rv = kvs.match(/pgi=(\d+)/)?.at(1);
        }
        return +rv;
    };

    const fn_set_pgi = (i) => {
        document.cookie = `pgi=${i}`;
    };

    const fn_goFrom = (i) => {
        if (typeof i !== 'number') return;
        if ((i < 0) || (i >= _gdo.length)) return;

        let ce = _gdo.cea[i];
        let begin = _gdo.dcontainer.scrollLeft;
        let change = ce.offsetLeft;
        let max = _gdo.dcontainer.scrollWidth - _gdo.dcontainer.clientWidth;
        if (change > max) change = max;
        _gdo.twr.fromTo(begin, change);
    };

    const fn_clh = (me) => {
        let btn = me.currentTarget;
        let i = +btn.dataset.i;
        fn_set_pgi(i);
        fn_goFrom(i);
    };
    for (let btn of _gdo.btns) {
        btn.addEventListener('click', fn_clh);
    }

    fn_goFrom(fn_get_pgi());

})();








// const _cea = _dcontainer.children;
// if ((_cea !== null) && (_cea.length > 0)) {


//     const btns = _dfooter.querySelectorAll('button.c_bt');
//     const twr = new hfTween(0, 36, hfEaseBounce.easeOut);
//     window.twr = twr;
//     twr.addEventListener(hfTween.ET_UPDATE, (te) => {
//         _dcontainer.scrollTo(twr.Current, 0);
//     });
//     const fn_clh = (te) => {
//         const bt = te.currentTarget;
//         const i = bt.$di;
//         const tx = _cea[i];

//         const begin = _dcontainer.scrollLeft;
//         let change = tx.offsetLeft;
//         const max = _dcontainer.scrollWidth - _dcontainer.clientWidth;
//         if (change > max) change = max;
//         twr.FromTo(begin, change);
//     };
//     let i = 0;
//     for (const bt of btns) {
//         bt.$di = i;
//         bt.addEventListener('click', fn_clh);
//         ++i;
//     }
// }
