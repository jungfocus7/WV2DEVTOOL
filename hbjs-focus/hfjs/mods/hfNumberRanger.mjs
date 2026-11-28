import { fn_err } from "../core/hfcom.mjs";


/**
 * (Number 범위조작기) Number를 min, len, max 기준점으로 안전한 범위관리
 */
export class hfNumberRanger {
    /**
     * @param {number} min
     * @param {number} len
     */
    constructor(min=0, len=10) {
        if (
            (false === Number.isFinite(min)) ||
            (false === Number.isFinite(len))
        ) {
            fn_err('Invalid (min, len)number.');
        }

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
     * @param {number} vn
     * @returns
     */
    fn_check(vn=0) {
        if (false === Number.isFinite(vn)) {
            fn_err('Invalid (vn)number.');
        }

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

    set now(vn) {
        if (false === Number.isFinite(vn)) {
            fn_err('Invalid (vn)number.');
        }

        this.#now = this.fn_check(vn);
    }

    /**
     * 더히기
     * @param {number} vn
     * @returns
     */
    fn_add(vn=0) {
        let rv = this.fn_check(this.#now + vn);
        this.#now = rv;

        return rv;
    }

    /**
     * 곱하기
     * @param {number} vn
     * @returns
     */
    fn_mul(vn=0) {
        let rv = this.fn_check(this.#now * vn);
        this.#now = rv;

        return rv;
    }

    /**
     * 나누기
     * @param {number} vn
     * @returns
     */
    fn_div(vn=0) {
        let rv = this.fn_check(this.#now / vn);
        this.#now = rv;

        return rv;
    }

    fn_info() {
        return `
min: ${this.#min}, len: ${this.#len}, max: ${this.#max}, now: ${this.#now}
        `.trim();
    }

    get ratio() {
        let fv = Math.abs(this.#now - this.#min);
        let lv = Math.abs(this.#max - this.#min);

        return fv / lv;
    }

};
Object.freeze(hfNumberRanger);
Object.freeze(hfNumberRanger.prototype);


{
    let ranger = new hfNumberRanger(30, 200);

    globalThis.addEventListener('keydown', (ke) => {
        if ('ArrowUp' === ke.code) {
            ranger.fn_add(55);
            console.log(ranger.fn_info());
        } else if ('ArrowLeft' === ke.code) {
            ranger.fn_add(-10);
            console.log(ranger.fn_info());
        } else if ('ArrowRight' === ke.code) {
            ranger.fn_add(10);
            console.log(ranger.fn_info());
        }
    });
};