//#region `hfnum: 넘버 관련 모듈`
export const hfnum = Object.freeze({
    /**
     * 넘버가 맞는지 확인
     * @param {number} tv
     * @returns
     */
    isNumber: (tv) => {
        return Number.isFinite(tv);
    },

    /**
     * 넘버가 아닌지 확인
     * @param {number} tv
     * @returns
     */
    notNumber: (tv) => {
        return Number.isFinite(tv) === false;
    },

    /**
     * 넘버가 실수인지 확인
     * @param {number} tv
     * @returns
     */
    isFloat: (tv) => {
        return (tv % 1) !== 0;
    },

    /**
     * 넘버가 음수인지 확인
     * @param {number} tv
     * @returns
     */
    isMinus: (tv) => {
        return tv < 0;
    },

    /**
     * 난수 만들기 0~n
     * @param {number} tv
     * @returns
     */
    random: (tv) => {
        return Math.round(Math.random() * (tv - 1));
    },


    /**
     * 난수 만들기 min~max
     * @param {number} min
     * @param {number} max
     * @returns
     */
    randRange: (min, max) => {
        return min + Math.round(Math.random() * (max - min));
    },


    /**
     * 넘버가 홀수인지 확인
     * @param {number} tv
     * @returns
     */
    isOdd: (tv) => {
        return (tv % 2) > 0;
    },


    /**
     * 넘버가 짝수인지 확인
     * @param {number} tv
     * @returns
     */
    isEven: (tv) => {
        return (tv % 2) === 0;
    },

});
//#endregion


//#region `hfstr: 문자열 관련 모듈`
export const hfstr = Object.freeze({
    /**
     * 문자열 사용불가 확인
     * @param {string} str
     * @returns
     */
    isEmpty: (str) => {
        if (typeof str === 'string')
            return str.trim() === '';
        else
            return true;
    },

    /**
     * 문자열 사용가능 확인
     * @param {string} str
     * @returns
     */
    notEmpty: (str) => {
        if (typeof str === 'string')
            return str.trim() !== '';
        else
            return false;
    },

    /**
     * 이름에서 마지막 번호 확인
     * @param {string} str
     * @param {string} token
     * @returns
     */
    getLastNum: (str, token='_') => {
        const ti = str.lastIndexOf(token) + 1;
        return +str.substring(ti);
    },

    /**
     * 문자열 >> ArrayBuffer 변환
     * @param {string} str
     * @returns
     */
    str2Ab: (str) => {
        const l = str.length;
        let tab = new Uint16Array(new ArrayBuffer(l * 2));
        for (let i = 0; i < l; i++) {
            tab[i] = str.charCodeAt(i);
        }
        return tab;
    },

    /**
     * ArrayBuffer >> 문자열 변환
     * @param {Uint16Array} ab
     * @returns
     */
    ab2Str: (ab) => {
        return String.fromCharCode.apply(null, ab);
    },

});
//#endregion


//#region `hfarr: 배열 관련 모듈`
export const hfarr = Object.freeze({
    isEmpty: (arr) => {
        if (Array.isArray(arr))
            return arr.length === 0;
        else
            return true;
    },

    /**
     * 배열객체 유효성 확인
     * @param {any[]} arr
     * @returns
     */
    notEmpty: (arr) => {
        if (Array.isArray(arr))
            return arr.length > 0;
        else
            return false;
    },

    /**
     * 배열에 요소 확인
     * @param {any[]} arr
     * @param {any} te
     * @returns
     */
    contains: (arr, te) => {
        if (hfarr.isEmpty(arr)) return false;

        let tb = false;
        const l = arr.length
        for (let i = 0; i < l; i++) {
            if (arr[i] === te) {
                tb = true;
                break;
            }
        }
        return tb;
    },

    /**
     * 배열 섞기
     * @param {any[]} arr
     * @returns
     */
    shuffle: (arr) => {
        if (hfarr.isEmpty(arr)) return null;

        const l = arr.length;
        for (let i = 0; i < l; i++) {
            let te = arr[i];
            let ti = hfnum.randRange(0, l - 1);
            arr[i] = arr[ti];
            arr[ti] = te;
        }
        return arr;
    },

    /**
     * 배열 복사
     * @param {any[]} arr
     * @returns
     */
    copy: (arr) => {
        if (hfarr.isEmpty(arr)) return null;

        return arr.slice();
    },

});
//#endregion


