const _cerr = new Error('');
/**
 * msg를 공통적으로 처리하는 error함수
 * @param {string} msg
 */
export const fn_err = (msg) => {
    // throw new Error(msg);
    // throw msg;
    _cerr.message = msg;
    if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(_cerr, fn_err);
    }

    throw _cerr;
};

/**
 * @param {number} ms
 * @returns
 */
export const fn_delay = (ms) => {
    return new Promise((resolve, reject) => {
        if (ms <= 3000)
            globalThis.setTimeout(resolve, ms);
        else
            globalThis.setTimeout(reject, ms);
    });
};
