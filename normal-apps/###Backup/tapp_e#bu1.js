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

    applyFromRect() {
        const md = this.#md;
        let sx = md.rct.width / md.dfw;
        let sy = md.rct.height / md.dfh;
        let val = `translate(${md.rct.left}, ${md.rct.top}), scale(${sx}, ${sy})`;
        md.tge.setAttribute('transform', val);
    }

    getRect() {
        return this.#md.rct;
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
// console.log(new RectItem());


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


//~~~~
/** @type {RectItem[]} */
const _rcia = [];


(() => {
    _btnStart.addEventListener('click', (me) => {
        _rcia.length = 0;

        const tsb = [];

        let l = parseInt(_inputNumber.value);
        l *= l;
        for (let i = 0; i < l; i++) {
            const rci = new RectItem(100, 100, 0, 0, '99');
            _rcia.push(rci);
            tsb.push(rci.get_actp());
        }
        // console.log(tsb.join(''));
        // console.log(l, _rcia.at(0).actp);

        _geCont.insertAdjacentHTML('beforeend', tsb.join(''));
        // console.log(_geCont.childElementCount);

        let j = 0;
        for (const ge of _geCont.children) {
            // console.log(ge, j);
            _rcia.at(j).initTarget(ge);
            j++;
        }


        // l = _geCont.childElementCount;
        // for (let i = 0; i < l; i++) {
        //     _geCont.children.a
        //     _rcia.at(i).set_target();
        // }
        // for (const rci of _rcia) {
        //     rci.set_target();
        // }
    });


    // _rootCont.addEventListener('mousemove', (me) => {
    //     try {
    //         console.log(_rcia.at(0).setWidth);
    //         const rci = _rcia.at(0);
    //         rci.setWidth(me.clientX, false);
    //         rci.setHeight(me.clientY, false);
    //         rci.applyFromRect();
    //     } catch (err) { }
    // });



//     const actp = `
// <g transform="translate(10,10) scale(1.0,1.0)" clip-path="url(#d_cp1)"
//     style="cursor: pointer;">
//     <path fill="red" stroke="black" stroke-width="4"
//         d="M0,0 L40,0 L40,40 L0,40 Z"/>
//     <text text-anchor="middle" dominant-baseline="central"
//         fill="whitesmoke" x="20" y="20" font-family="Arial"
//         font-size="17">00</text>
// </g>
//     `.trim();
    // _geCont.insertAdjacentHTML('beforeend', actp);
    // for (let i = 0; i < 10000; i++) {
    //     _geCont.insertAdjacentHTML('beforeend', actp);
    // }

    // /** @type {DocumentFragment} */
    // const dfg = document.createDocumentFragment();
    // console.log(dfg.ad);

    // const tsb = [];
    // for (let i = 0; i < 100; i++) {
    //     tsb.push(actp);
    // }
    // _geCont.insertAdjacentHTML('beforeend', tsb.join(''));



    // _rootCont.addEventListener('mousemove', (me) => {
    //     if (me.target !== _svgCont) return;

    //     let mx = me.offsetX;
    //     let my = me.offsetY;
    //     if (mx < 0) mx = 0;
    //     if (my < 0) my = 0;
    //     // console.log(mx, my);

    //     const ge = _geCont.firstElementChild;
    //     // console.log('>>> ' + ge);
    //     ge.setAttribute('transform', `translate(${mx},${my}) scale(5.0,5.0)`);
    //     // console.log('>>> ' + ge.getAttribute('transform'));
    // });

    _inputNumber.addEventListener('keydown', (ke) => {
        // console.log('_inputNumber#keydown');
        ke.preventDefault();
    });

    _inputNumber.addEventListener('mousewheel', (_) => {
        // console.log('_inputNumber#mousewheel');
        // _geCont.innerHTML = '';
        console.log('>>> ' + _geCont.childElementCount);

    });

})();
//#endregion











// /**
//  * 사용자 이름과 나이 정보를 담는 상세 구조체입니다.
//  * @typedef {object} UserName
//  * @property {string} name - 사용자의 이름입니다. (실명)
//  * @property {number} age - 사용자의 현재 나이입니다. (만 나이 기준)
//  */








// /**
//  * 사용자 정보 객체
//  * @type {UserName}
//  */
// const _userName = { name: '박종명',  age: 37 };
// _userName.





// /**
//  * Assign the project to an employee.
//  * @param {Object} employee - The employee who is responsible for the project.
//  * @param {string} employee.name - The name of the employee.
//  * @param {string} employee.department - The employee's department.
//  */
// const assign = function(employee) {
//     // ...
// };





    // // /**
    // //  * @type {{
    // //  *  srt: SVGSVGElement, ddd
    // //  *  ge: SVGGElement,
    // //  *  re: SVGRectElement,
    // //  *  te: SVGTextElement,
    // //  *  drc: DOMRect,
    // //  *  mg: number,
    // //  * }}
    // //  */

    // // /**
    // //  * MemberData
    // //  * @type {object} #md
    // //  * @type {HTMLDivElement} #md.srt
    // //  * @type {SVGGElement} #md.ge
    // //  * @type {SVGRectElement} #md.re
    // //  * @type {SVGTextElement} #md.te
    // //  * @type {DOMRect} #md.drc
    // //  * @type {number} #md.mg
    // //  */

    // /**
    //  * MemberData
    //  * @param {object} #md
    //  * @param {HTMLDivElement} #md.srt
    //  * @param {SVGGElement} #md.ge
    //  * @param {SVGRectElement} #md.re
    //  * @param {SVGTextElement} #md.te
    //  * @param {DOMRect} #md.drc
    //  * @param {number} #md.mg
    //  */


    // /**
    //  * @type {{a: number, b: string, c}} srt
    //  */


    // /**
    //  * MemberData
    //  * @type {object} #md
    //  * @type {HTMLDivElement} #md.srt
    //  * @type {SVGGElement} #md.ge
    //  * @type {SVGRectElement} #md.re
    //  * @type {SVGTextElement} #md.te
    //  * @type {DOMRect} #md.drc
    //  * @type {number} #md.mg
    //  */



// /**
//  * ddddddddd
//  * @type {{
//  *  srt: SVGSVGElement,
//  *  ge: SVGElement,
//  *  re: SVGRectElement,
//  * }} xxx */
// const __md = {
//     srt: null,
//     ge: null,
//     re: null,
//     te: null,
//     drc: new DOMRect(0, 0, 10, 10),
//     mg: 4,
// };

// /**
//  * ddddddddd
//  * @type {{
//  *  email: string,
//  *  name: string,
//  *  age: number,
//  * }}
//  */
// const _userInfo = { };



// /**
//  * Processes user data.
//  * @param {object} userData - The user's data.
//  * @param {string} userData.name - The user's full name.
//  * @param {number} userData.id - The user's unique ID.
//  * @param {boolean} [userData.isActive=true] - Whether the user is active (optional, defaults to true).
//  */
// const processUser = (userData) => {
//     return;
// };




// /**
//  * @constant
//  * @type {object}
//  * @property {string} name - The name of the user.
//  * @property {number} age - The age of the user.
//  */
// const userProfile = {
//     name: "Alice",
//     age: 30
// };


// /**
//  * @namespace ddddd
//  * @property {object}  defaults               - The default values for parties.
//  * @property {number}  defaults.players       - The default number of players.
//  * @property {string}  defaults.level         - The default level for the party.
//  * @property {object}  defaults.treasure      - The default treasure.
//  * @property {number}  defaults.treasure.gold - How much gold the party starts with.
//  */
// var config = {
//     // defaults: {
//     //     players: 1,
//     //     level:   'beginner',
//     //     treasure: {
//     //         gold: 0
//     //     }
//     // }
// };











// const _userInfo = Object.seal({
//     email: 'pool61@naver.com',
//     name: 'parkjongmyung',
//     age: 37,
//     work: 'pro',

//     [Symbol.iterator]() {
//         return {
//             current: 0,
//             last: 3,

//             // 3. for..of 반복문에 의해 반복마다 next()가 호출됩니다.
//             next() {
//                 console.log('>>>');

//                 if (this.current <= this.last) {
//                     return { done: false, value: this.current++ };
//                 } else {
//                     return { done: true };
//                 }
//             }
//         };
//     }
// });

// // for (const pnm in _userInfo) {
// //     console.log(pnm, _userInfo[pnm]);
// // }

// for (const pnm of _userInfo) {
//     console.log(pnm);
// }