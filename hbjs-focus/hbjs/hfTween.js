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
        const md = this.#md

        if (md.fid === -1) return;
        cancelAnimationFrame(md.fid);
        md.fid = -1;
    }

    /** @type {FrameRequestCallback} */
    #fn_loopFrame(_) {
        const md = this.#md

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

};
Object.freeze(hfTween);
//#endregion


export {
    hfEasingKind,
    hfEaseBack,
    hfEaseBounce,
    hfEaseCircular,
    hfEaseElastic,
    hfEaseExponential,
    hfTween,
};
