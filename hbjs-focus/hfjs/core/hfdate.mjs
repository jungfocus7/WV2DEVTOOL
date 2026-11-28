/**
 * 시간 스탬프 기본
 * @param {Date} dt
 * @returns string
 */
const fn_timeStamp = (dt) => {
    const df1 = dt.getFullYear().toString().substring(2);
    const df2 = (dt.getMonth() + 1).toString().padStart(2, '0');
    const df3 = dt.getDate().toString().padStart(2, '0');
    const df4 = dt.getHours().toString().padStart(2, '0');
    const df5 = dt.getMinutes().toString().padStart(2, '0');
    const df6 = dt.getSeconds().toString().padStart(2, '0');
    const df7 = dt.getMilliseconds().toString().padStart(3, '0');

    // return `${df1}${df2}${df3}${df4}${df5}${df6}${df7}`;
    // return `${df1}-${df2}-${df3} ${df4}:${df5}:${df6}.${df7}`;
    return `${df1}/${df2}/${df3} ${df4}:${df5}:${df6}.${df7}`;
};

/**
 * 시간 문자열 포맷으로 만들기
 * @param {string} fs1
 * @param {Date} td
 */
const fn_format = (fs1, td) => {
    const re1 = /\\./g;
    const mc1 = Array.from(fs1.matchAll(re1));

    const len = fs1.length - mc1.length;
    const buf1 = new Uint16Array(new ArrayBuffer(len * 2));

    let i = 0;
    for (const m1 of mc1) {
        const fi = m1.index - i;
        const tv = m1[0];
        const li = tv.length - 1;
        buf1[fi] = tv[li].charCodeAt(0);
        ++i;
    }

    const buf2 = new Uint16Array(new ArrayBuffer(len * 2));
    const ke = fs1.length - 1; i = 0;
    let bp = false;
    for (let k = 0; k <= ke; ++k) {
        const tc = fs1[k];
        if (bp) {
            bp = false;
            buf2[i++] = '\0'.charCodeAt(0);
        }
        else {
            bp = tc === '\\';
            if (bp && (k < ke))
                continue;
            else
                buf2[i++] = tc.charCodeAt(0);
        }
    }

    let mrs = String.fromCharCode.apply(null, buf2);
    const re2 = /y+|M+|d+|H+|m+|s+|f+/g;

    const fn_r = (tx, l1) => {
        const l2 = tx.length;
        if (l1 < l2)
            return tx.substring(l2 - l1);
        else if (l1 > l2)
            return tx.padStart(l1, '0');
        return tx;
    };
    const fn_me = (tx, td) => {
        const l1 = tx.length;
        if (tx[0] === 'y')
            return fn_r(td.getFullYear().toString(), l1);
        else if (tx[0] === 'M')
            return fn_r((td.getMonth() + 1).toString(), l1);
        else if (tx[0] === 'd')
            return fn_r(td.getDate().toString(), l1);
        else if (tx[0] === 'H')
            return fn_r(td.getHours().toString(), l1);
        else if (tx[0] === 'm')
            return fn_r(td.getMinutes().toString(), l1);
        else if (tx[0] === 's')
            return fn_r(td.getSeconds().toString(), l1);
        else if (tx[0] === 'f')
            return fn_r(td.getMilliseconds().toString(), l1);
        return tx;
    };

    mrs = mrs.replace(re2, (tx) => {
        return fn_me(tx, td);
    });

    for (i = 0; i < len; ++i) {
        const tc = String.fromCharCode(buf1[i]);
        if (tc === '\0')
            buf1[i] = mrs[i].charCodeAt(0);
    }

    const res = String.fromCharCode.apply(null, buf1);
    return res;
};


export const hfdate = Object.freeze({
    fn_timeStamp, fn_format,
});
