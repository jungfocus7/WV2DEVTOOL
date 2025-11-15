//#region `hfnum: 넘버 관련 모듈`
const hfnum = Object.freeze({
    /**
     * 넘버가 맞는지 확인
     * @param {number} tv
     * @returns {boolean}
     */
    isNumber: (tv) => {
        return typeof tv === 'number';
    },


    /**
     * 넘버가 아닌지 확인
     * @param {number} tv
     * @returns {boolean}
     */
    notNumber: (tv) => {
        return typeof tv !== 'number';
    },


    /**
     * 넘버가 실수인지 확인
     * @param {number} tv
     * @returns boolean
     */
    isFloat: (tv) => {
        return (tv % 1) !== 0;
    },


    /**
     * 넘버가 음수인지 확인
     * @param {number} tv
     * @returns boolean
     */
    isMinus: (tv) => {
        return tv < 0;
    },


    /**
     * 난수 만들기 0~n
     * @param {number} tv
     * @returns number
     */
    random: (tv) => {
        return Math.round(Math.random() * (tv - 1));
    },


    /**
     * 난수 만들기 min~max
     * @param {number} min
     * @param {number} max
     * @returns number
     */
    randRange: (min, max) => {
        return min + Math.round(Math.random() * (max - min));
    },


    /**
     * 넘버가 홀수인지 확인
     * @param {number} tv
     * @returns boolean
     */
    isOdd: (tv) => {
        return (tv % 2) > 0;
    },


    /**
     * 넘버가 짝수인지 확인
     * @param {number} tv
     * @returns boolean
     */
    isEven: (tv) => {
        return (tv % 2) === 0;
    }
});
//#endregion



//#region `hfstr: 문자열 관련 모듈`
const hfstr = Object.freeze({
    /**
     * 문자열 유효성 확인
     * @param {string} str
     * @returns boolean
     */
    isStr: (str) => {
        if (typeof str === 'string')
            return str.trim() !== '';
        else
            return false;
    },


    /**
     * 이름에서 마지막 번호 확인
     * @param {string} str
     * @param {string} token
     * @returns number
     */
    getLastNum: (str, token = '_') => {
        const ti = str.lastIndexOf(token) + 1;
        return ~~str.substring(ti);
    },


    /**
     * 문자열 >> ArrayBuffer 변환
     * @param {string} str
     * @returns Uint16Array
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
     * @returns string
     */
    ab2Str: (ab) => {
        return String.fromCharCode.apply(null, ab);
    }
});
//#endregion



//#region `hfarr: 배열 관련 모듈`
const hfarr = Object.freeze({
    /**
     * 배열객체 유효성 확인
     * @param {array} arr
     * @returns boolean
     */
    notEmpty: (arr) => {
        return Array.isArray(arr) && (arr.length > 0);
    },


    /**
     * 배열에 요소 확인
     * @param {array} arr
     * @param {temp object} te
     * @returns boolean
     */
    contains: (arr, te) => {
        if (hfarr.notEmpty(arr) === false) return false;

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
     * @param {array} arr
     * @returns void
     */
    shuffle: (arr) => {
        if (hfarr.notEmpty(arr) === false) return;

        const l = arr.length;
        for (let i = 0; i < l; i++) {
            let te = arr[i];
            let ti = hfnum.randRange(0, l - 1);
            arr[i] = arr[ti];
            arr[ti] = te;
        }
    },


    /**
     * 배열 복사
     * @param {array} arr
     * @returns array
     */
    copy: (arr) => {
        if (hfarr.notEmpty(arr) === false) return null;
        return arr.slice();
    }

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
    }

});
//#endregion

