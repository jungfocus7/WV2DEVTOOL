import { hfGlobal } from "./js/hfGlobal.js";
// import { hfSVGHelper } from "./js/hfSVGHelper.js";
// import { hfSVGRectRefer } from "./js/hfSVGRectRefer.js";
import { hfCellItem } from "./js/hfCellItem.js";


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
// const _footerCont = _rootCont.querySelector('div.footer-cont');
// console.log(_rootCont, _gameCont, _footerCont);

/**
 * @type {SVGSVGElement}
 */
const _svgrt = _gameCont.querySelector('svg.svgrt');
// console.log(_svgrt);


/**
 * @type {hfCellItem[]}
 */
const _cells = [];


(() => {
    // _cells.push(
    //     new hfCellItem({srt: _svgrt, fcr: 'red',
    //         txt: '01', rw: 40, rh: 40, rx: 0, ry: 0}),
    //     new hfCellItem({srt: _svgrt, fcr: 'green',
    //         txt: '02', rw: 40, rh: 40, rx: 0, ry: 100}),
    //     new hfCellItem({srt: _svgrt, fcr: 'blue',
    //         txt: '03', rw: 40, rh: 40, rx: 0, ry: 200}),
    // );

    const len = hfGlobal.colorNames.length;
    const gw = 50, gh = 50;
    const gx = 20, gy = 20;
    for (let i = 0; i < len; i++) {
        const tx = gx * i;
        const ty = gy * i;
        const j = hfGlobal.randRange(0, len - 1);
        _cells.push(
            new hfCellItem({srt: _svgrt,
                fcr: hfGlobal.colorNames.at(j),
                txt: hfGlobal.colorNames[i],
                rw: gw, rh: gh, rx: tx, ry: ty}));

        if (i > 10) break;
    }

})();


window.addEventListener('click', () => {
    // try {
    // const eyeDropper = new EyeDropper();
    // const result = eyeDropper.open();
    // // The user selected a pixel, here is its color:
    // const colorHexValue = result.sRGBHex;
    // } catch (err) {
    // console.log(err);
    // }


});






// (() => {
//     return;
//     const len = hfGlobal.colorNames.length;
//     const gw = 50, gh = 50;
//     const gx = 1, gy = 1;
//     for (let i = 0; i < len; i++) {
//         const tx = gx * i;
//         const ty = gy * i;
//         const j = hfGlobal.randRange(0, len - 1);
//         _svgrt.insertAdjacentHTML('beforeend', `
// <rect width="${gw}" height="${gh}" x="${tx}" y="${ty}"
//     fill="${hfGlobal.colorNames.at(j)}"/>
//         `.trim());
//     }
// })();

// /** @type {SVGRectElement[]} */
// const _elements = Array.from(_svgrt.children);







// const _rct0 = _elements.at(-1);
// const _rectRefer0 = new hfSVGRectRefer(_rct0);

// /**
//  * @type {SVGRectElement}
//  */
// const t0 = _rct0.children[0];
// t0.style.boxSizing = 'border-box';
// t0.style.border = 'border: 10px solid red;';
// console.log(getComputedStyle(t0).boxSizing);


// window.addEventListener('mouseover', (te) => {
//     // console.log('무조건 실행됨?');
// });

// window.addEventListener('mousemove', (te) => {
//     if (_rct0 ?? true) return;

//     const drc = _svgrt.getBoundingClientRect();
//     let tx = te.clientX - drc.left;
//     let ty = te.clientY - drc.top;
//     if (tx < 0) tx = 0;
//     if (ty < 0) ty = 0;
//     // console.log(tx, ty);

//     let tw = tx - _rectRefer0.get_x();
//     let th = ty - _rectRefer0.get_y();
//     if (tw < 30) tw = 10;
//     if (th < 30) th = 10;
//     // _rectRefer0.set_wh(tw, th);
//     // console.log(_rectRefer0.toString());

//     for (const el of _elements) {
//         hfSVGHelper.set_val(el.width, tw);
//         hfSVGHelper.set_val(el.height, th);
//     }
// });

// (() => {
//     const fps = 1000 / 30;
//     const fn_loop = (cts) => {
//         requestAnimationFrame(fn_loop);
//         const dt = cts - lts;
//         if (dt > fps) {
//             lts = cts - (dt % fps);
//             console.log('30프래임으로 실행');

//         }
//     };
//     let lts = 0;
//     requestAnimationFrame(fn_loop);
// })();






