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
            rc: 0,
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

        /** column prefix */
        get cpr() {
            return this.#md.cpr;
        }

        /** column count */
        get cc() {
            return this.#md.cc;
        }

        /** column arr */
        get cols() {
            return this.#md.cols;
        }

        /** row count */
        get rc() {
            return this.#md.rc;
        }

        /** all count */
        get ac() {
            const md = this.#md;
            return md.cc * md.rc;
        }

        /**
         * clear table
         * @param {boolean} ba clear all
         */
        clear(ba=false) {
            const md = this.#md;
            if (ba) {
                md.cols.length = 0;
            }
            md.rows.length = 0;
        }

        /**
         * @param {any[]} rca row cell arr
         */
        add(rca) {
            const md = this.#md;
            if (!Array.isArray(rca)) {
                throw 'row item is not an array.';
            }
            if (rca.length !== md.cc) {
                throw 'The row item count condition is not met.';
            }
            Object.seal(rca);
            md.rc = md.rows.push(rca);
        }

        /**
         * @param {number} j
         * @param {number} i
         * @returns
         */
        get(j=0, i=0) {
            const md = this.#md;
            if (md.rc > 0) {
                let rca = md.rows.at(j);
                if (rca) {
                    return rca.at(i);
                }
            }
        }

        /**
         * @param {number} j
         * @param {number} i
         * @param {any} e
         */
        set(j=0, i=0, e=undefined) {
            const md = this.#md;
            if (md.rc > 0) {
                let rca = md.rows.at(j);
                if (rca) {
                    rca[i] = e;
                }
            }
        }

    }
    Object.freeze(hfFixedTable);


    // const _ftd = new hfFixedTable();
    const _ftd = new hfFixedTable('CN', 100);
    // console.log(_ftd.cc);
    // console.log(_ftd.cols);
    console.time('#per');


    const cc = _ftd.cc; // column count
    const crva = new Array(cc); // cacheed row value arr
    const ml = fn_ndgt(cc);
    for (let i = 0; i < cc; i++) {
        let nl = (i + 1).toString().padStart(ml, '0');
        crva[i] = `RN${nl}`;
    }

    const rc = 100000; // row count
    const rca = new Array(cc); // row cell arr
    for (let j = 0; j < rc; j++) {
        rca.fill(undefined);
        for (let i = 0; i < cc; i++) {
            rca[i] = crva[i];
        }
        _ftd.add(rca)
    }
    console.timeEnd('#per');
    // console.log(_ftd.cc);
    // console.log(_ftd.rc);
    // console.log(_ftd.ac);



    const rla = new Array(rc); // row line arr
    for (let j = 0; j < rc; j++) {
        // rca.fill(undefined);
        for (let i = 0; i < cc; i++) {
            rca[i] = _ftd.get(j, i);
        }
        // rla[j] = rca.slice();
        // console.log(rca.join('|') + '\n');
        rla[j] = rca.join('|');
    }
    let rst = rla.join('\n');
    // console.log(rst);


    console.log('>>>');

})();




/*

(() => {




const count = 100000000; // 1,000만 번

// 1. push 방식 (느림)
console.time('push');
const arr1 = [];
for (let i = 0; i < count; i++) {
    arr1.push(i);
}
console.timeEnd('push');


// 2. 미리 할당 방식 (빠름)
console.time('pre-allocated');
const arr2 = new Array(count);
for (let i = 0; i < count; i++) {
    arr2[i] = i;
}
console.timeEnd('pre-allocated');

// 확실히 nodejs가 edge보다 느리긴 하다.
// (edge) push: 511.927001953125 ms, pre-allocated: 1563.719970703125 ms
// (nodje) push: 861.39208984375 ms, pre-allocated: 2400.10400390625 ms







const LIMIT = 100_000_000; // 1억 개

// 1. push 방식 (비효율적)
console.time('Push Method');
const pushArr = [];
for (let i = 0; i < LIMIT; i++) {
    pushArr.push(i);
}
console.timeEnd('Push Method');


// 2. 인덱스 할당 방식 (매우 효율적)
console.time('Index Assignment');
const indexArr = new Array(LIMIT);
for (let i = 0; i < LIMIT; i++) {
    indexArr[i] = i;
}
console.timeEnd('Index Assignment');





})();*/