//#region `hfCountTask: `
const hfCountTask = Object.freeze(class {
    /**
     * 카운트 연산하기
     * @param {number} countStart
     * @param {number} countEnd
     * @param {number} plusValue
     */
    constructor(countStart = 1, countEnd = 10, plusValue = 1) {
        this.#countStart = countStart;
        this.#countEnd = countEnd;
        this.#plusValue = plusValue;
        this.#count = countStart;
        Object.seal(this);
    }

    #countStart = 0;
    get countStart() {
        return this.#countStart;
    }

    #countEnd = 0;
    get countEnd() {
        return this.#countEnd;
    }

    #plusValue = 0;
    get plusValue() {
        return this.#plusValue;
    }

    #count = 0;
    get count() {
        return this.#count;
    }


    /**
     * 이전 단계
     * @returns boolean
     */
    prev() {
        const tc = this.#count - this.#plusValue;
        if (tc < this.#countStart)
            return false;
        else {
            this.#count = tc;
            return true;
        }
    }

    /**
     * 다음 단계
     * @returns boolean
     */
    next() {
        const tc = this.#count + this.#plusValue;
        if (tc > this.#countEnd)
            return false;
        else {
            this.#count = tc;
            return true;
        }
    }

    /**
     * 리셋 하기
     */
    reset() {
        this.#count = this.#countStart;
    }

    /**
     * 마지막으로 리셋하기
     */
    resetEnd() {
        this.#count = this.#countEnd;
    }

});
//#endregion

//#region `hfNumberRanger: `
const hfNumberRanger = Object.freeze(class {
    /**
     * Number를 min, len, max 기준점으로 안전한 범위관리
     * @param {number} min
     * @param {number} len
     */
    constructor(min = 0, len = 10) {
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
    check(vn = 0) {
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

    set now(vn = 0) {
        this.#now = this.check(vn);
    }

    add(vn = 0) {
        const rv = this.check(this.#now + vn);
        this.#now = rv;
        return rv;
    }

    mul(vn = 0) {
        const rv = this.check(this.#now * vn);
        this.#now = rv;
        return rv;
    }

    div(vn = 0) {
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

});
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
const hfEaseBack = Object.freeze(class {
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
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const hfEaseBounce = Object.freeze(class {
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
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const hfEaseCircular = Object.freeze(class {
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
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const hfEaseElastic = Object.freeze(class {
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
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const hfEaseExponential = Object.freeze(class {
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
});
//#endregion


//#region `hfTween: (LastUpdated: 251111)`
const hfTween = Object.freeze(class {
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
    constructor(current = 0, duration = 36, easing = null, cbf = null) {
        const md = this.#md;

        md.running = false;
        md.begin = current;
        md.end = current;
        md.current = current;
        md.time = 0;
        md.duration = duration;
        md.easing = easing ?? new hfEaseCircular(hfEasingKind.easeInOut);
        md.cbf = cbf;
        md.fnfrc = this.#fn_loopFrame.bind(this);

        Object.seal(this);
    }
    #md = Object.seal({
        running: false,
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
        return this.#md.running;
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

        if (md.fid === -1) return;
        cancelAnimationFrame(md.fid);
        md.fid = -1;
    }

    /** @type {FrameRequestCallback} */
    #fn_loopFrame(_) {
        const md = this.#md;

        if (md.running === false) return;
        if (md.time < md.duration) {
            ++md.time;
            md.current = md.easing.fn(md.time, md.begin, md.end, md.duration);
            md.cbf(hfTween.ET_UPDATE, md.current);
            if (md.time >= md.duration) {
                md.cbf(hfTween.ET_END, md.current);
                this.stop();
            } else {
                md.fid = requestAnimationFrame(md.fnfrc);
            }
        }
    }

    stop() {
        const md = this.#md;

        if (md.running === true) {
            this.#fn_clearFrame();
            md.running = false;
        }
    }

    /**
     * @param {number} begin
     * @param {number} end
     */
    fromTo(begin, end) {
        const md = this.#md;

        if (md.running === true) this.stop();
        md.time = 0;
        md.begin = begin;
        md.end = end - begin;
        md.current = begin;
        md.running = true;

        md.fid = requestAnimationFrame(md.fnfrc);
    }

    /**
     * @param {number} end
     */
    to(end) {
        const md = this.#md;

        this.fromTo(md.current, end);
    }

});

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
     * @param {number} now
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

export { hfCountTask, hfEaseBack, hfEaseBounce, hfEaseCircular, hfEaseElastic, hfEaseExponential, hfEasingKind, hfNumberRanger, hfTween, hfWeich, hfarr, hfdtime, hfnum, hfstr };
//# sourceMappingURL=hfall.js.map
