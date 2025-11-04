import { hfGlobal } from "./hfGlobal.js";
import { CellItem_ta } from "./CellItem_ta.js";


/** @type {SVGSVGElement} */
const _svgrt = document.getElementById('svgrt_1');
// console.log(_svgrt);
// _svgrt.setAttribute('transform', 'translate(30, 30)');
// console.log(_svgrt.transform);

/** @type {DOMRect} */
const _drc = _svgrt.getBoundingClientRect();
// console.log(_drc);

CellItem_ta.readForInit(_svgrt, _drc);
/** @type {CellItem_ta[]} */
const _cella = [];
// const _cella = [
//     new CellItem_ta({
//         width: 80, height: 80,
//         x: 0, y: 0,
//         crnm: 'red',
//         crcd: '#ff0000'}),
//     new CellItem_ta({
//         width: 80, height: 80,
//         x: 0, y: 0,
//         crnm: 'green',
//         crcd: '#00ff00'}),
//     new CellItem_ta({
//         width: 80, height: 80,
//         x: 0, y: 0,
//         crnm: 'blue',
//         crcd: '#0000ff'}),
// ];

// console.log(hfGlobal.colorInfos);
// for (const tx of Object.entries(hfGlobal.colorInfos)) {
//     console.log(tx, Array.isArray(tx));
// }
for (const tk in hfGlobal.colorInfos) {
    const tv = hfGlobal.colorInfos[tk];
    // console.log(tk, tv);
    _cella.push(new CellItem_ta({
        width: 100, height: 100,
        x: 0, y: 0,
        crnm: tk,
        crcd: tv}));
}

// for (const cel of _cella) {
//     tx.g
// }



// window.addEventListener('mousemove', (me) => {
//     const rmx = _drc.width - 100;
//     const rmy = _drc.height - 100;
//     let tx = me.clientX - _drc.left;
//     let ty = me.clientY - _drc.top;
//     if (tx < 0) tx = 0;
//     else if (tx > rmx) tx = rmx;
//     if (ty < 0) ty = 0;
//     else if (ty > rmy) ty = rmy;
//     _cella[0].setWidth(tx, false);
//     _cella[0].setHeight(ty, false);
//     _cella[0].applyFromRect();
//     _cella[1].setX(tx, false);
//     _cella[1].setY(ty, false);
//     _cella[1].applyFromRect();
// });
