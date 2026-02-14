(() => {
    /**
     * @param {number} tn
     * @returns
     */
    const fn_ndgt = (tn) => {
        let tx = Math.log(Math.abs(tn)) * Math.LOG10E;
        let ty = Math.max(Math.floor(tx), 0);
        let tz = ty + 1;
        // console.log(tz);
        return tz;
    };

    class hfFixedTable {
        #md = Object.seal({
            cpr: '',
            cc: 0,
            cols: [],
            rows: [],
        });
        constructor(cpr='CN', cc=10) {
            const md = this.#md;
            md.cpr = cpr;
            md.cc = cc;

            let ml = fn_ndgt(cc);
            for (let i = 0; i < cc; i++) {
                let nl = (i + 1).toString().padStart(ml, '0');
                let cn = `${cpr}${nl}`;
                md.cols.push(cn);
            }
            Object.freeze(md.cols);
        }

        get cpr() {
            return this.#md.cpr;
        }

        get cc() {
            return this.#md.cc;
        }

        get cols() {
            return this.#md.cols;
        }

        get rc() {
            return this.#md.rows.length;
        }

        get ac() {
            const md = this.#md;
            return md.cc * md.rows.length;
        }

        clear(ba=false) {
            const md = this.#md;
            if (ba) {
                md.cols.length = 0;
            }
            md.rows.length = 0;
        }

        add(ra=null) {
            const md = this.#md;
            if (!Array.isArray(ra)) {
                throw 'row item is not an array.';
            }
            if (ra.length !== md.cols.length) {
                throw 'The row item count condition is not met.';
            }
            md.rows.push(ra);
        }

        get(ri=0, ci=0) {
            const md = this.#md;
            if (md.rows.length > 0) {
                let ra = md.rows.at(ri);
                if (ra) {
                    return ra.at(ci);
                }
            }
        }

        set(ri=0, ci=0, /**@type {any}*/tv) {
            const md = this.#md;
            if (md.rows.length > 0) {
                let ra = md.rows.at(ri);
                if (ra) {
                    ra[ci] = tv;
                }
            }
        }

    }
    Object.freeze(hfFixedTable);


    // const _ftd = new hfFixedTable();
    const _ftd = new hfFixedTable('XX', 1000);
    // console.log(_ftd.cc);
    // console.log(_ftd.cols);
    console.time('#per');

    /*
    let l = 100000;
    let ml = fn_ndgt(l);
    for (let j = 0; j < l; j++) {
        let ra = [];
        for (let i = 0; i < _ftd.cc; i++) {
            let nl = (i + 1).toString().padStart(ml, '0');
            let tv = `RN${nl}`;
            ra.push(tv);
        }
        _ftd.add(ra)
    }
    console.timeEnd('#per');*/


    let l = 100000;
    let m = _ftd.cc;

    let cra = new Array(m);
    let ml = fn_ndgt(l);
    for (let i = 0; i < m; i++) {
        let nl = (i + 1).toString().padStart(ml, '0');
        let tv = `RN${nl}`;
        cra[i] = tv;
    }

    for (let j = 0; j < l; j++) {
        let ra = new Array(m);
        for (let i = 0; i < m; i++) {
            let nl = (i + 1).toString().padStart(ml, '0');
            let tv = `RN${nl}`;
            ra[i] = tv;
            // ra[i] = crva[i];
        }
        _ftd.add(ra)
    }
    console.timeEnd('#per');


    console.log('>>>');

})();