/**
 * 에러 처리
 * @param {string} msg
 */
export const fn_err = (msg) => {
    // throw new Error(msg);
    throw msg;
};

/**
 * 문자열이 undefined를 포함하여 ch와 같은지 확인
 * @param {string} tg target
 * @param {string} ch char
 * @returns
 */
export const fn_equals = (tg, ch) => {
    if (typeof tg === 'string') {
        return tg === ch;
    } else {
        return false;
    }
};

/**
 * 문자열에 undefined를 포함하여 ch가 존재하는지 확인
 * @param {string} tgs target string
 * @param {boolean} bu undefined include
 * @param {string} ch char
 * @returns
 */
export const fn_includes = (tgs, bu, ch) => {
    if (typeof tgs === 'string') {
        if (bu) {
            return (undefined === ch) || (tgs.indexOf(ch) > -1);
        } else {
            return tgs.indexOf(ch) > -1;
        }
    } else {
        return false;
    }
};
