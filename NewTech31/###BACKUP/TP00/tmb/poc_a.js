{
    const __opChars = '/*+-';
    const __valReg = /^-?[\d\.]+$/;

    const __ffax = [undefined, ...Array.from('(/*+-')];
    const __ffay = Array.from('.0123456789');


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
     * ??
     */
    const fn_cmps = () => {
        if (_buff.length > 0) {
            _tokens.push(_buff.join(''));
            _buff.length = 0;
        }
    };

    /**
     * ??
     */
    const fn_tokenize = () => {
        let pa;
        for (const ch of _txt) {
            if (((ch === '-') && (__ffax.indexOf(pa) > -1)) ||
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
     * ??
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
        if (((tk === '-') && (pa === undefined)) === false) {
            _ops.push(tk);
        }
    };

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

    /**
     * @param {string} txt
     */
    const fn_calc = (txt) => {
        fn_clear();

        _txt = txt.replace(/[\s,]+/g, '');
        fn_tokenize();

        let pa, pb;
        for (let tk of _tokens) {
            if (tk === '(') {
                fn_checkPushOperator(tk, pa);
            } else if (tk === ')') {
                while ((_ops.length > 0) && (_ops.at(-1) !== '(')) {
                    fn_calcNextApply();
                }
                if (_ops.length > 0) {
                    _ops.pop();
                }
            } else if (__valReg.test(tk)) {
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
        '-5',
        '-5+3',
        '3-(-2)',
        '(-5)*3',
        '400*2+100',
        '100+200*223/9',
        '(47.38-43)+(39/5)-(14/9)',
        '20+22-4.84+(7.44-16/2.55+32)',
        '(11*(36.79-40/46.74*35)*(7-29))+42*(5*(39.85-46+34+22.64)+(43*16.19-46*33))',
    ];
    for (let txt of _txts) {
        let rv1 = fn_calc(txt);
        let rv2 = globalThis.eval(txt);
        console.log(
`---------------------------------------------
  rv1: ${rv1}
  rv2: ${rv2}
---------------------------------------------
`       );
    }

    console.log('==================================================');

}
