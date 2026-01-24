/** @type {HTMLDivElement} */
let _scene = document.querySelector('div.c_scene');


/** @type {HTMLDivElement} */
// let _imgc = document.querySelector('div.c_imgc');



(() => {
    console.log(_scene.children.length);
    _scene.innerHTML = '';
    console.log(_scene.children.length);

    let _tpls = `
        <div class="c_imgc">
        <div class="c_img1">
            <input type="text">
        </div>
        <div class="c_img2">
            <textarea cols="30" rows="20">
[의학드라마 골든타임] Golden Time 이성민의 어시스트를 받아 골반수술을 성공한 조상기</textarea>
        </div>
        </div>
    `.trim();

    let _eia = [];
    // _scene.insertAdjacentHTML('beforeend', _tpls);
    // let el = _scene.firstElementChild;
    // // console.log(el);
    // _eia.push({el, rd: 0.0, nm: 'nm-1'});


    let fn_rot = (ei) => {
        ei.rd += 0.1;
        ei.el.style.transform = `rotateY(${ei.rd}rad)`;
    };
    let fn_loop = (_) => {
        requestAnimationFrame(fn_loop);
        for (let ei of _eia) {
            // console.log(ei);
            fn_rot(ei);
        }
    };
    requestAnimationFrame(fn_loop);


    window.addEventListener('mousemove', (me) => {
        // me.clientX;
        _scene.insertAdjacentHTML('beforeend', _tpls);
        let el = _scene.lastElementChild;
        let l = _scene.childElementCount;
        _eia.push({el, rd: 0.0, nm: `nm-${l}`});
        el.style.left = `${me.clientX - 200}px`;
        el.style.top = `${me.clientY - 200}px`;
    });

})();



// let _dg = 0.0;
// // window.addEventListener('mousemove', (/** @type {MouseEvent} */me) => {
// //     // console.log(me.movementX);
// //     if (me.movementX < 0) {
// //         _img.style.transform = `rotateY(${_dg}rad)`;
// //         _dg -= 0.01;
// //     } else if (me.movementX > 0) {
// //         _img.style.transform = `rotateY(${_dg}rad)`;
// //         _dg += 0.01;
// //     }
// // });
// window.addEventListener('keydown', (/** @type {KeyboardEvent} */ke) => {
//     // console.log(ke.code);
//     if (ke.code === 'ArrowLeft') {
//         _dg -= 0.1;
//         _img.style.transform = `rotateY(${_dg}rad)`;
//     } else if (ke.code === 'ArrowRight') {
//         _dg += 0.1;
//         _img.style.transform = `rotateY(${_dg}rad)`;
//     }
// });
