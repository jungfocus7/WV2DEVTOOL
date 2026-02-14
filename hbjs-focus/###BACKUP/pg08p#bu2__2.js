import { hfEventTypes, hfStyleHelper, dcs } from "../../hbjs/hfCommon.js";
import { hfScrollTargetArea, hfScrollType, hfScrollWave } from "../../hbjs/hfScrollWave.js";



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



(() => {
    /**
     * @type {HTMLDivElement}
     */
    const _rootCont = document.querySelector('div.c_root-cont');
    // dcs.log('_rootCont:', _rootCont);

    /**
     * @type {HTMLDivElement}
     */
    const _contentCont = _rootCont.querySelector('div.c_content-cont');
    // dcs.log('_contentCont:', _contentCont);

    /**
     * @type {HTMLDivElement}
     */
    const _heViewport = _rootCont.querySelector('div.c_viewport');
    // dcs.log('_heViewport:', _heViewport);

    /**
     * @type {HTMLDivElement}
     */
    const _heBody = _heViewport.querySelector('div.c_body');
    // dcs.log('_heBody:', _heBody);

    /**
     * @type {HTMLTextAreaElement}
     */
    let _tam = _rootCont.querySelector('div.c_input-cont>textarea.c_tam');
    // dcs.log('_tam: ', _tam);


    /**
     * @type {HTMLDivElement}
     */
    let bscr = _contentCont.querySelector('div.c_scroll-cont>div#bscr');
    // dcs.log('bscr: ', bscr);

    /**
     * @type {HTMLDivElement}
     */
    let hscr = _contentCont.querySelector('div.c_scroll-cont>div#hscr');
    // dcs.log('hscr: ', hscr);

    /**
     * @type {HTMLDivElement}
     */
    let vscr = _contentCont.querySelector('div.c_scroll-cont>div#vscr');
    // dcs.log('vscr: ', vscr);


    let rctViewport = hfStyleHelper.getRect(_heViewport);
    // dcs.log('rctViewport:', rctViewport);

    let rctBody = hfStyleHelper.getRect(_heBody);
    // dcs.log('rctBody:', rctBody);

    let scrTargetArea = new hfScrollTargetArea(rctViewport, rctBody);
    // dcs.log('scrTargetArea:', scrTargetArea);


    /** */
    let scrBoth = new hfScrollWave({
        targetArea: scrTargetArea,
        scrollType: hfScrollType.BOTH,
        heGround: bscr,
    });

    /** */
    let scrHori = new hfScrollWave({
        targetArea: scrTargetArea,
        scrollType: hfScrollType.HORIZONTAL,
        heGround: hscr,
    });

    /** */
    let scrVert = new hfScrollWave({
        targetArea: scrTargetArea,
        scrollType: hfScrollType.VERTICAL,
        heGround: vscr,
    });


    /**
     * ???
     */
    const fn_updateOutText = () => {
        let txt = `
ViewportWidth: ${scrTargetArea.viewportWidth.toFixed(1)},
ViewportHeight: ${scrTargetArea.viewportHeight.toFixed(1)},
BodyWidth: ${scrTargetArea.bodyWidth.toFixed(1)},
BodyHeight: ${scrTargetArea.bodyHeight.toFixed(1)},
BodyLeft: ${scrTargetArea.bodyLeft.toFixed(1)},
BodyTop: ${scrTargetArea.bodyTop.toFixed(1)},
VWR: ${(100 * scrTargetArea.vwr).toFixed(1)}%,
VHR: ${(100 * scrTargetArea.vhr).toFixed(1)}%,
HSPR: ${(100 * scrTargetArea.hspr).toFixed(1)}%,
VSPR: ${(100 * scrTargetArea.vspr).toFixed(1)}%,
        `.trim();

        _tam.value = txt;
    };


    // {{------------------------------------------------------------------------------------------------------------------------
    const _dtsc = Object.seal(new class {
        #md = Object.seal({
            rclw: 200, // real cell width
            rclh: 200, // real cell height

            rioa: [ // real item object array
                {CNM01: 'R0101', CNM02: 'R0201', CNM03: 'R0301', CNM04: 'R0401', CNM05: 'R0501', CNM06: 'R0601'},
                {CNM01: 'R0102', CNM02: 'R0202', CNM03: 'R0302', CNM04: 'R0402', CNM05: 'R0502', CNM06: 'R0601'},
                {CNM01: 'R0103', CNM02: 'R0203', CNM03: 'R0303', CNM04: 'R0403', CNM05: 'R0503', CNM06: 'R0601'},
                {CNM01: 'R0104', CNM02: 'R0204', CNM03: 'R0304', CNM04: 'R0404', CNM05: 'R0504', CNM06: 'R0601'},
                {CNM01: 'R0105', CNM02: 'R0205', CNM03: 'R0305', CNM04: 'R0405', CNM05: 'R0505', CNM06: 'R0601'},
                {CNM01: 'R0105', CNM02: 'R0205', CNM03: 'R0305', CNM04: 'R0405', CNM05: 'R0505', CNM06: 'R0601'},
            ],

            rcc: 0, // real column count
            rrc: 0, // real row count

            rbw: 0, // real body width
            rbh: 0, // real body height
        });

        constructor() {
            const md = this.#md;

            md.rcc = Object.keys(md.rioa.at(0)).length;
            md.rrc = md.rioa.length;

            md.rbw = md.rclw * md.rcc;
            md.rbh = md.rclh * md.rrc;
        }

        /**
         * real cell width
         */
        get rclw() {
            const md = this.#md;
            return md.rclw;
        }

        /**
         * real cell height
         */
        get rclh() {
            const md = this.#md;
            return md.rclh;
        }

        /**
         * @param {number} i
         * @returns
         */
        item(i) {
            const md = this.#md;
            return md.rioa.at(i);
        }

        /**
         * real column count
         */
        get rcc() {
            const md = this.#md;
            return md.rcc;
        }

        /**
         * real row count
         */
        get rrc() {
            const md = this.#md;
            return md.rrc;
        }

        /**
         * real body width
         */
        get rbw() {
            const md = this.#md;
            return md.rbw;
        }

        /**
         * real body height
         */
        get rbh() {
            const md = this.#md;
            return md.rbh;
        }

        /**
         * end pool info
         */
        epi = Object.seal({
            /** preview horizontal cell count */
            phc: 0,
            /** preview vertical cell count */
            pvc: 0,
        });

    });

    const fn_prepareVirtualDomElements = () => {
        let vpw = scrTargetArea.viewportWidth;
        let vph = scrTargetArea.viewportHeight;
        // console.log(vpw, vph);

        let clw = _dtsc.rclw;
        let clh = _dtsc.rclh;
        // console.log(clw, clh);

        let rcc = _dtsc.rcc;
        let rrc = _dtsc.rrc;
        // console.log(rcc, rrc);

        let rbw = _dtsc.rbw;
        let rbh = _dtsc.rbh;
        // console.log(rbw, rbh);

        let chc = Math.ceil(vpw / clw) + 1;
        let cvc = Math.ceil(vph / clh) + 1;
        // console.log(chc, cvc);

        const epi = _dtsc.epi;
        // let ahc = 0; // add horizontal cell count
        // let avc = 0; // add vertical cell count


        const ahtpl = `
<div class="c_hex">
    <span class="c_sp">XXXX</span>
</div>
        `.trim();

        const tsbf = [];

        let l = chc - epi.phc;
        if (l > 0) {
            epi.phc = chc;
            for (let i = 0; i < l; i++) {
                tsbf.push(ahtpl);
            }
        }

        l = cvc - epi.pvc;
        if (l > 0) {
            epi.pvc = cvc;
            for (let i = 0; i < l; i++) {
                tsbf.push(ahtpl);
            }
        }

        if (l > 0) {
            _heBody.insertAdjacentHTML('beforeend', tsbf.join(''));
            tsbf.length = 0;

            scrTargetArea.bodyWidth = _dtsc.rbw;
            scrTargetArea.bodyHeight = _dtsc.rbh;
            fn_updateOutText();

            scrBoth.fn_updateAfterRect();
            scrHori.fn_updateAfterRect();
            scrVert.fn_updateAfterRect();
        }



//         if ((chc > epi.phc) || (cvc > epi.pvc)) {
//             // console.log(chc, epi.phc, cvc, epi.pvc);

//             ahc = chc - epi.phc;
//             avc = cvc - epi.pvc;
//             console.log(ahc, avc);

//             epi.phc = chc;
//             epi.pvc = cvc;

//             /*
//             let l = ahc * avc;
//             // console.log(l);
//             let tsbf = [];
//             for (let i = 0; i < l; i++) {
//                 tsbf.push(`
// <div class="c_hex">
//     <span class="c_sp">XXXX</span>
// </div>
//                 `.trim());
//             }
//             _heBody.insertAdjacentHTML('beforeend', tsbf.join(''));
//             tsbf.length = 0;
//             // console.log(`${l} 개 추가됨`);
//             */

//             scrTargetArea.bodyWidth = _dtsc.rbw;
//             scrTargetArea.bodyHeight = _dtsc.rbh;
//             fn_updateOutText();

//             scrBoth.fn_updateAfterRect();
//             scrHori.fn_updateAfterRect();
//             scrVert.fn_updateAfterRect();
//         }
    };

    const fn_updateDomElementsRender = () => {
    };
    // }}


    scrBoth.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateDomElementsRender();
        fn_updateOutText();

        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();
    });

    scrHori.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateDomElementsRender();
        fn_updateOutText();

        scrBoth.fn_updateAfterRect();
    });

    scrVert.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateDomElementsRender();
        fn_updateOutText();

        scrBoth.fn_updateAfterRect();
    });


    /**
     * @param {Event} _
     */
    const fn_resize = (_) => {
        let vpw = hfStyleHelper.getWidth(_heViewport);
        let vph = hfStyleHelper.getHeight(_heViewport);
        scrTargetArea.viewportWidth = vpw;
        scrTargetArea.viewportHeight = vph;

        fn_prepareVirtualDomElements();
        fn_updateDomElementsRender();

        fn_updateOutText();
    };
    let rsosv = new ResizeObserver((_) => {
        fn_resize(null);
    });
    rsosv.observe(_contentCont);




    const fn_sizeUp = () => {
        scrTargetArea.bodyWidth += 10;
        scrTargetArea.bodyHeight += 10;
        fn_updateOutText();

        scrBoth.fn_updateAfterRect();
        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();
    };
    const fn_sizeDown = () => {
        scrTargetArea.bodyWidth -= 10;
        scrTargetArea.bodyHeight -= 10;
        fn_updateOutText();

        scrBoth.fn_updateAfterRect();
        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();
    };
    window.addEventListener('wheel', (we) => {
        if (we.deltaY < 0) {
            fn_sizeUp();
        } else if (we.deltaY > 0) {
            fn_sizeDown();
        }
    });


    window.addEventListener('keydown', (ke) => {
    });

})();


