'use strict';

//#region {{~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  공통
export const tam = document.getElementById('_tam');
export const fn_print = (msg) => {
    if (msg === null) {
        tam.textContent = '';
        return;
    }
    // console.log(_tam.textContent);
    // console.log(_tam.innerHTML);
    // console.log(_tam.value);
    let txv = tam.textContent + msg + '\n';
    tam.textContent = txv;
    tam.scrollTop = tam.scrollHeight;
};


export const btns = document.querySelectorAll('button.c_bt');
btns[0].addEventListener('click', (te) => {
    fn_print(null);
});
//#endregion }}
