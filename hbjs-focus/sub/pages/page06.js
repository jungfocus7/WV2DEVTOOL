import { dcs } from "../../hbjs/hfCommon.js";
import { hfFrameRepeater } from "../../hbjs/hfFrameRepeater.js";


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

const fn_cbf = (et, re, rc) => {
    fn_print(`et:${et}, re:${re}, rc:${rc}`);
};
let _frpt = new hfFrameRepeater(5, 100, fn_cbf);
// fn_print(`${_frpt.toString()}`);


/**
 * @param {KeyboardEvent} ke
 */
const fn_keydown = (ke) => {
    // dcs.log('fn_keydown');
    dcs.log(ke.code);

    ke.preventDefault();

    let kcd = ke.code;
    if (kcd === 'Backquote') {
        _frpt.reset();
    } else if (kcd === 'Digit1') {
        _frpt.start();
    } else if (kcd === 'Digit2') {
        _frpt.stop();
    } else if (kcd === 'Delete') {
        _frpt.stop();
        fn_print(null);
    }
};

/**
 * @param {PointerEvent} pe
 */
const fn_btn_clh = (pe) => {
    // dcs.log('fn_btn_clh');

    /** @type {HTMLDivElement} */
    let te = pe.currentTarget;
    let nm = te.textContent.trim();
    // dcs.log(nm);

    switch (nm) {
        case 'Clear': {
            _frpt.stop();
            fn_print(null);
            break;
        }
    }
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
 Backquote: reset(), Digit1: start(), Digit2: stop(), Delete: Clear
    `.trim();

    _btnArr = Array.from(_footer.children);
    // dcs.log(_btnArr);
    for (let te of _btnArr) {
        te.addEventListener('click', fn_btn_clh);
    }
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

