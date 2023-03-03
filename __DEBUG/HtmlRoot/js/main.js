'use strict';
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');


const hxp = Object.freeze({
    fn_checkComments: (ts = '') => {
        const rex = /^[ \t]*\/\/[^\r\n]*$/;
        return rex.test(ts);
    },

    fn_checkRegion: (ts) => {
        return ts.startsWith('//#region ') || ts.startsWith('//#endregion ');
    },

    fn_afterClearComments: (rstr = '') => {
        const rex = /\/\*[^\*\/]*\*\//gm;
        return rstr.replaceAll(rex, '');
    },

    fn_work: async (ip, op) => {
        try {
            const ifp = ip;
            fs.accessSync(ifp);
            const ofp = op;

            const rl = readline.createInterface({
                input: fs.createReadStream(ifp),
                crlfDelay: Infinity,
            });

            const lst = [];
            for await (const ls of rl) {
                if (ls === '') continue;
                const ts = ls.trim();
                if (hxp.fn_checkComments(ts) || hxp.fn_checkRegion(ts)) {
                    // console.log('패스하니다.', ts);
                }
                else {
                    lst.push(ls.trim());
                }
            }

            if (lst.length > 0) {
                // console.log(lst);
                const rstr = hxp.fn_afterClearComments(lst.join(' '));
                // console.log(rstr);
                fs.writeFileSync(ofp, rstr, {encoding: 'utf8'});
            }
        }
        catch (e) {
            console.log(`# Error  ${e}`);
        }
    }
});


const ip = path.resolve(__dirname, 'test2.js');
const op = path.resolve(__dirname, 'test2.dist.js');
hxp.fn_work(ip, op);












// (async () => {
//     try {
//         const ifp = path.resolve(__dirname, 'test1.js');
//         fs.accessSync(ifp);

//         const rl = readline.createInterface({
//             input: fs.createReadStream(ifp),
//             crlfDelay: Infinity,
//         });

//         const rex = /^[ \t]*\/\/[^\r\n]*$/;
//         // const arr = [];
//         for await (const ls of rl) {
//             // console.log(`Line from file: ${ls}`);
//             if (rex.test(ls) === true) {
//                 console.log(ls);
//             }
//         }
//     }
//     catch (e) {}

//     console.log('# End of all.');
// })();










// const terser = require('terser');


// (async () => {
//     const code = `
// //#region \`hfTween: 트윈 클래스\`
// //https://github.com/jungfocus7/jhb0b_as3_libs/blob/master/hbx/src/hbx/balence/CSmoothControl.as
// export class hfWeich extends EventTarget {
//     static ET_UPDATE = 'update';
//     static ET_END = 'end';

//     constructor(now, speed = 0.3) {
//         super();
//         this.#running = false;
//         this.#end = now;
//         this.#now = now;
//         this.#speed = speed;
//         Object.seal(this);
//     }

//     #running = false;
//     get Running() {
//         return this.#running;
//     }

//     #end = 0.0;
//     get End() {
//         return this.#end;
//     }

//     #now = 0.0;
//     get Now() {
//         return this.#now;
//     }

//     #speed = 0.0;
//     get Speed() {
//         return this.#speed;
//     }


//     #fid = -1;
//     #ClearFrame = () => {
//         if (this.#fid === -1) return;
//         cancelAnimationFrame(this.#fid);
//         this.#fid = -1;
//     }
//     #LoopFrame = (t) => {
//         if (this.#running === false) return;
//         const dst = this.#end - this.#now;
//         if (Math.abs(dst) < 1) {
//             this.#now = this.#end;
//             this.dispatchEvent(new Event(hfWeich.ET_END));
//             this.Stop();
//         }
//         else {
//             this.#now = this.#now + (dst * this.#speed);
//             this.dispatchEvent(new Event(hfWeich.ET_UPDATE));
//         }
//         this.#fid = requestAnimationFrame(this.#LoopFrame);
//     }


//     Stop() {
//         if (this.#running === true) {
//             this.#ClearFrame();
//             this.#running = false;
//         }
//     }

//     FromTo(end, now, speed = NaN) {
//         if (this.#running === true)
//             this.Stop();
//         this.#end = end;
//         this.#now = now;
//         if (isNaN(speed) === false)
//             this.#speed = speed;
//         this.#running = true;
//         this.#fid = requestAnimationFrame(this.#LoopFrame);
//     }

//     To(end, speed = NaN) {
//         this.FromTo(end, this.#now, speed);
//     }
// }
// //#endregion`.trim();
//     // const res = await terser.minify(code, {format: {quote_style: 1, comments: false}});

//     console.log('# end all.');


// })();


