import { dcs } from "../../hbjs/hfCommon.js";
import { fn_print } from "./page_com.js";
import { hfnum, hfstr, hfarr, hfdtime } from "../../hbjs/hfCommon.js";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_keydown = (ke) => {
    ke.preventDefault();
    // ke.stopPropagation();
    dcs.log(ke);
};



//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 01)
const _tester_hfnum = Object.freeze({
    fn_isEven(tv) {
        if (hfnum.notNumber(tv)) return;
        return `hfnum.isEven(${tv}): ${hfnum.isEven(tv)}`;
    },

    fn_test() {
        fn_print(null);
        fn_print(`
{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.isNumber
  hfnum.isNumber(3.7): ${hfnum.isNumber(3.7)}
  hfnum.isNumber(6.0): ${hfnum.isNumber(6.0)}
  hfnum.isNumber('94123'): ${hfnum.isNumber('94123')}
  hfnum.isNumber((Math.PI / 2) + '::'): ${hfnum.isNumber((Math.PI / 2) + '::')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.notNumber
  hfnum.notNumber(3.7): ${hfnum.notNumber(3.7)}
  hfnum.notNumber(6.0): ${hfnum.notNumber(6.0)}
  hfnum.notNumber('94123'): ${hfnum.notNumber('94123')}
  hfnum.notNumber((Math.PI / 2) + '::'): ${hfnum.notNumber((Math.PI / 2) + '::')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.isFloat
  hfnum.isFloat(3.7): ${hfnum.isFloat(3.7)}
  hfnum.isFloat(6.0): ${hfnum.isFloat(6.0)}
  hfnum.isFloat(909.3): ${hfnum.isFloat(909.3)}
  hfnum.isFloat(Math.PI): ${hfnum.isFloat(Math.PI)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.isMinus
  hfnum.isMinus(-3.45): ${hfnum.isMinus(-3.45)}
  hfnum.isMinus(943): ${hfnum.isMinus(943)}
  hfnum.isMinus(-Math.PI): ${hfnum.isMinus(-Math.PI)}
  hfnum.isMinus(400 - 329): ${hfnum.isMinus(400 - 329)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.random
  hfnum.random(13): ${hfnum.random(13)}
  hfnum.random(234): ${hfnum.random(234)}
  hfnum.random(27): ${hfnum.random(27)}
  hfnum.random(95): ${hfnum.random(95)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.randRange
  hfnum.randRange(1, 5): ${hfnum.randRange(1, 5)}
  hfnum.randRange(17, 35): ${hfnum.randRange(17, 35)}
  hfnum.randRange(92, 182): ${hfnum.randRange(92, 182)}
  hfnum.randRange(7, 13): ${hfnum.randRange(7, 13)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.isOdd
  hfnum.isOdd(78): ${hfnum.isOdd(78)}
  hfnum.isOdd(1): ${hfnum.isOdd(1)}
  hfnum.isOdd(956): ${hfnum.isOdd(956)}
  hfnum.isOdd(37): ${hfnum.isOdd(37)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.isEven
  hfnum.isEven(5): ${hfnum.isEven(5)}
  hfnum.isEven(17): ${hfnum.isEven(17)}
  hfnum.isEven(182): ${hfnum.isEven(182)}
  hfnum.isEven(93): ${hfnum.isEven(93)}
}}
        `.trim());
        fn_print('\n');
    },
});
//#endregion


/**
 *
 * @param {PointerEvent} pe
 */
const fn_btn_clh = (pe) => {
    // dcs.log(pe);
    // dcs.log(pe.currentTarget);
    /** @type {HTMLDivElement} */
    let te = pe.currentTarget;
    let nm = te.textContent.trim();
    dcs.log(nm);

    switch (nm) {
        case 'hfnum': {
            break;
        }
    }
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_clear = () => {
    dcs.log('fn_clear');
};

const fn_stop = () => {
    dcs.log('fn_stop');
};

const fn_init = (pd) => {
    _pageData = pd;
    // dcs.log(_pageData.pge, _pageData.mbtn);
    _pageData.pge.addEventListener('keydown', fn_keydown);

    _footerCont = _pageData.pge.querySelector('div.c_pec>div.c_footer');
    // dcs.log(_footerCont);

    let le = _footerCont.lastElementChild;
    if (le) {
        le.insertAdjacentHTML('beforebegin', `
<div class="c_btn"><span>hfnum</span></div>
<div class="c_btn"><span>hfstr</span></div>
<div class="c_btn"><span>hfarr</span></div>
<div class="c_btn"><span>hfdtime</span></div>
        `.trim());
        _btnArr = Array.from(_footerCont.children);
        // dcs.log(_btnArr);

        for (let te of _btnArr) {
            te.addEventListener('click', fn_btn_clh);
        }
    }

    dcs.log('fn_init');
};

/** @type {IPageData} */
let _pageData = null;

/** @type {HTMLDivElement} */
let _footerCont = null;

/** @type {HTMLDivElement[]} */
let _btnArr = null;


export default {
    fn_clear, fn_stop, fn_init
};





// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
