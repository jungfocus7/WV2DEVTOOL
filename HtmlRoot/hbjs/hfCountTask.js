//#region `hfCountTask: 카운트 연산하기`
export class hfCountTask {
    /**
     *
     * @param {number} countStart
     * @param {number} countEnd
     * @param {number} plusValue
     */
    constructor(countStart = 1, countEnd = 10, plusValue = 1) {
        this.#countStart = countStart;
        this.#countEnd = countEnd;
        this.#plusValue = plusValue;
        this.#count = countStart;
    }

    #countStart = 0;
    get CountStart() {
        return this.#countStart;
    }

    #countEnd = 0;
    get CountEnd() {
        return this.#countEnd;
    }

    #plusValue = 0;
    get PlusValue() {
        return this.#plusValue;
    }

    #count = 0;
    get Count() {
        return this.#count;
    }


    /**
     * 이전 단계
     * @returns boolean
     */
    Prev() {
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
    Next() {
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
    Reset() {
        this.#count = this.#countStart;
    }

    /**
     * 마지막으로 리셋하기
     */
    ResetEnd() {
        this.#count = this.#countEnd;
    }
}
//#endregion





