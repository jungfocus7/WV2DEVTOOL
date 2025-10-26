/**
 * 타이틀 케이스로 변경해줍니다.
 * @param {string} str
 * @returns
 */
const fn_titleCase = (str) => {
    return str.replace(/\w\S*/g,
        (tx) => {
            // return tx.charAt(0).toUpperCase() + tx.substr(1).toLowerCase();
            const ty = tx.charAt(0);
            const tz = tx.substring(1);
            return ty.toUpperCase() + tz.toLowerCase();
        });
};


fn_titleCase()
