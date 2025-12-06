export const fn_getStyles = (to, bw = false) => {
    if (to instanceof CSSStyleDeclaration)
        return to;
    else if (to instanceof HTMLElement) {
        if (bw === true)
            return to.style;
        else
            return getComputedStyle(to);
    }
    else
        return null;
};
export const fn_checkNumber = (tv, dv = 0.0) => {
    let rv = NaN;
    if (typeof tv === 'number')
        rv = tv;
    else if (typeof tv === 'string')
        rv = Number.parseFloat(tv);
    if (Number.isFinite(rv) === true)
        return rv;
    else
        return dv;
};
export const fn_getWidth = (to, dv = 0.0) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tv = sts.getPropertyValue('width');
        return fn_checkNumber(tv);
    }
    else
        return dv;
};
export const fn_setWidth = (to, tv) => {
    const sts = fn_getStyles(to, true);
    if (sts !== null) {
        tv = fn_checkNumber(tv);
        sts.setProperty('width', `${tv}px`);
    }
};
export const fn_getHeight = (to, dv = 0.0) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tv = sts.getPropertyValue('height');
        return fn_checkNumber(tv);
    }
    else
        return dv;
};
export const fn_setHeight = (to, tv) => {
    const sts = fn_getStyles(to, true);
    if (sts !== null) {
        tv = fn_checkNumber(tv);
        sts.setProperty('height', `${tv}px`);
    }
};
export const fn_getLeft = (to, dv = 0.0) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tv = sts.getPropertyValue('left');
        return fn_checkNumber(tv);
    }
    else
        return dv;
};
export const fn_setLeft = (to, tv) => {
    const sts = fn_getStyles(to, true);
    if (sts !== null) {
        tv = fn_checkNumber(tv);
        sts.setProperty('left', `${tv}px`);
    }
};
export const fn_getTop = (to, dv = 0.0) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tv = sts.getPropertyValue('top');
        return fn_checkNumber(tv);
    }
    else
        return dv;
};
export const fn_setTop = (to, tv) => {
    const sts = fn_getStyles(to, true);
    if (sts !== null) {
        tv = fn_checkNumber(tv);
        sts.setProperty('top', `${tv}px`);
    }
};
export const fn_getRect = (to) => {
    const sts = fn_getStyles(to);
    if (sts !== null) {
        const tx = fn_getLeft(sts);
        const ty = fn_getTop(sts);
        const tw = fn_getWidth(sts);
        const th = fn_getHeight(sts);
        const rct = new DOMRect(tx, ty, tw, th);
        return rct;
    }
    else
        return null;
};
export const fn_updateRect = (to, rct) => {
    const sts = fn_getStyles(to);
    if ((sts !== null) && (rct instanceof DOMRect)) {
        const tw = fn_getWidth(sts);
        const th = fn_getHeight(sts);
        const tx = fn_getLeft(sts);
        const ty = fn_getTop(sts);
        rct.width = tw;
        rct.height = th;
        rct.x = tx;
        rct.y = ty;
    }
};
export const fn_containsRect = (rct, tx, ty) => {
    const rb = ((rct.left <= tx) && (rct.right >= tx)) &&
        ((rct.top <= ty) && (rct.bottom >= ty));
    return rb;
};
export const fn_applyRectToElement = (to, rct) => {
    const sts = fn_getStyles(to, true);
    if ((sts !== null) && (rct instanceof DOMRect)) {
        fn_setLeft(sts, rct.left);
        fn_setTop(sts, rct.top);
        fn_setWidth(sts, rct.width);
        fn_setHeight(sts, rct.height);
    }
};