//#region `hfdtime: 날짜,시간 관련 유틸리티`
export const hfdtime = Object.freeze({
    /**
     * 시간 스탬프 기본
     * @param {Date} td
     * @returns string
     */
    timeStamp: (td) => {
        const df1 = td.getFullYear().toString().substring(2);
        const df2 = (td.getMonth() + 1).toString().padStart(2, '0');
        const df3 = td.getDate().toString().padStart(2, '0');
        const df4 = td.getHours().toString().padStart(2, '0');
        const df5 = td.getMinutes().toString().padStart(2, '0');
        const df6 = td.getSeconds().toString().padStart(2, '0');
        const df7 = td.getMilliseconds().toString().padStart(3, '0');
        // return `${df1}${df2}${df3}${df4}${df5}${df6}${df7}`;
        // return `${df1}-${df2}-${df3} ${df4}:${df5}:${df6}.${df7}`;
        return `${df1}/${df2}/${df3} ${df4}:${df5}:${df6}.${df7}`;
    },

    /**
     * 시간 문자열 포맷으로 만들기
     * @param {string} fs1
     * @param {Date} td
     */
    format: (fs1, td) => {
        const re1 = /\\./g;
        const mc1 = Array.from(fs1.matchAll(re1));

        const len = fs1.length - mc1.length;
        const buf1 = new Uint16Array(new ArrayBuffer(len * 2));

        let i = 0;
        for (const m1 of mc1) {
            const fi = m1.index - i;
            const tv = m1[0];
            const li = tv.length - 1;
            buf1[fi] = tv[li].charCodeAt(0);
            ++i;
        }

        const buf2 = new Uint16Array(new ArrayBuffer(len * 2));
        const ke = fs1.length - 1; i = 0;
        let bp = false;
        for (let k = 0; k <= ke; ++k) {
            const tc = fs1[k];
            if (bp) {
                bp = false;
                buf2[i++] = '\0'.charCodeAt(0);
            }
            else {
                bp = tc === '\\';
                if (bp && (k < ke))
                    continue;
                else
                    buf2[i++] = tc.charCodeAt(0);
            }
        }

        let mrs = String.fromCharCode.apply(null, buf2);
        const re2 = /y+|M+|d+|H+|m+|s+|f+/g;

        const fn_r = (tx, l1) => {
            const l2 = tx.length;
            if (l1 < l2)
                return tx.substring(l2 - l1);
            else if (l1 > l2)
                return tx.padStart(l1, '0');
            return tx;
        };
        const fn_me = (tx, td) => {
            const l1 = tx.length;
            if (tx[0] === 'y')
                return fn_r(td.getFullYear().toString(), l1);
            else if (tx[0] === 'M')
                return fn_r((td.getMonth() + 1).toString(), l1);
            else if (tx[0] === 'd')
                return fn_r(td.getDate().toString(), l1);
            else if (tx[0] === 'H')
                return fn_r(td.getHours().toString(), l1);
            else if (tx[0] === 'm')
                return fn_r(td.getMinutes().toString(), l1);
            else if (tx[0] === 's')
                return fn_r(td.getSeconds().toString(), l1);
            else if (tx[0] === 'f')
                return fn_r(td.getMilliseconds().toString(), l1);
            return tx;
        };

        mrs = mrs.replace(re2, (tx) => {
            return fn_me(tx, td);
        });

        for (i = 0; i < len; ++i) {
            const tc = String.fromCharCode(buf1[i]);
            if (tc === '\0')
                buf1[i] = mrs[i].charCodeAt(0);
        }

        const res = String.fromCharCode.apply(null, buf1);
        return res;
    },

});
//#endregion


export const hfEventTypes = Object.freeze({
    // Base
    BLUR: 'blur',
    RESIZE: 'resize',
    SCROLL: 'scroll',
    FOCUS_OUT: 'focusout',
    FOCUS_IN: 'focusin',
    FOCUS: 'focus',

    // Mouse
    MOUSE_MOVE: 'mousemove',
    MOUSE_UP: 'mouseup',
    MOUSE_DOWN: 'mousedown',
    MOUSEWHEEL: 'mousewheel',
    CLICK: 'click',

    // Custom
    UPDATE: 'update',
    END: 'end',
});


/**
 * DebugConsole
 */
