import { hfarr, hfFrameRepeater, hfWeich } from "./js/hfall.js";


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1)
class BlockItem {
    /**
     * @param {number} rw
     * @param {number} rh
     * @param {number} rx
     * @param {number} ry
     * @param {string} tt
     */
    constructor(rw, rh, rx, ry, tt) {
        const md = this.#md;
        md.rw = rw;
        md.rh = rh;
        md.rx = rx;
        md.ry = ry;
        md.tgs = `
<g clip-path="url(#d_cp1)" transform="translate(0,0) scale(1.0,1.0)">
  <path fill="red" stroke="black" stroke-width="4"
    d="M0,0 L40,0 L40,40 L0,40 Z"/>
  <text text-anchor="middle" dominant-baseline="central"
    fill="whitesmoke" x="20" y="20" font-family="Arial"
    font-size="17">${tt}</text>
</g>
        `.trim();
    }
    #md = Object.seal({
        dw: 40.0, dh: 40.0,
        rw: 0.0, rh: 0.0,
        rx: 0.0, ry: 0.0,
        tgs: '',
        /** @type {SVGGElement} */
        ge: null,
        /** @type {hfWeich} */
        wc: null,
    });

    get tgs() {
        return this.#md.tgs;
    }

    get ge() {
        return this.#md.ge;
    }

    clear() {
        const md = this.#md;
        md.tgs = '';
        md.ge = null;
        md.wc.stop();
        md.wc = null;
    }

    /**
     * @param {string} et
     * @param {number} cv
     */
    #fn_wccbf(et, cv) {
        const md = this.#md;
        if (et === hfWeich.ET_UPDATE) {
            let st = md.ge.style;
            st.opacity = cv.toString();
        }
    }

    /** @param {SVGGElement} ge */
    initAfter(ge) {
        const md = this.#md;
        if (md.ge === null) {
            md.ge = ge;
            md.wc = new hfWeich(0.0, 0.1, 0.1, this.#fn_wccbf.bind(this));
            let st = md.ge.style;
            st.display = 'none';
            st.opacity = '0.0';
        }
    }

    applyFrom() {
        const md = this.#md;
        let sx = md.rw / md.dw;
        let sy = md.rh / md.dh;
        let val = `translate(${md.rx}, ${md.ry}), scale(${sx}, ${sy})`;
        md.ge.setAttribute('transform', val);
    }

    get_rw() {
        const md = this.#md;
        return md.rw;
    }

    /**
     * @param {number} tv
     * @param {boolean} ba
     */
    set_rw(tv, ba=false) {
        const md = this.#md;
        md.rw = tv;
        if (ba) this.applyFrom();
    }

    get_rh() {
        const md = this.#md;
        return md.rh;
    }

    /**
     * @param {number} tv
     * @param {boolean} ba
     */
    set_rh(tv, ba=false) {
        const md = this.#md;
        md.rh = tv;
        if (ba) this.applyFrom();
    }

    get_rx() {
        const md = this.#md;
        return md.rx;
    }

    /**
     * @param {number} tv
     * @param {boolean} ba
     */
    set_rx(tv, ba=false) {
        const md = this.#md;
        md.rx = tv;
        if (ba) this.applyFrom();
    }

    get_ry() {
        const md = this.#md;
        return md.ry;
    }

    /**
     * @param {number} tv
     * @param {boolean} ba
     */
    set_ry(tv, ba=false) {
        const md = this.#md;
        md.ry = tv;
        if (ba) this.applyFrom();
    }

    show() {
        const md = this.#md;
        let st = md.ge.style;
        st.display = 'inline';
        md.wc.to(1.0);
    }

};
Object.freeze(BlockItem);
//#endregion


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 2)
/** @type {HTMLDivElement} */
const _rootCont = document.querySelector('div.c_rootCont');
// console.log(_rootCont);

/** @type {SVGSVGElement} */
const _svgCont = _rootCont.querySelector('svg.c_svgCont');
// console.log(_svgCont);

/** @type {SVGGElement} */
const _geCont = _svgCont.querySelector('g#d_geCont');
// console.log(_geCont);

