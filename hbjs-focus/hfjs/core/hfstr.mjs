/**
 * 문자열 사용불가 확인
 * @param {string} str
 * @returns
 */
const fn_isEmpty = (str) => {
    if (typeof str === 'string')
        return str.trim() === '';
    else
        return true;
};

/**
 * 문자열 사용가능 확인
 * @param {string} str
 * @returns
 */
const fn_notEmpty = (str) => {
    if (typeof str === 'string')
        return str.trim() !== '';
    else
        return false;
};

/**
 * 이름에서 마지막 번호 확인
 * @param {string} str
 * @param {string} tk
 * @returns
 */
const fn_getLastNum = (str, tk='_') => {
    const ti = str.lastIndexOf(tk) + 1;
    return +str.substring(ti);
};

const _encoder = new TextEncoder();
/**
 * 문자열 >> ArrayBuffer 변환
 * @param {string} str
 * @returns
 */
const fn_str2Ab = (str) => {
    return _encoder.encode(str);
};

const _decoder = new TextDecoder('utf-8', {fatal: true});
/**
 * ArrayBuffer >> 문자열 변환
 * @param {Uint8Array} ab
 * @returns
 */
const fn_ab2Str = (ab) => {
    return _decoder.decode(ab);
};


export const hfstr = Object.freeze({
    fn_isEmpty, fn_notEmpty,
    fn_getLastNum,
    fn_str2Ab, fn_ab2Str,
});
