
// (() => {
//     let _map = new Map();
//     _map.set('COL01', {
//         fnm: ''
//     });
//     _map.set('COL02', {

//     });
//     _map.set('COL03', {

//     });

// })();





// (() => {


// // /**
// //  * 값을 특정 범위(min ~ max) 내로 제한하는 함수
// //  * @param {number} val
// //  * @param {number} min
// //  * @param {number} max
// //  * @returns
// //  */
// // const fn_clamp = (val, min, max) => {
// //     if ((Number.isFinite(val) === false) ||
// //         (Number.isFinite(min) === false) ||
// //         (Number.isFinite(max) === false))  {
// //         throw 'The argument is incorrect.';
// //     }

// //     if (val < min) return min;
// //     else if (val > max) return max;
// //     else return val;
// // };

// // let x0 = fn_clamp(25, 10, 30);
// // console.log(x0);


// // /**
// //  *
// //  * @param  {...number} nums
// //  */
// // const fn_incorrect = (...nums) => {
// //     let bc = false;
// //     for (let tx of nums) {
// //         if (!Number.isFinite(tx)) {
// //             bc = true;
// //             break;
// //         }
// //     }

// //     if (bc) {
// //         throw `The argument is incorrect.`;
// //     }
// //     // console.log(nums, Array.isArray(nums));

// //     // if ((Number.isFinite(val) === false) ||
// //     //     (Number.isFinite(min) === false) ||
// //     //     (Number.isFinite(max) === false))  {
// //     //     throw 'The argument is incorrect.';
// //     // }
// //     // return Number.isFinite(tv);
// //     // console.log()
// // };

// // // fn_incorrect('');
// // fn_incorrect(1);
// // // fn_incorrect(3, 3, '0');



// // /**
// //  * Check Number
// //  * @param {number} tv
// //  */
// // const fn_cknb = (tv) => {
// //     if (!Number.isFinite(tv))
// //         throw `Invalid argument, not a number.`;
// // };

// // /**
// //  * Check Numbers
// //  * @param {...number} tva
// //  */
// // const fn_cknbs = (...tva) => {
// //     for (let tv of tva) {
// //         fn_cknb(tv);
// //     }
// // };

// // /**
// //  * 값을 특정 범위(min ~ max) 내로 제한하는 함수
// //  * @param {number} val
// //  * @param {number} min
// //  * @param {number} max
// //  * @returns
// //  */
// // const fn_clamp = (val, min, max) => {
// //     fn_cknbs(val, min, max);

// //     if (val < min) return min;
// //     else if (val > max) return max;
// //     else return val;
// // };

// // /*
// // try { fn_cknb('0'); }
// // catch (err) { console.log(err); }
// // try { fn_cknbs(3, 3, '0'); }
// // catch (err) { console.log(err); }
// // try { fn_cknbs(1, 2); }
// // catch (err) { console.log(err); }
// // try { fn_cknbs(NaN, 0.123, Math.PI); }
// // catch (err) { console.log(err); }
// // */

// // let rx0 = fn_clamp(55, '10', 254);
// // console.log(rx0);





// // /**
// //  * Check Number
// //  * @param {number} tv
// //  */
// // const fn_cknb = (tv) => {
// //     if (Number.isFinite(tv) === false)
// //         throw `Invalid argument, not a number.`;
// // };

// // /**
// //  * 난수 만들기 0~n
// //  * @param {number} tv
// //  * @returns
// //  */
// // const fn_random = (tv) => {
// //     fn_cknb(tv);
// //     return Math.floor(Math.random() * tv);
// // };

// // // globalThis.setInterval(() => {
// // //     let r0 = fn_random(9);
// // //     console.log('>>>', r0);
// // // }, 100);

// // let _prtm = performance.now();

// // let _map = new Map();
// // for (let i = 0; i < 100000000; i++) {
// //     let tn = fn_random(9);
// //     if (_map.has(tn)) {
// //         let tx = _map.get(tn);
// //         _map.set(tn, tx + 1);
// //     } else {
// //         _map.set(tn, 1);
// //     }
// // }
// // let ra = Array.from(_map.entries());
// // ra.sort((o1, o2) => {
// //     // return o2.at(1) - o1.at(1);
// //     return o2[1] - o1[1];
// // });

// // _prtm = (performance.now() - _prtm) / 1000;
// // console.log('>>>>>>>>>');

// // let _xxx = new WeakMap();
// // _xxx.delete();


// })();