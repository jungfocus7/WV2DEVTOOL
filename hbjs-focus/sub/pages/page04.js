<<<<<<< HEAD:hbjs-focus/sub/pages/page04.js
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
=======
import "../_defs.js";
import { dcs, hfEventTypes } from "../../hbjs/hfCommon.js";
import { hfCountTask } from "../../hbjs/hfCountTask.js";


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 01)
/**
 * @param {PointerEvent} pe
 */
const fn_ftbtns_cl = (pe) => {
    /** @type {HTMLButtonElement} */
    let btn = pe.currentTarget;
    let nc = btn.textContent.substring(0, 2);
    switch (nc) {
        case '00': {
            fn_print(null);
>>>>>>> main:hbjs-focus/src/pages/page04.js
            break;
        }
    }
};

<<<<<<< HEAD:hbjs-focus/sub/pages/page04.js

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

=======
const fn_printAll = () => {
    // fn_print(`begin: ${ _cnt.begin };`);
    // fn_print(`end: ${ _cnt.end };`);
    // fn_print(`add: ${ _cnt.add };`);
    // fn_print(`now: ${ _cnt.now };\n`);
    let msg = `
begin: ${ _cnt.begin },
end: ${ _cnt.end },
add: ${ _cnt.add },
now: ${ _cnt.now },
    `.trim();
    fn_print(msg, false);
};
const _cnt = new hfCountTask(17, 321, -21.2134);

/**
 * @param {KeyboardEvent} ke
 */
const fn_pge_kd = (ke) => {
    const kcd = ke.code;
    // dcs.log(kcd);

    let br = false;
    if (kcd === 'ArrowLeft') {
        _cnt.prev();
        br = true;
    } else if (kcd === 'ArrowRight') {
        _cnt.next();
        br = true;
    } else if (kcd === 'Delete') {
        fn_print();
        return;
    }

    if (br) {
        fn_printAll();
    }
};
//#endregion }}


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 00)
/**
 * Menu 생성
 */
const fn_createMenu = () => {
    const pd = _page04;

    if (pd.mbtn === null) {
        pd.leftMenuCont.insertAdjacentHTML('beforeend', `
<button type="button" class="c_bt"><span>04) hfNumberRanger</span></button>
        `.trim());
        pd.mbtn = pd.leftMenuCont.lastElementChild;

        // dcs.log('# 메뉴 생성완료');
    }
};

/**
 * Page 생성
 */
const fn_createPageData = () => {
    const pd = _page04;

    if (pd.pge === null) {
        pd.pageCont.insertAdjacentHTML('beforeend', `
<div class="c_page" data-index="0" tabindex="02">
  <span class="c_tname">hfNumberRanger</span>
  <textarea class="c_tam" placeholder="empty" name="empty" spellcheck="false" readonly></textarea>
  <div class="c_btc">
      <button type="button" class="c_bt"><span>00)clear</span></button>
  </div>
</div>
        `.trim());
        pd.pge = pd.pageCont.lastElementChild;

        pd.txa = pd.pge.querySelector('textarea.c_tam');

        pd.ftbtns = Array.from(pd.pge.querySelectorAll('div.c_btc>button.c_bt'));
        for (let btn of pd.ftbtns) {
            btn.addEventListener(hfEventTypes.CLICK, fn_ftbtns_cl);
        }

        pd.pge.addEventListener('keydown', fn_pge_kd);

        // dcs.log('# 페이지 생성완료');
    }
};

/**
 * 작업 중지
 */
const fn_stop = () => {
};

/**
 * 기능 출력
 * @param {string} msg
 * @returns
 */
const fn_print = (msg=null, ba=true) => {
    const pd = _page04;

    if (msg === null) {
        pd.txa.value = '';
        return;
    } else {
        let txt = pd.txa.value;
        txt = (ba) ? `${txt}${msg}\n` : `${msg}\n`;
        pd.txa.value = txt;
        pd.txa.scrollTop = pd.txa.scrollHeight;
    }
};

/**
 * 한번 초기화
 * @param {GlobalDataObject} gdo
 */
const fn_initOnce = (gdo) => {
    const pd = _page04;

    if (pd.gdo === null) {
        pd.gdo = gdo;

        pd.rootCont = gdo.rootCont;
        pd.leftMenuCont = gdo.leftMenuCont;
        pd.pageCont = gdo.pageCont;

        fn_createMenu();
        fn_createPageData();

        pd.gdo.pageDataArr.push(pd);
    }
};


/** @type {PageData} */
const _page04 = {
    gdo: null,

    rootCont: null,
    leftMenuCont: null,
    pageCont: null,

    mbtn: null,
    pge: null,

    fn_initOnce,
    fn_stop,

    fn_scrollJump: null,
    fn_pagesPositionOrder: null,

    txa: null,
    fn_print,

    ftbtns: null,
};
Object.seal(_page04);

export { _page04 }
//#endregion }}
>>>>>>> main:hbjs-focus/src/pages/page04.js
