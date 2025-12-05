import { dcs } from "../../hbjs/hfCommon.js";
import { hfNumberRanger } from "../../hbjs/hfNumberRanger.js";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_beforePrint = (t1) => {
    let msg = `
_nbrg = new hfNumberRanger(13, 10);
_nbrg.add(${t1});
_nbrg.min: ${_nbrg.min};
_nbrg.len: ${_nbrg.len};
_nbrg.max: ${_nbrg.max};
_nbrg.now: ${_nbrg.now};
    `.trim();
    fn_print(msg, false);
};

let _nbrg = new hfNumberRanger(13, 10);


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {string | null} msg
 * @param {boolean} ba
 * @returns
 */
const fn_print = (msg=null, ba=true) => {
    if (_tam == null) {
        _tam = _pageData.pge.querySelector('div.c_pec>textarea.c_tam');
    }
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
 * @param {KeyboardEvent} ke
 */
const fn_keydown = (ke) => {
    // dcs.log('fn_keydown');

    ke.preventDefault();

    const kcd = ke.code;
    if (kcd === 'ArrowLeft') {
        _nbrg.add(-1);
        fn_beforePrint('-1');
    } else if (kcd === 'ArrowRight') {
        _nbrg.add(1);
        fn_beforePrint('1');
    } else if (kcd === 'Delete') {
        fn_print();
        return;
    }
};

/**
 * @param {PointerEvent} pe
 */
const fn_btn_clh = (pe) => {
    // dcs.log('fn_btn_clh');
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_clear = () => {
    // dcs.log('fn_clear');
};

const fn_stop = () => {
    // dcs.log('fn_stop');
};

const fn_init = (pd) => {
    // dcs.log('fn_init');

    _pageData = pd;
    // dcs.log(_pageData.mbtn, _pageData.pge);

    _pageData.pge.addEventListener('keydown', fn_keydown);
    _pec = _pageData.pge.querySelector('div.c_pec');
    // dcs.log(_pec);
    _pec.style.visibility = 'visible';

    _tam = _pec.querySelector('textarea.c_tam');
    // dcs.log(_tam);

    _footer = _pec.querySelector('div.c_footer');
    // dcs.log(_footer);

    _pec.querySelector('div.c_tip').textContent = `
[##KeyDown]
 ArrowLeft: add(-1), ArrowRight: add(1), Delete: clear
    `.trim();

    _btnArr = Array.from(_footer.children);
    // dcs.log(_btnArr);
    for (let te of _btnArr) {
        te.addEventListener('click', fn_btn_clh);
    }

    fn_beforePrint('1');
};

/** @type {IPageData} */
let _pageData = null;

/** @type {HTMLDivElement} */
let _pec = null;

/** @type {HTMLTextAreaElement} */
let _tam = null;

/** @type {HTMLDivElement} */
let _footer = null;

/** @type {HTMLDivElement[]} */
let _btnArr = null;


export default {
    fn_clear, fn_stop, fn_init
};

