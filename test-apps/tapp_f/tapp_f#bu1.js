import { hfWeich } from "./js/hfall.js";


//#region ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 1)
class BlockItem {
    /**
     * @param {number} rw
     * @param {number} rh
     * @param {number} rx
     * @param {number} ry
     * @param {string} txt
     */
    constructor(rw, rh, rx, ry, txt) {
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
    font-size="17">${txt}</text>
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
        md.wc?.stop();
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
            md.wc = new hfWeich(
                0.0, 0.1, 0.1, this.#fn_wccbf.bind(this));

            let st = md.ge.style;
            st.display = 'none';
            st.opacity = '0.0';

            // st.display = 'inline';
            // md.wc.to(1.0);
        }
    }

    // applyFrom() {
    //     const md = this.#md;
    //     let sx = md.rw / md.dfw;
    //     let sy = md.rct.height / md.dfh;
    //     let val = `translate(${md.rct.left}, ${md.rct.top}), scale(${sx}, ${sy})`;
    //     md.tge.setAttribute('transform', val);
    // }

    show() {
        const md = this.#md;
        let st = md.ge.style;
        st.display = 'inline';
        md.wc.to(1.0);
    }

};
Object.freeze(BlockItem);

const BlockHelper = Object.freeze({
    /**
     * @param {SVGGElement} geCont
     * @param {BlockItem[]} blia
     */
    appendAll(geCont, blia) {
        let sb = [];
        for (let bli of blia) {
            sb.push(bli.tgs);
        }
        // console.log(sb);

        geCont.insertAdjacentHTML('beforeend', sb.join('\n'));

        /** @type {SVGGElement} */
        let ce = null;
        let i = 0;
        for (ce of geCont.children) {
            let bli = blia[i];
            bli.initAfter(ce);
            // let st = bli.ge.style;
            // // console.log(bli.ge, getComputedStyle(bli.ge).display);

            // st.display = 'none';
            // st.opacity = '0.0';
            // console.log(Object.getOwnPropertyDescriptor(bli.ge.style, 'opacity'));
            // console.log(ce, i);
            i++;
        }
        // console.log(blia);

        // const gest = blia.at(-1).ge.style;
        // gest.display = 'inline';
        // const wch = new hfWeich(0.0, 0.05, 0.1, (et, cv) => {
        //     if (et === hfWeich.ET_UPDATE) {
        //         gest.opacity = (cv / 100).toString();
        //         // console.log(cv / 200);
        //     }
        // });
        // wch.to(100.0);
    }
});
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

// _downPanel.style.pointerEvents = 'none';
//#endregion


/** @type {BlockItem[]} */
const _blia = [];


(() => {
    _inputCount.addEventListener('keydown', (ke) => {
        const fks = ['ArrowUp', 'ArrowDown'];
        if (fks.indexOf(ke.code) === -1) {
            ke.preventDefault();
        }
    });
    _inputCount.addEventListener('mousewheel', (_) => {});


    const fn_clearItems = () => {
        _geCont.innerHTML = '';
        for (const bli of _blia) {
            bli.clear();
        }
        _blia.length = 0;
    };

    const fn_makeItems = () => {
        fn_clearItems();

        _blia.push(...[
            new BlockItem(40.0, 40.0, 0.0, 0.0, '01'),
            new BlockItem(40.0, 40.0, 0.0, 0.0, '02'),
            new BlockItem(40.0, 40.0, 0.0, 0.0, '03'),
        ]);
        BlockHelper.appendAll(_geCont, _blia);

        let i = 0;
        let sid = setInterval(() => {
            _blia.at(i++)?.show();
            // try {

            // } catch (_) {
            //     console.log(_);
            //     clearInterval(sid);
            // }
        }, 1000);
    };

    _btnStart.addEventListener('click', (me) => {
        fn_makeItems();
    });




})();