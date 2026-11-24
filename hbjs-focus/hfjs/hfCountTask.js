/**
 * Count 연산기
 */
export class hfCountTask {
    #md = Object.seal({
        begin: 0, end: 0, add: 0, now: 0
    });

    /**
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
    fn_prev() {
        const md = this.#md;

        let tc = md.now - md.add;
        if (tc < md.begin) {
            return false;
        } else {
            md.now = tc;
            return true;
        }
    }

    /**
     * 다음 단계
     * @returns boolean
     */
    fn_next() {
        const md = this.#md;

        let tc = md.now + md.add;
        if (tc > md.end) {
            return false;
        } else {
            md.now = tc;
            return true;
        }
    }

    /**
     * 리셋 하기
     * @param {boolean} be end로 reset 여부
     */
    fn_reset(be=false) {
        const md = this.#md;

        if (be) {
            md.now = md.end;
        } else {
            md.now = md.begin;
        }
    }

};
Object.freeze(hfCountTask);
Object.freeze(hfCountTask.prototype);
