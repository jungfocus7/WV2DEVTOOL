// import * as ff from "./js/hflib.js";
// console.log(ff);
// ff.hfnum.RandRange();


const _wnd = window;
const _doc = document;
const _droot = document.getElementById('droot');
const _dlmenu = document.getElementById('dlmenu');
const _drcont = document.getElementById('drcont');

(() => {
    const tag = `
    <button class="c_bt"><span>01) TimeStamp Tool</span></button>
    <button class="c_bt"><span>02) Base64 Tool</span></button>
    <button class="c_bt"><span>03) </span></button>
    <button class="c_bt"><span>04) </span></button>
    <button class="c_bt"><span>05) </span></button>
    `.trim();
    _dlmenu.innerHTML = tag;


    const fn_resize = (e) => {
        console.log('>>>');
        // console.log(Object.keys(e));
        const st1 = getComputedStyle(_droot);
        const ts = `width: ${st1.width}, height: ${st1.height}`;
        console.log(ts);
    };
    _wnd.addEventListener('resize', fn_resize);
    fn_resize(null);


    // const tar = _drcont.querySelector('.c_tar');
    // tar.textContent = '아무고토';
    // // console.log(tar);
    // tar.addEventListener('keydown', (e) => {
    //     // console.log('tar keydown', e);
    //     // console.log(e);
    //     if (e.ctrlKey === true) {
    //         if (e.key === 'Enter') {
    //             console.log('정규식 계산하기');
    //             // console.log(tar);
    //             // console.log(tar.textContent);
    //             console.log(tar.value);
    //             // console.log(tar.wrap);
    //         }
    //     }
    // });


    // _doc.addEventListener('resize', (e) => {
    //     // console.log('>>>>>>>>> ' + e);
    //     let x1 = JSON.stringify(e);
    //     console.log(x1);
    // });
    // alert(_doc);



    // _wnd.addEventListener('keydown', (e) => {
    //     console.log('window keydown', e);
    //     // console.log(e);
    // });

    // _doc.addEventListener('keydown', (e) => {
    //     console.log('document keydown', e);
    //     // console.log(e);
    // });
})();










// import { hfnum, hfdtime } from "./js/hflib.js";



// const tx1 = hfnum.RandRange(10, 20);

// const tx2 = hfdtime.TimeStamp(new Date());

// console.log('데이터 마이닝', tx1, tx2);
















// console.log(window.d_xxx);


// (async () => {

//     const code = `
//     //#region hfTween: 트윈 클래스
//     //https://github.com/jungfocus7/jhb0b_as3_libs/blob/master/hbx/src/hbx/balence/CSmoothControl.as
//     export class hfWeich extends EventTarget {
//         static ET_UPDATE = 'update';
//         static ET_END = 'end';

//         constructor(now, speed = 0.3) {
//             super();
//             this.#running = false;
//             this.#end = now;
//             this.#now = now;
//             this.#speed = speed;
//             Object.seal(this);
//         }

//         #running = false;
//         get Running() {
//             return this.#running;
//         }

//         #end = 0.0;
//         get End() {
//             return this.#end;
//         }

//         #now = 0.0;
//         get Now() {
//             return this.#now;
//         }

//         #speed = 0.0;
//         get Speed() {
//             return this.#speed;
//         }


//         #fid = -1;
//         #ClearFrame = () => {
//             if (this.#fid === -1) return;
//             cancelAnimationFrame(this.#fid);
//             this.#fid = -1;
//         }
//         #LoopFrame = (t) => {
//             if (this.#running === false) return;
//             const dst = this.#end - this.#now;
//             if (Math.abs(dst) < 1) {
//                 this.#now = this.#end;
//                 this.dispatchEvent(new Event(hfWeich.ET_END));
//                 this.Stop();
//             }
//             else {
//                 this.#now = this.#now + (dst * this.#speed);
//                 this.dispatchEvent(new Event(hfWeich.ET_UPDATE));
//             }
//             this.#fid = requestAnimationFrame(this.#LoopFrame);
//         }


//         Stop() {
//             if (this.#running === true) {
//                 this.#ClearFrame();
//                 this.#running = false;
//             }
//         }

//         FromTo(end, now, speed = NaN) {
//             if (this.#running === true)
//                 this.Stop();
//             this.#end = end;
//             this.#now = now;
//             if (isNaN(speed) === false)
//                 this.#speed = speed;
//             this.#running = true;
//             this.#fid = requestAnimationFrame(this.#LoopFrame);
//         }

//         To(end, speed = NaN) {
//             this.FromTo(end, this.#now, speed);
//         }
//     }
//     //#endregion
//     `;
//     const res = await d_xxx.minify(code, {format: {quote_style: 1, comments: false}});
//     console.log(res);

//     // window.d_xxx.minify();

// })();

