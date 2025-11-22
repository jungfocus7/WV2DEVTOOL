//#region `hfCountTask: `
class hfCountTask {
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

}
Object.freeze(hfCountTask);

export {
    hfCountTask
};
//#endregion
