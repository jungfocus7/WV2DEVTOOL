//#region `hfnum: 넘버 관련 모듈`
const hfnum = Object.freeze({
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
const hfstr = Object.freeze({
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
const hfarr = Object.freeze({
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
        const l = arr.length;
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
const hfdtime = Object.freeze({
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


/**
 * DebugConsole
 */
const dcs = Object.seal({
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

Object.seal({
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

//#region `hfCountTask: `
class hfCountTask {
    /**
     * 카운트 연산하기
     * @param {number} begin
     * @param {number} end
     * @param {number} add
     */
    constructor(begin=1, end=10, add=1) {
        const md = this.#md;
        md.begin = begin;
        md.end = end;
        md.add = Math.abs(Math.round(add));
        md.now = begin;
        Object.seal(this);
    }
    #md = Object.seal({
        begin: 0, end: 0, add: 0, now: 0
    });

    get begin() {
        return this.#md.begin;
    }

    get end() {
        return this.#md.end;
    }

    get add() {
        return this.#md.add;
    }

    get now() {
        return this.#md.now;
    }


    /**
     * 이전 단계
     * @returns boolean
     */
    prev() {
        const md = this.#md;
        const tc = md.now - md.add;
        if (tc < md.begin)
            return false;
        else {
            md.now = tc;
            return true;
        }
    }

    /**
     * 다음 단계
     * @returns boolean
     */
    next() {
        const md = this.#md;
        const tc = md.now + md.add;
        if (tc > md.end)
            return false;
        else {
            md.now = tc;
            return true;
        }
    }

    /**
     * 리셋 하기
     */
    /**
     * 리셋 하기
     * @param {boolean} bEnd end로 reset 여부
     */
    reset(bEnd=false) {
        const md = this.#md;
        if (bEnd)
            md.now = md.end;
        else
            md.now = md.begin;
    }

}
Object.freeze(hfCountTask);
//#endregion

//#region `hfNumberRanger: `
class hfNumberRanger {
    /**
     * Number를 min, len, max 기준점으로 안전한 범위관리
     * @param {number} min
     * @param {number} len
     */
    constructor(min=0, len=10) {
        this.#min = min;
        this.#len = (len < 1) ? 1 : len;
        this.#max = (this.#min - 1) + this.#len;
        this.#now = this.#min;
        Object.seal(this);
    }

    #min = 0;
    get min() {
        return this.#min;
    }

    #len = 0;
    get len() {
        return this.#len;
    }

    #max = 0;
    get max() {
        return this.#max;
    }

    /**
     * check
     * @param {number} vn
     * @returns
     */
    check(vn=0) {
		let rv = vn;
		if (rv < this.#min) {
			rv = this.#min;
		} else if (rv > this.#max) {
			rv = this.#max;
		}
        return rv;
    }

    #now = 0;
    get now() {
        return this.#now;
    }

    set now(vn=0) {
        this.#now = this.check(vn);
    }

    add(vn=0) {
        const rv = this.check(this.#now + vn);
        this.#now = rv;
        return rv;
    }

    mul(vn=0) {
        const rv = this.check(this.#now * vn);
        this.#now = rv;
        return rv;
    }

    div(vn=0) {
        const rv = this.check(this.#now / vn);
        this.#now = rv;
        return rv;
    }

    toString() {
        return `
min: ${this.#min}, len: ${this.#len}, max: ${this.#max}, now: ${this.#now}
        `.trim();
    }

    get ratio() {
        const fv = Math.abs(this.#now - this.#min);
        const lv = Math.abs(this.#max - this.#min);
        return fv / lv;
    }

}
Object.freeze(hfNumberRanger);
//#endregion

//#region `Signature definition`
/**
 * @typedef {Object} EasingObject
 * @property {(t: number, b: number, e: number, d: number) => number} fn
 */

/**
 * @callback EasingFunction
 * @param {number} t time
 * @param {number} b begin
 * @param {number} e end
 * @param {number} d duration
 * @returns {number}
 */

/**
 * @callback TweenCallbackFunction
 * @param {string} et - EventType
 * @param {number} cv - CurrentValue
 * @returns {void}
 */
//#endregion


//#region `Easing Objects`
const hfEasingKind = Object.freeze({
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    easeInOut: 'easeInOut',
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class hfEaseBack {
    /**
     * @param {string} ek
     * @param {number} s
     */
    constructor(ek=null, s=NaN) {
        if (ek === hfEasingKind.easeIn)
            this.#fn = this.#fn_easeIn;
        else if (ek === hfEasingKind.easeOut)
            this.#fn = this.#fn_easeOut;
        else
            this.#fn = this.#fn_easeInOut;

        if (Number.isFinite(s)) this.#ps = s;

        Object.seal(this);
    };

    /** @type {EasingFunction} */
    #fn = null;
    get fn() {
        return this.#fn;
    }

    #ps = 1.70158;

    /** @type {EasingFunction} */
	#fn_easeIn(t, b, e, d) {
        let s = this.#ps;
		return e * (t /= d) * t * ((s + 1) * t - s) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeOut(t, b, e, d) {
        let s = this.#ps;
		return e * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeInOut(t, b, e, d) {
        let s = this.#ps;
		if ((t /= d / 2) < 1)
			return e / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		else
		    return e / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	};
}
Object.freeze(hfEaseBack);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class hfEaseBounce {
    /**
     * @param {string} ek
     */
    constructor(ek=null) {
        if (ek === hfEasingKind.easeIn)
            this.#fn = this.#fn_easeIn;
        else if (ek === hfEasingKind.easeOut)
            this.#fn = this.#fn_easeOut;
        else
            this.#fn = this.#fn_easeInOut;

        Object.seal(this);
    };
    /** @type {EasingFunction} */
    #fn = null;
    get fn() {
        return this.#fn;
    }

    /** @type {EasingFunction} */
	#fn_easeIn(t, b, e, d) {
        return e - this.#fn_easeOut(d - t, 0, e, d) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeOut(t, b, e, d) {
        if ((t /= d) < (1 / 2.75))
            return e * (7.5625 * t * t) + b;
        else if (t < (2 / 2.75))
            return e * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        else if (t < (2.5 / 2.75))
            return e * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        else
            return e * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeInOut(t, b, e, d) {
        if (t < d/2)
            return this.#fn_easeIn(t * 2, 0, e, d) * 0.5 + b;
        else
            return this.#fn_easeOut(t * 2 - d, 0, e, d) * 0.5 + e * 0.5 + b;
	};
}
Object.freeze(hfEaseBounce);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class hfEaseCircular {
    /**
     * @param {string} ek
     */
    constructor(ek=null) {
        if (ek === hfEasingKind.easeIn)
            this.#fn = this.#fn_easeIn;
        else if (ek === hfEasingKind.easeOut)
            this.#fn = this.#fn_easeOut;
        else
            this.#fn = this.#fn_easeInOut;

        Object.seal(this);
    };
    /** @type {EasingFunction} */
    #fn = null;
    get fn() {
        return this.#fn;
    }

    /** @type {EasingFunction} */
	#fn_easeIn(t, b, e, d) {
		return -e * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeOut(t, b, e, d) {
		return e * Math.sqrt(1 - (t = t/d - 1) * t) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeInOut(t, b, e, d) {
		if ((t /= d / 2) < 1)
			return -e / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        else
		    return e / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	};
}
Object.freeze(hfEaseCircular);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class hfEaseElastic {
    /**
     * @param {string} ek
     * @param {number} a
     * @param {number} p
     */
    constructor(ek=null, a=NaN, p=NaN) {
        if (ek === hfEasingKind.easeIn)
            this.#fn = this.#fn_easeIn;
        else if (ek === hfEasingKind.easeOut)
            this.#fn = this.#fn_easeOut;
        else
            this.#fn = this.#fn_easeInOut;

        if (Number.isFinite(a)) this.#pa = a;
        if (Number.isFinite(p)) this.#pp = p;

        Object.seal(this);
    };
    /** @type {EasingFunction} */
    #fn = null;
    get fn() {
        return this.#fn;
    }

    #pa = 0.0;
    #pp = 0.0;

    /** @type {EasingFunction} */
	#fn_easeIn(t, b, e, d) {
        let a = this.#pa;
        let p = this.#pp;

		if (t == 0) return b;
		if ((t /= d) == 1) return b + e;

		if (!p) p = d * 0.3;

		let s = 0.0;
		if (!a || a < Math.abs(e)) {
			a = e;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(e / a);
		}

		return -(a * Math.pow(2, 10 * (t -= 1)) *
				 Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeOut(t, b, e, d) {
        let a = this.#pa;
        let p = this.#pp;

		if (t == 0) return b;
		if ((t /= d) == 1) return b + e;

		if (!p) p = d * 0.3;

		let s = 0.0;
		if (!a || a < Math.abs(e)) {
			a = e;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(e / a);
		}

		return a * Math.pow(2, -10 * t) *
			   Math.sin((t * d - s) * (2 * Math.PI) / p) + e + b;
	};

    /** @type {EasingFunction} */
	#fn_easeInOut(t, b, e, d) {
        let a = this.#pa;
        let p = this.#pp;

		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + e;

		if (!p) p = d * (0.3 * 1.5);

		let s = 0.0;
		if (!a || a < Math.abs(e)) {
			a = e;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(e / a);
		}

		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				   Math.sin((t * d - s) * (2 * Math.PI) /p)) + b;
		} else {
            return a * Math.pow(2, -10 * (t -= 1)) *
                Math.sin((t * d - s) * (2 * Math.PI) / p ) * 0.5 + e + b;
        }
	};
}
Object.freeze(hfEaseElastic);

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class hfEaseExponential {
    /**
     * @param {string} ek
     */
    constructor(ek=null) {
        if (ek === hfEasingKind.easeIn)
            this.#fn = this.#fn_easeIn;
        else if (ek === hfEasingKind.easeOut)
            this.#fn = this.#fn_easeOut;
        else
            this.#fn = this.#fn_easeInOut;

        Object.seal(this);
    };
    /** @type {EasingFunction} */
    #fn = null;
    get fn() {
        return this.#fn;
    }

    /** @type {EasingFunction} */
	#fn_easeIn(t, b, e, d) {
		return t == 0 ? b : e * Math.pow(2, 10 * (t / d - 1)) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeOut(t, b, e, d) {
		return t == d ? b + e : e * (-Math.pow(2, -10 * t / d) + 1) + b;
	};

    /** @type {EasingFunction} */
	#fn_easeInOut(t, b, e, d) {
		if (t == 0) return b;
		if (t == d) return b + e;

		if ((t /= d / 2) < 1)
			return e / 2 * Math.pow(2, 10 * (t - 1)) + b;
        else
		    return e / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	};
}
Object.freeze(hfEaseExponential);
//#endregion


//#region `hfTween: (LastUpdated: 251122)`
class hfTween {
    /** EventType Update */
    static ET_UPDATE = 'update';
    /** EventType End */
    static ET_END = 'end';

    /**
     * @param {number} current 현재값
     * @param {number} duration 진행시간(초)
     * @param {EasingFunction} easing 이징객체
     * @param {TweenCallbackFunction} cbf 콜백함수
     */
    constructor(current=0, duration=36, easing=null, cbf=null) {
        const md = this.#md;
        md.begin = current;
        md.end = current;
        md.current = current;
        md.duration = duration;
        md.easing = easing ?? new hfEaseCircular(hfEasingKind.easeInOut);
        md.cbf = cbf;
        md.fnfrc = this.#fn_loopFrame.bind(this);
        Object.seal(this);
    }
    #md = Object.seal({
        begin: 0.0,
        end: 0.0,
        current: 0.0,
        time: 0,
        duration: 0,
        /** @type {EasingObject} */
        easing: null,
        /** @type {TweenCallbackFunction} */
        cbf: null,
        /** @type {FrameRequestCallback} */
        fnfrc: null,
        /** FrameId */
        fid: -1,
    });

    /**
     * Tween중인가 여부
     */
    get running() {
        return this.#md.fid !== -1;
    }

    /**
     * 시작 값
     */
    get begin() {
        return this.#md.begin;
    }

    /**
     * 끝 값
     */
    get end() {
        return this.#md.end;
    }

    /**
     * 현재 값
     */
    get current() {
        return this.#md.current;
    }

    /**
     * 진행시간
     */
    get time() {
        return this.#md.time;
    }

    /**
     * 도달시간
     */
    get duration() {
        return this.#md.duration;
    }

    #fn_clearFrame() {
        const md = this.#md;
        if (md.fid !== -1) {
            cancelAnimationFrame(md.fid);
            md.fid = -1;
        }
    }

    /** @type {FrameRequestCallback} */
    #fn_loopFrame(_) {
        const md = this.#md;
        if (md.time < md.duration) {
            md.current = md.easing.fn(++md.time, md.begin, md.end, md.duration);
            md.cbf(hfTween.ET_UPDATE, md.current);
            if (md.time >= md.duration) {
                this.#fn_clearFrame();
                md.cbf(hfTween.ET_END, md.current);
            } else {
                md.fid = requestAnimationFrame(md.fnfrc);
            }
        }
    }

    stop() {
        this.#fn_clearFrame();
    }

    /**
     * @param {number} begin
     * @param {number} end
     */
    fromTo(begin, end) {
        const md = this.#md;
        this.#fn_clearFrame();
        md.begin = begin;
        md.end = end - begin;
        md.current = begin;
        md.time = 0;
        md.fid = requestAnimationFrame(md.fnfrc);
    }

    /**
     * @param {number} end
     */
    to(end) {
        const md = this.#md;
        this.fromTo(md.current, end);
    }

}Object.freeze(hfTween);

//#region `Signature definition`
/**
 * @callback CallbackFunction
 * @param {string} et - EventType
 * @param {number} cv - CurrentValue
 * @returns {void}
 */
//#endregion


//#region `hfWeich: (LastUpdated: 251114)`
//https://github.com/jungfocus7/jhb0b_as3_libs/blob/master/hbx/src/hbx/balence/CSmoothControl.as
class hfWeich {
    static ET_UPDATE = 'update';
    static ET_END = 'end';

    /**
     * @param {number} now - 0.0
     * @param {number} speed - 0.3
     * @param {number} dst - 1.0
     * @param {CallbackFunction} cbf
     */
    constructor(now, speed=0.3, dst=1.0, cbf=null) {
        const md = this.#md;
        md.end = now;
        md.now = now;
        md.speed = speed;
        md.dst = dst;
        md.fnfrc = this.#loopFrame.bind(this);
        md.cbf = cbf;
        Object.seal(this);
    }
    #md = Object.seal({
        end: 0.0,
        now: 0.0,
        speed: 0.0,
        dst: 1.0,
        fid: -1,
        /** @type {FrameRequestCallback} */ fnfrc: null,
        /** @type {CallbackFunction} */ cbf: null,
    });

    get running() {
        return this.#md.fid !== -1;
    }

    get end() {
        return this.#md.end;
    }

    get now() {
        return this.#md.now;
    }

    get speed() {
        return this.#md.speed;
    }

    #clearFrame() {
        const md = this.#md;
        if (md.fid === -1) return;
        cancelAnimationFrame(md.fid);
        md.fid = -1;
    }

    /** @type {FrameRequestCallback} */
    #loopFrame(_) {
        const md = this.#md;
        md.fid = requestAnimationFrame(md.fnfrc);
        const dst = md.end - md.now;
        if (Math.abs(dst) < md.dst) {
            md.now = md.end;
            md.cbf(hfWeich.ET_UPDATE, md.now);
            md.cbf(hfWeich.ET_END, md.now);
            this.#clearFrame();
        } else {
            md.now = md.now + (dst * md.speed);
            md.cbf(hfWeich.ET_UPDATE, md.now);
        }

    }


    stop() {
        this.#clearFrame();
    }

    /**
     * @param {number} end
     * @param {number} now
     */
    fromTo(end, now) {
        const md = this.#md;
        this.stop();
        md.end = end;
        md.now = now;
        md.fid = requestAnimationFrame(md.fnfrc);
    }

    /**
     * @param {number} end
     */
    to(end) {
        this.fromTo(end, this.#md.now);
    }

}
Object.freeze(hfWeich);

//#region `Signature definition`
/**
 * @callback FrameRepeaterCallback
 * @param {string} et - EventType
 * @param {number} re
 * @param {number} rc
 * @returns {void}
 */
//#endregion


class hfFrameRepeater {
    static ET_UPDATE = 'update';
    static ET_END = 'end';

    /**
     * @param {number} fd - FrameDelay
     * @param {number} re - RepeatEnd
     * @param {FrameRepeaterCallback} cbf
     */
    constructor(fd, re, cbf) {
        const md = this.#md;
        md.fd = fd;
        md.re = re;
        md.fnfrc = this.#loopFrame.bind(this);
        md.cbf = cbf;
        Object.seal(this);
    }
    #md = Object.seal({
        fd: 60, fc: 0,
        re: 3, rc: 0,
        /** @type {FrameRequestCallback} */ fnfrc: null,
        /** @type {FrameRepeaterCallback} */ cbf: null,
        fid: -1,
    });

    get running() {
        return this.#md.fid !== -1;
    }

    #clearFrame() {
        const md = this.#md;
        if (md.fid === -1) return;
        cancelAnimationFrame(md.fid);
        md.fid = -1;
    }

    /** @type {FrameRequestCallback} */
    #loopFrame(_) {
        const md = this.#md;
        md.fid = requestAnimationFrame(md.fnfrc);
        if ((++md.fc % md.fd) === 0) {
            md.cbf?.(hfFrameRepeater.ET_UPDATE, md.re, ++md.rc);
            if (md.rc >= md.re) {
                md.cbf?.(hfFrameRepeater.ET_END, md.re, md.rc);
                this.#clearFrame();
            }
        }
    }

    toString() {
        const md = this.#md;
        return `re: ${md.re}, rc: ${md.rc}`;
    }

    reset() {
        const md = this.#md;
        this.#clearFrame();
        md.fc = 0;
        md.rc = 0;
    }

    dispose() {
        const md = this.#md;
        this.reset();
        md.fnfrc = null;
        md.cbf = null;
    }

    stop() {
        this.#clearFrame();
    }

    start() {
        const md = this.#md;
        if (this.running) return;
        if (md.rc < md.re) {
            md.fid = requestAnimationFrame(md.fnfrc);
        }
    }

}Object.freeze(hfFrameRepeater);

export { hfCountTask, hfEaseBack, hfEaseBounce, hfEaseCircular, hfEaseElastic, hfEaseExponential, hfEasingKind, hfFrameRepeater, hfNumberRanger, hfTween, hfWeich, hfarr, hfdtime, hfnum, hfstr };
//# sourceMappingURL=hfall.js.map
