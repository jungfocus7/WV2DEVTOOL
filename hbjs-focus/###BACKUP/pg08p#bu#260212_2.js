import { hfEventTypes, hfStyleHelper, dcs } from "../../hbjs/hfCommon.js";
import { hfScrollTargetArea, hfScrollType, hfScrollWave } from "../../hbjs/hfScrollWave.js";



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



(async () => {
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

    /**
     * @param {number} ta
     * @returns
     */
    const fn_ndgt = (ta) => {
        let tx = Math.log(Math.abs(ta)) * Math.LOG10E;
        let ty = Math.max(Math.floor(tx), 0);
        let tz = ty + 1;
        // console.log(tz);
        return tz;
    };

    // const fn_loadCSVData = async() => {
    //     let res = await fetch('http://127.0.0.1:5501/tests/pg08p/fxdt2.txt');
    //     let txtAll = await res.text();

    //     // 2. 데이터 파싱 (단순 분리)
    //     let lsa = txtAll.split('\n').map((ls) => ls.split(','));
    //     console.log(lsa.at(0).length);
    // };

    // {{------------------------------------------------------------------------------------------------------------------------
    const _dtsc = Object.seal(new class {
        #md = Object.seal({
            /** real cell width */
            rclw: 200,
            /** real cell height */
            rclh: 100,

            /*
            rioa: [ // real item object array
                {CN01: 'R0101', CN02: 'R0201', CN03: 'R0301', CN04: 'R0401', CN05: 'R0501', CN06: 'R0601'},
                {CN01: 'R0102', CN02: 'R0202', CN03: 'R0302', CN04: 'R0402', CN05: 'R0502', CN06: 'R0602'},
                {CN01: 'R0103', CN02: 'R0203', CN03: 'R0303', CN04: 'R0403', CN05: 'R0503', CN06: 'R0603'},
                {CN01: 'R0104', CN02: 'R0204', CN03: 'R0304', CN04: 'R0404', CN05: 'R0504', CN06: 'R0604'},
                {CN01: 'R0105', CN02: 'R0205', CN03: 'R0305', CN04: 'R0405', CN05: 'R0505', CN06: 'R0605'},
                {CN01: 'R0105', CN02: 'R0205', CN03: 'R0305', CN04: 'R0405', CN05: 'R0505', CN06: 'R0606'},
            ],
            */
            rioa: null,

            /** real column count */
            rcc: 0,
            /** real row count */
            rrc: 0,

            /** real body width */
            rbw: 0,
            /** real body height */
            rbh: 0,
        });

        async initOnce() {
            const md = this.#md;

            let res = await fetch('http://127.0.0.1:5501/tests/pg08p/fxdt2.txt');
            let txt = await res.text();

            // 2. 데이터 파싱 (단순 분리)
            let rowa = txt.split('\n') // row arr
                .filter(ls => ls.trim() !== '')
                .map((ls) => ls.split('|'));
            let rca = rowa.at(0); // row cell arr
            if (rca) {
                md.rioa = rowa;
                md.rcc = rca.length;
                md.rrc = rowa.length;
                console.log(`ColumnCount: ${md.rcc}, RowCount: ${md.rrc}`);

                md.rbw = md.rclw * md.rcc;
                md.rbh = md.rclh * md.rrc;
                // console.log(md.rbw, md.rbh);
            }
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
         * cell info obj
         * @param {number} i
         * @param {number} j
         * @returns
         */
        cio(i, j) {
            const md = this.#md;
            let rca = md.rioa.at(j); // row cell arr
            let rc = rca.at(i); // row cell
            return rc;
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

    });
    await _dtsc.initOnce();

    const fn_prepareVirtualDomElements = () => {
        let vpw = scrTargetArea.viewportWidth;
        let vph = scrTargetArea.viewportHeight;
        // console.log(vpw, vph);

        let clw = _dtsc.rclw;
        let clh = _dtsc.rclh;
        // console.log(clw, clh);

        let chc = Math.ceil(vpw / clw) + 1;
        let cvc = Math.ceil(vph / clh) + 1;
        // console.log(chc, cvc);
        let cac = chc * cvc;
        // console.log(cac);

        const ahtp = `
<div class="c_hex">
    <span class="c_sp">XXXX</span>
</div>
        `.trim();

        const tsbf = [];
        let li = cac - _heBody.childElementCount;
        if (li > 0) {
            for (let i = 0; i < li; i++) {
                tsbf.push(ahtp);
            }
        }

        if (tsbf.length > 0) {
            _heBody.insertAdjacentHTML('beforeend', tsbf.join(''));
            console.log(`${tsbf.length} added`);
            tsbf.length = 0;

            scrTargetArea.bodyWidth = _dtsc.rbw;
            scrTargetArea.bodyHeight = _dtsc.rbh;
            fn_updateOutText();

            scrBoth.fn_updateAfterRect();
            scrHori.fn_updateAfterRect();
            scrVert.fn_updateAfterRect();
        }
    };

    const fn_updateDomElementsRender = () => {
        let vpw = scrTargetArea.viewportWidth;
        let vph = scrTargetArea.viewportHeight;
        // console.log(vpw, vph);

        let bdx = scrTargetArea.bodyLeft;
        let bdy = scrTargetArea.bodyTop;
        // console.log(bdx, bdy);

        let clw = _dtsc.rclw;
        let clh = _dtsc.rclh;
        // console.log(clw, clh);

        // column begin index
        let bi = Math.floor(Math.abs(bdx) / clw);
        // row begin index
        let bj = Math.floor(Math.abs(bdy) / clh);
        // console.log(bi, bj);

        // column end index
        let ei = Math.min(_dtsc.rcc - 1, Math.floor((Math.abs(bdx) + vpw) / clw));
        // row end index
        let ej = Math.min(_dtsc.rrc - 1, Math.floor((Math.abs(bdy) + vph) / clh));
        // console.log(ei, ej);


        let hea = /** @type {HTMLDivElement[]} */(Array.from(_heBody.children));
        hea.forEach((he) => {
            let csd = he.style;
            csd.setProperty('visibility', 'hidden');
            csd.setProperty('transform', 'translate(0px, 0px)');
        });

        let k = 0;
        for (let j = bj; j <= ej; j++) {
            for (let i = bi; i <= ei; i++) {
                let he = hea.at(k++);
                if (he) {
                    const co = _dtsc.cio(i, j);
                    // console.log(co);
                    let hse = /** @type {HTMLSpanElement} */(he.firstElementChild);
                    // hse.textContent = co.toString();
                    hse.innerText = co.toString();

                    let cx = (clw * i) + bdx;
                    let cy = (clh * j) + bdy;
                    // console.log(cx, cy);

                    let csd = he.style;
                    csd.setProperty('width', `${clw}px`);
                    csd.setProperty('height', `${clh}px`);
                    csd.setProperty('transform', `translate(${cx}px, ${cy}px)`);
                    csd.setProperty('visibility', 'visible');
                }
            }

        }
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

    console.log('111');
    rsosv.observe(_contentCont);
    console.log('222');


    window.addEventListener('keydown', (ke) => {
    });

})();


