let _bUsed = true;

/**
 * hf debug console
 */
export const hfdc = Object.freeze({
    /**
     * ??
     * @param {boolean} tv
     */
    fn_used(tv) {
        if (typeof tv === 'boolean') {
            _bUsed = tv;
        } else {
            return _bUsed;
        }
    },

    /**
     * 로그 기본
     * @param {...any} args
     */
    fn_log: (...args) => {
        if (_bUsed) {
            console.log.apply(null, args);
        }
    },

    /**
     * 로그 메세지
     * @param {string} msg
     */
    fn_msg: (msg) => {
        if (_bUsed) {
            console.log(msg);
        }
    }

});
