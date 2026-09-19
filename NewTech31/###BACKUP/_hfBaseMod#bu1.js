/**
 * msg를 공통적으로 처리하는 error함수
 * @param {string} msg
 */
export const fn_err = (msg) => {
    // throw new Error(msg);
    throw msg;
};

/**
 * tgs에 ch가 포함되는지 확인하고, (bu가 true이면 (undefined === ch) 허용)
 * @param {string} tgs (target string)
 * @param {boolean} bu (bool current undefined equals)
 * @param {string} ch (current char)
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

// /**
//  * fn_includes 두개가 만족하는지 여부확인
//  * @param {string} ptgs (prev target string)
//  * @param {boolean} bpu (bool prev undefined equals)
//  * @param {string} pch (prev char)
//  * @param {string} ntgs (next target string)
//  * @param {boolean} bnu (bool next undefined equals)
//  * @param {string} nch (next char)
//  * @returns
//  */
// export const fn_indexOfDual = (ptgs, bpu, pch, ntgs, bnu, nch) => {
//     return fn_includes(ptgs, bpu, pch) && fn_includes(ntgs, bnu, nch);
// };

/**
 * tgs와 ch가 같은지 확인하고, (bu가 true이면 (undefined === ch) 허용)
 * @param {string} tgs (target string)
 * @param {boolean} bu (bool undefined equals)
 * @param {string} ch (current char)
 * @returns
 */
export const fn_equals = (tgs, bu, ch) => {
    if (typeof tgs === 'string') {
        if (bu) {
            return (undefined === ch) || (tgs === ch);
        } else {
            return (tgs === ch);
        }
    } else {
        return false;
    }
};

/**
 * target이 undefined인지 확인
 * @param {string} ch (target string)
 * @returns
 */
export const fn_undefined = (ch) => {
    return (undefined === ch);
};

/**
 * @param {string} ch
 * @returns
 */
export const fn_convert3 = (ch) => {
    return (undefined === ch) ? '|' : ch;
};
