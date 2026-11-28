import { hfdc } from "../../hfjs/core/hfdc.mjs";
import { hfCountTask } from "../../hfjs/mods/hfCountTask.mjs";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {string | null} msg
 * @param {boolean} ba
 * @returns
 */
const fn_print = (msg=null, ba=true) => {
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
 * ??
 * @param {string} t1
 */
const fn_beforePrint = (t1) => {
    let msg = `
_cnt = new hfCountTask(17, 321, -21.2134)
_cnt.${t1}();
_cnt.begin: ${_cnt.begin};
_cnt.end: ${_cnt.end};
_cnt.add: ${_cnt.add};
_cnt.now: ${_cnt.now};
    `.trim();
    fn_print(msg, false);
};

let _cnt = new hfCountTask(17, 321, -21.2134);

/**
 * @param {KeyboardEvent} ke
 */
const fn_keydown = (ke) => {
    // dcs.log('fn_keydown');

    ke.preventDefault();

    const kcd = ke.code;
    if (kcd === 'ArrowLeft') {
        _cnt.fn_prev();
        fn_beforePrint('prev');
    } else if (kcd === 'ArrowRight') {
        _cnt.fn_next();
        fn_beforePrint('next');
    } else if (kcd === 'Delete') {
        fn_print();
        return;
    }
};

/**
 * @param {PointerEvent} pe
 */
const fn_btn_clh = (pe) => {
    hfdc.fn_log('fn_btn_clh');
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * ??
 */
const fn_clear = () => {
    hfdc.fn_log('fn_clear');
};

/**
 * ??
 */
const fn_stop = () => {
    hfdc.fn_log('fn_stop');
};

/**
 * @param {IPageData} pd
 */
const fn_init = (pd) => {
    hfdc.fn_log('fn_init');

    _pageData = pd;
    hfdc.fn_log(_pageData.mbtn, _pageData.pge);

    _pageData.pge.addEventListener('keydown', fn_keydown);
    _pec = _pageData.pge.querySelector('div.c_pec');
    hfdc.fn_log(_pec);
    _pec.style.visibility = 'visible';

    _tam = _pec.querySelector('textarea.c_tam');
    hfdc.fn_log(_tam);

    _footer = _pec.querySelector('div.c_footer');
    hfdc.fn_log(_footer);

    _pec.querySelector('div.c_tip').textContent = `
[##KeyDown]
 ArrowLeft: prev, ArrowRight: next, Delete: clear
    `.trim();

    _btnArr = /** @type {HTMLDivElement[]} */ (Array.from(_footer.children));
    hfdc.fn_log(_btnArr);

    for (let te of _btnArr) {
        te.addEventListener('click', fn_btn_clh);
    }

    fn_beforePrint('prev');
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

