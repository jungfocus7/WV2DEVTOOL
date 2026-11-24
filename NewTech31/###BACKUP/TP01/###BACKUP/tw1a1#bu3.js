// TestWork1a1
{
    //#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 00)
    /**
     * @param {string} msg
     */
    const fn_err = (msg) => {
        throw new Error(msg);
    };

    /**
     * 정상적인 Token 문자인지 확인
     * @param {string} ch
     * @returns
     */
    const fn_isTokenChar = (ch) => {
        return '()/*+-.0123456789'.indexOf(ch) > -1;
    };

    /**
     * 정상적인 Value의 문자인지 확인
     * @param {string} ch
     * @returns
     */
    const fn_isValueChar = (ch) => {
        return ('0123456789'.indexOf(ch) > -1) ||
            (('.' === ch) && (_buff.indexOf('.') === -1));
    };
    //#endregion


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
     * 체크해서 마이너스 추가
     * @returns
     */
    const fn_addCheckMinus = () => {
        if (('-' === _pc) && (_buff.length === 0)) {
            if ('.0123456789'.indexOf(_cc) > -1) {
                _buff.push(_pc);
            }
        }
    };

    /**
     * Value를 구성하는 버퍼 채우기
     * @returns
     */
    const fn_fillBuffer = () => {
        if (fn_isValueChar(_cc)) {
            fn_addCheckMinus();
            _buff.push(_cc);
            return true;
        } else {
            return false;
        }
    };

    /**
     * 토큰들 채우기
     */
    const fn_fillTokens = () => {
        let be = false;
        if ('-' === _pc) {
            if ('(-'.indexOf(_cc) > -1) {
                _tokens.push(_pc);
            } else {
                be = true;
            }
        } else if ('(' === _pc) {
            if (')/*+'.indexOf(_cc) > -1) {
                be = true;
            }
        } else if (')' === _pc) {
            if ('(.0123456789'.indexOf(_cc) > -1) {
                be = true;
            }
        } else if ('/*+'.indexOf(_pc) > -1) {
            if (')' === _cc) {
                be = true;
            }
        } else if ('.0123456789'.indexOf(_pc) > -1) {
            if ('(' === _cc) {
                be = true;
            }
        }
        if (be) {
            fn_err(`Not next (${_pc}) to (${_cc}).`);
        }

        if ('-' !== _cc) {
            _tokens.push(_cc);
        }
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
                let bn = fn_fillBuffer() === false;
                if (bn) {
                    fn_clearBuffer();
                    fn_fillTokens();
                }
            } else {
                fn_err(`Invalid (${_cc})token.`);
            }
        }
        fn_clearBuffer();

        console.log(_txt);
        console.log(_tokens);
    };
    //#endregion


    fn_tokenize('(-200--100)/(-2)');
    // fn_tokenize('(-200--100)/-2');
    // fn_tokenize('-880+-0.05');
    // fn_tokenize('-5+-3+(-54)');
    // fn_tokenize('(11*(36.79-40/46.74*35)*(7-29))+42*(5*(39.85-46+34+22.64)+(43*16.19-46*33))');

}
