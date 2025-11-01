import { hfSVGHelper } from "./js/hfSVGHelper.js";
import { hfSVGRectRefer } from "./js/hfSVGRectRefer.js";


/**
 * DIV RootCont
 * @type {HTMLDivElement}
 */
const _rootCont = document.querySelector('div.root-cont');
/**
 * DIV GameCont
 * @type {HTMLDivElement}
 */
const _gameCont = _rootCont.querySelector('div.game-cont');
/**
 * DIV FooterCont
 * @type {HTMLDivElement}
 */
const _footerCont = _rootCont.querySelector('div.footer-cont');
// console.log(_rootCont, _gameCont, _footerCont);

/**
 * @type {SVGSVGElement}
 */
const _svgrt = _gameCont.querySelector('svg.svgrt');
// console.log(_svgrt);


const _colorKeywords = [
    // White & Neutral
    'white', 'whitesmoke', 'gainsboro', 'lightgray', 'silver', 'darkgray', 'gray', 'dimgray', 'black',
    // Red & Pink
    'red', 'darkred', 'crimson', 'firebrick', 'indianred', 'lightcoral', 'salmon', 'darksalmon', 'lightsalmon',
    'coral', 'tomato', 'orangered', 'deeppink', 'hotpink', 'pink', 'lightpink', 'palevioletred', 'mediumvioletred',
    // Orange & Brown
    'orange', 'darkorange', 'gold', 'goldenrod', 'darkgoldenrod', 'peru', 'chocolate', 'sienna', 'brown',
    'maroon', 'saddlebrown', 'sandybrown', 'burlywood', 'tan', 'rosybrown', 'peachpuff', 'bisque', 'moccasin',
    // Yellow
    'yellow', 'lightyellow', 'lemonchiffon', 'lightgoldenrodyellow', 'papayawhip', 'mistyrose', 'cornsilk',
    'blanchedalmond', 'navajowhite', 'antiquewhite', 'wheat', 'oldlace', 'linen', 'seashell', 'snow',
    'honeydew', 'mintcream', 'azure', 'aliceblue', 'ghostwhite', 'ivory', 'floralwhite', 'beige', 'khaki', 'darkkhaki',
    // Green
    'green', 'darkgreen', 'forestgreen', 'seagreen', 'mediumseagreen', 'darkseagreen', 'lightseagreen',
    'palegreen', 'springgreen', 'mediumspringgreen', 'limegreen', 'lime', 'chartreuse', 'lawngreen',
    'greenyellow', 'yellowgreen', 'olivedrab', 'olive', 'darkolivegreen', 'teal', 'darkcyan',
    // Cyan & Blue
    'cyan', 'aqua', 'lightcyan', 'paleturquoise', 'aquamarine', 'turquoise', 'mediumturquoise',
    'darkturquoise', 'cadetblue', 'steelblue', 'lightsteelblue', 'powderblue', 'lightblue', 'skyblue',
    'lightskyblue', 'deepskyblue', 'dodgerblue', 'cornflowerblue', 'royalblue', 'blue', 'mediumblue',
    'darkblue', 'navy', 'midnightblue', 'slateblue', 'darkslateblue', 'mediumslateblue',
    // Purple & Magenta
    'purple', 'darkmagenta', 'darkorchid', 'mediumorchid', 'orchid', 'violet', 'plum', 'thistle',
    'lavender', 'fuchsia', 'magenta', 'blueviolet', 'indigo', 'rebeccapurple',
    // Additional Grays (Aliases)
    'grey', 'lightgrey', 'darkgrey', 'dimgrey', 'slategrey', 'darkslategrey', 'lightslategrey'
];
let l = _colorKeywords.length;
for (let i = 0; i < l; i++) {
//     _svgrt.insertAdjacentHTML('afterbegin', `
// <rect x="${5 * i}" y="${5 * i}" width="50" height="50"
//     fill="#${(64 * (i)).toString(16)}"/>
//         `.trim());
    _svgrt.insertAdjacentHTML('afterbegin', `
<rect x="${5 * i}" y="${5 * i}" width="50" height="50"
    fill="${_colorKeywords.at((l - (i * 8) % l))}"/>
        `.trim());
}


/**
 * @type {SVGRectElement}
 */
// const _rct0 = _svgrt.children[0];
const _rct0 = Array.from(_svgrt.children).at(-1);
const _rectRefer0 = new hfSVGRectRefer(_rct0);

window.addEventListener('mousemove', (te) => {
    const drc = _svgrt.getBoundingClientRect();
    let tx = te.clientX - drc.left;
    let ty = te.clientY - drc.top;
    if (tx < 0) tx = 0;
    if (ty < 0) ty = 0;

    // let tx = te.offsetX;
    // let ty = te.offsetY;
    // _rectRefer0.set_xy(tx, ty);
    console.log(tx, ty);

    let tw = tx - _rectRefer0.get_x();
    let th = ty - _rectRefer0.get_y();
    _rectRefer0.set_wh(tw, th);

    // console.log(_rectRefer0.toString());
});




