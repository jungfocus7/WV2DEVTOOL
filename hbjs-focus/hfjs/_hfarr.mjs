import { hfnum } from "./_hfnum.mjs";


/**
 * 배열객체가 유효하지 않다. 확인
 * @param {any[]} arr
 * @returns
 */
const fn_isEmpty = (arr) => {
    if (Array.isArray(arr)) {
        return arr.length === 0;
    } else {
        return true;
    }
};

/**
 * 배열객체 유효성 확인
 * @param {any[]} arr
 * @returns
 */
const fn_notEmpty = (arr) => {
    if (Array.isArray(arr)) {
        return arr.length > 0;
    } else {
        return false;
    }
};

/**
 * 배열에 요소 확인
 * @param {any[]} arr
 * @param {any} te
 * @returns
 */
const fn_contains = (arr, te) => {
    if (fn_isEmpty(arr)) return false;

    let tb = false;
    const l = arr.length
    for (let i = 0; i < l; i++) {
        if (arr[i] === te) {
            tb = true;
            break;
        }
    }

    return tb;
};

/**
 * 배열 섞기
 * @param {any[]} arr
 * @returns
 */
const fn_shuffle = (arr) => {
    if (fn_isEmpty(arr)) return null;

    const l = arr.length;
    for (let i = 0; i < l; i++) {
        let te = arr[i];
        let ti = hfnum.fn_randRange(0, l - 1);
        arr[i] = arr[ti];
        arr[ti] = te;
    }

    return arr;
};

/**
 * 배열 복사
 * @param {any[]} arr
 * @returns
 */
const fn_copy = (arr) => {
    if (fn_isEmpty(arr)) return null;

    return arr.slice();
};


export const hfarr = Object.freeze({
    fn_isEmpty, fn_notEmpty,
    fn_contains, fn_shuffle,
    fn_copy,
});
