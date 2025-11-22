import { fn_print, btns } from "./SubCom.js";
import {
    hfEasingKind,
    hfEaseBack,
    hfEaseBounce,
    hfEaseCircular,
    hfEaseElastic,
    hfEaseExponential,
    hfTween,
} from "../hbjs/hfTween.js";



const _svgCont = document.querySelector('svg.c_svg');
// console.log(_svgCont);

/** @type {SVGCircleElement} */
const _ce = _svgCont.lastElementChild;
// console.log(_ce);

let _cx = Number.parseInt(_ce.getAttribute('cx'), 10); // current x
let _cy = Number.parseInt(_ce.getAttribute('cy'), 10); // current y
// console.log(_cx, _cy);

let _bx = 0.0, _by = 0.0; // begin point
let _ex = 0.0, _ey = 0.0; // end point
let _xv = 0.0, _yv = 0.0; // vector point

const fn_cbf = (et, cv) => {
    if (et === hfTween.ET_UPDATE) {
        _cx = _bx + (_xv * cv);
        _cy = _by + (_yv * cv);
        _ce.setAttribute('cx', _cx);
        _ce.setAttribute('cy', _cy);
        fn_print(`${et}: (X=${_cx}, Y=${_cy});`);
    } else if (et === hfTween.ET_END) {
        fn_print(`${et}: (X=${_cx}, Y=${_cy});`);
    }
};
const _twa = new hfTween(_cy, 36, new hfEaseElastic(hfEasingKind.easeOut), fn_cbf);

_svgCont.addEventListener('click', (me) => {
    fn_print();
    fn_print(`begin: (X=${_cx}, Y=${_cy});`);
    _bx = _cx, _by = _cy;
    _ex = me.offsetX, _ey = me.offsetY;
    _xv = _ex - _cx, _yv = _ey - _cy;
    _twa.fromTo(0, 1);
});

btns[1].addEventListener('click', (_) => {
    _twa.stop();
});
