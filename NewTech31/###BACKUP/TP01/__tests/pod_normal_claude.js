//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const __opChars = '/*%+-';

// [수정 2] 점(.)이 여러 개 들어간 잘못된 숫자 포맷(예: "1.2.3", "...")을 걸러내도록 강화.
// 기존: /^-?[\d\.]+$/  -> "1.2.3" 도 통과시켜 Number()에서 NaN이 조용히 전파됨.
// 변경: 정수부/소수부 형태를 명시적으로 제한 (5, .5, 5. 형태는 허용, 5.2.3 형태는 차단)
const __valReg = /^-?(\d+\.\d*|\.\d+|\d+)$/;

const __ffax = [undefined, ...Array.from('(/*%+-')];
const __ffay = Array.from('.0123456789');


/** @type {string[]} */
const _tokens = [];

/** @type {string[]} */
const _buff = [];

/** @type {string[]} */
const _ops = [];

/** @type {number[]} */
const _vals = [];

// [수정 5] 빈 괄호 "()" 감지를 위해, '(' 를 push할 때 그 시점의 _vals.length를 기록해둠.
/** @type {number[]} */
const _grpMarks = [];


/** @type {string} */
let _txt = null;

/** @type {number} */
let _rdv = 0.0;


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
        if (((ch === '-') && (__ffax.indexOf(pa) > -1))
                || (__ffay.indexOf(ch) > -1)) {
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
    _grpMarks.length = 0;
    _txt = null;
    _rdv = 0.0;
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
        ((rop === '/') || (rop === '*') || (rop === '%'))) {
        return true;
    } else if (
        ((lop === '/') || (lop === '*') || (lop === '%')) &&
        ((rop === '/') || (rop === '*') || (rop === '%'))) {
        return true;
    } else if (
        ((lop === '+') || (lop === '-')) &&
        ((rop === '+') || (rop === '-'))) {
        return true;
    } else {
        return false;
    }
};

/**
 * ??
 */
const fn_calcNextApply = () => {
    let cop = _ops.pop();

    // [수정 1] 괄호 불균형 방어: 여는 괄호 '('가 연산자로 처리되려는 시점을 잡아냄.
    // (예: "(1+2" 처럼 닫는 괄호가 없으면 최종 정리 루프에서 '('가 여기까지 도달함)
    if (cop === '(') {
        throw new Error('Unbalanced parentheses: unmatched opening parenthesis.');
    }

    let rv = _vals.pop();
    let lv = _vals.pop();

    // [수정 3] 피연산자 부족 방어: pop 결과가 undefined면 값이 없는 것이므로 즉시 차단.
    // (예: "1+", "+1", "*5", "1+)" 등에서 NaN이 조용히 전파되는 것을 막음)
    if ((rv === undefined) || (lv === undefined)) {
        throw new Error(`Insufficient operands for operator "${cop}".`);
    }

    // [수정 4] 0 나눗셈 / 0 모듈로 방어: Infinity, NaN이 조용히 반환되던 것을 막음.
    if (((cop === '/') || (cop === '%')) && (rv === 0)) {
        throw new Error('Division by zero is not allowed.');
    }

    let cv;
    if (cop === '/') {
        cv = lv / rv;
    } else if (cop === '*') {
        cv = lv * rv;
    } else if (cop === '%') {
        cv = lv % rv;
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
 * @param {string} op
 */
const fn_checkPushOperator = (op) => {
    if (op === '(') {
        // [수정 5] '(' 진입 시점의 값 스택 길이를 기록 (빈 괄호 그룹 감지용)
        _grpMarks.push(_vals.length);
    }
    _ops.push(op);
};

/**
 * ??
 */
const fn_checkMiddleWave = () => {
    while ((_ops.length > 0) && (_ops.at(-1) !== '(')) {
        fn_calcNextApply();
    }
    if (_ops.length > 0) {
        _ops.pop();

        // [수정 5] 빈 괄호 그룹 방어: '(' 진입 시점과 값 개수가 같으면(=그룹 안에서 값이 하나도 안 만들어졌으면) 오류.
        // (예: "()", "(())", "1+()" 등)
        const mark = _grpMarks.pop();
        if (_vals.length <= mark) {
            throw new Error('Empty parentheses group: no value produced.');
        }
    } else {
        // [수정 1] 괄호 불균형 방어: 대응하는 '('가 없는 ')'가 들어온 경우.
        // (예: "1+2)", "())" 등)
        throw new Error('Unbalanced parentheses: unmatched closing parenthesis.');
    }
};

/**
 * @param {string} tk
 */
const fn_checkPushValue = (tk) => {
    _vals.push(+tk);
};

/**
 * @param {string} tk
 */
const fn_checkStackOutWave = (tk) => {
    while (fn_hasPrecedence(tk)) {
        fn_calcNextApply();
    }
    fn_checkPushOperator(tk);
};

/**
 * @param {string} txt
 */
export const fn_calcEntry = (txt) => {
    fn_clear();

    _txt = txt.replace(/[\s,]+/g, '');
    fn_tokenize();

    // [수정 6] 빈 입력 방어: 공백/쉼표만 있거나 완전히 빈 문자열이면 토큰이 하나도 없음.
    // 기존에는 이 경우 에러 없이 0을 반환했음.
    if (_tokens.length === 0) {
        throw new Error('Empty expression.');
    }

    for (let tk of _tokens) {
        if (tk === '(') {
            fn_checkPushOperator(tk);
        } else if (tk === ')') {
            fn_checkMiddleWave();
        } else if (__valReg.test(tk)) {
            fn_checkPushValue(tk);
        } else if (__opChars.indexOf(tk) > -1) {
            fn_checkStackOutWave(tk);
        } else {
            throw new Error('Invalid token verified.');
        }
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
//#endregion


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
{
    const _txts = [
        '880+0.05',
        '880000000*0.05',
        '400+100*2',
        '50-100+500',
        '-100+200*2',
        '-100+200*223/-9',
        '900+1/2',
        '-5',
        '-5+-3+(-54)',
        '3-(-2)',
        '(-5)*3',
        '400*2+100',
        '100+200*223/9',
        '(47.38-43)+(39/5)-(14/9)',
        '20+22-4.84+(7.44-16/2.55+32)',
        '(11*(36.79-40/46.74*35)*(7-29))+42*(5*(39.85-46+34+22.64)+(43*16.19-46*33))',
        '22%36.97/14',
        '20+22-4.84+(7.44%16%2.55+32)',
        '(11*(36.79-40/46.74%35)*(7-29))+42*(5*(39.85%46+34+22.64)+(43%16.19-46*33))',

        // '(1+2',
        // '5+(1+2',
        // '((1+2)',
        // '1+2)',

        // '1.2.3+4',
        // '1..5',
        // '...',

        // '1+',
        // '+1',
        // '1+)',
        // '*5',

        // '5/0',
        // '0/0',
        // '5%0',
        // '-5/0',
    ];
    console.time('Test1');
    for (let txt of _txts) {
        let rv1 = fn_calcEntry(txt);
        let rv2 = globalThis.eval(txt);
        console.log(
`---------------------------------------------
  rv1: ${rv1}
  rv2: ${rv2}
---------------------------------------------
`       );
    }
    console.timeEnd('Test1');

    console.log('==================================================');

}
