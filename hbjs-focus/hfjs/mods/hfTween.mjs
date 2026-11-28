//#region [Signature Definitions]
/**
 * @callback EasingFunction
 * @param {number} t time
 * @param {number} b begin
 * @param {number} e end
 * @param {number} d duration
 * @returns {number}
 */

/**
 * @typedef {Object} EasingObject
 * @property {EasingFunction} fn_easeIn
 * @property {EasingFunction} fn_easeOut
 * @property {EasingFunction} fn_easeInOut
 */

/**
 * @callback hfTween_callback
 * @param {string} cbt - callback type
 * @param {number} cv - current value
 * @returns {void}
 */
//#endregion


//#region [01) Easing Functions]
export const hfEasingFunctions = Object.freeze({
    back: (() => {
        let ps = 1.70158;

        /** @type {EasingFunction} */
        const fn_easeIn = (t, b, e, d) => {
            return e * (t /= d) * t * ((ps + 1) * t - ps) + b;
        };

        /** @type {EasingFunction} */
        const fn_easeOut = (t, b, e, d) => {
            return e * ((t = t / d - 1) * t * ((ps + 1) * t + ps) + 1) + b;
        };

        /** @type {EasingFunction} */
        const fn_easeInOut = (t, b, e, d) => {
            if ((t /= d / 2) < 1) {
                return e / 2 * (t * t * (((ps *= (1.525)) + 1) * t - ps)) + b;
            } else {
                return e / 2 * ((t -= 2) * t * (((ps *= (1.525)) + 1) * t + ps) + 2) + b;
            }
        };

        /** @type {EasingObject} */
        return Object.freeze({
            fn_easeIn,
            fn_easeOut,
            fn_easeInOut,
        });
    })(),

    bounce: (() => {
        /** @type {EasingFunction} */
        const fn_easeIn = (t, b, e, d) => {
            return e - fn_easeOut(d - t, 0, e, d) + b;
        };

        /** @type {EasingFunction} */
        const fn_easeOut = (t, b, e, d) => {
            if ((t /= d) < (1 / 2.75)) {
                return e * (7.5625 * t * t) + b;
            } else if (t < (2 / 2.75)) {
                return e * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
            } else if (t < (2.5 / 2.75)) {
                return e * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
            } else {
                return e * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
            }
        };

        /** @type {EasingFunction} */
        const fn_easeInOut = (t, b, e, d) => {
            if (t < d/2) {
                return fn_easeIn(t * 2, 0, e, d) * 0.5 + b;
            } else {
                return fn_easeOut(t * 2 - d, 0, e, d) * 0.5 + e * 0.5 + b;
            }
        };

        /** @type {EasingObject} */
        return Object.freeze({
            fn_easeIn,
            fn_easeOut,
            fn_easeInOut,
        });
    })(),

    circular: (() => {
        /** @type {EasingFunction} */
        const fn_easeIn = (t, b, e, d) => {
		    return -e * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        };

        /** @type {EasingFunction} */
        const fn_easeOut = (t, b, e, d) => {
		    return e * Math.sqrt(1 - (t = t/d - 1) * t) + b;
        };

        /** @type {EasingFunction} */
        const fn_easeInOut = (t, b, e, d) => {
            if ((t /= d / 2) < 1) {
                return -e / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            } else {
                return e / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
            }
        };

        /** @type {EasingObject} */
        return Object.freeze({
            fn_easeIn,
            fn_easeOut,
            fn_easeInOut,
        });
    })(),

    elastic: (() => {
        let pa = 0.0;
        let pp = 0.0;

        /** @type {EasingFunction} */
        const fn_easeIn = (t, b, e, d) => {
            let a = pa;
            let p = pp;

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
        const fn_easeOut = (t, b, e, d) => {
            let a = pa;
            let p = pp;

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
        const fn_easeInOut = (t, b, e, d) => {
            let a = pa;
            let p = pp;

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

        /** @type {EasingObject} */
        return Object.freeze({
            fn_easeIn,
            fn_easeOut,
            fn_easeInOut,
        });
    })(),

    exponential: (() => {
        let pa = 0.0;
        let pp = 0.0;

        /** @type {EasingFunction} */
        const fn_easeIn = (t, b, e, d) => {
		    return t == 0 ? b : e * Math.pow(2, 10 * (t / d - 1)) + b;
        };

        /** @type {EasingFunction} */
        const fn_easeOut = (t, b, e, d) => {
		    return t == d ? b + e : e * (-Math.pow(2, -10 * t / d) + 1) + b;
        };

        /** @type {EasingFunction} */
        const fn_easeInOut = (t, b, e, d) => {
            if (t == 0) return b;
            if (t == d) return b + e;

            if ((t /= d / 2) < 1) {
                return e / 2 * Math.pow(2, 10 * (t - 1)) + b;
            } else {
                return e / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
            }
        };

        /** @type {EasingObject} */
        return Object.freeze({
            fn_easeIn,
            fn_easeOut,
            fn_easeInOut,
        });
    })(),

});
//#endregion


//#region [02) hfTween: (LastUpdated: 261124)]
export class hfTween {
    static CT_UPDATE = 'update';
    static CT_END = 'end';


    #md = Object.seal({
        begin: 0.0,
        end: 0.0,
        current: 0.0,
        time: 0,
        duration: 0,

        /** @type {EasingFunction} */
        easing: null,
        /** @type {hfTween_callback} */
        cbf: null,
        /** @type {FrameRequestCallback} */
        fnfrc: null,

        /** FrameId */
        fid: -1,
    });

    /**
     * @param {number} current 현재값
     * @param {number} duration 진행시간(초)
     * @param {EasingFunction} easing 이징객체
     * @param {hfTween_callback} cbf 콜백함수
     */
    constructor(current=0, duration=36, easing=null, cbf=null) {
        const md = this.#md;

        md.begin = current;
        md.end = current;
        md.current = current;
        md.duration = duration;
        md.easing = easing ?? hfEasingFunctions.circular.fn_easeInOut;
        md.cbf = cbf;
        md.fnfrc = this.#fn_loopFrame.bind(this);

        Object.seal(this);
    }

    /**
     * 객체 해제
     */
    fn_dispose() {
        const md = this.#md;

        md.easing = null;
        md.cbf = null;
        md.fnfrc = null;
    }

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

    /**
     * ??
     */
    #fn_clearFrame() {
        const md = this.#md

        if (md.fid !== -1) {
            globalThis.cancelAnimationFrame(md.fid);
            md.fid = -1;
        }
    }

    /**
     * @param {DOMHighResTimeStamp} _
     */
    #fn_loopFrame(_) {
        const md = this.#md

        if (md.time < md.duration) {
            md.current = md.easing(++md.time, md.begin, md.end, md.duration);
            md.cbf(hfTween.CT_UPDATE, md.current);
            if (md.time >= md.duration) {
                this.#fn_clearFrame();
                md.cbf(hfTween.CT_END, md.current);
            } else {
                md.fid = requestAnimationFrame(md.fnfrc);
            }
        }
    }

    /**
     * ??
     */
    fn_stop() {
        this.#fn_clearFrame();
    }

    /**
     * @param {number} begin
     * @param {number} end
     */
    fn_fromTo(begin, end) {
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
    fn_to(end) {
        const md = this.#md;

        this.fn_fromTo(md.current, end);
    }

}
Object.freeze(hfTween);
Object.freeze(hfTween.prototype);
//#endregion
