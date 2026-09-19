import {
    fn_err,
    fn_indexOfDual, fn_includes,
    fn_equals,
} from "./_wlib_a.js";


//~~~~~~~~~~ TestWork4b1
// ()/*+-.0123456789
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

    // /**
    //  * 정상적인 Token 문자인지 확인
    //  * @param {string} ch
    //  * @returns
    //  */
    // const fn_isTokenChar = (ch) => {
    //     if (fn_includes('()/*+-.0123456789', false, ch)) {
    //         return true;
    //     } else {
    //         fn_err(`[${_pc},${_cc},${_nc}]; Invalid tokens.`);
    //         return false;
    //     }
    // };
    /**
     * Check Current Characters
     * [()/*+-.0123456789]
     * @param {string} cc (current char)
     * @param {string} pc (prev char)
     * @param {string} nc (next char)
     * @returns
     */
    const fn_checkCharacters = (cc, pc, nc) => {
        if (typeof cc !== 'string') {
            fn_err('Incorrect cc value.');
        }

        let br = false;
        switch (cc) {
            case '(': {
                br = fn_indexOfDual(
                    '(/*+-', true, pc,
                    '(-0123456789', false, nc
                );
                break;
            }
            case ')': {
                br = fn_indexOfDual(
                    ')0123456789', false, pc,
                    ')/*+-', true, nc
                );
                break;
            }
            case '/': {
                br = fn_indexOfDual(
                    ')0123456789', false, pc,
                    '(-0123456789', false, nc
                );
                break;
            }
            case '*': {
                br = fn_indexOfDual(
                    ')0123456789', false, pc,
                    '(-0123456789', false, nc
                );
                break;
            }
            case '+': {
                br = fn_indexOfDual(
                    ')0123456789', false, pc,
                    '(-0123456789', false, nc
                );
                break;
            }
            case '-': {
                br = (
                    fn_indexOfDual(
                        '()0123456789', true, pc,
                        '(0123456789', false, nc
                    ) ||
                    fn_indexOfDual(
                        '/*+-', true, pc,
                        '(0123456789', false, nc
                    ) ||
                    (
                        fn_includes(')0123456789', true, pc) &&
                        fn_equals('-', false, nc)
                    )
                );
                break;
            }
            case '.': {
                br = fn_indexOfDual(
                    '0123456789', false, pc,
                    '0123456789', false, nc
                );
                break;
            }
            default: {
                if (fn_includes('0123456789', false, cc)) {
                    br = fn_indexOfDual(
                        '(/*+-.0123456789', true, pc,
                        ')/*+-.0123456789', true, nc
                    );
                }
            }
        }

        return br;
    };

    /**
     * 정상적인 NumberValue의 문자인지 확인
     * [987.0123456]
     * @param {string} cc (current char)
     * @param {string[]} buff (buffer of numbers)
     * @param {string} pc (prev char)
     * @param {string} nc (next char)
     * @returns
     */
    const fn_isNumChar = (cc, buff, pc, nc) => {
        if (typeof cc !== 'string') {
            fn_err('Incorrect cc value.');
        }

        if (Array.isArray(buff) === false) {
            fn_err('Invalid buffer.');
        }

        let br = false;
        if (fn_equals('.', false, cc)) {
            br = (
                (buff.indexOf('.') === -1) &&
                fn_indexOfDual(
                    '0123456789', false, pc,
                    '0123456789', false, nc
                )
            );
        } else if (fn_includes('0123456789', false, cc)) {
            br = fn_indexOfDual(
                '0123456789', true, pc,
                '0123456789', true, nc
            );
        }

        return br;
    };
    //#endregion

    //#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 02)
    /**
     * Value를 구성하는 버퍼 채우기
     * @returns
     */
    const fn_fillBuffer = () => {
        // if (fn_isValueChar(_cc)) {
        //     _buff.push(_cc);
        //     return true;
        // } else if (fn_equals('-', false, _cc)) {
        //     // if (
        //     //     (_buff.length === 0) &&
        //     //     fn_includes('()/*+-0123456789', true, _pc) &&
        //     //     fn_includes('.0123456789', false, _nc)
        //     // ) {
        //     //     _buff.push(_cc);
        //     //     return true;
        //     // } else {
        //     //     return false;
        //     // }
        // } else {
        //     return false;
        // }
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
            if (fn_isTokenChar(_cc)) {
                console.log(_pc, _cc, _nc);
                // let bn = fn_fillBuffer() === false;
                // if (bn) {
                //     fn_clearBuffer();
                //     fn_fillTokens();
                // }
            }
        }
        // fn_clearBuffer();
    };
    //#endregion




    const _txts = [
        '(-200--100)/-2',
    ];
    for (let txt of _txts) {
        fn_tokenize(txt);
    }
}
