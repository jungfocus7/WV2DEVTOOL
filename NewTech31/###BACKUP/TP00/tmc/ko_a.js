import { TargetEvaluator } from "./_mods/TargetEvaluator.js";


{
    let _evaluator = new TargetEvaluator();
    _evaluator.parse('(200-100)/2');

}









//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// /**
//  * @typedef {object} ITokenInfo
//  * @property {string} type
//  * @property {any} val
//  */


// /**
//  * ???
//  */
// const __numChars = '-.0123456789';

// /**
//  * @type {ITokenInfo}
//  */
// const _tkprt = {
//     type: null,
//     val: undefined,
// };

// /**
//  * ???
//  */
// export class TargetEvaluator {
//     #md = Object.seal({
//         /** @type {string[]} */
//         buff: [],

//         /** @type {ITokenInfo[]} */
//         tokens: [],

//         /** @type {string} */
//         txt: null,
//     });

//     // /**
//     //  * 생성자
//     //  * @param {string} txt
//     //  */
//     // constructor(txt) {
//     //     const md = this.#md;
//     //     md.txt = txt.replace(/[\s,]+/g, '');
//     //     this.fn_tokenize();
//     // }

//     /**
//      * ???
//      */
//     #fn_cmps() {
//         const md = this.#md;
//         if (md.buff.length > 0) {
//             let tk = Object.assign({}, _tkprt);
//             tk.type = 'num';
//             tk.val = md.buff.join('');
//             md.tokens.push(tk);
//             md.buff.length = 0;
//         }
//     }

//     /**
//      * @param {string} ch
//      */
//     #fn_addNumChar(ch) {
//         const md = this.#md;
//         if (ch === '-') {
//             if (md.buff.length === 0) {
//                 md.buff.push(ch);
//             }
//         } else if (ch === '.') {
//             if (md.buff.indexOf('.') === -1) {
//                 md.buff.push(ch);
//             }
//         } else {
//             md.buff.push(ch);
//         }
//     }

//     /**
//      * ???
//      */
//     #fn_tokenize() {
//         const md = this.#md;
//         let pa;
//         for (const ch of md.txt) {
//             if (__numChars.includes(ch)) {
//                 this.#fn_addNumChar(ch);
//             } else {
//                 this.#fn_cmps();
//             }
//             pa = ch;
//         }
//         this.#fn_cmps();
//     }

//     /**
//      * ???
//      * @param {string} txt
//      */
//     parse(txt) {
//         const md = this.#md;
//         md.txt = txt.replace(/[\s,]+/g, '');
//         this.#fn_tokenize();
//     }

// }
// Object.freeze(TargetEvaluator);

// {
//     let _te = new TargetEvaluator();
//     _te.parse('(200-100)/2');




//     // /** */
//     // const _digitChars = '.0123456789';


//     // /** @type {ITokenInfo} */
//     // const _tkprt = {
//     //     type: null,
//     //     val: undefined,
//     // };

//     // /** @type {string[]} */
//     // const _buff = [];
//     // /** @type {ITokenInfo[]} */
//     // const _tokens = [];


//     // const fn_clearBuffer = () => {
//     //     if (_buff.length > 0) {
//     //         let tk = Object.assign({}, _tkprt);
//     //         tk.type = 'num';
//     //         tk.val = _buff.join('');
//     //         // console.log(tk);
//     //         _tokens.push(tk);
//     //         _buff.length = 0;
//     //     }
//     // };

//     // const txt = '(200-100)/2';
//     // let pa;
//     // let wt = 0;
//     // for (let ch of txt) {
//     //     if (_digitChars.includes(ch)) {
//     //         _buff.push(ch);
//     //     } else {
//     //         fn_clearBuffer();
//     //     }
//     //     pa = ch;
//     // }
//     // fn_clearBuffer();

//     // console.log(1004);

//     // if (wt > 0) {
//     //     throw Error('err');
//     // }

//     // let tk1 = _tkprt;
//     // let tk2 = Object.assign({}, _tkprt);
//     // tk2.type = 'name';
//     // tk2.val = '박종명';
//     // console.log(tk1, tk2);
// }
