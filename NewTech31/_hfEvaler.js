import {
    fn_err,
    fn_includes,
    fn_equals,
    fn_undefined,
} from "./_hfBaseMod.js";


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 00)
//#endregion

//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 01)
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
     * 수집용 OP
     * @type {string[]}
     */
    const _ops = [];
    /**
     * 수집용 NumVal
     * @type {number[]}
     */
    const _vals = [];
    /**
     * @type {number[]}
     */
    const _gmks = [];

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
    let _pch = undefined;
    /**
     * Current Char
     * @type {string}
     */
    let _cch = undefined;
    /**
     * Next Char
     * @type {string}
     */
    let _nch = undefined;
    /**
     * 진행 상태
     * @type {number}
     */
    let _wg = 0;
    /**
     * ???
     * @type {number}
     */
    let _rdv = 0.0;

    /**
     * 정상적인 문자인지 확인
     */
    const fn_reset = () => {
        _tokens.length = 0;
        _buff.length = 0;
        _ops.length = 0;
        _vals.length = 0;
        _gmks.length = 0;
        _txt = null;
        _len = 0;
        _pch = undefined;
        _cch = undefined;
        _nch = undefined;
        _wg = 0;
    };
//#endregion
