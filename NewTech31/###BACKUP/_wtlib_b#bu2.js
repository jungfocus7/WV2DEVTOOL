/**
 * 공통적으로 처리하는 방식의 에러처리
 * @param {string} msg
 */
export const fn_err = (msg) => {
    throw new Error(msg);
    // throw msg;
};

/**
 * (undefined === ch) || (tgs === ch)
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
 * (undefined === ch) || (tgs.indexOf(ch) > -1)
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

/**
 * fn_includes 두개가 만족하는지 여부
 * @param {string} ptgs (prev target string)
 * @param {boolean} bpu (bool prev undefined equals)
 * @param {string} pch (prev char)
 * @param {string} ntgs (next target string)
 * @param {boolean} bnu (bool next undefined equals)
 * @param {string} nch (next char)
 * @returns
 */
export const fn_indexOfDual = (ptgs, bpu, pch, ntgs, bnu, nch) => {
    return fn_includes(ptgs, bpu, pch) && fn_includes(ntgs, bnu, nch);
};

/**
 * Check Current Character
 * ??? [()/*+-.0123456789]
 * @param {string} cch
 * @param {string} pch
 * @param {string} nch
 * @returns
 */
export const fn_checkCharacters = (cch, pch, nch) => {
    let br = false;
    switch (cch) {
        case '(': {
            br = fn_indexOfDual(
                '(/*+-', true, pch,
                '(-0123456789', false, nch
            );
            if (false === br) {
                // fn_err(`[${pch},${cch},${nch}]; Invalid tokens.`);
            } else {
                // _wg++;
            }
            break;
        }
        case ')': {
            br = fn_indexOfDual(
                ')0123456789', false, pch,
                ')/*+-', true, nch
            );
            if (false === br) {
                // fn_err(`[${pch},${cch},${nch}]; Invalid tokens.`);
            } else {
                // _wg--;
            }
            break;
        }
        case '/': {
            br = fn_indexOfDual(
                ')0123456789', false, pch,
                '(-0123456789', false, nch
            );
            if (false === br) {
                // fn_err(`[${pch},${cch},${nch}]; Invalid tokens.`);
            }
            break;
        }
        case '*': {
            br = fn_indexOfDual(
                ')0123456789', false, pch,
                '(-0123456789', false, nch
            );
            if (false === br) {
                // fn_err(`[${pch},${cch},${nch}]; Invalid tokens.`);
            }
            break;
        }
        case '+': {
            br = fn_indexOfDual(
                ')0123456789', false, pch,
                '(-0123456789', false, nch
            );
            if (false === br) {
                // fn_err(`[${pch},${cch},${nch}]; Invalid tokens.`);
            }
            break;
        }
        case '-': {
            br = (
                fn_indexOfDual(
                    '()0123456789', true, pch,
                    '(0123456789', false, nch
                ) ||
                fn_indexOfDual(
                    '/*+-', true, pch,
                    '(0123456789', false, nch
                ) ||
                (
                    fn_includes(')0123456789', false, pch) &&
                    fn_equals('-', false, nch)
                )
            );
            if (false === br) {
                // fn_err(`[${pch},${cch},${nch}]; Invalid tokens.`);
            }
            break;
        }
        default: {
            if (fn_includes('0123456789', false, cch)) {
                if (undefined === pch) {
                    br = fn_includes('/*+-0123456789.', true, nch);
                } else if (undefined === nch) {
                    br = fn_includes('/*+-0123456789.', true, pch);
                } else if ('.' === pch) {
                    br = fn_includes(')/*+-0123456789', true, nch);
                } else if ('.' === nch) {
                    br = fn_includes('(/*+-0123456789', true, pch);
                } else {
                    br = fn_indexOfDual(
                        '(/*+-0123456789.', false, pch,
                        ')/*+-0123456789.', false, nch
                    );
                }
                if (false === br) {
                    // fn_err(`[${pch},${cch},${nch}]; Invalid tokens.`);
                }
            } else if (fn_equals('.', false, cch)) {
                br = fn_indexOfDual(
                    '0123456789', false, pch,
                    '0123456789', false, nch
                );
                if (false === br) {
                    // fn_err(`[${pch},${cch},${nch}]; Invalid tokens.`);
                }
            }
        }
    }

    return br;
};