// window._rct0 = _rct0;
// // console.log('_rct0: ' + _rct0);
// // window._xx = getComputedStyle(_rct0);
// window._xx = _svgrt;
// // window._xxx = getComputedStyle(_svgrt);
// // _rct0.style.transform = 'rotateY(0.3rad)';


// const fn_getVal = (val) => {
//     return val.baseVal.value;
// };

// /**
//  * @param {SVGAnimatedLength} val
//  */
// const fn_setVal = (val, tv) => {
//     val.baseVal.value = tv;
// };

// const _SVGHelper = Object.freeze({
//     /**
//      * @param {SVGAnimatedLength} val
//      */
//     getVal: (val) => {
//         return val.baseVal.value;
//     },

//     setVal: (val) => {
//         return val.baseVal.value;
//     }
// });


// // parseInt(getComputedStyle(_xx).width, 10)
// const lx = 0;
// const ly = 0;
// const stl = getComputedStyle(_svgrt);
// const tw = _rct0.width.baseVal.value;
// const th = _rct0.height.baseVal.value
// console.log('>>> ' + tw);
// console.log(_rct0.width);
// _rct0.style.width = '100px';
// console.log(getComputedStyle(_rct0).width);
// const rx = parseInt(stl.width, 10) - tw;
// const ry = parseInt(stl.height, 10) - th;
// // console.log('>>> ' + rx);
// // console.log('>>> ' + ry);
// window.addEventListener('mousemove', (te) => {
// //    console.log(te);
// //    console.log(_svgrt.children[0]);

//    /**
//     * @type {HTMLCollection}
//     */

// //    const _xxx = null;
// //    _xxx.

//     // _rct0.x.baseVal.value = te.layerX;
//     // _rct0.y.baseVal.value = te.layerY;
//     // console.log(_rct0.width.baseVal.value);

// ;/*
//     let tx = te.offsetX - Math.round(tw / 2);
//     let ty = te.offsetY - Math.round(th / 2);
//     if (tx < lx)
//         tx = lx;
//     else if (tx > rx)
//         tx = rx;
//     if (ty < ly)
//         ty = ly;
//     else if (ty > ry)
//         ty = ry;
//     _rct0.x.baseVal.value = tx;
//     _rct0.y.baseVal.value = ty;

//     console.log(tx, rx);*/

//     // console.log(fn_getVal(_rct0.x));
// ;

//     // const fn_calc = () => {
//     //     // const val = 50_000_000;
//     //     // console.log((val * 0.016));
//     //     const val = 300000;
//     //     console.log((val * 0.08));
//     // };
//     // fn_calc();

//     console.log(_svgrt.getBoundingClientRect());
//     hfSVGHelper.setVal(_rct0.x, te.layerX);
//     hfSVGHelper.setVal(_rct0.y, te.layerY);

// });






// import { hfEaseCircular, hfTween } from "./hbjs/hfTween.js";


// /**
//  * GlobalDataObject
//  */
// const _gdo = Object.seal({
//     /**
//      * DIV Root
//      * @type {HTMLDivElement}
//      */
//     rootCont: document.querySelector('div#rootCont'),

//     /**
//      * DIV Contents Container
//      * @type {HTMLDivElement}
//      */
//     gameCont: document.querySelector('div#gameCont'),

//     /**
//      * @type {HTMLDivElement}
//      */
//     footerCont: document.querySelector('div#gameCont'),

//     /**
//      * @type {SVGSVGElement}
//      */
//     svgrt: document.querySelector('svg#svgrt'),


//     /**
//      * @type {hfTween}
//      */
//     twx: null,

//     /**
//      * @type {hfTween}
//      */
//     twy: null,


//     /**
//      * @type {HTMLCollection}
//      */
//     cea: null,

//     /**
//      * @type {NodeListOf<HTMLButtonElement>}
//      */
//     btns: null,

// });

// // console.log(_gdo.rootCont
// //     , _gdo.gameCont
// //     , _gdo.footerCont
// //     , _gdo.svgrt
// //     , _gdo.svgrt
// // );

// /*
// // const _xx1 = _gdo.svgrt.querySelector('rect');
// // console.log(_xx1);
// // console.log(_xx1.getAttribute('x'));
// */

// (() => {
//     /**
//      * @type {SVGRectElement}
//      */
//     const rct1 = _gdo.svgrt.querySelector('rect');
//     // rct1.style.setProperty('t')
//     // console.log(getComputedStyle(rct1));
//     // console.log(''+rct1);
//     // console.log(getComputedStyle(rct1));

//     _gdo.twx = new hfTween(0, 36, hfEaseCircular.easeInOut,
//         (_, cv) => {
//             rct1.setAttribute('x', cv);
//         });

//     _gdo.twy = new hfTween(0, 36, hfEaseCircular.easeInOut,
//         (_, cv) => {
//             rct1.setAttribute('y', cv);
//         });

//     _gdo.svgrt.addEventListener('mousedown', (te) => {
//         const cx = te.layerX;
//         const cy = te.layerY;
//         // console.log(cx, cy);
//         _gdo.twx.to(cx);
//         _gdo.twy.to(cy);
//     });

// })();
