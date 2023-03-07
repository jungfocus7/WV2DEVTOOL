const os = require('node:os');
const path = require('node:path');
const fs = require('node:fs');
const readline = require('node:readline');



class JsMinifier2 {
    /**
     * 생성자
     * @param {string} ip
     * @param {string} op
     */
    constructor(frs, fws, bd = false) {
        const gd = this.#gd;
        gd.frs = frs;
        gd.fws = fws;
        gd.bd = bd;
    }

    /** 글로벌 데이터 오브젝트 */
    #gd = Object.seal({
        frs: null, fws: null,
        bd: null,
        rl: null,
        bcm: false,
        bf: true
    });



    /**
     * 한줄주석 제거
     * @param {string} tx
     * @returns
     */
    fn_clearCommentsOneLine = (ls) => {
        if ((typeof ls !== 'string') || (ls === '')) return '';
        const rex = /^[ \t]*\/\/[^\r\n]*$/;
        if (rex.test(ls) === true)
            return '';
        else
            return ls;
    };


    /**
     * 다중주석 제거
     * @param {string} ls
     * @returns
     */
    fn_clearCommentsMultiLineAll = (ls) => {
        if ((typeof ls !== 'string') || (ls === '')) return '';
        const rex = /\/\*[\S\s]*?\*\//g;
        const rv = ls.replaceAll(rex, '').trim();
        return rv;
    };


    /**
     * 다중주석 시작점 제거
     * @param {string} ls
     * @returns
     */
    fn_clearCommentsMultiLineBegin = (ls) => {
        if ((typeof ls !== 'string') || (ls === '')) return '';
        const gd = this.#gd;
        if (gd.bd === true) {
            const rx0 = /^\/*\*\*.*$/;
            if (rx0.test(ls) === true) {
                return ls;
            }
        }
        const rex = /\/\*.*?$/;
        const tm = ls.match(rex);
        if (Array.isArray(tm) && (tm.length > 0)) {
            const rv = ls.replace(tm[0], '').trim();
            gd.bcm = true;
            return rv;
        }
        else
            return ls;
    };


    /**
     * 다중주석 끝점 제거
     * @param {string} ls
     * @returns
     */
    fn_clearCommentsMultiLineEnd = (ls) => {
        if ((typeof ls !== 'string') || (ls === '')) return '';
        const gd = this.#gd;
        const rex = /^.*?\*\//;
        const tm = ls.match(rex);
        if (tm !== null) {
            const rv = ls.replace(tm[0], '').trim();
            gd.bcm = false;
            return rv;
        }
        else
            return '';
    };



    /**
     * 핵심 작업
     */
    fn_work = async () => {
        const gd = this.#gd;
        try {
            gd.rl = readline.createInterface({
                input: gd.frs,
                crlfDelay: Infinity
            });

            for await (let ls of gd.rl) {
                ls = ls.trim();
                if (ls === '') continue;
                ls = this.fn_clearCommentsOneLine(ls);
                ls = this.fn_clearCommentsMultiLineAll(ls);
                if (gd.bcm === false)
                    ls = this.fn_clearCommentsMultiLineBegin(ls);
                else
                    ls = this.fn_clearCommentsMultiLineEnd(ls);
                if (ls !== '') {
                    // console.log(ls);
                    if (gd.bf === true) {
                        gd.fws.write(ls);
                        gd.bf = false;
                    }
                    else {
                        gd.fws.write(os.EOL + ls);
                        // if (ls.endsWith(';'))
                        //     gd.fws.write(' ' + ls);
                        // else
                        //     gd.fws.write(os.EOL + ls);
                    }
                }
            }
        }
        catch (e) {
            console.log(`# Error  ${e}`);
        }
        finally {
            try { gd.rl.close(); } catch { }
        }

        return this;
    };


    fn_clear = () => {
        const gd = this.#gd;
        try { gd.rl.close(); } catch { }
    }
}


(async () => {
    const ifpa = ['hfCommon', 'hfCountTask', 'hfTween', 'hfWeich']
        .map((tx) => path.resolve(__dirname, `${tx}.js`));
    const ofp = path.resolve(__dirname, `..\\js\\hflib.js`);
    // console.log(`ifpa: ${ifpa}`);
    // console.log(`ofp: ${ofp}`);

    const fws = fs.createWriteStream(ofp);
    let pnow = new Date();
    for (const ifp of ifpa) {
        // console.log(ifp);
        try {
            fs.accessSync(ifp);
            // fs.accessSync(ofp);

            const frs = fs.createReadStream(ifp);
            const jsm = new JsMinifier2(frs, fws, true);
            await jsm.fn_work();

            try { frs.close(); } catch (e) { throw e; }
            try { jsm.fn_clear(); } catch (e) { throw e; }
            // fws.write('\n//>>>>>>>>>>>>>>>>>>>>>>\n//>>>>>>>>>>>>>>>>>>>>>>\n\n' + os.EOL);
            fws.write(os.EOL);
        }
        catch (e) {
            console.log(`# Error  ${e}`);
        }
    }
    try { fws.close(); } catch (e) { console.log(e); }
    pnow = new Date() - pnow;
    console.log(`# All done. [time: ${pnow}ms]`);

    // let pnow = new Date();
    // for (const fnm of fnma) {
    //     const jsm = new JsMinifier2(
    //         path.resolve(__dirname, `${fnm}.js`),
    //         path.resolve(__dirname, `..\\js\\hflib.js`));
    //     await jsm.fn_work();
    // }
    // pnow = new Date() - pnow;
    // console.log(`# All done. [time: ${pnow}ms]`);
})();














// 'use strict';
// const fs = require('node:fs');
// const path = require('node:path');
// const readline = require('node:readline');



// /**
//  * 한줄 주석 여부
//  * @param {string} ts (trim str)
//  * @returns boolean
//  */
// const fn_checkComments = (ts) => {
//     const rex = /^[ \t]*\/\/[^\r\n]*$/;
//     return rex.test(ts);
// };


// /**
//  * 레기온 주석 여부
//  * @param {string} ts (trim str)
//  * @returns boolean
//  */
// const fn_checkRegion = (ts) => {
//     return ts.startsWith('//#region ') || ts.startsWith('//#endregion ');
// };


// /**
//  * 에프터 기타 주석 제거
//  * @param {string} rstr
//  * @returns string
//  */
// const fn_afterClearComments = (rstr) => {
//     const rex = /\/\*[^\*\/]*\*\//gm;
//     return rstr.replaceAll(rex, '');
// };


// const _rlst = [`
// // ### lastest update 230304
// // The MIT License (MIT)
// // Copyright (c) 2023-present jungfocus7
// `.trim()];


// /**
//  * 핵심 작업
//  * @param {string} ip input
//  * @param {string} op output
//  */
// const fn_work = async (ip) => {
//     try {
//         const ifp = ip;
//         fs.accessSync(ifp);

//         const rl = readline.createInterface({
//             input: fs.createReadStream(ifp),
//             crlfDelay: Infinity,
//         });

//         for await (const ls of rl) {
//             const ts = ls.trim();
//             if (ts === '') continue;
//             if (fn_checkComments(ts) || fn_checkRegion(ts)) { }
//             else {
//                 _rlst.push(ts);
//             }
//         }
//     }
//     catch (e) {
//         console.log(`# Error  ${e}`);
//     }
// };


// /**
//  * 작업 진입점
//  * @param {array<string>} ta
//  */
// const fn_entry = async (ta) => {
//     const ipa = ta;
//     for (const ip of ipa) {
//         await fn_work(ip);
//     }

//     if (_rlst.length > 0) {
//         const rstr = fn_afterClearComments(_rlst.join('\n'));
//         // console.log(rstr);
//         const op = path.resolve(__dirname, '../js/hflib.js');
//         fs.writeFileSync(op, rstr, {encoding: 'utf8'});
//     }
// }


// const ipa = [
//     path.resolve(__dirname, 'hfCommon.js'),
//     path.resolve(__dirname, 'hfCountTask.js'),
//     path.resolve(__dirname, 'hfTween.js'),
//     path.resolve(__dirname, 'hfWeich.js'),
// ];
// fn_entry(ipa);

