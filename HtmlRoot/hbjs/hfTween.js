//#region `easing functions`
export const hfEaseBack = Object.seal({
	easeIn(t, b, c, d, s = 1.70158) {
		return c * (t /= d) * t * ((s + 1) * t - s) + b;
	},

	easeOut(t, b, c, d, s = 1.70158) {
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	},

	easeInOut(t, b, c, d, s = 1.70158) {
		if ((t /= d / 2) < 1)
			return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
		return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	}
});

export const hfEaseBounce = Object.seal({
	easeIn(t, b, c, d) {
        return c - this.easeOut(d - t, 0, c, d) + b;
	},

	easeOut(t, b, c, d) {
        if ((t /= d) < (1 / 2.75))
            return c * (7.5625 * t * t) + b;
        else if (t < (2 / 2.75))
            return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
        else if (t < (2.5 / 2.75))
            return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
        else
            return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
	},

	easeInOut(t, b, c, d) {
        if (t < d/2)
            return this.easeIn(t * 2, 0, c, d) * 0.5 + b;
        else
            return this.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	}
});

export const hfEaseCircular = Object.seal({
	easeIn(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},

	easeOut(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
	},

	easeInOut(t, b, c, d) {
		if ((t /= d / 2) < 1)
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
		return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	}
});

export const hfEaseElastic = Object.seal({
	easeIn(t, b, c, d, a = 0, p = 0) {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * 0.3;
		let s;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) *
				 Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},

	easeOut(t, b, c, d, a = 0, p = 0) {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * 0.3;
		let s;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) *
			   Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},

	easeInOut(t, b, c, d, a = 0, p = 0) {
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (0.3 * 1.5);
		let s;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		}
		else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1) {
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
				   Math.sin((t * d - s) * (2 * Math.PI) /p)) + b;
		}
		return a * Math.pow(2, -10 * (t -= 1)) *
			   Math.sin((t * d - s) * (2 * Math.PI) / p ) * 0.5 + c + b;
	}
});

export const hfEaseExponential = Object.seal({
	easeIn(t, b, c, d) {
		return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	},

	easeOut(t, b, c, d) {
		return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	},

	easeInOut(t, b, c, d) {
		if (t == 0) return b;
		if (t == d) return b + c;
		if ((t /= d / 2) < 1)
			return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
		return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	}
});
//#endregion



//#region `hfTween: 트윈 클래스`
export class hfTween extends EventTarget {
    /**
     * 업데이트 이벤트 상수
     */
    static ET_UPDATE = 'update';

    /**
     * 엔드 이벤트 상수
     */
    static ET_END = 'end';


    /**
     * 생성자
     * @param {number} current
     * @param {number} duration
     * @param {function} ease
     */
    constructor(current = 0, duration = 36, ease = null) {
        super();
        this.#running = false;
        this.#begin = current;
        this.#end = current;
        this.#current = current;
        this.#time = 0;
        this.#duration = duration;
        const fx = ease ?? hfEaseBack.easeInOut;
        this.#ease = fx.bind(hfEaseBack);
        Object.seal(this);
        // console.log(
        //     this.#running,
        //     this.#begin, this.#end, this.#current,
        //     this.#time, this.#duration,
        //     this.#ease);
    }

    #running = false;
    get Running() {
        return this.#running;
    }

    #begin = 0.0;
    get Begin() {
        return this.#begin;
    }

    #end = 0.0;
    get End() {
        return this.#end;
    }

    #current = 0.0;
    get Current() {
        return this.#current;
    }

    #time = 0;
    get Time() {
        return this.#time;
    }

    #duration = 0;
    get Duration() {
        return this.#duration;
    }

    #ease = 0;
    get Ease() {
        return this.#ease;
    }


    #fid = -1;
    #ClearFrame = () => {
        if (this.#fid === -1) return;
        cancelAnimationFrame(this.#fid);
        this.#fid = -1;
    };
    #LoopFrame = (t) => {
        if (this.#running === false) return;
        if (this.#time < this.#duration) {
            ++this.#time;
            this.#current = this.#ease(this.#time, this.#begin, this.#end, this.#duration);
            // console.log(this.#time, this.#current);
            this.dispatchEvent(new Event(hfTween.ET_UPDATE));
            if (this.#time >= this.#duration) {
                this.dispatchEvent(new Event(hfTween.ET_END));
                this.Stop();
            }
        }
        this.#fid = requestAnimationFrame(this.#LoopFrame);
    };


    /**
     * 멈추기
     */
    Stop() {
        if (this.#running === true) {
            this.#ClearFrame();
            this.#running = false;
        }
    }

    /**
     * 시작점에서 시작
     * @param {number} begin
     * @param {number} change
     */
    FromTo(begin, change) {
        if (this.#running === true)
            this.Stop();
        this.#time = 0;
        this.#begin = begin;
        this.#end = change - begin;
        this.#current = begin;
        this.#running = true;
        //this.#fid = requestAnimationFrame(this.#LoopFrame.bind(this));
        this.#fid = requestAnimationFrame(this.#LoopFrame);
    }

    /**
     * 현시점에서 시작
     * @param {number} change
     */
    To(change) {
        this.FromTo(this.#current, change);
    }
}
//#endregion
