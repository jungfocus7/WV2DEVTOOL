/**
 * 넘버인지 확인후 반환
 * @param {number | string} tv
 * @param {number} dv
 * @returns {number}
 */
const fn_checkNumber = (tv, dv=0) => {
    let rv = NaN;
    if (typeof tv === 'number')
        rv = tv;
    else if (typeof tv === 'string')
        rv = Number.parseFloat(tv);

    if (Number.isFinite(rv))
        return rv;
    else
        return dv;
};

/**
 * HTMLElement 스타일 객체 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {boolean} bw writeable
 * @returns {CSSStyleDeclaration}
 */
const fn_getStyle = (to, bw=false) => {
    if (to instanceof CSSStyleDeclaration)
        return to;
    else if (to instanceof HTMLElement) {
        if (bw)
            return to.style;
        else
            return getComputedStyle(to);
    }
    else
        return null;
};

/**
 * HTMLElement width(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {number}
 */
const fn_getWidth = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tv = csd.getPropertyValue('width');
        return fn_checkNumber(tv);
    }
    else return 0;
};

/**
 * HTMLElement width(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv
 */
const fn_setWidth = (to, tv) => {
    const csd = fn_getStyle(to, true);
    if (csd) {
        tv = fn_checkNumber(tv);
        csd.setProperty('width', `${tv}px`);
    }
};


/**
 * HTMLElement height(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {number}
 */
const fn_getHeight = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tv = csd.getPropertyValue('height');
        return fn_checkNumber(tv);
    }
    else return 0;
};

/**
 * HTMLElement height(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv
 */
const fn_setHeight = (to, tv) => {
    const csd = fn_getStyle(to, true);
    if (csd) {
        tv = fn_checkNumber(tv);
        csd.setProperty('height', `${tv}px`);
    }
};

/**
 * HTMLElement left(Number) 가져오기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {number}
 */
const fn_getLeft = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tv = csd.getPropertyValue('left');
        return fn_checkNumber(tv);
    }
    else return 0;
};

/**
 * HTMLElement left(Number) 설정하기
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv
 */
const fn_setLeft = (to, tv) => {
    const csd = fn_getStyle(to, true);
    if (csd) {
        tv = fn_checkNumber(tv);
        csd.setProperty('left', `${tv}px`);
    }
};

/**
 * HTMLElement top(Number) 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {number}
 */
const fn_getTop = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tv = csd.getPropertyValue('top');
        return fn_checkNumber(tv);
    }
    else return 0;
};

/**
 * HTMLElement top(Number) 설정
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {number} tv
 */
const fn_setTop = (to, tv) => {
    const csd = fn_getStyle(to, true);
    if (csd) {
        tv = fn_checkNumber(tv);
        csd.setProperty('top', `${tv}px`);
    }
};

/**
 * HTMLElement Rect 반환
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @returns {DOMRect}
 */
const fn_getRect = (to) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tx = fn_getLeft(csd);
        let ty = fn_getTop(csd);
        let tw = fn_getWidth(csd);
        let th = fn_getHeight(csd);
        let rct = new DOMRect(tx, ty, tw, th);
        return rct;
    }
    else return null;
};

/**
 * TargetObject를 rct로 업데이트 한다.
 * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
 * @param {DOMRect} rct
 */
const fn_updateRect = (to, rct) => {
    const csd = fn_getStyle(to);
    if (csd) {
        let tw = fn_getWidth(csd);
        let th = fn_getHeight(csd);
        let tx = fn_getLeft(csd);
        let ty = fn_getTop(csd);
        rct.width = tw;
        rct.height = th;
        rct.x = tx;
        rct.y = ty;
    }
};

/**
 * Rect에 좌표(tx, ty)가 포함되는지 여부
 * @param {DOMRect} rct
 * @param {number} tx
 * @param {number} ty
 * @returns {boolean}
 */
const fn_containsRect = (rct, tx, ty) => {
    const rb =
        ((rct.left <= tx) && (rct.right >= tx)) &&
        ((rct.top <= ty) && (rct.bottom >= ty));
    return rb;
};

/**
 * Element에 Rect 적용하기
 * @param {CSSStyleDeclaration | HTMLElement} to
 * @param {DOMRect} rct
 */
const fn_applyRectToElement = (to, rct) => {
    const csd = fn_getStyle(to, true);
    if ((csd !== null) && (rct instanceof DOMRect)) {
        fn_setLeft(csd, rct.left);
        fn_setTop(csd, rct.top);
        fn_setWidth(csd, rct.width);
        fn_setHeight(csd, rct.height);
    }
};


export const hfStyleHelper = Object.freeze({
    fn_checkNumber,
    fn_getStyle,
    fn_getWidth, fn_setWidth,
    fn_getHeight,fn_setHeight,
    fn_getLeft, fn_setLeft,
    fn_getTop, fn_setTop,
    fn_getRect, fn_updateRect,
    fn_containsRect,
    fn_applyRectToElement,
});
