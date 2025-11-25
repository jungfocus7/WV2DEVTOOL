import { fn_print, btns } from "./SubCom.js";
import { hfNumberRanger } from "../hbjs/hfNumberRanger.js";




const _nbrg = new hfNumberRanger(13, 10);
fn_print(`${_nbrg.toString()}`);

window.addEventListener('keydown', (te) => {
    const key = te.key;

    let br = false;
    if (key === 'ArrowLeft') {
        _nbrg.add(-1);
        br = true;
    } else if (key === 'ArrowRight') {
        _nbrg.add(1);
        br = true;
    } else if (key === 'Delete') {
        fn_print();
        return;
    }

    if (br) {
        fn_print(`${_nbrg.toString()}`, false);
    }
});


// btns[1].addEventListener('click', (te) => {
// });

// btns[2].addEventListener('click', (te) => {
// });

// btns[3].addEventListener('click', (te) => {
// });
