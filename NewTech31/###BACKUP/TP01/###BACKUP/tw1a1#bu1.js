// TestWork1a1
{
    //#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 00)
    /**
     * @param {string} msg
     */
    const fn_err = (msg) => {
        throw new Error(msg);
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
        _wg = 0;
    };
    //#endregion

    //#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 02)
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
            ((ch === '.') && (_buff.indexOf('.') === -1));
    };

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
     * @param {string} pa
     * @param {string} ch
     * @returns
     */
    const fn_addCheckMinus = (pa, ch) => {
        if ((pa === '-') && (_buff.length === 0)) {
            if ('.0123456789'.indexOf(ch) > -1) {
                _buff.push(pa);
            }
        }
    };

    /**
     * Value를 구성하는 버퍼 채우기
     * @param {string} pa
     * @param {string} ch
     * @returns
     */
    const fn_fillBuffer = (pa, ch) => {
        if (fn_isValueChar(ch)) {
            fn_addCheckMinus(pa, ch);
            _buff.push(ch);
            return true;
        } else {
            return false;
        }
    };

    /**
     * 토큰들 채우기
     * @param {string} pa
     * @param {string} ch
    */
    const fn_fillTokens = (pa, ch) => {
        // if ((pa === '-') && ('(-'.indexOf(ch) > -1)) {
        //     _tokens.push(pa);
        // }

        let be = false;

        if (pa === '-') {
            if ('(-'.indexOf(ch) > -1) {
                _tokens.push(pa);
            } else {
                // fn_err(`There shouldn't be a (${ch}) behind an (${pa}).`);
                be = true;
            }
        } else if (pa === '(') {
            if (')/*+'.indexOf(ch) > -1) {
                be = true;
            }
        } else if (pa === ')') {
            if ('(.0123456789'.indexOf(ch) > -1) {
                be = true;
            }
        } else if ('/*+'.indexOf(pa) > -1) {
            if (ch === ')') {
                be = true;
            }
        } else if ('.0123456789'.indexOf(pa) > -1) {
            if (ch === '(') {
                be = true;
            }
        }

        if (be) {
            fn_err(`Not (${pa}) next (${ch}).`);
        }

        if (ch !== '-') {
            _tokens.push(ch);
        }
    };

    /**
     * 텍스트 파싱하여 토큰화
     * @param {string} txt
     */
    const fn_tokenize = (txt) => {
        fn_reset();
        _txt = txt.replace(/[\s,]+/g, '');

        let pa;
        for (let ch of txt) {
            if (fn_isTokenChar(ch)) {
                let bn = fn_fillBuffer(pa, ch) === false;
                if (bn) {
                    fn_clearBuffer();
                    fn_fillTokens(pa, ch);
                }
            } else {
                // fn_err(`Invalid token.`);
                fn_err(`The (${ch}) is an invalid token.`);
            }
            pa = ch;
        }
        fn_clearBuffer();

        console.log(_txt);
        console.log(_tokens);
    };
    //#endregion


    fn_tokenize('(-200--100)/-+2');

}
