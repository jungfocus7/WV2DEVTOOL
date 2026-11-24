/**
 * @typedef {object} ITokenInfo
 * @property {string} type
 * @property {any} val
 */


/**
 * ???
 */
const __numChars = '-.0123456789';

/**
 * @type {ITokenInfo}
 */
const _tkprt = {
    type: null,
    val: undefined,
};

/**
 * ???
 */
export class TargetEvaluator {
    #md = Object.seal({
        /** @type {string[]} */
        buff: [],

        /** @type {ITokenInfo[]} */
        tokens: [],

        /** @type {string} */
        txt: null,
    });

    /**
     * @param {string} type
     * @param {any} val
     */
    #fn_addItem(type, val) {
        const md = this.#md;
        let tk = Object.assign({}, _tkprt);
        tk.type = type;
        tk.val = val;
        md.tokens.push(tk);
    }

    /**
     * ???
     */
    #fn_cmps() {
        const md = this.#md;
        if (md.buff.length > 0) {
            this.#fn_addItem('num', md.buff.join(''));
            md.buff.length = 0;
        }
    }

    /**
     * @param {string} ch
     * @param {string} pa
     * @returns
     */
    #fn_checkAddNumber(ch, pa) {
        // const md = this.#md;
        // if (__numChars.includes(ch)) {
        //     if (ch === '-') {
        //         if ('' pa === )
        //         if (md.buff.length === 0) {
        //             md.buff.push(ch);
        //         }
        //     } else if (ch === '.') {
        //         if (md.buff.indexOf('.') === -1) {
        //             md.buff.push(ch);
        //         }
        //     } else {
        //         md.buff.push(ch);
        //     }
        //     return true;
        // } else {
        //     return false;
        // }
    }

    /**
     * ???
     */
    #fn_tokenize() {
        const md = this.#md;
        let pa;
        for (const ch of md.txt) {
            if (__numChars.includes(ch)) {
                this.#fn_checkAddNumber(ch, pa);
            } else {
                this.#fn_cmps();
                this.#fn_addItem('op', ch);
            }
            pa = ch;
        }
        this.#fn_cmps();
    }

    /**
     * ???
     * @param {string} txt
     */
    parse(txt) {
        const md = this.#md;
        md.txt = txt.replace(/[\s,]+/g, '');
        this.#fn_tokenize();
    }

}
Object.freeze(TargetEvaluator);
