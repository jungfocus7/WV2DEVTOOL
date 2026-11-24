/**
 * Check Number
 * @param {number} tv
 */
const fn_cknb = (tv) => {
    if (Number.isFinite(tv) === false) {
        throw `Invalid argument, not a number.`;
    }
};

/**
 * Check Numbers
 * @param {...number} tva
 */
const fn_cknbs = (...tva) => {
    for (let tv of tva) {
        fn_cknb(tv);
    }
};

/**
 * 넘버가 유효한지 확인
 * @param {number} tv
 * @returns
 */
const fn_isNumber = (tv) => {
    return Number.isFinite(tv);
};

/**
 * 넘버가 아닌지 확인
 * @param {number} tv
 * @returns
 */
const fn_notNumber = (tv) => {
    return Number.isFinite(tv) === false;
};

/**
 * 넘버가 실수인지 확인
 * @param {number} tv
 * @returns
 */
const fn_isFloat = (tv) => {
    fn_cknb(tv);

    return (tv % 1) !== 0;
};

/**
 * 넘버가 음수인지 확인
 * @param {number} tv
 * @returns
 */
const fn_isMinus = (tv) => {
    fn_cknb(tv);

    return tv < 0;
};

/**
 * 난수 만들기 0~n
 * @param {number} tv
 * @returns
 */
const fn_random = (tv) => {
    fn_cknb(tv);

    return Math.floor(Math.random() * tv);
};

/**
 * 난수 만들기 min~max
 * @param {number} min
 * @param {number} max
 * @returns
 */
const fn_randRange = (min, max) => {
    fn_cknbs(min, max);

    let t1 = Math.random() * (max - min + 1);
    return min + Math.floor(t1);
};

/**
 * 넘버가 홀수인지 확인
 * @param {number} tv
 * @returns
 */
const fn_isOdd = (tv) => {
    fn_cknbs(tv);

    return (tv % 2) !== 0;
};

/**
 * 넘버가 짝수인지 확인
 * @param {number} tv
 * @returns
 */
const fn_isEven = (tv) => {
    fn_cknbs(tv);

    return (tv % 2) === 0;
};

/**
 * 값을 특정 범위(Begin ~ End) 내로 제한하는 함수
 * @param {number} bv Begin Value
 * @param {number} ev End Value
 * @param {number} cv Current Value
 * @returns
 */
const fn_clamp = (bv, ev, cv) => {
    fn_cknbs(bv, ev, cv);

    if (cv < bv) {
        return bv;
    } else if (cv > ev) {
        return ev;
    } else {
        return cv;
    }
};


export const hfnum = Object.freeze({
    fn_isNumber,
    fn_notNumber,
    fn_isFloat,
    fn_isMinus,
    fn_random,
    fn_randRange,
    fn_isOdd,
    fn_isEven,
    fn_clamp,
});
