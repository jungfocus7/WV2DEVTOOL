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
        md.add = Math.abs(add);
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

export {
    hfCountTask
};
//#endregion
