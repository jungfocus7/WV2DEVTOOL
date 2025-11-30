import { dcs } from "../../hbjs/hfCommon.js";
import { fn_mm } from "./page_com.js";


const fn_clear = () => {

};

const fn_stop = () => {

};

const fn_init = () => {

};

export default {
    fn_clear, fn_stop, fn_init
};



// const fn_clear = () => {

// };

// const fn_stop = () => {

// };

// const fn_init = () => {
//     // pd.rootCont = _rootCont;
//     // pd.leftMenuCont = _leftMenuCont;
//     // pd.pageCont = _pageCont;

//     // pd.mbtn = btn;
//     // pd.pge = _pageCont.lastElementChild;
//     // dcs.log('xxx');
// };


// /** @type {PageData} */
// const _pageData = {
//     rootCont: null,
//     leftMenuCont: null,
//     pageCont: null,

//     mbtn: null,
//     pge: null,

//     txa: null,
//     ftbtns: null,

//     fn_clear,
//     fn_stop,
//     fn_init,
// };
// Object.seal(_pageData);

// export default _pageData;















// import { fn_print, btns } from "./SubCom.js";
// import { hfnum, hfstr, hfarr, hfdtime } from "../hbjs/hfCommon.js";



// //#region {{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  hfnum
// const fn_clh1 = (te) => {
//     fn_print('{{----------  hfnum');

//     const fn_isNumber = (td) => {
//         fn_print(`hfnum.isNumber(${td}): ${hfnum.isNumber(td)}`);
//     };
//     fn_isNumber(3.7);
//     fn_isNumber(6.0);
//     fn_isNumber('94123');
//     fn_isNumber((Math.PI / 2) + '::');
//     fn_print('\n');


//     const fn_notNumber = (td) => {
//         fn_print(`hfnum.notNumber(${td}): ${hfnum.notNumber(td)}`);
//     };
//     fn_notNumber(3.7);
//     fn_notNumber(6.0);
//     fn_notNumber('94123');
//     fn_notNumber((Math.PI / 2) + '::');
//     fn_print('\n');


//     const fn_isFloat = (td) => {
//         if (typeof td !== 'number') return;
//         fn_print(`hfnum.isFloat(${td}): ${hfnum.isFloat(td)}`);
//     };
//     fn_isFloat(3.7);
//     fn_isFloat(6.0);
//     fn_isFloat(909.3);
//     fn_isFloat(Math.PI);
//     fn_print('\n');


//     const fn_isMinus = (td) => {
//         if (typeof td !== 'number') return;
//         fn_print(`hfnum.isMinus(${td}): ${hfnum.isMinus(td)}`);
//     };
//     fn_isMinus(-3.45);
//     fn_isMinus(943);
//     fn_isMinus(-Math.PI);
//     fn_isMinus(400 - 329);
//     fn_print('\n');


//     const fn_random = (td) => {
//         if (typeof td !== 'number') return;
//         fn_print(`hfnum.random(${td}): ${hfnum.random(td)}`);
//     };
//     fn_random(13);
//     fn_random(234);
//     fn_random(27);
//     fn_random(95);
//     fn_print('\n');


//     const fn_randRange = (min, max) => {
//         if (typeof min !== 'number') return;
//         if (typeof max !== 'number') return;
//         fn_print(`hfnum.randRange(${min}, ${max}): ${hfnum.randRange(min, max)}`);
//     };
//     fn_randRange(1, 5);
//     fn_randRange(17, 35);
//     fn_randRange(92, 182);
//     fn_randRange(7, 13);
//     fn_print('\n');


//     const fn_isOdd = (td) => {
//         if (typeof td !== 'number') return;
//         fn_print(`hfnum.isOdd(${td}): ${hfnum.isOdd(td)}`);
//     };
//     fn_isOdd(1, 5);
//     fn_isOdd(17, 35);
//     fn_isOdd(92, 182);
//     fn_isOdd(7, 13);
//     fn_print('\n');


//     const fn_isEven = (td) => {
//         if (typeof td !== 'number') return;
//         fn_print(`hfnum.isEven(${td}): ${hfnum.isEven(td)}`);
//     };
//     fn_isEven(5);
//     fn_isEven(17);
//     fn_isEven(182);
//     fn_isEven(93);
//     fn_print('}}');
//     fn_print('\n');
//     fn_print('\n');
// };
// btns[1].addEventListener('click', fn_clh1);
// fn_clh1(null);
// //#endregion }}


// //#region {{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  hfstr
// const fn_clh2 = (te) => {
//     fn_print('{{----------  hfstr');

//     const fn_isStr = (ts) => {
//         fn_print(`hfstr.isStr(${ts}): ${hfstr.isStr(ts)}`);
//     };
//     fn_isStr(true);
//     fn_isStr('6.0');
//     fn_isStr('jhb');
//     fn_isStr(Math.PI);
//     fn_print('\n');


