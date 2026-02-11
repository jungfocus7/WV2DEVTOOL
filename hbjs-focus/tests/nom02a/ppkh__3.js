import _nd_fs from "node:fs";
import _nd_path from "node:path";
import _nd_url from "node:url";


const __filename = _nd_url.fileURLToPath(import.meta.url);
// console.log('#__filename:', __filename);
const __dirname = _nd_path.dirname(__filename);
// console.log('#__dirname:', __dirname);


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


    // /**
    //  * @param {number} ms
    //  * @returns
    //  */
    // const fn_delay = (ms) => {
    //     return new Promise((resolve, reject) => {
    //         if (ms <= 3000)
    //             globalThis.setTimeout(resolve, ms);
    //         else
    //             globalThis.setTimeout(reject, ms);
    //     });
    // };

    const fn_addRowsData = () => {
        // const dtfp = 'fixed-data2.txt';
        const dtfp = _nd_path.join(__dirname, 'fixed-data2.txt');
        // console.log(dtfp);
        if (_nd_fs.existsSync(dtfp)) _nd_fs.unlinkSync(dtfp);

        const cc = _ftd.cc; // column count
        const rc = 100000; // row count
        console.log(`시도=${(cc * rc)}`);

        const cml = fn_ndgt(cc);
        const rml = fn_ndgt(rc);

        for (let j = 0; j < rc; j++) {
            const rca = new Array(cc); // row cell arr
            for (let i = 0; i < cc; i++) {
                let cnx = (i + 1).toString().padStart(cml, '0');
                let rnx = (j + 1).toString().padStart(rml, '0');
                let tx = `C${cnx},R${rnx}`;
                rca[i] = tx;

                // rca[i] = '~~~~~~~~~~~~~~~~~';
                // let cnx = (i + 1).toString().padStart(cml, '0');
                // let rnx = (j + 1).toString().padStart(rml, '0');
                // let tx = "'C' + cnx + ',R' + rnx";
                // rca[i] = tx;
            }
            _ftd.add(rca);
        }
        console.timeEnd('#per');
        // console.log(_ftd.cc);
        // console.log(_ftd.rc);
        console.log(_ftd.ac);


        // const rla = new Array(rc); // row line arr
        const rca = new Array(cc); // row cell arr
        for (let j = 0; j < rc; j++) {
            for (let i = 0; i < cc; i++) {
                rca[i] = _ftd.get(j, i);
            }
            // rla[j] = rca.join('|');
            const trx = rca.join('|') + '\n';
            _nd_fs.appendFileSync(dtfp, trx);
        }
        // let rst = rla.join('\n');
        // console.log(rst);


        console.log('>>>');
    };


    fn_addRowsData();

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

})();

