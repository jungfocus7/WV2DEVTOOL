{
    // const values = [
    //     '880,000,000 * (5 / 100)',
    //     // '(11*(36.79-40/46.74%35)*(7-29))+42*(5*(39.85%46+34+22.64)+(43%16.19-46*33))',
    //     '400/2*5.5+(98+6+1)',
    //     '100 * 50',
    // ];

    // for (let val of values) {
    //     let ev = val.replace(/[\s,]+/g, '');
    //     console.log('>>>', ev);
    // }


    // const _vals = [];
    // _vals.push(0);
    // _vals.push(1);
    // _vals.push(2);

    // let x0 = _vals.pop();
    // let x1 = _vals.pop();
    // let x2 = _vals.pop();

    // console.log('==================================================');

    const __opChars = '/*+-';
    const __valChars = '.0123456789';
    const __valReg = /^[\d\.]+$/;

    const _txt = '100 -20-5';
    //const _txt = '0123456789';

    /** @type {string[]} */
    const _tokens = [];

    /** @type {string[]} */
    const _buff = [];

    /** */
    const fn_cmps = () => {
        if (_buff.length > 0) {
            _tokens.push(_buff.join(''));
            _buff.length = 0;
        }
    };

    for (const ch of _txt) {
        if ((ch >= '0') && (ch <= '9')) {
            _buff.push(ch);
        } else {
            fn_cmps();
            _tokens.push(ch);
        }
    }
    fn_cmps();


    /**
     * @param {string} pa
     * @param {string} pb
     * @param {string} tk
     * @returns
     */
    const fn_checkMinus = (pa, pb, tk) => {
        let dv = Number.parseFloat(tk);
        if ((pa === '-') && (Number.isFinite(+pb) === false)) {
            return -dv;
        } else {
            return dv;
        }
    };

    /**
     * Convert Plus Or Minus
     * @param {number} dv
     * @returns
     */
    const fn_cvtpom = (dv) => {
        return (dv >= 0.0) ? dv : -dv;
    };

    let rdv = 0.0;
    let pa, pb;
    for (let tk of _tokens) {
        if (__valReg.test(tk)) {
            let dv = fn_checkMinus(pa, pb, tk);
            if (pa === undefined) {
                rdv = dv;
            } else if (pa === '+') {
                rdv = rdv + fn_cvtpom(dv);
            } else if (pa === '-') {
                rdv = rdv - fn_cvtpom(dv);
            }
        }
        pb = pa;
        pa = tk;
    }

    console.log(`>>> ${_txt}=${rdv}`);

    console.log('==================================================');




    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // const _ops = [];
    // const _vals = [];
    // for (const tk of _tokens) {
    //     if ('/*+-'.indexOf(tk) > -1) {
    //         _ops.push(tk);
    //     }
    //     else if ((tk >= '0') && (tk <= '9')) {
    //         _vals.push(tk);
    //     }
    // }

    // let la = _vals.length;
    // let lb = _ops.length;
    // if (la >= lb) {
    //     for (let i = 0; i < la; i++) {
    //         console.log(_ops[i], _vals[i]);
    //     }
    // }


    // for (const ch of _txt) {
    //     if ('/*+-'.indexOf(ch) > -1) {
    //         _ops.push(ch);
    //     }
    //     else if ((ch >= '0') && (ch <= '9')) {
    //         _vals.push(ch);
    //     }
    // }

    // console.log('==================================================');
}
