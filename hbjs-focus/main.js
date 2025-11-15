import { hfEasingKind, hfEaseBounce, hfTween } from "./hbjs/hfTween.js";


/**
 * GlobalDataObject
 */
const _gdo = Object.seal({
    /**
     * DIV Root
     * @type {HTMLDivElement}
     */
    droot: document.getElementById('droot'),

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
_gdo.dcontainer = _gdo.droot.querySelector('#dcontainer');
_gdo.dfooter = _gdo.droot.querySelector('#dfooter');
_gdo.cea = _gdo.dcontainer.children;


(() => {
    if ((_gdo.cea === null) || (_gdo.cea.length === 0)) {
        console.log('## Empty Elements');
        return;
    }

    let i = 0, tes = '';
    for (const te of _gdo.cea) {
        let tnm = te.getAttribute('src');
        // console.log(tnm);

        const bi = 12;
        const ei = tnm.lastIndexOf('.html');
        tnm = tnm.substring(bi, ei);
        const tag = `<button class="c_bt" data-i="${i}"><span>${ tnm }</span></button>`;
        tes += tag;
        i++;
    }
    _gdo.dfooter.innerHTML = tes;

    _gdo.twr = new hfTween(0, 36, new hfEaseBounce(hfEasingKind.easeOut),
        (_, cv) => {
            _gdo.dcontainer.scrollTo(cv, 0);
        });
    _gdo.btns = _gdo.dfooter.querySelectorAll('button.c_bt');


    const fn_clh = (te) => {
        const btn = te.currentTarget;
        const i = +btn.dataset.i;
        const ce = _gdo.cea[i];

        const begin = _gdo.dcontainer.scrollLeft;
        let change = ce.offsetLeft;
        const max = _gdo.dcontainer.scrollWidth - _gdo.dcontainer.clientWidth;
        if (change > max) change = max;
        _gdo.twr.fromTo(begin, change);
    };
    for (const btn of _gdo.btns) {
        btn.addEventListener('click', fn_clh);
    }

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
