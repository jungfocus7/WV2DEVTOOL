/** @type {HTMLDivElement} */
let _img = document.querySelector('div.c_imgc');

let _dg = 0.0;
// window.addEventListener('mousemove', (/** @type {MouseEvent} */me) => {
//     // console.log(me.movementX);
//     if (me.movementX < 0) {
//         _img.style.transform = `rotateY(${_dg}rad)`;
//         _dg -= 0.01;
//     } else if (me.movementX > 0) {
//         _img.style.transform = `rotateY(${_dg}rad)`;
//         _dg += 0.01;
//     }
// });
window.addEventListener('keydown', (/** @type {KeyboardEvent} */ke) => {
    // console.log(ke.code);
    if (ke.code === 'ArrowLeft') {
        _dg -= 0.1;
        _img.style.transform = `rotateY(${_dg}rad)`;
    } else if (ke.code === 'ArrowRight') {
        _dg += 0.1;
        _img.style.transform = `rotateY(${_dg}rad)`;
    }
});