/** @type {HTMLDivElement} */
const _downPanel = _rootCont.querySelector('div.c_downPanel');
// console.log(_downPanel);

/** @type {HTMLInputElement} */
const _inputCount = _downPanel.querySelector('input.c_inputCount');
// console.log(_inputCount);

/** @type {HTMLInputElement} */
const _btnStart = _downPanel.querySelector('input.c_btnStart');
// console.log(_btnStart);
//#endregion


/** @type {BlockItem[]} */
const _blia = [];


_inputCount.addEventListener('keydown', (ke) => {
    const fks = ['ArrowUp', 'ArrowDown'];
    if (fks.indexOf(ke.code) === -1) {
        ke.preventDefault();
    }
});
_inputCount.addEventListener('mousewheel', (_) => {});


const fn_frpt_cbf = (et, _, rc) => {
    if (et === hfFrameRepeater.ET_UPDATE) {
        // console.log(et, _, rc);
        let i = rc - 1;
        _blia[i].show();
    } else if (et === hfFrameRepeater.ET_END) {
        _etoid = setTimeout(() => {
            // console.log('완료');
            _moxy.fromTo(1.0, 0.0);
        }, 300);
    }
};
let _etoid = -1;
/** @type {hfFrameRepeater} */
let _frpt = null;

const fn_moxy_cbf = (et, cv) => {
    if (et === hfWeich.ET_UPDATE) {
        let cnt = Math.sqrt(_blia.length);
        let px = (280 / 2) - ((40 * cnt) / 2);
        let py = (248 / 2) - ((40 * cnt) / 2);
        let tx = px * cv;
        let ty = py * cv;
        // let px = 80;
        // let py = 64;
        // let tx = px * _moxy.now;
        // let ty = py * _moxy.now;
        _geCont.style.transform = `translate(${tx}px,${ty}px)`;
        // console.log(cv, tx, ty);
        // console.log(cv, _geCont.style.transform);
    }
};
let _moxy = new hfWeich(0.0, 0.2, 0.005, fn_moxy_cbf);

const fn_clearMinorDetails = () => {
    if (_frpt !== null) {
        _frpt.dispose();
        _frpt = null;
        clearTimeout(_etoid);
        _etoid = -1;
    }

    if (_moxy !== null) {
        _moxy.stop();
        // _moxy = null;
    }
};

const fn_clearItems = () => {
    fn_clearMinorDetails();

    _geCont.style.transform = '';
    _geCont.innerHTML = '';
    for (const bli of _blia) {
        bli.clear();
    }
    _blia.length = 0;
};

/**
 * @param {SVGGElement} cont
 * @param {BlockItem[]} blia
 */
const fn_appendAllItems = (cont, blia) => {
    let sb = [];
    for (let bli of blia) {
        sb.push(bli.tgs);
    }
    cont.insertAdjacentHTML('beforeend', sb.join('\n'));

    /** @type {SVGGElement} */
    let ce = null, i = 0;
    for (ce of cont.children) {
        let bli = blia[i];
        bli.initAfter(ce);
        i++;
    }
};

const fn_makeItems = () => {
    fn_clearItems();

    let lc = Number.parseInt(_inputCount.value);
    let la = Math.pow(lc, 2);
    for (let i = 0; i < la; i++) {
        let tt = (i + 1).toString().padStart(2, '0');
        let bli = new BlockItem(40.0, 40.0, 0.0, 0.0, tt);
        _blia.push(bli);
    }
    hfarr.shuffle(_blia);
    fn_appendAllItems(_geCont, _blia);

    let j = 0;
    for (let bli of _blia) {
        let tx = 40 * (j % lc);
        let ty = 40 * Math.floor(j / lc);
        bli.set_rx(tx);
        bli.set_ry(ty);
        bli.applyFrom();
        j++;
    }

    _frpt = new hfFrameRepeater(5, la, fn_frpt_cbf);
    _frpt.start();
};

_btnStart.addEventListener('click', (_) => {
    fn_makeItems();
});

