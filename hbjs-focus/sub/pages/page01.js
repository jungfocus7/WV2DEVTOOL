import { hfdc } from "../../hfjs/core/hfdc.mjs";
import { hfnum } from "../../hfjs/core/hfnum.mjs";
import { hfstr } from "../../hfjs/core/hfstr.mjs";
import { hfarr } from "../../hfjs/core/hfarr.mjs";
import { hfdate } from "../../hfjs/core/hfdate.mjs";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {string} msg
 * @param {boolean} ba
 * @returns
 */
const fn_print = (msg=null, ba=true) => {
    if (msg == null) {
        _tam.value = '';
        return;
    }

    // hfdc.fn_log(_tam.`textContent);
    // hfdc.fn_log(_tam.innerHTML);
    // hfdc.fn_log(_tam.value); //textarea는 value권장(아주)
    let txv = (ba) ? (_tam.value + msg + '\n') : msg;
    _tam.value = txv;
    _tam.scrollTop = _tam.scrollHeight;
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const _tester_hfnum = (() => {
    /**
     * @param {any} tv
     * @returns
     */
    const fn_isNumber = (tv) => {
        return hfnum.fn_isNumber(tv);
    };

    /**
     * @param {any} tv
     * @returns
     */
    const fn_notNumber = (tv) => {
        return hfnum.fn_notNumber(tv);
    };

    /**
     * ??
     */
    const fn_test = () => {
        fn_print(null);
        fn_print(`
{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.fn_isNumber
  hfnum.fn_isNumber(3.7): ${fn_isNumber(3.7)}
  hfnum.fn_isNumber(6.0): ${fn_isNumber(6.0)}
  hfnum.fn_isNumber('94123'): ${fn_isNumber('94123')}
  hfnum.fn_isNumber((Math.PI / 2) + '::'): ${fn_isNumber((Math.PI / 2) + '::')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.fn_notNumber
  hfnum.fn_notNumber(3.7): ${fn_notNumber(3.7)}
  hfnum.fn_notNumber(6.0): ${fn_notNumber(6.0)}
  hfnum.fn_notNumber('94123'): ${fn_notNumber('94123')}
  hfnum.fn_notNumber((Math.PI / 2) + '::'): ${fn_notNumber((Math.PI / 2) + '::')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.fn_isFloat
  hfnum.fn_isFloat(3.7): ${hfnum.fn_isFloat(3.7)}
  hfnum.fn_isFloat(6.0): ${hfnum.fn_isFloat(6.0)}
  hfnum.fn_isFloat(909.3): ${hfnum.fn_isFloat(909.3)}
  hfnum.fn_isFloat(Math.PI): ${hfnum.fn_isFloat(Math.PI)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.fn_isMinus
  hfnum.fn_isMinus(-3.45): ${hfnum.fn_isMinus(-3.45)}
  hfnum.fn_isMinus(943): ${hfnum.fn_isMinus(943)}
  hfnum.fn_isMinus(-Math.PI): ${hfnum.fn_isMinus(-Math.PI)}
  hfnum.fn_isMinus(400 - 329): ${hfnum.fn_isMinus(400 - 329)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.fn_random
  hfnum.fn_random(13): ${hfnum.fn_random(13)}
  hfnum.fn_random(234): ${hfnum.fn_random(234)}
  hfnum.fn_random(27): ${hfnum.fn_random(27)}
  hfnum.fn_random(95): ${hfnum.fn_random(95)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.fn_randRange
  hfnum.fn_randRange(1, 5): ${hfnum.fn_randRange(1, 5)}
  hfnum.fn_randRange(17, 35): ${hfnum.fn_randRange(17, 35)}
  hfnum.fn_randRange(92, 182): ${hfnum.fn_randRange(92, 182)}
  hfnum.fn_randRange(7, 13): ${hfnum.fn_randRange(7, 13)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.fn_isOdd
  hfnum.fn_isOdd(78): ${hfnum.fn_isOdd(78)}
  hfnum.fn_isOdd(1): ${hfnum.fn_isOdd(1)}
  hfnum.fn_isOdd(956): ${hfnum.fn_isOdd(956)}
  hfnum.fn_isOdd(37): ${hfnum.fn_isOdd(37)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfnum.fn_isEven
  hfnum.fn_isEven(5): ${hfnum.fn_isEven(5)}
  hfnum.fn_isEven(17): ${hfnum.fn_isEven(17)}
  hfnum.fn_isEven(182): ${hfnum.fn_isEven(182)}
  hfnum.fn_isEven(93): ${hfnum.fn_isEven(93)}
}}
        `.trim());
        fn_print('\n');
    };

    return Object.freeze({
        fn_test,
    });

})();

const _tester_hfstr = (() => {
    /**
     * @param {any} tv
     * @returns
     */
    const fn_isEmpty = (tv) => {
        return hfstr.fn_isEmpty(tv);
    };

    /**
     * @param {any} tv
     * @returns
     */
    const fn_notEmpty = (tv) => {
        return hfstr.fn_notEmpty(tv);
    };

    /**
     * ??
     */
    const fn_test = () => {
        fn_print(null);
        fn_print(`
{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.fn_isEmpty
  hfstr.fn_isEmpty(true): ${fn_isEmpty(true)}
  hfstr.fn_isEmpty('6.0'): ${fn_isEmpty('6.0')}
  hfstr.fn_isEmpty('pook61'): ${fn_isEmpty('pook61')}
  hfstr.fn_isEmpty(Math.PI): ${fn_isEmpty(Math.PI)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.fn_notEmpty
  hfstr.fn_notEmpty(true): ${fn_notEmpty(true)}
  hfstr.fn_notEmpty('6.0'): ${fn_notEmpty('6.0')}
  hfstr.fn_notEmpty('pook61'): ${fn_notEmpty('pook61')}
  hfstr.fn_notEmpty(Math.PI): ${fn_notEmpty(Math.PI)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.fn_getLastNum
  hfstr.fn_getLastNum('name_1'): ${hfstr.fn_getLastNum('name_1')}
  hfstr.fn_getLastNum('pook_061'): ${hfstr.fn_getLastNum('pook_061')}
  hfstr.fn_getLastNum('inoff_792'): ${hfstr.fn_getLastNum('inoff_792')}
  hfstr.fn_getLastNum('name_9734'): ${hfstr.fn_getLastNum('name_9734')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.fn_str2Ab
  hfstr.fn_str2Ab('박종명'): ${hfstr.fn_str2Ab('박종명')}
  hfstr.fn_str2Ab('임헌진'): ${hfstr.fn_str2Ab('임헌진')}
  hfstr.fn_str2Ab('이중호'): ${hfstr.fn_str2Ab('이중호')}
  hfstr.fn_str2Ab('치치와몽이'): ${hfstr.fn_str2Ab('치치와몽이')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfstr.fn_ab2Str
  hfstr.fn_ab2Str(hfstr.fn_str2Ab('박종명')): ${hfstr.fn_ab2Str(hfstr.fn_str2Ab('박종명'))}
  hfstr.fn_ab2Str(hfstr.fn_str2Ab('임헌진')): ${hfstr.fn_ab2Str(hfstr.fn_str2Ab('임헌진'))}
  hfstr.fn_ab2Str(hfstr.fn_str2Ab('이중호')): ${hfstr.fn_ab2Str(hfstr.fn_str2Ab('이중호'))}
  hfstr.fn_ab2Str(hfstr.fn_str2Ab('치치와몽이')): ${hfstr.fn_ab2Str(hfstr.fn_str2Ab('치치와몽이'))}
}}
        `.trim());
        fn_print('\n');
    };

    return Object.freeze({
        fn_test,
    });

})();

const _tester_hfarr = (() => {
    /**
     * @param {any} tv
     * @returns
     */
    const fn_isEmpty = (tv) => {
        return hfarr.fn_isEmpty(tv);
    };

    /**
     * @param {any} tv
     * @returns
     */
    const fn_notEmpty = (tv) => {
        return hfarr.fn_notEmpty(tv);
    };

    /**
     * ??
     */
    const fn_test = () => {
        fn_print(null);
        fn_print(`
{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.fn_isEmpty
  hfarr.fn_isEmpty([0, 1, 2, 3]): ${fn_isEmpty([0, 1, 2, 3])}
  hfarr.fn_isEmpty(Array.from('abcdefg')): ${fn_isEmpty(Array.from('abcdefg'))}
  hfarr.fn_isEmpty('jhb'): ${fn_isEmpty('jhb')}
  hfarr.fn_isEmpty(337): ${fn_isEmpty(337)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.fn_notEmpty
  hfarr.fn_notEmpty([0, 1, 2, 3]): ${fn_notEmpty([0, 1, 2, 3])}
  hfarr.fn_notEmpty(Array.from('abcdefg')): ${fn_notEmpty(Array.from('abcdefg'))}
  hfarr.fn_notEmpty('jhb'): ${fn_notEmpty('jhb')}
  hfarr.fn_notEmpty(337): ${fn_notEmpty(337)}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.fn_contains
  hfarr.fn_contains([0, 1, 2, 3], 3): ${hfarr.fn_contains([0, 1, 2, 3], 3)}
  hfarr.fn_contains(Array.from('abcdefg'), 'g'): ${hfarr.fn_contains(Array.from('abcdefg'), 'g')}
  hfarr.fn_contains([9, 8, 7], 2): ${hfarr.fn_contains([9, 8, 7], 2)}
  hfarr.fn_contains(Array.from('9876543210'), '3'): ${hfarr.fn_contains(Array.from('9876543210'), '3')}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.fn_shuffle
  hfarr.fn_shuffle([0, 1, 2, 3]): ${hfarr.fn_shuffle([0, 1, 2, 3])}
  hfarr.fn_shuffle(Array.from('abcdefg')): ${hfarr.fn_shuffle(Array.from('abcdefg'))}
  hfarr.fn_shuffle(Array.from('pook61')): ${hfarr.fn_shuffle(Array.from('pook61'))}
  hfarr.fn_shuffle(Array.from('inoff79')): ${hfarr.fn_shuffle(Array.from('inoff79'))}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfarr.fn_copy
  hfarr.fn_copy([0, 1, 2, 3]): ${hfarr.fn_copy([0, 1, 2, 3])}
  hfarr.fn_copy(Array.from('abcdefg')): ${hfarr.fn_copy(Array.from('abcdefg'))}
  hfarr.fn_copy(Array.from('pook61')): ${hfarr.fn_copy(Array.from('pook61'))}
  hfarr.fn_copy(Array.from('inoff79')): ${hfarr.fn_copy(Array.from('inoff79'))}
}}
        `.trim());
        fn_print('\n');
    };

    return Object.freeze({
        fn_test,
    });

})();

const _tester_hfdtime = (() => {
    /**
     * ??
     */
    const fn_test = () => {
        fn_print(null);
        fn_print(`
{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfdate.fn_timeStamp
  hfdate.fn_timeStamp(new Date()): ${hfdate.fn_timeStamp(new Date())}
  hfdate.fn_timeStamp(new Date()): ${hfdate.fn_timeStamp(new Date())}
  hfdate.fn_timeStamp(new Date()): ${hfdate.fn_timeStamp(new Date())}
}}

{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ hfdate.fn_format
  ${hfdate.fn_format('\\y\\y\\M\\M [yyyy/MM/dd HH:mm:ss.fff] \\H\\d\\f\\m\\s (HHMM)', new Date())}
  ${hfdate.fn_format('~~\\y\\y\\y\\y\\y\\y~~ yyyy/MM/dd HH:mm:ss.fff', new Date())}
  ${hfdate.fn_format('yyyyyy/MM/dd HH:mm:ss.fff', new Date())}
  ${hfdate.fn_format('yyyy/MM/dd HH:mm:ss.fff', new Date())}
  ${hfdate.fn_format('yy/MM/dd HH:mm:ss.fff', new Date())}
}}
        `.trim());
        fn_print('\n');
    };

    return Object.freeze({
        fn_test,
    });

})();


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {KeyboardEvent} ke
 */
const fn_keydown = (ke) => {
    hfdc.fn_log('fn_keydown');

    ke.preventDefault();
};

/**
 * @param {PointerEvent} pe
 */
const fn_btn_clh = (pe) => {
    hfdc.fn_log('fn_btn_clh');

    let he = /** @type {HTMLDivElement} */ (pe.currentTarget);
    let nm = he.textContent.trim();
    hfdc.fn_log(nm);

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

/**
 *
 */
const fn_clear = () => {
    hfdc.fn_log('fn_clear');
};

/**
 *
 */
const fn_stop = () => {
    hfdc.fn_log('fn_stop');
};

/**
 * @param {IPageData} pd
 */
const fn_init = (pd) => {
    hfdc.fn_log('fn_init');

    _pageData = pd;
    hfdc.fn_log(_pageData.mbtn, _pageData.pge);

    _pageData.pge.addEventListener('keydown', fn_keydown);
    _pec = _pageData.pge.querySelector('div.c_pec');
    hfdc.fn_log(_pec);
    _pec.style.visibility = 'visible';

    _tam = _pec.querySelector('textarea.c_tam');
    hfdc.fn_log(_tam);

    _footer = _pec.querySelector('div.c_footer');
    hfdc.fn_log(_footer);

    let le = _footer.lastElementChild;
    if (le) {
        le.insertAdjacentHTML('beforebegin', `
<div class="c_btn"><span>hfnum</span></div>
<div class="c_btn"><span>hfstr</span></div>
<div class="c_btn"><span>hfarr</span></div>
<div class="c_btn"><span>hfdtime</span></div>
        `.trim());

        _btnArr = /** @type {HTMLDivElement[]} */ (Array.from(_footer.children));
        hfdc.fn_log(_btnArr);

        for (let te of _btnArr) {
            te.addEventListener('click', fn_btn_clh);
        }
    }

    _tester_hfnum.fn_test();
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

