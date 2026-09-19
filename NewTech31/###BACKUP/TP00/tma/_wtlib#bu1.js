/**
 * Equals And
 * @param {string} ptg
 * @param {string} pc
 * @param {string} ntg
 * @param {string} nc
 * @returns
 */
const fn_eqa = (ptg, pc, ntg, nc) => {
    return (ptg.indexOf(pc) > -1)
        && (ntg.indexOf(nc) > -1);
};

/**
 * Check Current Character
 * ??? [()/*+-.0123456789]
 * @param {string} cc
 * @param {string} pc
 * @param {string} nc
 * @returns
 */
export const fn_chkcc = (cc, pc, nc) => {
    let br = false;
    switch (cc) {
        case '(': {
            br = ('(/*+-'.indexOf(pc) > -1) &&
                ('(-0123456789'.indexOf(nc) > -1);
            break;
        }
        case ')': {
            br = (')0123456789'.indexOf(pc) > -1) &&
                (')/*+-'.indexOf(nc) > -1);
            break;
        }
        case '/': {
            br = (')0123456789'.indexOf(pc) > -1) &&
                ('(-0123456789'.indexOf(nc) > -1);
            break;
        }
        case '*': {
            br = (')0123456789'.indexOf(pc) > -1) &&
                ('(-0123456789'.indexOf(nc) > -1);
            break;
        }
        case '+': {
            br = (')0123456789'.indexOf(pc) > -1) &&
                ('(-0123456789'.indexOf(nc) > -1);
            break;
        }
        case '-': {
            br = (
                (')0123456789'.indexOf(pc) > -1) &&
                ('(0123456789'.indexOf(nc) > -1)
            ) || (
                ('/*+-'.indexOf(pc) > -1) &&
                ('(0123456789'.indexOf(nc) > -1)
            ) || (
                (')0123456789'.indexOf(pc) > -1) &&
                ('-' === nc)
            );
            break;
        }
        case '.': {
            br = ('0123456789'.indexOf(pc) > -1) &&
                ('0123456789'.indexOf(nc) > -1);
            break;
        }
        default: {
            // console.log('무조건 실행됨?', br, pc, cc, nc);
            if ('0123456789'.indexOf(cc)) {
                br = ('(/*+-.0123456789'.indexOf(pc) > -1) &&
                    (')/*+-.0123456789'.indexOf(nc) > -1);
            }
        }
    }

    // if (br === false) {
    //     if ('0123456789'.indexOf(cc)) {
    //         br = ('0123456789'.indexOf(pc) > -1) &&
    //             ('0123456789'.indexOf(nc) > -1);
    //     }
    // }

    return br;
};

