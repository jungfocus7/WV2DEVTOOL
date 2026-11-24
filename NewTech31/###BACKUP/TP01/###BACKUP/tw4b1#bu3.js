import {
    fn_err,
    fn_indexOfDual, fn_includes,
    fn_equals,
} from "./_wlib_a.js";


//~~~~~~~~~~ TestWork4b1
// ()/*+-0123456789.
{
    //#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 01)
    /**
     * 토큰들 수집
     * @type {string[]}
     */
    const _tokens = [];
    /**
     * 수집용 버퍼
     * @type {string[]}
     */
    const _buff = [];

    /**
     * 입력 텍스트
     * @type {string}
     */
    let _txt = null;
    /**
     * Text Length
     * @type {number}
     */
    let _len = 0;
    /**
     * Prev Char
     * @type {string}
     */
    let _pc = undefined;
    /**
     * Current Char
     * @type {string}
     */
    let _cc = undefined;
    /**
     * Next Char
     * @type {string}
     */
    let _nc = undefined;
    /**
     * 진행 상태
     * @type {number}
     */
    let _wg = 0;


    /**
     * 정상적인 문자인지 확인
     */
    const fn_reset = () => {
        _tokens.length = 0;
        _buff.length = 0;
        _txt = null;
        _len = 0;
        _pc = undefined;
        _cc = undefined;
        _nc = undefined;
        _wg = 0;
    };

    /**
     * @param {number} i
     */
    const fn_nextChars = (i) => {
        _pc = _txt[i - 1];
        _cc = _txt[i];
        _nc = _txt[i + 1];
    };

    /**
     * Check Current Characters
     * [()/*+-0123456789.]
     * @returns
     */
    const fn_checkCharacters = () => {
        let br = false;
        switch (_cc) {
            case '(': {
                br = fn_indexOfDual(
                    '(/*+-', true, _pc,
                    '(-0123456789', false, _nc
                );
                if (br === false) {
                    fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
                } else {
                    _wg++;
                }
                break;
            }
            case ')': {
                br = fn_indexOfDual(
                    ')0123456789', false, _pc,
                    ')/*+-', true, _nc
                );
                if (br === false) {
                    fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
                } else {
                    _wg--;
                }
                break;
            }
            case '/': {
                br = fn_indexOfDual(
                    ')0123456789', false, _pc,
                    '(-0123456789', false, _nc
                );
                if (br === false) {
                    fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
                }
                break;
            }
            case '*': {
                br = fn_indexOfDual(
                    ')0123456789', false, _pc,
                    '(-0123456789', false, _nc
                );
                if (br === false) {
                    fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
                }
                break;
            }
            case '+': {
                br = fn_indexOfDual(
                    ')0123456789', false, _pc,
                    '(-0123456789', false, _nc
                );
                if (br === false) {
                    fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
                }
                break;
            }
            case '-': {
                br = (
                    fn_indexOfDual(
                        '()0123456789', true, _pc,
                        '(0123456789', false, _nc
                    ) ||
                    fn_indexOfDual(
                        '/*+-', true, _pc,
                        '(0123456789', false, _nc
                    ) ||
                    (
                        fn_includes(')0123456789', true, _pc) &&
                        fn_equals('-', false, _nc)
                    )
                );
                if (br === false) {
                    fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
                }
                break;
            }
            default: {
                if (fn_includes('0123456789', false, _cc)) {
                    br = fn_indexOfDual(
                        '(/*+-0123456789.', true, _pc,
                        ')/*+-0123456789.', true, _nc
                    );
                    if (br === false) {
                        fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
                    }
                } else if (fn_equals('.', false, _cc)) {
                    br = fn_indexOfDual(
                        '0123456789', false, _pc,
                        '0123456789', false, _nc
                    );
                    if (br === false) {
                        fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
                    }
                }
            }
        }

        return br;
    };

    /**
     * 정상적인 NumberCharacter 문자인지 확인
     * [987.0123456]
     * @returns
     */
    const fn_checkNumChar = () => {
        let br = false;
        if (fn_equals('-', false, _cc)) {
            if (_buff.length === 0) {
                br = fn_indexOfDual(
                    '(/*+-', true, _pc,
                    '0123456789', false, _nc
                );
            }
        } else if (fn_includes('0123456789', false, _cc)) {
            if (fn_includes('(/*+-0123456789', true, _pc)) {
                br = fn_includes(')/*+-0123456789.', true, _nc);
            } else if (fn_equals('.', false, _pc)) {
                br = fn_includes(')/*+-0123456789', true, _nc);
            }/* else if (fn_includes('0123456789', false, _pc)) {
                br = fn_includes(')/*+-0123456789.', true, _nc);
            }*/
        } else if (fn_equals('.', false, _cc)) {
            if (_buff.indexOf('.') === -1) {
                br = fn_indexOfDual(
                    '0123456789', false, _pc,
                    '0123456789', false, _nc
                );
            }
        }

        return br;
    };
    //#endregion

    //#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 02)
    /**
     * 버퍼를 비우고 Value로 적용하기
     */
    const fn_clearBuffer = () => {
        if (_buff.length > 0) {
            _tokens.push(_buff.join(''));
            _buff.length = 0;
        }
    };

    /**
     * TestLog
     */
    const fn_testLog = () => {
        console.log('{{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
        console.log(_txt);
        console.log(_tokens);
        // console.log(_tokens.join(''));
        let rst = _tokens.join('');
        console.log(rst);
        // console.log(_txt === rst);
        if (_txt === rst) {
            console.log(true);
        } else {
            // console.error(false);
            throw 'false';
        }
        console.log('}}\n');
    };

    /**
     * 텍스트 파싱하여 토큰화
     * @param {string} txt
     */
    const fn_tokenize = (txt) => {
        fn_reset();
        _txt = txt.replace(/[\s,]+/g, '');
        _len = _txt.length;

        for (let i = 0; i < _len; i++) {
            fn_nextChars(i);
            if (fn_checkCharacters()) {
                if (fn_checkNumChar()) {
                    _buff.push(_cc);
                } else {
                    fn_clearBuffer();
                    _tokens.push(_cc);
                }
            }
        }
        fn_clearBuffer();

        if (_wg !== 0) {
            fn_err('[(,)]; Incorrect curly brace depth.');
        }

        //~~~~~~~~~~~~~~~~~~~~
        fn_testLog();
    };
    //#endregion


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // const COLOR_RESET = '\x1b[0m';
    // const COLOR_GREEN = '\x1b[32m';
    // const COLOR_RED = '\x1b[31m';

    // /**
    //  * @param {string} wo
    //  */
    // const fn_fakeRun = (wo) => {
    //     _pc = wo[0];
    //     _cc = wo[1];
    //     _nc = wo[2];

    //     let br = fn_checkNumChar();
    //     if (br) {
    //         console.log(`${COLOR_GREEN}[SUCCESS]> ${wo}, ${br}${COLOR_RESET}`);
    //     } else {
    //         // console.log(`${COLOR_RED}[ERROR]> ${wo}, ${br}${COLOR_RESET}`);
    //     }
    // };

    // const __allChars = '()/*+-0123456789.';
    // for (let ca of __allChars) {
    //     for (let cb of __allChars) {
    //         for (let cc of __allChars) {
    //             if (cb !== '-') continue;
    //             let wo = ca + cb + cc;
    //             fn_fakeRun(wo);
    //         }
    //     }
    // }


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // const _txts = [
    //     '(-200--100)/-2',
    // ];
    // for (let txt of _txts) {
    //     fn_tokenize(txt);
    // }


    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const _txts = [
        // '(-200--100)/-2',
        // '880+0.05',
        // '880000000*0.05',
        // '400+100*2',
        // '50-100+500',
        // '-100+200*2',
        // '-100+200*223/-9',
        // '900+-1/-2',
        // '-5',
        // '-5+-3+(-54)',
        // '3-(-2)',
        // '(-5)*3',
        // '400*2+100',
        // '-(-100+200*(223))/9',
        // '-(47.38-43)+(39/5)-(14/9)',
        // '20+22-4.84-9-(7.44-16/-2.55+-32)',
        // '(11*(36.79-40/46.74*35)*(7-29))+42*(5*(39.85-46+34+22.64)+(43*16.19-46*33))',
        // '(100+1)',
        // '0.5*0.2',
        // '2.5+1.5',


        // '-0.001*(-0.0001)',
        // '-100+50',
        // '100--200',
        // '100- -200',
        // '--5+-3',
        // '(-(-5))',
        // '(7+(-(100)))',
        // '((10+20)*(30-40))/(-5)',
        // '0/100',
        // '100/0',
        // '0*100/0',
        // '123.456 + 1',
        // '100+7+200',
        // '100*200',
        // '(100+200)',
        // '(10+20)*((30-40))',


        // '(((-10.5+2.3)*-0.45)/(3+12.8--5.2))*(-100.05)',
        // '12.5-3 + 2.4+5 * -0.01',
        // '  12.5   +  (- 34.2 *   0.005) /  99.1  ',
        // '-10 * (8+-3+20)',
        // '2.125 * 500.01 - 0.0001 / 10.0',
        // '((10+20)*(30-(40/5)+(-2)))',
        // '-00123.45000 / 5+000.05 * (-0.0000001)',
        // '1+2-3*4/5+6-7*8/9+(-10*-11/-12)',
        // '(10+20)/(30-40)',
        // '9999999999.999999 / -0.0000000001 + 123456789.123456789',
        // '(-100.55+200.25)*(-300.75/-400.5)',
        // '10.2 + 20.3 * -40',
        // '((1000000 * (1 + 0.05) * 12) - (500000 / 0.02)) * -1.05',


        // '(((-10.5+2.3)*-0.45)/(12.8-(-5.2)))*(-100.05)',
        // '12.5 + (-34.2 * 0.005) / 99.1',
        // '1+2-3*4/5+6-7*8/9+(-10*-11/-12)',
        // '(-(-(-10.5)+(-20.25))*(-0.5))',
        // '-123.45 / 0.05 * (-0.0000001)',
        // '9999999999.999999 / -0.0000000001 + 123456789.123456789',
        // '(-100.55+200.25)*(-300.75/-400.5)',
        // '(0.125 * 500) - (0.0001 / 10)',
        // '((1000000 * (1 + 0.05) / 12) - (500000 / 0.02)) * -1.05',
        // '((10+20)*(30-(40/5)+(-2)))',
        // '-0.001 * (-0.0001 / (0.05 + 0.95))',
        // '((12.5 + 87.5) * -0.01) / (0.5 * -2)',
        // '(100.5 + 200.25) / (300.75 - (400.5 * -0.2))',
        // '10 + (20 * (30 - (40 / (5 + 5))))',
        // '-(-(-10.5 + 20.5) * -30.5)',
        // '((1.23 + 4.56) * (7.89 - 0.12)) / (-3.45 + 6.78)',
        // '-100 + (-200 * (-300 / (-400 + 500)))',
        // '(0.0001 + 0.0002) * (0.0003 / -0.0004)',
        // '(((-10) + 20) * ((-30) - 40)) / ((-50) + 60)',
        // '12345.6789 + (98765.4321 / -123.456)',


        '(((-0.0123+4.5678)*-8.9)/((0.1234+-5.6789)*-0.0123))*-4.5678',
        '-(0.123456789*-(0.987654321/(0.01234+-0.56789)))',
        '0.123',
        '(((7.123+6.456)*-5.789)/(-4.012+3.345))*(-2.678/1.3-9)',
        '(-(-(-0.12345)+(-0.6789))*(0.1234/(-0.56789+0.01234)))',
        '(0.123456789/-0.000123456789)+(0.987654321*-0.000987654321)',
        '-((0.123+45.678)*-(0.9/-(0.012*-3.456789)))',
        '((123456789.0123456789*-0.0123456789)/(0.987654321+-0.123456789))',
        '(-0.0123456789*(-0.123456789/(-0.23456789+0.3456789)))',
        '((((0.1+2.3)*-4.5)/(6.7+-8.9))*((0.01+-0.23)/(0.45*-0.67)))',
        '-(-(-(-(-0.123456789+0.987654321)*-0.0123456789)))',
        '((0.123*-4.567)+(-8.901/(0.234+-5.678)))/(-0.901*-2.345)',
        '(0.0123456789/(0.123456789*-0.0123456789))-(0.987654321/0.0123456789)',
        '(-0.123456789*(0.23456789/(-0.3456789*(0.456789/-0.56789))))',
        '(((0.1234+5.6789)*-0.01234)/((0.56789+-0.01234)*-0.56789))',
        '(-0.000123456789/-0.000987654321)*(-0.000123456789+-0.000987654321)',
        '((1.23456789/-0.0123456789)*(0.987654321/-0.000123456789))',
        '-0.123456789-((0.23456789*-0.3456789)/(-0.456789+0.56789))',
        '(((0.0123456789+0.987654321)*-0.123456789)/(-0.987654321+-0.0123456789))',
        '(-(-0.123456789*(-0.987654321/(-0.0123456789+0.0987654321))))',
        '((0.123456789/-0.123456789)+(-0.987654321*0.987654321))/(-0.0123456789)',
    ];
    console.time('>>>');
    for (let txt of _txts) {
        fn_tokenize(txt);
    }
    console.timeEnd('>>>');

}
