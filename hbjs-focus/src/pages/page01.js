import "../_defs.js";
import {
    dcs, hfEventTypes, hfnum, hfstr, hfarr, hfdtime
} from "../../hbjs/hfCommon.js";


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

/**
 * @param {PointerEvent} pe
 */
const fn_ftbtns_cl = (pe) => {
    /** @type {HTMLButtonElement} */
    let btn = pe.currentTarget;
    let nc = btn.textContent.substring(0, 2);
    switch (nc) {
        case '00': {
            fn_print(null);
            break;
        }
        case '01': {
            _tester_hfnum.fn_test();
            break;
        }
        case '02': {
            _tester_hfstr.fn_test();
            break;
        }
        case '03': {
            _tester_hfarr.fn_test();
            break;
        }
        case '04': {
            _tester_hfdtime.fn_test();
            break;
        }
    }
};
//#endregion }}


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 00)
/**
 * Menu 생성
 */
const fn_createMenu = () => {
    const pd = _page01;

    if (pd.mbtn === null) {
        pd.leftMenuCont.insertAdjacentHTML('beforeend', `
<button type="button" class="c_bt"><span>01) hfCommon</span></button>
        `.trim());
        pd.mbtn = pd.leftMenuCont.lastElementChild;

        // dcs.log('# 메뉴 생성완료');
    }
};

/**
 * Page 생성
 */
const fn_createPageData = () => {
    const pd = _page01;

    if (pd.pge === null) {
        pd.pageCont.insertAdjacentHTML('beforeend', `
<div class="c_page" data-index="0" tabindex="01">
  <span class="c_tname">hfCommon</span>
  <textarea class="c_tam" placeholder="empty" name="empty" spellcheck="false" readonly></textarea>
  <div class="c_btc">
      <button type="button" class="c_bt"><span>00)clear</span></button>
      <button type="button" class="c_bt"><span>01)hfnum</span></button>
      <button type="button" class="c_bt"><span>02)hfstr</span></button>
      <button type="button" class="c_bt"><span>03)hfarr</span></button>
      <button type="button" class="c_bt"><span>04)hfdtime</span></button>
  </div>
</div>
        `.trim());
        pd.pge = pd.pageCont.lastElementChild;

        pd.txa = pd.pge.querySelector('textarea.c_tam');

        pd.ftbtns = Array.from(pd.pge.querySelectorAll('div.c_btc>button.c_bt'));
        for (let btn of pd.ftbtns) {
            btn.addEventListener(hfEventTypes.CLICK, fn_ftbtns_cl);
        }

        // dcs.log('# 페이지 생성완료');
    }
};

/**
 * 작업 중지
 */
const fn_stop = () => {
};

/**
 * 기능 출력
 * @param {string} msg
 * @returns
 */
const fn_print = (msg=null, ba=true) => {
    const pd = _page01;

    if (msg === null) {
        pd.txa.value = '';
        return;
    } else {
        let txt = pd.txa.value;
        txt = (ba) ? `${txt}${msg}\n` : `${msg}\n`;
        pd.txa.value = txt;
        pd.txa.scrollTop = pd.txa.scrollHeight;
    }
};

/**
 * 한번 초기화
 * @param {GlobalDataObject} gdo
 */
const fn_initOnce = (gdo) => {
    const pd = _page01;

    if (pd.gdo === null) {
        pd.gdo = gdo;

        pd.rootCont = gdo.rootCont;
        pd.leftMenuCont = gdo.leftMenuCont;
        pd.pageCont = gdo.pageCont;

        fn_createMenu();
        fn_createPageData();

        pd.gdo.pageDataArr.push(pd);


        // configurable, enumerable,
        // writable, value,
        // get, set
        Reflect.defineProperty(window, 'hfnum', {
            configurable: false, enumerable: false, writable: false,
            value: hfnum
        });
        Reflect.defineProperty(window, 'hfstr', {
            configurable: false, enumerable: false, writable: false,
            value: hfstr
        });
        Reflect.defineProperty(window, 'hfarr', {
            configurable: false, enumerable: false, writable: false,
            value: hfarr
        });
        Reflect.defineProperty(window, 'hfdtime', {
            configurable: false, enumerable: false, writable: false,
            value: hfdtime
        });
    }
};


/** @type {PageData} */
const _page01 = {
    gdo: null,

    rootCont: null,
    leftMenuCont: null,
    pageCont: null,

    mbtn: null,
    pge: null,

    fn_initOnce,
    fn_stop,

    fn_scrollJump: null,
    fn_pagesPositionOrder: null,

    txa: null,
    fn_print,

    ftbtns: null,
};
Object.seal(_page01);

export { _page01 }
//#endregion }}
