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

export {
    hfNumberRanger
};
//#endregion
