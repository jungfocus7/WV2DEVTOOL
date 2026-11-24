export class hgRange {
    #md = Object.seal({
        begin: 0,
        end: 0,
        current: 0,
        plus: 0,
        _iter_obj: {
            value: 0,
            done: false,
        }
    });

    /**
     * @param {number} begin - begin number
     * @param {number} end - end number (not included)
     * @param {number} plus - plus number
     */
    constructor(begin, end, plus=1) {
        const md = this.#md;
        md.begin = begin;
        md.end = end;
        md.current = begin;
        md.plus = plus;
    }

    next() {
        const md = this.#md;
        const iter = md._iter_obj;
        if (md.current < md.end) {
            iter.value = md.current;
            iter.done = false;
            md.current += md.plus;
        } else {
            iter.value = undefined;
            iter.done = true;
        }
        return iter;
    }

    [Symbol.iterator]() {
        return this;
    }

    reset() {
        const md = this.#md;
        md.current = md.begin;
    }

}
Object.freeze(hgRange);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
    let it_x = new hgRange(0, 10, 2);
    let it_y = new hgRange(0, 20, 3);
    for (let x of it_x) {
        for (let y of it_y) {
            console.log(`x: ${x}, y: ${y}`);
        }
        it_y.reset();
    }
}
