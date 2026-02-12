import { hfEventTypes, hfStyleHelper } from "../../hbjs/hfCommon.js";
import { hfScrollTargetArea, hfScrollType, hfScrollWave } from "../../hbjs/hfScrollWave.js";



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



(async () => {
    /**
     * @type {HTMLDivElement}
     */
    const _rootCont = document.querySelector('div.c_root-cont');
    // console.log('_rootCont:', _rootCont);

    /**
     * @type {HTMLDivElement}
     */
    const _contentCont = _rootCont.querySelector('div.c_content-cont');
    // console.log('_contentCont:', _contentCont);

    /**
     * @type {HTMLDivElement}
     */
    const _heViewport = _rootCont.querySelector('div.c_viewport');
    // console.log('_heViewport:', _heViewport);

    /**
     * @type {HTMLDivElement}
     */
    const _heBody = _heViewport.querySelector('div.c_body');
    // console.log('_heBody:', _heBody);

    /**
     * @type {HTMLTextAreaElement}
     */
    let _tam = _rootCont.querySelector('div.c_input-cont>textarea.c_tam');
    // console.log('_tam: ', _tam);


    /**
     * @type {HTMLDivElement}
     */
    let bscr = _contentCont.querySelector('div.c_scroll-cont>div#bscr');
    // console.log('bscr: ', bscr);

    /**
     * @type {HTMLDivElement}
     */
    let hscr = _contentCont.querySelector('div.c_scroll-cont>div#hscr');
    // console.log('hscr: ', hscr);

    /**
     * @type {HTMLDivElement}
     */
    let vscr = _contentCont.querySelector('div.c_scroll-cont>div#vscr');
    // console.log('vscr: ', vscr);


    let rctViewport = hfStyleHelper.getRect(_heViewport);
    // console.log('rctViewport:', rctViewport);

    let rctBody = hfStyleHelper.getRect(_heBody);
    // console.log('rctBody:', rctBody);

    let scrTargetArea = new hfScrollTargetArea(rctViewport, rctBody);
    // console.log('scrTargetArea:', scrTargetArea);


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
            /** real cell width */
            rclw: 100,
            /** real cell height */
            rclh: 50,

            /** row item object arr */
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

            try {
                let res = await fetch('http://127.0.0.1:5501/tests/pg08p/fxdt2.txt');
                if (!res.ok) {
                    throw res.status;
                }

                let txt = await res.text();

                // 2. 데이터 파싱 (단순 분리)
                let rowa = txt.split('\n') // row arr
                    .filter(ls => ls.trim() !== '')
                    .map((ls) => ls.split('|'));
                let rca = rowa.at(0); // row cell arr
                if (!rca) {
                    throw 'error';
                }

                md.rioa = rowa;
                md.rcc = rca.length;
                md.rrc = rowa.length;
                console.log(`ColumnCount: ${md.rcc}, RowCount: ${md.rrc}`);

                md.rbw = md.rclw * md.rcc;
                md.rbh = md.rclh * md.rrc;
                // console.log(md.rbw, md.rbh);
            } catch (err) {
                throw err;
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
            // row cell arr
            let rca = md.rioa.at(j);
            // row cell
            let rc = rca.at(i);
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
        const {
            viewportWidth: vpw, viewportHeight: vph,
            bodyLeft: bdx, bodyTop: bdy } = scrTargetArea;
        // console.log(vpw, vph);
        // console.log(bdx, bdy);

        const { rclw: clw, rclh: clh, rcc, rrc } = _dtsc;
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
        let lk = hea.length, k = 0;
        for (let j = bj; j <= ej; j++) {
            for (let i = bi; i <= ei; i++) {
                let he = hea.at(k++);
                if (!he) break;

                const co = _dtsc.cio(i, j);
                // console.log(co);
                let hse = /** @type {HTMLSpanElement} */(he.firstElementChild);
                // hse.textContent = co.toString();
                hse.innerText = co.toString();

                let cx = (clw * i) + bdx;
                let cy = (clh * j) + bdy;
                // console.log(cx, cy);

                let csd = he.style;
                csd.width = `${clw}px`;
                csd.height = `${clh}px`;
                csd.transform = `translate(${cx}px, ${cy}px)`;
                if (csd.visibility !== 'visible') csd.visibility = 'visible';
            }
            if (k >= lk) break;
        }

        for (let i = k; i < lk; i++) {
            let he = hea.at(i);
            let csd = he.style;
            if (csd.visibility !== 'hidden') {
                csd.visibility = 'hidden';
            }
        }
    };
    // }}


    let _bgp = true;
    const fn_scrollOptimized = (ba=false) => {
        if (_bgp) {
            requestAnimationFrame(() => {
                if (ba) fn_prepareVirtualDomElements();
                fn_updateDomElementsRender();
                fn_updateOutText();
                _bgp = true;
            });
            _bgp = false;
        }
    };

    scrBoth.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_scrollOptimized();

        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();
    });

    scrHori.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_scrollOptimized();

        scrBoth.fn_updateAfterRect();
    });

    scrVert.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_scrollOptimized();

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

        fn_scrollOptimized(true);
    };
    let rsosv = new ResizeObserver((_) => {
        fn_resize(null);
    });
    rsosv.observe(_contentCont);


    window.addEventListener('keydown', (ke) => {
        // console.log(ke.code);

        const fn_ppval = () => {
            if (ke.ctrlKey) return 1;
            else if (ke.shiftKey) return 100;
            else return 10;
        };

        switch (ke.code) {
            case 'ArrowLeft': {
                scrTargetArea.bodyLeft += fn_ppval();
                fn_scrollOptimized();

                scrBoth.fn_updateAfterRect();
                scrHori.fn_updateAfterRect();
                break;
            }
            case 'ArrowRight': {
                scrTargetArea.bodyLeft -= fn_ppval();
                fn_scrollOptimized();

                scrBoth.fn_updateAfterRect();
                scrHori.fn_updateAfterRect();
                break;
            }
            case 'ArrowUp': {
                scrTargetArea.bodyTop += fn_ppval();
                fn_scrollOptimized();

                scrBoth.fn_updateAfterRect();
                scrVert.fn_updateAfterRect();
                break;
            }
            case 'ArrowDown': {
                scrTargetArea.bodyTop -= fn_ppval();
                fn_scrollOptimized();

                scrBoth.fn_updateAfterRect();
                scrVert.fn_updateAfterRect();
                break;
            }
        }

    });

})();


