/**
 * Equals And
 * @param {string} ptg
 * @param {string} pc
 * @param {string} ntg
 * @param {string} nc
 * @returns
 */
const fn_indexOfDual = (ptg, pc, ntg, nc) => {
    return (ptg.indexOf(pc) > -1)
        && (ntg.indexOf(nc) > -1);
};

/**
 * taget string includes
 * @param {string} tgs
 * @param {string} ch
 */
const fn_includes = (tgs, ch) => {
    return tgs.indexOf(ch) > -1;
};

/**
 * taget string includes
 * @param {string} tg
 * @param {string} ch
 */
const fn_equals = (tg, ch) => {
    return tg === ch;
};

/**
 * Check Current Character
 * ??? [()/*+-.0123456789]
 * @param {string} cc
 * @param {string} pc
 * @param {string} nc
 * @returns
 */
export const fn_checkCurrent = (cc, pc, nc) => {
    let br = false;
    switch (cc) {
        case '(': {
            br = fn_indexOfDual(
                '(/*+-', pc,
                '(-0123456789', nc
            );
            break;
        }
        case ')': {
            br = fn_indexOfDual(
                ')0123456789', pc,
                ')/*+-', nc
            );
            break;
        }
        case '/': {
            br = fn_indexOfDual(
                ')0123456789', pc,
                '(-0123456789', nc
            );
            break;
        }
        case '*': {
            br = fn_indexOfDual(
                ')0123456789', pc,
                '(-0123456789', nc
            );
            break;
        }
        case '+': {
            br = fn_indexOfDual(
                ')0123456789', pc,
                '(-0123456789', nc
            );
            break;
        }
        case '-': {
            br = (
                fn_indexOfDual(
                    '()0123456789', pc,
                    '(0123456789', nc
                ) ||
                fn_indexOfDual(
                    '/*+-', pc,
                    '(0123456789', nc
                ) ||
                (
                    fn_includes(')0123456789', pc) &&
                    fn_equals('-', nc)
                )
            );
            break;
        }
        case '.': {
            br = fn_indexOfDual(
                '0123456789', pc,
                '0123456789', nc
            );
            break;
        }
        default: {
            if (fn_includes('0123456789', cc)) {
                br = fn_indexOfDual(
                    '(/*+-.0123456789', pc,
                    ')/*+-.0123456789', nc
                );
            }
        }
    }
    return br;
};
