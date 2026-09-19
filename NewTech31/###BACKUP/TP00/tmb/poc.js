{
    const __opChars = '/*+-';
    const __valChars = '.0123456789';
    const __valReg = /^-?[\d\.]+$/;


    /** @type {string[]} */
    const _tokens = [];

    /** @type {string[]} */
    const _buff = [];

    /** @type {string[]} */
    const _ops = [];

    /** @type {number[]} */
    const _vals = [];


    /** @type {string} */
    let _txt;

    /** @type {number} */
    let _rdv;


    /**
     *
     */
    const fn_cmps = () => {
        if (_buff.length > 0) {
            _tokens.push(_buff.join(''));
            _buff.length = 0;
        }
    };

    const __ffax = [undefined, ...Array.from('(/*+-')];
    const __ffay = Array.from('.0123456789');
    /**
     *
     */
    const fn_tokenize = () => {
        let pa;
        for (const ch of _txt) {
            // if ((_ffax.indexOf(ch) > -1) ||
            //     ((ch === '-') && (_ffay.indexOf(pa) > -1))) {
            //     _buff.push(ch);
            // } else {
            //     fn_cmps();
            //     _tokens.push(ch);
            // }
            if (((ch === '-') && (__ffax.indexOf(pa) === -1)) ||
                (__ffay.indexOf(ch) > -1)) {
                _buff.push(ch);
            } else {
                fn_cmps();
                _tokens.push(ch);
            }
            pa = ch;
        }
        fn_cmps();
    };

    /**
     *
     */
    const fn_clear = () => {
        _tokens.length = 0;
        _buff.length = 0;
        _ops.length = 0;
        _vals.length = 0;
        _txt = null;
        _rdv = 0.0;
    };

    /**
     * @param {string} tk
     * @param {string} pa
     * @param {string} pb
     */
    const fn_checkPushValue = (tk, pa, pb) => {
        let dv = Number.parseFloat(tk);
        if ((pa === '-') && (Number.isFinite(+pb) === false)) {
            _vals.push(-dv);
        } else {
            _vals.push(dv);
        }
    };

    /**
     * @param {string} tk
     * @param {string} pa
     */
    const fn_checkPushOperator = (tk, pa) => {
        // if (tk === '-' && pa === '/') {
        //     console.log(1004);
        // }
        if (((tk === '-') && (pa === undefined)) === false) {
            _ops.push(tk);
        }
        // if ((tk === '-') && (__valReg.test(pa) === false)) {
        //     return;
        // } else {
        //     _ops.push(tk);
        // }
    };

    // /**
    //  * Convert Plus Or Minus
    //  * @param {number} dv
    //  * @returns
    //  */
    // const fn_cvtpom = (dv) => {
    //     return (dv >= 0.0) ? dv : -dv;
    // };

    /**
     * @param {string} lop left op
     * @returns
     */
    const fn_hasPrecedence = (lop) => {
        if (_ops.length === 0) {
            return false;
        }

        let rop = _ops.at(-1);
        if (
            ((lop === '+') || (lop === '-')) &&
            ((rop === '/') || (rop === '*'))) {
            return true;
        } else if (
            ((lop === '/') || (lop === '*')) &&
            ((rop === '/') || (rop === '*'))) {
            return true;
        } else if (
            ((lop === '+') || (lop === '-')) &&
            ((rop === '+') || (rop === '-'))) {
            return true;
        } else {
            return false;
        }
    };

    const fn_calcNextApply = () => {
        let cop = _ops.pop();

        let rv = _vals.pop();
        let lv = _vals.pop();

        let cv;
        if (cop === '/') {
            cv = lv / rv;
        } else if (cop === '*') {
            cv = lv * rv;
        } else if (cop === '+') {
            cv = lv + rv;
        } else if (cop === '-') {
            cv = lv - rv;
        }

        if (cv !== undefined) {
            _vals.push(cv);
        }
    };

    // /**
    //  * @param {string} txt
    //  */
    // const fn_calc = (txt) => {
    //     fn_clear();

    //     _txt = txt;
    //     fn_tokenize();

    //     let pa, pb;
    //     for (let tk of _tokens) {
    //         if (__valReg.test(tk)) {
    //             let dv = fn_checkMinus(pa, pb, tk);
    //             if (pa === undefined) {
    //                 _rdv = dv;
    //             } else if (pa === '+') {
    //                 _rdv = _rdv + fn_cvtpom(dv);
    //             } else if (pa === '-') {
    //                 _rdv = _rdv - fn_cvtpom(dv);
    //             } else if (pa === '*') {
    //                 _rdv = _rdv * dv;
    //             } else if (pa === '/') {
    //                 _rdv = _rdv / dv;
    //             }
    //         }
    //         pb = pa, pa = tk;
    //     }

    //     console.log('>>>', _rdv);
    // };
    /**
     * @param {string} txt
     */
    const fn_calc = (txt) => {
        fn_clear();

        _txt = txt;
        fn_tokenize();

        let pa, pb;
        for (let tk of _tokens) {
            if (__valReg.test(tk)) {
                fn_checkPushValue(tk, pa, pb);
            } else if (__opChars.indexOf(tk) > -1) {
                while (fn_hasPrecedence(tk)) {
                    fn_calcNextApply();
                }
                fn_checkPushOperator(tk, pa);
            }

            pb = pa, pa = tk;
        }

        while (_ops.length > 0) {
            fn_calcNextApply();
        }

        if (_vals.length > 0) {
            _rdv = _vals.pop();
        } else {
            _rdv = 0.0;
        }

        // console.log('>>>', _rdv);
        return _rdv;
    };

    const _txts = [
        '880+0.05',
        '880000000*0.05',
        '400+100*2',
        '50-100+500',
        '-100+200*2',
        '-100+200*223/-9',
        '900+1/2',
    ];
    // for (let vs of _txts) {
    //     console.log('>>>0', globalThis.eval(vs));
    // }
    for (let vs of _txts) {
        console.log(
`---------------------------------------------
  rv1: ${fn_calc(vs)},
  rv2: ${globalThis.eval(vs)},
---------------------------------------------
`       );
    }

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
