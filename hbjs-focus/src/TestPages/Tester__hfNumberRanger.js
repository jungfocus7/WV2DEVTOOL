import { tam, fn_print, btns } from "./SubCom.js";
import { hfNumberRanger } from "../hbjs/hfNumberRanger.js";




const _nbrg = new hfNumberRanger(31, 985);
fn_print(`${_nbrg.toString()}`);

tam.addEventListener('keydown', (te) => {
    const key = te.key;

    let br = false;
    if (key === 'ArrowUp') {
        _nbrg.add(-32 / 9.2);
        br = true;
    } else if (key === 'ArrowDown') {
        _nbrg.add(32 / 9.2);
        br = true;
    }

    if (br) {
        fn_print(`${_nbrg.toString()}`);
    }
});


btns[1].addEventListener('click', (te) => {
});

btns[2].addEventListener('click', (te) => {
});

btns[3].addEventListener('click', (te) => {
});
