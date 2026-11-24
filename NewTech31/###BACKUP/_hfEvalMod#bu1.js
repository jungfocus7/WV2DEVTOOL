import {
    fn_err,
    fn_includes,
    fn_equals,
    fn_undefined,
} from "./_hfBaseMod.js";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Check Current Character
 * ??? [()/*+-.0123456789]
 * @param {string} cch
 * @param {string} pch
 * @param {string} nch
 * @returns {string}
 */
export const fn_checkCharacters = (cch, pch, nch) => {
    let rem = 'error';
    switch (cch) {
        case '(': {
            if (
                fn_includes('(/*+-', true, pch) &&
                fn_includes('(-0123456789', false, nch)
            ) {
                rem = 'yes';
            } else {
                rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
            }
            break;
        }
        case ')': {
            if (
                fn_includes(')0123456789', false, pch) &&
                fn_includes(')/*+-', true, nch)
            ) {
                rem = 'yes';
            } else {
                rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
            }
            break;
        }
        case '/': {
            if (
                fn_includes(')0123456789', false, pch) &&
                fn_includes('(-0123456789', false, nch)
            ) {
                rem = 'yes';
            } else {
                rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
            }
            break;
        }
        case '*': {
            if (
                fn_includes(')0123456789', false, pch) &&
                fn_includes('(-0123456789', false, nch)
            ) {
                rem = 'yes';
            } else {
                rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
            }
            break;
        }
        case '+': {
            if (
                fn_includes(')0123456789', false, pch) &&
                fn_includes('(-0123456789', false, nch)
            ) {
                rem = 'yes';
            } else {
                rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
            }
            break;
        }
        case '-': {
            if (
                (
                    fn_includes('()0123456789', true, pch) &&
                    fn_includes('(0123456789', false, nch)
                ) ||
                (
                    fn_includes('/*+-', true, pch) &&
                    fn_includes('(0123456789', false, nch)
                ) ||
                (
                    fn_includes(')0123456789', false, pch) &&
                    fn_equals('-', false, nch)
                )
            ) {
                rem = 'yes';
            } else {
                rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
            }
            break;
        }
        default: {
            if (fn_includes('0123456789', false, cch)) {
                if (undefined === pch) {
                    if (fn_includes('/*+-0123456789.', true, nch)) {
                        rem = 'yes';
                    } else {
                        rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
                    }
                } else if (undefined === nch) {
                    if (fn_includes('/*+-0123456789.', true, pch)) {
                        rem = 'yes';
                    } else {
                        rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
                    }
                } else if ('.' === pch) {
                    if (fn_includes(')/*+-0123456789', true, nch)) {
                        rem = 'yes';
                    } else {
                    }
                } else if ('.' === nch) {
                    if (fn_includes('(/*+-0123456789', true, pch)) {
                        rem = 'yes';
                    } else {
                        rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
                    }
                } else {
                    if (
                        fn_includes('(/*+-0123456789.', false, pch) &&
                        fn_includes(')/*+-0123456789.', false, nch)
                    ) {
                        rem = 'yes';
                    } else {
                        rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
                    }
                }
            } else if (fn_equals('.', false, cch)) {
                if (
                    fn_includes('0123456789', false, pch) &&
                    fn_includes('0123456789', false, nch)
                ) {
                    rem = 'yes';
                } else {
                    rem = `[${pch},${cch},${nch}]; Invalid tokens.`;
                }
            }
        }
    }

    return rem;
};

/**
 * 정상적인 NumberCharacter 문자인지 확인
 * [987.0123456]
 * @param {string} cch
 * @param {string[]} buff
 * @param {string} pch
 * @param {string} nch
 * @returns {string}
 */
export const fn_checkNumChar = (cch, buff, pch, nch) => {
    let rem = 'error';
    if (fn_equals('-', false, cch)) {
        if (buff.length === 0) {
            if (
                fn_includes('(/*+-', true, pch) &&
                fn_includes('0123456789', false, nch)
            ) {
                rem = 'yes';
            } else {
                rem = `error`;
            }
        }
    } else if (fn_includes('0123456789', false, cch)) {
        if (fn_includes('(/*+-0123456789', true, pch)) {
            if (fn_includes(')/*+-0123456789.', true, nch)) {
                rem = 'yes';
            } else {
                rem = `error`;
            }
        } else if (fn_equals('.', false, pch)) {
            if (fn_includes(')/*+-0123456789', true, nch)) {
                rem = 'yes';
            } else {
                rem = `error`;
            }
        }
    } else if (fn_equals('.', false, cch)) {
        if (buff.indexOf('.') === -1) {
            if (
                fn_includes('0123456789', false, pch) &&
                fn_includes('0123456789', false, nch)
            ) {
                rem = 'yes';
            } else {
                rem = `error`;
            }
        }
    }

    return rem;
};