//     const fn_getLastNum = (ts) => {
//         fn_print(`hfstr.getLastNum(${ts}): ${hfstr.getLastNum(ts)}`);
//     };
//     fn_getLastNum('name_1');
//     fn_getLastNum('pook_061');
//     fn_getLastNum('inoff_792');
//     fn_getLastNum('name_9734');
//     fn_print('\n');


//     const fn_str2Ab = (ts) => {
//         fn_print(`hfstr.str2Ab(${ts}): ${hfstr.str2Ab(ts)}`);
//     };
//     fn_str2Ab('박종명');
//     fn_str2Ab('임헌진');
//     fn_str2Ab('이중호');
//     fn_str2Ab('치치와몽이');
//     fn_print('\n');


//     const fn_ab2Str = (ts) => {
//         fn_print(`hfstr.ab2Str(${ts}): ${hfstr.ab2Str(ts)}`);
//     };
//     fn_ab2Str(hfstr.str2Ab('박종명'));
//     fn_ab2Str(hfstr.str2Ab('임헌진'));
//     fn_ab2Str(hfstr.str2Ab('이중호'));
//     fn_ab2Str(hfstr.str2Ab('치치와몽이'));
//     fn_print('}}');
//     fn_print('\n');
//     fn_print('\n');
// };
// btns[2].addEventListener('click', fn_clh2);
// fn_clh2(null);
// //#endregion }}


// //#region {{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  hfarr
// const fn_clh3 = (te) => {
//     fn_print('{{----------  hfarr');

//     const fn_isArr = (ta) => {
//         fn_print(`hfarr.notEmpty(${ta}): ${hfarr.notEmpty(ta)}`);
//     };
//     fn_isArr([0, 1, 2, 3]);
//     fn_isArr(Array.from('abcdefg'));
//     fn_isArr('jhb');
//     fn_isArr(337);
//     fn_print('\n');


//     const fn_contains = (ta, e) => {
//         fn_print(`hfarr.contains(${ta}, ${e}): ${hfarr.contains(ta, e)}`);
//     };
//     fn_contains([0, 1, 2, 3], 3);
//     fn_contains(Array.from('abcdefg'), 'g');
//     fn_contains([9, 8, 7], 2);
//     fn_print('\n');


//     const fn_shuffle = (ta) => {
//         const pv = `hfarr.shuffle(${ta})`;
//         hfarr.shuffle(ta);
//         fn_print(`${pv}: ${ta}`);
//     };
//     fn_shuffle([0, 1, 2, 3]);
//     fn_shuffle(Array.from('abcdefg'));
//     fn_shuffle(Array.from('pook61'));
//     fn_print('\n');


//     const fn_copy = (ta) => {
//         fn_print(`hfarr.copy(${ta}): ${hfarr.copy(ta)}`);
//     };
//     fn_copy([0, 1, 2, 3]);
//     fn_copy(Array.from('abcdefg'));
//     fn_copy(Array.from('pook61'));
//     fn_print('}}');
//     fn_print('\n');
//     fn_print('\n');
// };
// btns[3].addEventListener('click', fn_clh3);
// fn_clh3(null);
// //#endregion }}


// //#region {{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  hfdtime
// const fn_clh4 = (te) => {
//     fn_print('{{----------  format');

//     const fn_timeStamp = (td) => {
//         for (let i = 0; i < 3; i++) {
//             fn_print(`hfdtime.timeStamp(${hfdtime.timeStamp(td)});`);
//         }
//     };
//     fn_timeStamp(new Date());
//     fn_print('\n');


//     const fn_format = (fs1, td) => {
//         fn_print(`hfdtime.format(${hfdtime.format(fs1, td)});`);
//     };
//     fn_format('\\y\\y\\M\\M [yyyy/MM/dd HH:mm:ss.fff] \\H\\d\\f\\m\\s (HHMM)', new Date());
//     fn_format('\\y\\y\\y\\yyyyy/MM/dd hh:mm:ss.fff', new Date());
//     fn_format('yyyy/MM/dd hh:mm:ss.fff', new Date());
//     fn_format('yyy/MM/dd hh:mm:ss.fff', new Date());
//     fn_print(hfdtime.timeStamp(new Date()));
//     fn_print(hfdtime.timeStamp(new Date()));
//     fn_print(hfdtime.timeStamp(new Date()));
//     fn_print(hfdtime.timeStamp(new Date()));
//     fn_print('}}');
//     fn_print('\n');
//     fn_print('\n');
// };
// btns[4].addEventListener('click', fn_clh4);
// fn_clh4(null);
// //#endregion }}
