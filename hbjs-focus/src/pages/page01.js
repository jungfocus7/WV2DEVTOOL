import { dcs } from "../../hbjs/hfCommon.js";
import { hfnum, hfstr, hfarr, hfdtime } from "../../hbjs/hfCommon.js";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {KeyboardEvent} ke
 */
const fn_keydown = (ke) => {
    dcs.log('fn_keydown');
    ke.preventDefault();
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const _tester_hfnum = Object.freeze({
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

const _tester_hfstr = Object.freeze({
    fn_test() {
        fn_print(null);
        fn_print(`
{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.isEmpty
  hfstr.isEmpty(true): ${hfstr.isEmpty(true)}
  hfstr.isEmpty('6.0'): ${hfstr.isEmpty('6.0')}
  hfstr.isEmpty('pook61'): ${hfstr.isEmpty('pook61')}
  hfstr.isEmpty(Math.PI): ${hfstr.isEmpty(Math.PI)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.notEmpty
  hfstr.notEmpty(true): ${hfstr.notEmpty(true)}
  hfstr.notEmpty('6.0'): ${hfstr.notEmpty('6.0')}
  hfstr.notEmpty('pook61'): ${hfstr.notEmpty('pook61')}
  hfstr.notEmpty(Math.PI): ${hfstr.notEmpty(Math.PI)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.getLastNum
  hfstr.getLastNum('name_1'): ${hfstr.getLastNum('name_1')}
  hfstr.getLastNum('pook_061'): ${hfstr.getLastNum('pook_061')}
  hfstr.getLastNum('inoff_792'): ${hfstr.getLastNum('inoff_792')}
  hfstr.getLastNum('name_9734'): ${hfstr.getLastNum('name_9734')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.str2Ab
  hfstr.str2Ab('박종명'): ${hfstr.str2Ab('박종명')}
  hfstr.str2Ab('임헌진'): ${hfstr.str2Ab('임헌진')}
  hfstr.str2Ab('이중호'): ${hfstr.str2Ab('이중호')}
  hfstr.str2Ab('치치와몽이'): ${hfstr.str2Ab('치치와몽이')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.ab2Str
  hfstr.ab2Str(hfstr.str2Ab('박종명')): ${hfstr.ab2Str(hfstr.str2Ab('박종명'))}
  hfstr.ab2Str(hfstr.str2Ab('임헌진')): ${hfstr.ab2Str(hfstr.str2Ab('임헌진'))}
  hfstr.ab2Str(hfstr.str2Ab('이중호')): ${hfstr.ab2Str(hfstr.str2Ab('이중호'))}
  hfstr.ab2Str(hfstr.str2Ab('치치와몽이')): ${hfstr.ab2Str(hfstr.str2Ab('치치와몽이'))}
}}
        `.trim());
        fn_print('\n');
    },
});

const _tester_hfarr = Object.freeze({
    fn_test() {
        fn_print(null);
        fn_print(`
{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.isEmpty
  hfarr.isEmpty([0, 1, 2, 3]): ${hfarr.isEmpty([0, 1, 2, 3])}
  hfarr.isEmpty(Array.from('abcdefg')): ${hfarr.isEmpty(Array.from('abcdefg'))}
  hfarr.isEmpty('jhb'): ${hfarr.isEmpty('jhb')}
  hfarr.isEmpty(337): ${hfarr.isEmpty(337)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.notEmpty
  hfarr.notEmpty([0, 1, 2, 3]): ${hfarr.notEmpty([0, 1, 2, 3])}
  hfarr.notEmpty(Array.from('abcdefg')): ${hfarr.notEmpty(Array.from('abcdefg'))}
  hfarr.notEmpty('jhb'): ${hfarr.notEmpty('jhb')}
  hfarr.notEmpty(337): ${hfarr.notEmpty(337)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.contains
  hfarr.contains([0, 1, 2, 3], 3): ${hfarr.contains([0, 1, 2, 3], 3)}
  hfarr.contains(Array.from('abcdefg'), 'g'): ${hfarr.contains(Array.from('abcdefg'), 'g')}
  hfarr.contains([9, 8, 7], 2): ${hfarr.contains([9, 8, 7], 2)}
  hfarr.contains(Array.from('9876543210'), '3'): ${hfarr.contains(Array.from('9876543210'), '3')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.shuffle
  hfarr.shuffle([0, 1, 2, 3]): ${hfarr.shuffle([0, 1, 2, 3])}
  hfarr.shuffle(Array.from('abcdefg')): ${hfarr.shuffle(Array.from('abcdefg'))}
  hfarr.shuffle(Array.from('pook61')): ${hfarr.shuffle(Array.from('pook61'))}
  hfarr.shuffle(Array.from('inoff79')): ${hfarr.shuffle(Array.from('inoff79'))}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.copy
  hfarr.copy([0, 1, 2, 3]): ${hfarr.copy([0, 1, 2, 3])}
  hfarr.copy(Array.from('abcdefg')): ${hfarr.copy(Array.from('abcdefg'))}
  hfarr.copy(Array.from('pook61')): ${hfarr.copy(Array.from('pook61'))}
  hfarr.copy(Array.from('inoff79')): ${hfarr.copy(Array.from('inoff79'))}
}}
        `.trim());
        fn_print('\n');
    },
});

const _tester_hfdtime = Object.freeze({
    fn_test() {
        fn_print(null);
        fn_print(`
{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.timeStamp
  hfdtime.timeStamp(new Date()): ${hfdtime.timeStamp(new Date())}
  hfdtime.timeStamp(new Date()): ${hfdtime.timeStamp(new Date())}
  hfdtime.timeStamp(new Date()): ${hfdtime.timeStamp(new Date())}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.format
  ${hfdtime.format('\\y\\y\\M\\M [yyyy/MM/dd HH:mm:ss.fff] \\H\\d\\f\\m\\s (HHMM)', new Date())}
  ${hfdtime.format('~~\\y\\y\\y\\y\\y\\y~~ yyyy/MM/dd HH:mm:ss.fff', new Date())}
  ${hfdtime.format('yyyyyy/MM/dd HH:mm:ss.fff', new Date())}
  ${hfdtime.format('yyyy/MM/dd HH:mm:ss.fff', new Date())}
  ${hfdtime.format('yy/MM/dd HH:mm:ss.fff', new Date())}
}}
        `.trim());
        fn_print('\n');
    },
});
//#endregion

/**
 * @param {PointerEvent} pe
 */
const fn_btn_clh = (pe) => {
    // dcs.log('fn_btn_clh');
    // dcs.log(pe);
    // dcs.log(pe.currentTarget);
    /** @type {HTMLDivElement} */
    let te = pe.currentTarget;
    let nm = te.textContent.trim();
    // dcs.log(nm);

    switch (nm) {
        case 'hfnum': {
            _tester_hfnum.fn_test();
            break;
        }
        case 'hfstr': {
            _tester_hfstr.fn_test();
            break;
        }
        case 'hfarr': {
            _tester_hfarr.fn_test();
            break;
        }
        case 'hfdtime': {
            _tester_hfdtime.fn_test();
            break;
        }
        case 'Clear': {
            fn_print(null);
            break;
        }
    }
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {string | null} msg
 * @param {boolean} ba
 * @returns
 */
const fn_print = (msg=null, ba=true) => {
    if (msg == null) {
        _tam.value = '';
        return;
    }
    // console.log(_tam.textContent);
    // console.log(_tam.innerHTML);
    // console.log(_tam.value); //textarea는 value권장(아주)
    let txv = (ba) ? _tam.value + msg + '\n' : msg;
    _tam.value = txv;
    _tam.scrollTop = _tam.scrollHeight;
};

const fn_clear = () => {
    dcs.log('fn_clear');
};

const fn_stop = () => {
    dcs.log('fn_stop');
};

const fn_init = (pd) => {
    _pageData = pd;
    // dcs.log(_pageData.mbtn, _pageData.pge);

    _pageData.pge.addEventListener('keydown', fn_keydown);
    _pec = _pageData.pge.querySelector('div.c_pec');
    // dcs.log(_pec);
    _pec.style.visibility = 'visible';

    _tam = _pec.querySelector('textarea.c_tam');
    // dcs.log(_tam);

    _footer = _pec.querySelector('div.c_footer');
    // dcs.log(_footer);

    let le = _footer.lastElementChild;
    if (le) {
        le.insertAdjacentHTML('beforebegin', `
<div class="c_btn"><span>hfnum</span></div>
<div class="c_btn"><span>hfstr</span></div>
<div class="c_btn"><span>hfarr</span></div>
<div class="c_btn"><span>hfdtime</span></div>
        `.trim());
        _btnArr = Array.from(_footer.children);
        // dcs.log(_btnArr);

        for (let te of _btnArr) {
            te.addEventListener('click', fn_btn_clh);
        }
    }

    // dcs.log('fn_init');
};

/** @type {IPageData} */
let _pageData = null;

/** @type {HTMLDivElement} */
let _pec = null;

/** @type {HTMLTextAreaElement} */
let _tam = null;

/** @type {HTMLDivElement} */
let _footer = null;

/** @type {HTMLDivElement[]} */
let _btnArr = null;


export default {
    fn_clear, fn_stop, fn_init
};

