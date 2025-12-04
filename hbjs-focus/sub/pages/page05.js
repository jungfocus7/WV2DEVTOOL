import { dcs } from "../../hbjs/hfCommon.js";
import { hfWeich } from "../../hbjs/hfWeich.js";


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
 * @param {number} _ CurrentValue
 */
const fn_wc_cbf = (et, _) => {
    if (et === hfWeich.ET_UPDATE) {
        _cx = _wcx.now;
        _cy = _wcy.now;
        if (_uc === 0) {
            _uc = 1;
        } else {
            _uc = 0;
            _sce.setAttribute('cx', _cx);
            _sce.setAttribute('cy', _cy);
            fn_print(`${et}: (X=${ _cx }, Y=${ _cy });`);
        }
    } else if (et === hfWeich.ET_END) {
        if (_ec === 0) {
            _ec = 1;
        } else {
            _ec = 0;
            _cx = _wcx.end;
            _cy = _wcy.end;
            fn_print(`${et}: (X=${ _cx }, Y=${ _cy });`);
        }
    }
};

/**
 * @param {PointerEvent} pe
 */
const fn_svgCont_clh = (pe) => {
    fn_print();
    let mx = pe.offsetX;
    let my = pe.offsetY;
    fn_print(`begin: (X=${_cx}, Y=${_cy});`);
    fn_print(`end: (X=${mx}, Y=${my});`);
    _uc = 0;
    _ec = 0;
    _wcx.to(mx);
    _wcy.to(my);
};

/** @type {SVGSVGElement} */
let _svgCont = null;

/** @type {SVGCircleElement} */
let _sce = null;

/** @type {HTMLTextAreaElement} */
let _tam = null;

let _cx = 0; // current x
let _cy = 0; // current y

let _uc = 0;
let _ec = 0;

/** @type {hfWeich} */
let _wcx = null;
/** @type {hfWeich} */
let _wcy = null;


const fn_initWork = () => {
    _svgCont = _pec.querySelector('svg.c_svg');
    // console.log(_svgCont);
    _svgCont.addEventListener('click', fn_svgCont_clh);

    _sce = _svgCont.lastElementChild;
    // console.log(_sce);

    _tam = _pec.querySelector('textarea.c_tam');
    // dcs.log(_tam);

    try {
        _pec.querySelector('div.c_tip').textContent = `
[Empty]
        `.trim();
    } catch (err) {
        // dcs.log(err);
    }

    _cx = Number.parseInt(_sce.getAttribute('cx'), 10); // current x
    _cy = Number.parseInt(_sce.getAttribute('cy'), 10); // current y
    // console.log(_cx, _cy);

    _wcx = new hfWeich(_cx, 0.2, 1.0, fn_wc_cbf);
    _wcy = new hfWeich(_cy, 0.2, 1.0, fn_wc_cbf);
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
        _wcx.stop();
        _wcy.stop();
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
            _wcx.stop();
            _wcy.stop();
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

