import { hfEaseCircular, hfTween } from "./hbjs/hfTween.js";


/**
 * GlobalDataObject
 */
const _gdo = Object.seal({
    /**
     * DIV Root
     * @type {HTMLDivElement}
     */
    rootCont: document.querySelector('div#rootCont'),

    /**
     * DIV Contents Container
     * @type {HTMLDivElement}
     */
    gameCont: document.querySelector('div#gameCont'),

    /**
     * @type {HTMLDivElement}
     */
    footerCont: document.querySelector('div#gameCont'),

    /**
     * @type {SVGSVGElement}
     */
    svgrt: document.querySelector('svg#svgrt'),


    /**
     * @type {hfTween}
     */
    twx: null,

    /**
     * @type {hfTween}
     */
    twy: null,


    /**
     * @type {HTMLCollection}
     */
    cea: null,

    /**
     * @type {NodeListOf<HTMLButtonElement>}
     */
    btns: null,

});

// console.log(_gdo.rootCont
//     , _gdo.gameCont
//     , _gdo.footerCont
//     , _gdo.svgrt
//     , _gdo.svgrt
// );

/*
// const _xx1 = _gdo.svgrt.querySelector('rect');
// console.log(_xx1);
// console.log(_xx1.getAttribute('x'));
*/

(() => {
    /**
     * @type {SVGRectElement}
     */
    const rct1 = _gdo.svgrt.querySelector('rect');
    // rct1.style.setProperty('t')
    // console.log(getComputedStyle(rct1));
    // console.log(''+rct1);
    console.log(getComputedStyle(rct1));

    _gdo.twx = new hfTween(0, 36, hfEaseCircular.easeOut,
        (_, cv) => {
            rct1.setAttribute('x', cv);
        });

    _gdo.twy = new hfTween(0, 36, hfEaseCircular.easeOut,
        (_, cv) => {
            rct1.setAttribute('y', cv);
        });

    _gdo.svgrt.addEventListener('mousedown', (te) => {
        const cx = te.layerX;
        const cy = te.layerY;
        // console.log(cx, cy);
        _gdo.twx.to(cx);
        _gdo.twy.to(cy);
    });

})();
