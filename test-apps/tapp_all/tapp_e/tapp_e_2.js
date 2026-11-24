// (() => { // [!! ResizeObserver] 사이즈만 감지한다.
//     /** @type {HTMLDivElement} */
//     const _drc = document.querySelector('div#d_rct');
//     console.log(1004, _drc);

//     const _rsosv = new ResizeObserver((t1, t2) => {
//         console.log('########');
//         console.log(t1, t2);
//     });
//     _rsosv.observe(_drc);

//     window.addEventListener('click', (me) => {
//         const csd = _drc.style;
//         // console.log(csd.left);
//         // csd.left = '200px';
//         csd.width = '500px';
//     });

// })();



// (() => { // [!! IntersectionObserver]
//     /** @type {HTMLDivElement} */
//     const _drc = document.querySelector('div#d_rct');
//     // console.log(1004, _drc);

//     const _osv = new IntersectionObserver((t1, t2) => {
//         console.log('########');
//         // console.log(t1, t2);
//     }, {
//         // root: null,        // 기준 요소 (null = 뷰포트)
//         // rootMargin: '0px', // 기준 영역 확장/축소 (margin처럼)
//         // threshold: 0.5,     // 0~1, 몇 % 보일 때 콜백 실행할지
//         threshold: Array.from({ length: 1000 }, (_, i) => i / 1000)
//     });
//     _osv.observe(_drc);

//     window.addEventListener('click', (me) => {
//         const csd = _drc.style;
//         // console.log(csd.left);
//         csd.left = '200px';
//         csd.width = '500px';
//     });

// })();



(() => { // [!! MutationObserver ]
    /** @type {HTMLDivElement} */
    const _drc = document.querySelector('div#d_rct');
    // console.log(1004, _drc);
    _drc.getBoundingClientRect

    const _osv = new MutationObserver((t1, t2) => {
        console.log('########');
        // console.log(t1, t2);
    });
    _osv.observe(_drc, {
      attributes: true,
    //   attributeFilter: ['style', 'class']
    });

    window.addEventListener('click', (me) => {
        const csd = _drc.style;
        // console.log(csd.left);
        csd.left = '200px';
        // csd.width = '500px';
    });

})();