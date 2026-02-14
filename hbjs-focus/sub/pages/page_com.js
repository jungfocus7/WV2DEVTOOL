/** @type {HTMLTextAreaElement} */
let _tam = null;

/**
 * @param {string | null} msg
 * @param {boolean} ba
 * @returns
 */
export const fn_print = (msg=null, ba=true) => {
    if (msg == null) {
        _tam.value = '';
        return;
    }
    // console.log(_tam.textContent);
    // console.log(_tam.innerHTML);
    // console.log(_tam.value); //textarea는 value권장(아주)
    let txv = (ba) ? _tam.value + msg + '\n' : msg;
    _tam.value = txv;
    _tam.scrollTop = _tam.scrollHeight;
};

/**
 * @param {HTMLDivElement} pge
 */
export const fn_set = (pge) => {
    _tam = pge.querySelector('div.c_pec>textarea.c_tam');
    fn_print(null);
};

