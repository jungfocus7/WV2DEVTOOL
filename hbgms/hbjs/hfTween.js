//#region `easing functions`
const hfEaseBack = Object.seal({
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
	},

});

const hfEaseBounce = Object.seal({
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
	},

});

const hfEaseCircular = Object.seal({
	easeIn(t, b, c, d) {
		return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	},

	easeOut(t, b, c, d) {
		return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
	},

	easeInOut(t, b, c, d) {
		if ((t /= d / 2) < 1)
			return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        else
		    return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	},

});

const hfEaseElastic = Object.seal({
	easeIn(t, b, c, d, a = 0, p = 0) {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * 0.3;
		let s;
		if (!a || (a < Math.abs(c))) {
			a = c;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	},

	easeOut(t, b, c, d, a = 0, p = 0) {
		if (t == 0) return b;
		if ((t /= d) == 1) return b + c;
		if (!p) p = d * 0.3;
		let s;
		if (!a || (a < Math.abs(c))) {
			a = c;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	},

	easeInOut(t, b, c, d, a = 0, p = 0) {
		if (t == 0) return b;
		if ((t /= d / 2) == 2) return b + c;
		if (!p) p = d * (0.3 * 1.5);
		let s;
		if (!a || a < Math.abs(c)) {
			a = c;
			s = p / 4;
		} else {
			s = p / (2 * Math.PI) * Math.asin(c / a);
		}
		if (t < 1)
			return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) /p)) + b;
		else
		    return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p ) * 0.5 + c + b;
	},

});

const hfEaseExponential = Object.seal({
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
        else
		    return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},

});
//#endregion



//#region `hfTween: `
const hfTween = Object.freeze(class {
    static ET_UPDATE = 'update';
    static ET_END = 'end';

    /**
     * 트윈 클래스 생성자
     * @param {number} current 현재값
     * @param {number} duration 진행시간(초)
     * @param {Function} ease 이징함수
     * @param {function(string, number): void} cbf 콜백함수
     */
    constructor(current = 0, duration = 36, ease = null, cbf = null) {
        Object.seal(this);
        const gd = this.#gd;
        gd.running = false;
        gd.begin = current;
        gd.end = current;
        gd.current = current;
        gd.time = 0;
        gd.duration = duration;
        const fx = ease ?? hfEaseCircular.easeInOut;
        gd.ease = fx.bind(hfEaseBack);
        gd.cbf = cbf;
    }

    #gd = {
        running: false,
        begin: 0.0,
        end: 0.0,
        current: 0.0,
        time: 0,
        duration: 0,
        ease: null,
        cbf: null,
        fid: -1,
    };

    get running() {
        return this.#gd.running;
    }

    get begin() {
        return this.#gd.begin;
    }

    get end() {
        return this.#gd.end;
    }

    get current() {
        return this.#gd.current;
    }

    get time() {
        return this.#gd.time;
    }

    get duration() {
        return this.#gd.duration;
    }

    #clearFrame = () => {
        const gd = this.#gd
        if (gd.fid === -1) return;
        cancelAnimationFrame(gd.fid);
        gd.id = -1;
    }

    #loopFrame = (t) => {
        const gd = this.#gd
        if (gd.running === false) return;
        if (gd.time < gd.duration) {
            ++gd.time;
            gd.current = gd.ease(gd.time, gd.begin, gd.end, gd.duration);
            gd.cbf(hfTween.ET_UPDATE, gd.current);
            if (gd.time >= gd.duration) {
                gd.cbf(hfTween.ET_END, gd.current);
                this.stop();
            }
        }
        gd.fid = requestAnimationFrame(this.#loopFrame);
    }

    stop() {
        const gd = this.#gd;
        if (gd.running === true) {
            this.#clearFrame();
            gd.running = false;
        }
    }

    /**
     * @param {number} begin
     * @param {number} change
     */
    fromTo(begin, change) {
        const gd = this.#gd;
        if (gd.running === true)
            this.stop();
        gd.time = 0;
        gd.begin = begin;
        gd.end = change - begin;
        gd.current = begin;
        gd.running = true;
        gd.fid = requestAnimationFrame(this.#loopFrame);
    }

    /**
     * @param {number} change
     */
    to(change) {
        const gd = this.#gd;
        this.fromTo(gd.current, change);
    }

});

export {
    hfEaseBack,
    hfEaseBounce,
    hfEaseCircular,
    hfEaseElastic,
    hfEaseExponential,
    hfTween,
};
//#endregion
