/**
 * @typedef {object} GlobalDataObject
 *
 * @property {HTMLDivElement} rootCont
 * @property {HTMLDivElement} leftMenuCont
 * @property {HTMLDivElement} pageCont
 *
 * @property {PageData[]} pageDataArr
 */


/**
 * @typedef {object} PageData
 *
 * @property {GlobalDataObject} gdo
 *
 * @property {HTMLDivElement} rootCont
 * @property {HTMLDivElement} leftMenuCont
 * @property {HTMLDivElement} pageCont
 *
 * @property {HTMLButtonElement} mbtn
 * @property {HTMLDivElement} pge
 *
 * @property {(gdo: GlobalDataObject) => void} fn_initOnce
 * @property {() => void} fn_stop
 *
 * @property {() => void} fn_scrollJump
 * @property {() => void} fn_pagesPositionOrder
 *
 * @property {HTMLTextAreaElement} txa
 * @property {(msg: string, ba: boolean) => void} fn_print
 *
 * @property {HTMLButtonElement[]} ftbtns
 */
