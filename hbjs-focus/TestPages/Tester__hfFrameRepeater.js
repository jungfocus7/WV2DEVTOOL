import { tam, fn_print, btns } from "./SubCom.js";
import { hfFrameRepeater } from "../hbjs/hfFrameRepeater.js";


const fn_cbf = (et, re, rc) => {
    fn_print(`et:${et}, re:${re}, rc:${rc}`);
};
const _frpt = new hfFrameRepeater(5, 100, fn_cbf);
// fn_print(`${_frpt.toString()}`);

window.addEventListener('keydown', (ke) => {
    let kcd = ke.code;
    if (kcd === 'Backquote') {
        _frpt.reset();
    } else if (kcd === 'Digit1') {
        _frpt.start();
    } else if (kcd === 'Digit2') {
        _frpt.stop();
    }
});





// tam.addEventListener('keydown', (te) => {
//     const key = te.key;

//     let br = false;
//     if (key === 'ArrowUp') {
//         _nbrg.add(-32 / 9.2);
//         br = true;
//     } else if (key === 'ArrowDown') {
//         _nbrg.add(32 / 9.2);
//         br = true;
//     }

//     if (br) {
//         fn_print(`${_nbrg.toString()}`);
//     }
// });