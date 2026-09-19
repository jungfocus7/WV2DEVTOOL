/**
 * 공통적으로 처리하는 방식의 에러처리
 * @param {string} msg
 */
export const fn_err = (msg) => {
    throw new Error(msg);
    // throw msg;
};

/**
 * (문자열 tgs에 ch가 포함되면 true), (ch가 undefined면 true)
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

/**
 * (문자열 tgs에 ch가 포함되면 true), (ch가 undefined면 true)
 * @param {string} ptg
 * @param {boolean} bp
 * @param {string} pc
 * @param {string} ntg
 * @param {boolean} bn
 * @param {string} nc
 * @returns
 */
export const fn_indexOfDual = (ptg, bp, pc, ntg, bn, nc) => {
    return fn_includes(ptg, bp, pc)
        && fn_includes(ntg, bn, nc);
};

/**
 * (문자열 tg가 ch와 같은면 true), (ch가 undefined면 true)
 * @param {string} tg target
 * @param {boolean} bu bool undefined
 * @param {string} ch char
 * @returns
 */
export const fn_equals = (tg, bu, ch) => {
    if (typeof tg === 'string') {
        if (bu) {
            return (undefined === ch) || (tg === ch);
        } else {
            return (tg === ch);
        }
    } else {
        return false;
    }
};
