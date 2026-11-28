/**
 * @typedef {object} IPageData
 *
 * @property {HTMLDivElement} rootCont
 * @property {HTMLDivElement} leftMenuCont
 * @property {HTMLDivElement} pageCont
 *
 * @property {HTMLDivElement} mbtn
 * @property {number} mi
 * @property {string} pgtnm
 * @property {string} pgtp
 * @property {string} pgurl
 * @property {HTMLDivElement} pge
 *
 * @property {() => void} fn_clear
 * @property {() => void} fn_stop
 * @property {(pd: IPageData) => void} fn_init
 */


/**
 * @typedef {object} IPageWork
 *
 * @property {() => void} fn_clear
 * @property {() => void} fn_stop
 * @property {(pd: IPageData) => void} fn_init
 */


