/**
 * hf debug console
 */
export const hfdc = Object.seal({
    /**
     * 로그 사용여부
     */
    isLog: true,

    /**
     * 로그 기본
     * @param {...any} args
     */
    fn_log: (...args) => {
        if (hfdc.isLog) {
            console.log.apply(null, args);
        }
    },

    /**
     * 로그 메세지
     * @param {string} msg
     */
    fn_msg: (msg) => {
        if (hfdc.isLog) {
            console.log(msg);
        }
    }

});
