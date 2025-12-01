import { dcs } from "../../hbjs/hfCommon.js";
import { fn_set, fn_print } from "./page_com.js";
import { hfCountTask } from "../../hbjs/hfCountTask.js";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {KeyboardEvent} ke
 */
const fn_keydown = (ke) => {
    ke.preventDefault();
};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * @param {PointerEvent} pe
 */
const fn_btn_clh = (pe) => {

};


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_clear = () => {
    dcs.log('fn_clear');
};

const fn_stop = () => {
    dcs.log('fn_stop');
};

const fn_init = (pd) => {
    _pageData = pd;
    // dcs.log(_pageData.pge, _pageData.mbtn);

    _pageData.pge.addEventListener('keydown', fn_keydown);
    fn_set(_pageData.pge);

    _footerCont = _pageData.pge.querySelector('div.c_pec>div.c_footer');
    // dcs.log(_footerCont);

    let le = _footerCont.lastElementChild;
    if (le) {
        _btnArr = Array.from(_footerCont.children);
        // dcs.log(_btnArr);

        for (let te of _btnArr) {
            te.addEventListener('click', fn_btn_clh);
        }
    }

    // dcs.log('fn_init');
};

/** @type {IPageData} */
let _pageData = null;

/** @type {HTMLDivElement} */
let _footerCont = null;

/** @type {HTMLDivElement[]} */
let _btnArr = null;


export default {
    fn_clear, fn_stop, fn_init
};

