/** @type {HTMLTextAreaElement} */
const _tam = document.querySelector('div.c_pec>textarea.c_tam');
// _tam.addEventListener('keydown', (ke) => {
//     ke.preventDefault();
// });

/**
 * @param {string | null} msg
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

