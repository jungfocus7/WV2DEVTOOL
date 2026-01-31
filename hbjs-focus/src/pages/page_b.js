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
            break;
        }
    }
};

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
    const pd = _page02;

    if (pd.mbtn === null) {
        pd.leftMenuCont.insertAdjacentHTML('beforeend', `
<button type="button" class="c_bt"><span>02) hfCountTask</span></button>
        `.trim());
        pd.mbtn = pd.leftMenuCont.lastElementChild;

        // dcs.log('# 메뉴 생성완료');
    }
};

/**
 * Page 생성
 */
const fn_createPageData = () => {
    const pd = _page02;

    if (pd.pge === null) {
        pd.pageCont.insertAdjacentHTML('beforeend', `
<div class="c_page" data-index="0" tabindex="02">
  <span class="c_tname">hfCountTask</span>
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
    const pd = _page02;

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
    const pd = _page02;

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
const _page02 = {
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
Object.seal(_page02);

export { _page02 }
//#endregion }}
