import { dcs } from "../../hbjs/hfCommon.js";
import {
    hfEasingKind,
    hfEaseBack,
    hfEaseBounce,
    hfEaseCircular,
    hfEaseElastic,
    hfEaseExponential,
    hfTween,
} from "../../hbjs/hfTween.js";


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
 * @param {string} et EventType
 * @param {number} cv CurrentValue
 */
const fn_twa_cbf = (et, cv) => {
    if (et === hfTween.ET_UPDATE) {
        _cx = _bx + (_xv * cv);
        _cy = _by + (_yv * cv);
        _ce.setAttribute('cx', _cx);
        _ce.setAttribute('cy', _cy);
        fn_print(`${et}: (X=${_cx}, Y=${_cy});`);
    } else if (et === hfTween.ET_END) {
        fn_print(`${et}: (X=${_cx}, Y=${_cy});`);
    }
};

/**
 * @param {PointerEvent} pe
 */
const fn_svgCont_clh = (pe) => {
    fn_print();
    fn_print(`begin: (X=${_cx}, Y=${_cy});`);
    _bx = _cx, _by = _cy;
    _ex = pe.offsetX, _ey = pe.offsetY;
    _xv = _ex - _cx, _yv = _ey - _cy;
    _twa.fromTo(0, 1);
};

/** @type {SVGSVGElement} */
let _svgCont = null;

/** @type {SVGCircleElement} */
let _ce = null;

/** @type {HTMLTextAreaElement} */
let _tam = null;

let _cx = 0; // current x
let _cy = 0; // current y

let _bx = 0.0, _by = 0.0; // begin point
let _ex = 0.0, _ey = 0.0; // end point
let _xv = 0.0, _yv = 0.0; // vector point

/** @type {hfTween} */
let _twa = null;


const fn_initWork = () => {
    _svgCont = _pec.querySelector('svg.c_svg');
    // console.log(_svgCont);
    _svgCont.addEventListener('click', fn_svgCont_clh);

    _ce = _svgCont.lastElementChild;
    // console.log(_ce);

    _tam = _pec.querySelector('textarea.c_tam');
    // dcs.log(_tam);

    try {
        _pec.querySelector('div.c_tip').textContent = `
[Empty]
        `.trim();
    } catch (err) {
        // dcs.log(err);
    }

    _cx = Number.parseInt(_ce.getAttribute('cx'), 10); // current x
    _cy = Number.parseInt(_ce.getAttribute('cy'), 10); // current y
    // console.log(_cx, _cy);

    _twa = new hfTween(_cy, 36,
        new hfEaseElastic(hfEasingKind.easeOut), fn_twa_cbf);
};




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {KeyboardEvent} ke
 */
const fn_keydown = (ke) => {
    // dcs.log('fn_keydown');

    ke.preventDefault();

    const kcd = ke.code;
    if (kcd === 'Delete') {
        fn_print(null);
        _twa.stop();
        return;
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
            fn_print(null);
            _twa.stop();
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

    _footer = _pec.querySelector('div.c_footer');
    // dcs.log(_footer);

    /** @type {HTMLDivElement[]} */
    let hea = Array.from(_footer.children);
    for (let he of hea) {
        he.addEventListener('click', fn_btn_clh);
    }

    fn_initWork();
};

/** @type {IPageData} */
let _pageData = null;

/** @type {HTMLDivElement} */
let _pec = null;

/** @type {HTMLDivElement} */
let _footer = null;


export default {
    fn_clear, fn_stop, fn_init
};