export const dcs = Object.seal({
    /**
     * 로그 사용여부
     */
    isLog: true,

    /**
     * 로그 기본
     * @param {...any} args
     */
    log: (...args) => {
        if (dcs.isLog)
            console.log.apply(null, args);
    },

    /**
     * 로그 메세지
     * @param {string} msg
     */
    msg: (msg) => {
        if (dcs.isLog)
            console.log(msg);
    }

});


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ [31) 스타일 관련]
/**
 * 넘버인지 확인후 반환
 * @param {number | string} tv
 * @param {number} dv
 * @returns {number}
 */
const fn_checkNumber = (tv, dv=0) => {
    let rv = NaN;
    if (typeof tv === 'number')
        rv = tv;
    else if (typeof tv === 'string')
        rv = +tv;

    if (Number.isFinite(rv))
        return rv;
    else
        return dv;
};

/**
 * HTMLElement 스타일 객체 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {boolean} bw writeable
 * @returns {CSSStyleDeclaration}
 */
const fn_getStyle = (to, bw=false) => {
    if (to instanceof CSSStyleDeclaration)
        return to;
    else if (to instanceof HTMLElement) {
        if (bw)
            return to.style;
        else
            return getComputedStyle(to);
    }
    else
        return null;
};

/**
 * HTMLElement width(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {number}
 */
const fn_getWidth = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tv = csd.getPropertyValue('width');
        return fn_checkNumber(tv);
    }
    else return 0;
};

/**
 * HTMLElement width(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv
 */
const fn_setWidth = (to, tv) => {
    const csd = fn_getStyle(to, true);
    if (csd) {
        tv = fn_checkNumber(tv);
        csd.setProperty('width', `${tv}px`);
    }
};


/**
 * HTMLElement height(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {number}
 */
const fn_getHeight = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tv = csd.getPropertyValue('height');
        return fn_checkNumber(tv);
    }
    else return 0;
};

/**
 * HTMLElement height(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv
 */
const fn_setHeight = (to, tv) => {
    const csd = fn_getStyle(to, true);
    if (csd) {
        tv = fn_checkNumber(tv);
        csd.setProperty('height', `${tv}px`);
    }
};

/**
 * HTMLElement left(Number) 가져오기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {number}
 */
const fn_getLeft = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tv = csd.getPropertyValue('left');
        return fn_checkNumber(tv);
    }
    else return 0;
};

/**
 * HTMLElement left(Number) 설정하기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv
 */
const fn_setLeft = (to, tv) => {
    const csd = fn_getStyle(to, true);
    if (csd) {
        tv = fn_checkNumber(tv);
        csd.setProperty('left', `${tv}px`);
    }
};

/**
 * HTMLElement top(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {number}
 */
const fn_getTop = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tv = csd.getPropertyValue('top');
        return fn_checkNumber(tv);
    }
    else return 0;
};

/**
 * HTMLElement top(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv
 */
const fn_setTop = (to, tv) => {
    const csd = fn_getStyle(to, true);
    if (csd) {
        tv = fn_checkNumber(tv);
        csd.setProperty('top', `${tv}px`);
    }
};

/**
 * HTMLElement Rect 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {DOMRect}
 */
const fn_getRect = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tx = fn_getLeft(csd);
        let ty = fn_getTop(csd);
        let tw = fn_getWidth(csd);
        let th = fn_getHeight(csd);
        let rct = new DOMRect(tx, ty, tw, th);
        return rct;
    }
    else return null;
};

/**
 * HTMLElement Rect 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {DOMRect} rct
 * @returns {DOMRect}
 */
const fn_updateRect = (to, rct) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tw = fn_getWidth(csd);
        let th = fn_getHeight(csd);
        let tx = fn_getLeft(csd);
        let ty = fn_getTop(csd);
        rct.width = tw;
        rct.height = th;
        rct.x = tx;
        rct.y = ty;
    }
};

export const hfStyleHelper = Object.seal({
    checkNumber: fn_checkNumber,
    getStyle: fn_getStyle,
    getWidth: fn_getWidth,
    setWidth: fn_setWidth,
    getHeight: fn_getHeight,
    setHeight: fn_setHeight,
    getLeft: fn_getLeft,
    setLeft: fn_setLeft,
    getTop: fn_getTop,
    setTop: fn_setTop,
    getRect: fn_getRect,
    updateRect: fn_updateRect,
});
//#endregion

