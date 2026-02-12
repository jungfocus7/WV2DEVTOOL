// import { dcs } from "../../hbjs/hfCommon.js";
import { hfScrollLogicType, hfScrollLogic } from "../../hbjs/hfScrollLogic.js";



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
 * @param {string} cbt - CallbackType
 * @param {number} sr - ScrollSizeRatio
 * @param {number} pr - ScrollPositionRatio
 * @returns {void}
 */
const fn_scrlg_cbf = (cbt, sr, pr) => {
    fn_print(`cbt:${cbt}, sr:${sr}, pr:${pr}`);
};
/** @type {hfScrollLogic} */
let _scrlgV = null;

/** @type {hfScrollLogic} */
let _scrlgH = null;


/**
 * @param {PointerEvent} pe
 */
const fn_btn_clh = (pe) => {
    // dcs.log('fn_btn_clh');

    let te = /** @type {HTMLDivElement} */(pe.currentTarget);
    let nm = te.textContent.trim();
    // dcs.log(nm);

    switch (nm) {
        case 'Clear': {
            fn_print(null);
            break;
        }

        case 'Open ScrollWave': {
            // alert('1004');

            const fn_openPopup = () => {
                let tw = 700; // 팝업 너비
                let th = 500; // 팝업 높이
                // let tl = (window.screen.width / 2) - (tw / 2);
                // let tt = (window.screen.height / 2) - (th / 2);
                let tl = 100;
                let tt = 40;
                window.open('/sub/page91a/page91a.html', 'popup',
                    `width=${tw}, height=${th}, top=${tt}, left=${tl},
                     toolbar=no, menubar=no, scrollbars=yes, resizable=no,
                     location=no, status=no`);
            };
            fn_openPopup();
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

/**
 * @param {IPageData} pd
 */
const fn_init = (pd) => {
    // dcs.log('fn_init');

    _pageData = pd;
    // dcs.log(_pageData.mbtn, _pageData.pge);

    // _pageData.pge.addEventListener('keydown', fn_keydown);
    _pec = _pageData.pge.querySelector('div.c_pec');
    // dcs.log(_pec);
    _pec.style.visibility = 'visible';

    _tam = _pec.querySelector('textarea.c_tam');
    // dcs.log(_tam);

    _footer = _pec.querySelector('div.c_footer');
    // dcs.log(_footer);

    _btnArr = /** @type {HTMLDivElement[]} */(Array.from(_footer.children));
    // dcs.log(_btnArr);
    for (let te of _btnArr) {
        te.addEventListener('click', fn_btn_clh);
    }


    let scrc = _pec.querySelector('.c_scroll-cont');

    const fn_rdsr = () => {
        // let min = 30;
        // let max = 100;
        // let rv = min + Math.floor(Math.random() * (max - min + 1));
        // return rv / 100;
        return 0.1;
    };

    _scrlgV = new hfScrollLogic({
        logicType: hfScrollLogicType.VERTICAL,
        heTarget: scrc.querySelector('#vscr'),
        targetStyle: null,
        thumbHtml: null,
        cbf: fn_scrlg_cbf,
    });
    _scrlgV.fn_setScrollSizeRatio(fn_rdsr());

    _scrlgH = new hfScrollLogic({
        logicType: hfScrollLogicType.HORIZONTAL,
        heTarget: scrc.querySelector('#hscr'),
        targetStyle: null,
        thumbHtml: null,
        cbf: fn_scrlg_cbf,
    });
    _scrlgH.fn_setScrollSizeRatio(fn_rdsr());

    fn_print(null);
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

