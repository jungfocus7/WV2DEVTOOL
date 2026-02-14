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

