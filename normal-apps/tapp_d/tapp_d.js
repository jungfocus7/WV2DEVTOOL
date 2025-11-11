/** @type {HTMLDivElement} */
const _rtcont = document.querySelector('div.c_rtcont');
const _trfo = {
  mx: 0.0, my: 0.0,
  sx: 0.0, sy: 0.0,
  rz: 0.0,
};
let _mx = 0.0;
let _my = 0.0;
let _scx = 0.5;
let _scy = 0.5;
let _rot = 0.0;

let _fc = 0;
const fn_loop = () => {
    requestAnimationFrame(fn_loop);

    if ((_fc % 1) === 0) {
        // console.log(_fc);
        _rot += 0.01;
        _rtcont.style.transform = `
translate(${_mx}px,${_my}px)
rotate(${_rot}rad)
scale(${_scx},${_scx})
        `.trim();
    }
    _fc++;
};
requestAnimationFrame(fn_loop);

window.addEventListener('mousemove', (me) => {
    _mx = me.clientX;
    _my = me.clientY;
    _scx = _mx / 400;
    _scy = _my / 400;
    // _rtcont.style.transform = `scale(${_scx},${_scx}) rotate(${_rot}deg)`;
});



/** @type {Set<string>} */
const _set = new Set();
_set.add()






// /**
//  * @type {{
//  *  rtcont: HTMLDivElement,
//  *  strt: CSSStyleDeclaration,
//  * }}
//  */
// const _md = Object.seal({
//     rtcont: document.querySelector('div.c_rtcont'),
//     rtst: null,
// });




// _md.rtst = _md.rtcont.style;
// console.log(_md.rtst);
// // console.log(getComputedStyle(_md.rtcont));

// _md.rtst.
