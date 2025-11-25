import { fn_print, btns } from "./SubCom.js";
import { hfWeich } from "../hbjs/hfWeich.js";



const _svgCont = document.querySelector('svg.c_svg');
// console.log(_svgCont);

/** @type {SVGCircleElement} */
const _sce = _svgCont.lastElementChild;
// console.log(_sce)

let _cx = Number.parseInt(_sce.getAttribute('cx'), 10); // current x
let _cy = Number.parseInt(_sce.getAttribute('cy'), 10); // current y
// console.log(_cx, _cy);

let _uc = 0;
let _ec = 0;

const fn_cbf = (et, _) => {
    if (et === hfWeich.ET_UPDATE) {
        _cx = _wcx.now;
        _cy = _wcy.now;
        if (_uc === 0) {
            _uc = 1;
        } else {
            _uc = 0;
            _sce.setAttribute('cx', _cx);
            _sce.setAttribute('cy', _cy);
            fn_print(`${et}: (X=${ _cx }, Y=${ _cy });`);
        }
    } else if (et === hfWeich.ET_END) {
        if (_ec === 0) {
            _ec = 1;
        } else {
            _ec = 0;
            _cx = _wcx.end;
            _cy = _wcy.end;
            fn_print(`${et}: (X=${ _cx }, Y=${ _cy });`);
        }
    }
};
const _wcx = new hfWeich(_cx, 0.2, 1.0, fn_cbf);
const _wcy = new hfWeich(_cy, 0.2, 1.0, fn_cbf);

_svgCont.addEventListener('click', (me) => {
    fn_print();
    let mx = me.offsetX;
    let my = me.offsetY;
    fn_print(`begin: (X=${_cx}, Y=${_cy});`);
    fn_print(`end: (X=${mx}, Y=${my});`);
    _uc = 0;
    _ec = 0;
    _wcx.to(mx);
    _wcy.to(my);
});

btns[1].addEventListener('click', (te) => {
    _wcx.stop();
    _wcy.stop();
});

