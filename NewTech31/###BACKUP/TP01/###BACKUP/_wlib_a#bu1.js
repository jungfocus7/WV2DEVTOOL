/**
 * 에러 처리
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

/**
 * Check Current Characters
 * [()/*+-.0123456789]
 * @param {string} cc (current char)
 * @param {boolean} bp (boolean prev undefined)
 * @param {string} pc (prev char)
 * @param {boolean} bn (boolean next undefined)
 * @param {string} nc (next char)
 * @returns
 */
export const fn_checkCharacters = (cc, bp, pc, bn, nc) => {
    if (typeof cc !== 'string') {
        fn_err('Incorrect cc value.');
    }

    let br = false;
    switch (cc) {
        case '(': {
            br = fn_indexOfDual(
                '(/*+-', bp, pc,
                '(-0123456789', bn, nc
            );
            break;
        }
        case ')': {
            br = fn_indexOfDual(
                ')0123456789', bp, pc,
                ')/*+-', bn, nc
            );
            break;
        }
        case '/': {
            br = fn_indexOfDual(
                ')0123456789', bp, pc,
                '(-0123456789', bn, nc
            );
            break;
        }
        case '*': {
            br = fn_indexOfDual(
                ')0123456789', bp, pc,
                '(-0123456789', bn, nc
            );
            break;
        }
        case '+': {
            br = fn_indexOfDual(
                ')0123456789', bp, pc,
                '(-0123456789', bn, nc
            );
            break;
        }
        case '-': {
            br = (
                fn_indexOfDual(
                    '()0123456789', bp, pc,
                    '(0123456789', bn, nc
                ) ||
                fn_indexOfDual(
                    '/*+-', bp, pc,
                    '(0123456789', bn, nc
                ) ||
                (
                    fn_includes(')0123456789', bp, pc) &&
                    fn_equals('-', bn, nc)
                )
            );
            break;
        }
        case '.': {
            br = fn_indexOfDual(
                '0123456789', bp, pc,
                '0123456789', bn, nc
            );
            break;
        }
        default: {
            if (fn_includes('0123456789', false, cc)) {
                br = fn_indexOfDual(
                    '(/*+-.0123456789', bp, pc,
                    ')/*+-.0123456789', bn, nc
                );
            }
        }
    }

    return br;
};

/**
 * Check Number Characters
 * [2.0123456789]
 * @param {string} cc (current char)
 * @param {string[]} buff (buffer of numbers)
 * @param {string} pc (prev char)
 * @param {string} nc (next char)
 * @returns
 */
export const fn_isNumChar = (cc, buff, pc, nc) => {
    if (typeof cc !== 'string') {
        fn_err('Incorrect cc value.');
    }

    if (Array.isArray(buff) === false) {
        fn_err('Invalid buffer.');
    }

    let br = false;
    if (fn_equals('.', false, cc)) {
        br = (
            (buff.indexOf('.') === -1) &&
            fn_indexOfDual(
                '0123456789', false, pc,
                '0123456789', false, nc
            )
        );
    } else if (fn_includes('0123456789', false, cc)) {
        br = (
            fn_indexOfDual(
                '0123456789', true, pc,
                '0123456789', true, nc
            )
        );
    }

    return br;
};


{//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const COLOR_RESET = '\x1b[0m';
    const COLOR_GREEN = '\x1b[32m';
    const COLOR_RED = '\x1b[31m';

    /**
     * @param {string} wo
     */
    const fn_fakeRun = (wo) => {
        let br = fn_checkCharacters(wo[1], true, wo[0], true, wo[2]);
        if (br) {
            console.log(`${COLOR_GREEN}[SUCCESS]> ${wo}, ${br}${COLOR_RESET}`);
        } else {
            console.log(`${COLOR_RED}[ERROR]> ${wo}, ${br}${COLOR_RESET}`);
        }
    };

    const __allChars = '()/*+-.0123456789';
    for (let ca of __allChars) {
        for (let cb of __allChars) {
            for (let cc of __allChars) {
                let wo = ca + cb + cc;
                fn_fakeRun(wo);
            }
        }
    }

}
