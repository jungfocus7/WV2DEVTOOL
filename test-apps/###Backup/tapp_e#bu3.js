import {
    hfEaseBack,
    hfEaseBounce,
    hfEaseCircular,
    hfEaseElastic,
    hfEaseExponential,
    hfTween,
} from "./hfTween.js";



//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class RectItem {
    /**
     * @param {number} width
     * @param {number} height
     * @param {number} x
     * @param {number} y
     * @param {string} txt
     */
    constructor(width, height, x, y, txt) {
        const md = this.#md;
        md.rct.width = width;
        md.rct.height = height;
        md.rct.x = x;
        md.rct.y = y;

        md.actp = `
<g transform="translate(0.0,0.0) scale(1.0,1.0)" clip-path="url(#d_cp1)"
    style="cursor: pointer;">
    <path fill="red" stroke="black" stroke-width="4"
        d="M0,0 L40,0 L40,40 L0,40 Z"/>
    <text text-anchor="middle" dominant-baseline="central"
        fill="whitesmoke" x="20" y="20" font-family="Arial"
        font-size="17" style="text-rendering: optimizeSpeed;">${txt}</text>
</g>
        `.trim();
    }
    #md = Object.seal({
        dfw: 40, dfh: 40,
        rct: new DOMRect,
        /** @type {string} */
        actp: null,
        /** @type {SVGGElement} */
        tge: null,
    });

    get_actp() {
        return this.#md.actp;
    }

    /**
     * @param {SVGGElement} ge
     */
    initTarget(ge) {
        const md = this.#md;
        if (md.tge === null) {
            md.tge = ge;
        }
    }

    get_tge() {
        return this.#md.tge;
    }

    applyFromRect() {
        const md = this.#md;
        let sx = md.rct.width / md.dfw;
        let sy = md.rct.height / md.dfh;
        let val = `translate(${md.rct.left}, ${md.rct.top}), scale(${sx}, ${sy})`;
        md.tge.setAttribute('transform', val);
    }

    getWidth() {
        return this.#md.rct.width;
    }

    getHeight() {
        return this.#md.rct.height;
    }

    getX() {
        return this.#md.rct.left;
    }

    getY() {
        return this.#md.rct.top;
    }

    setWidth(tv, bp=true) {
        this.#md.rct.width = tv;
        if (bp) this.applyFromRect();
    }

    setHeight(tv, bp=true) {
        this.#md.rct.height = tv;
        if (bp) this.applyFromRect();
    }

    setX(tv, bp=true) {
        this.#md.rct.x = tv;
        if (bp) this.applyFromRect();
    }

    setY(tv, bp=true) {
        this.#md.rct.y = tv;
        if (bp) this.applyFromRect();
    }

}
Object.freeze(RectItem);
//#endregion


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/** @type {HTMLDivElement} */
const _rootCont = document.querySelector('div.c_rootCont');
// console.log(_rootCont);

/** @type {SVGSVGElement} */
const _svgCont = _rootCont.querySelector('svg.c_svgCont');
// console.log(_svgCont);

/** @type {SVGGElement} */
const _geCont = _svgCont.querySelector('#d_geCont');
// console.log(_geCont);

/** @type {HTMLDivElement} */
const _downPanel = _rootCont.querySelector('div.c_downPanel');
// console.log(_downPanel);

/** @type {HTMLInputElement} */
const _inputNumber = _downPanel.querySelector('input.c_inputNumber');
// console.log(_inputNumber);

/** @type {HTMLInputElement} */
const _btnStart = _downPanel.querySelector('input.c_btnStart');
// console.log(_btnStart);




(() => {
    const fn_cbf = (et, cv) => {
        if (et === hfTween.ET_UPDATE) {
            _downPanel.style.transform = `translateY(${cv}px)`;
        } else if (et === hfTween.ET_END) {
            console.log(et);
        }
    };
    // const _twr = new hfTween(0, 50, new hfEaseElastic(), fn_cbf);
    const _twr = new hfTween(0, 30, new hfEaseBounce(), fn_cbf);

    window.addEventListener('keydown', (ke) => {
        if (ke.code === 'Escape') {
            _twr.to(0);
        }
    });

    let bc = true;
    _btnStart.addEventListener('click', (me) => {
        _twr.to(-300);
    });

})();








// // /** @type {Animation} */
// // const _ani_dp = _downPanel.animate(
// //     [{transform: 'translateY(400)'}],
// //     {
// //         duration: 2000, // 2초
// //         easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
// //         fill: 'forwards'
// //     });
// // _ani_dp.pause();
// // // console.log(_ani_dp);

// const _md = Object.seal({

// });


// let _ey = 0.0;
// let _cy = 0.0;
// const fn_cbf = (_, cv) => {
//     // let ty = _bo ? 30 - (100 * cv) : 30 * cv;
//     // _downPanel.style.transform = `translateY(${ty}px)`;
//     // if (et === hfTween.ET_UPDATE) {
//     //     let ty = Math.abs(_nwy - 30) * cv;
//     //     _downPanel.style.transform = `translateY(${ty}px)`;
//     // } else if (et === hfTween.ET_END) {
//     //     _nwy = cv;
//     // }
//     _ey = _bo ? 0.0 : 40.0;
//     _cy = (_ey - _cy) * cv;
//     console.log(_cy);
//     let ty = _bo ? _ey - (100 * cv) : 30 * cv;

//     _downPanel.style.transform = `translateY(${_cy}px)`;
// };

// const _twr = new hfTween(0, 30, null, fn_cbf);

// let _bo = true;
// const fn_onoff = () => {
//     _bo = !_bo;
//     // _nwy = _twr.current;
//     _twr.fromTo(0, 1);
// };


// //#endregion


