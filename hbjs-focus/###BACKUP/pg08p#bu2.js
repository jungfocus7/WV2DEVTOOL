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

    /**
     * @param {string} stp
     */
    const fn_updateBodyPosition = (stp) => {
        // if (stp === hfScrollType.BOTH) {
        //     let tx = scrTargetArea.bodyLeft;
        //     let ty = scrTargetArea.bodyTop;
        //     hfStyleHelper.setLeft(_heBody, tx);
        //     hfStyleHelper.setTop(_heBody, ty);
        // } else if (stp === hfScrollType.HORIZONTAL) {
        //     let tx = scrTargetArea.bodyLeft;
        //     hfStyleHelper.setLeft(_heBody, tx);
        // } else if (stp === hfScrollType.VERTICAL) {
        //     let ty = scrTargetArea.bodyTop;
        //     hfStyleHelper.setTop(_heBody, ty);
        // }
    };


    // {{----------------------------------------
    // const _dataSource = Object.seal({
    //     cellWidth: 200, cellHeight: 200,

    //     items: [
    //         {CNM01: 'R0101', CNM02: 'R0201', CNM03: 'R0301', CNM04: 'R0401', CNM05: 'R0501', CNM06: 'R0601'},
    //         {CNM01: 'R0102', CNM02: 'R0202', CNM03: 'R0302', CNM04: 'R0402', CNM05: 'R0502', CNM06: 'R0601'},
    //         {CNM01: 'R0103', CNM02: 'R0203', CNM03: 'R0303', CNM04: 'R0403', CNM05: 'R0503', CNM06: 'R0601'},
    //         {CNM01: 'R0104', CNM02: 'R0204', CNM03: 'R0304', CNM04: 'R0404', CNM05: 'R0504', CNM06: 'R0601'},
    //         {CNM01: 'R0105', CNM02: 'R0205', CNM03: 'R0305', CNM04: 'R0405', CNM05: 'R0505', CNM06: 'R0601'},
    //         {CNM01: 'R0105', CNM02: 'R0205', CNM03: 'R0305', CNM04: 'R0405', CNM05: 'R0505', CNM06: 'R0601'},
    //     ],

    //     viewportBounds: new DOMRect(0, 0, 400, 300),
    //     bodyBounds: new DOMRect(0, 0, 200 * 6, 200 * 6),

    //     poolInfo: Object.seal({
    //         colc: 0,        // column count
    //         rowc: 0,        // row count
    //         ttc: 0,         // total count
    //         rros: [],       // result refer objects
    //     }),

    // });
    const _dtsc = Object.seal(new class {
        #md = Object.seal({
            clw: 200, clh: 200, // cell width, height
            ioa: [
                {CNM01: 'R0101', CNM02: 'R0201', CNM03: 'R0301', CNM04: 'R0401', CNM05: 'R0501', CNM06: 'R0601'},
                {CNM01: 'R0102', CNM02: 'R0202', CNM03: 'R0302', CNM04: 'R0402', CNM05: 'R0502', CNM06: 'R0601'},
                {CNM01: 'R0103', CNM02: 'R0203', CNM03: 'R0303', CNM04: 'R0403', CNM05: 'R0503', CNM06: 'R0601'},
                {CNM01: 'R0104', CNM02: 'R0204', CNM03: 'R0304', CNM04: 'R0404', CNM05: 'R0504', CNM06: 'R0601'},
                {CNM01: 'R0105', CNM02: 'R0205', CNM03: 'R0305', CNM04: 'R0405', CNM05: 'R0505', CNM06: 'R0601'},
                {CNM01: 'R0105', CNM02: 'R0205', CNM03: 'R0305', CNM04: 'R0405', CNM05: 'R0505', CNM06: 'R0601'},
            ],
            cc: 0, rc: 0,
            bw: 0, bh: 0,
        });

        /**
         * cell width
         */
        get clw() {
            const md = this.#md;
            return md.clw;
        }

        /**
         * cell height
         */
        get clh() {
            const md = this.#md;
            return md.clh;
        }

        /**
         * @param {number} i
         * @returns
         */
        item(i) {
            const md = this.#md;
            return md.ioa.at(i);
        }

        /**
         * column count
         */
        get cc() {
            const md = this.#md;
            if (md.cc === 0) {
                md.cc = Object.keys(md.ioa.at(0)).length;
            }
            return md.cc;
        }

        /**
         * row count
         */
        get rc() {
            const md = this.#md;
            if (md.rc === 0) {
                md.rc = md.ioa.length;
            }
            return md.rc;
        }

        /**
         * body width
         */
        get bw() {
            const md = this.#md;
            if (md.bw === 0) {
                md.bw = md.clw * md.cc;
            }
            return md.bw;
        }

        /**
         * body height
         */
        get bdh() {
            const md = this.#md;
            if (md.bh === 0) {
                md.bh = md.clh * md.rc;
            }
            return md.bh;
        }

    });

    const fn_prepareVirtualDomElements = () => {
        let vpw = scrTargetArea.viewportWidth;
        let vph = scrTargetArea.viewportHeight;

        let clw = _dtsc.clw;
        let clh = _dtsc.clh;

        // Viewport에 들어갈 개수
        let colc = Math.ceil(vpw / clw) + 2;
        let rowc = Math.ceil(vph / clh) + 2;
        _dtsc.poolInfo.colc = colc;
        _dtsc.poolInfo.rowc = rowc;
        _dtsc.poolInfo.ttc = colc * rowc;

        // elements 배열 초기화
        _dtsc.poolInfo.rros.length = 0;


        scrTargetArea.bodyWidth = _dtsc.bodyBounds.width;
        scrTargetArea.bodyHeight = _dtsc.bodyBounds.height;
        scrTargetArea.fn_applyBodyRectToElement(_heBody);
        fn_updateOutText();

        scrBoth.fn_updateAfterRect();
        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();


//         // console.log(_dataSource);
//         (() => {
//             let txa = [];
//             let l = _dtsc.poolInfo.ttc;
//             for (let i = 0; i < l; i++) {
//                 txa.push(`
// <div class="c_hex">
//     <span class="c_sp">XXXX</span>
// </div>
//                 `.trim());
//             }
//             _heBody.innerHTML = txa.join('');
//         })();


        // console.log('fn_prepareVirtualDomElements');
    };
    // fn_prepareVirtualDomElements();

//     const fn_updateDomElementsRender = () => {
//         // console.log(scrTargetArea.bodyLeft, _dataSource.bodyBounds);
//         // scrTargetArea.bodyLeft
//         _dataSource.bodyBounds.x = scrTargetArea.bodyLeft;
//         _dataSource.bodyBounds.y = scrTargetArea.bodyTop;

//         let colw = _dataSource.cellWidth;
//         let colh = _dataSource.cellHeight;

//         let bdx = _dataSource.bodyBounds.left;
//         let bdy = _dataSource.bodyBounds.top;
//         // console.log(bdx, bdy);

//         // Viewport에서 보이는 데이터의 시작 인덱스
//         let cbi = Math.floor(Math.abs(bdx) / colw); // column begin index
//         let rbi = Math.floor(Math.abs(bdy) / colh); // row begin index

//         // elements 배열 초기화
//         let rros = _dataSource.poolInfo.rros;
//         rros.length = 0;

//         // 컬럼명 배열 추출 (column keys)
//         let cks = Object.keys(_dataSource.items[0]);

//         for (let m = _dataSource.poolInfo.rowc, j = 0; j < m; j++) {
//             let rci = rbi + j; // row current index

//             // 데이터 범위 체크
//             if (rci >= _dataSource.items.length) continue;

//             let rdt = _dataSource.items[rci]; // row data

//             for (let l = _dataSource.poolInfo.colc, i = 0; i < l; i++) {
//                 let cci = cbi + i; // column current index

//                 // 컬럼 범위 체크
//                 if (cci >= cks.length) continue;

//                 let ck = cks[cci]; // column key
//                 let cv = rdt[ck];  // cell value

//                 // DOM 절대 위치 계산
//                 let cx = colw * cci; // cell x
//                 let cy = colh * rci; // cell y
//                 if (j === 0 && i === 0) console.log(cci, rci);


//                 rros.push({
//                     pci: i,     // pool column index
//                     pri: j,     // pool row index
//                     cci: cci,   // column current index
//                     rci: rci,   // row current index
//                     ck: ck,     // column key
//                     cv: cv,     // cell value
//                     cx: cx,     // cell x
//                     cy: cy      // cell y
//                 });
//             }
//         }

// //         console.log('Pool Info:', `
// //   Column Count: ${_dataSource.poolInfo.colc},
// //   Row Count: ${_dataSource.poolInfo.rowc},
// //   Total Count: ${_dataSource.poolInfo.ttc},
// //   Result Refers: ${_dataSource.poolInfo.rros},
// //         `);

//         // console.log(_dataSource.items.length * 6, _heBody.childElementCount);

//         let cea = /** @type {HTMLDivElement[]} */(Array.from(_heBody.children));
//         // for (let l = cea.length, i = 0; i < l; i++) {
//         //     let csd = cea.at(i).style;
//         //     csd.setProperty('visibility', 'hidden'); // visible
//         // }
//         for (let l = rros.length, i = 0; i < l; i++) {
//             let ce = cea.at(i);
//             let csd = ce.style;
//             csd.setProperty('visibility', 'visible');
//             let rro = rros.at(i);
//             csd.setProperty('transform', `translate(${rro.cx}px, ${rro.cy}px)`);
//             // ce.firstElementChild.textContent = `${rro.cci}, ${rro.rci}`;
//             ce.firstElementChild.textContent = `${rro.cv}`;
//         }

// // Object.assign(el.style, {
// //                     position: 'absolute',
// //                     width: `${cellW}px`,
// //                     height: `${cellH}px`,
// //                     boxSizing: 'border-box',
// //                     border: '1px solid #eee',
// //                     display: 'none'
// //                 });

//         // console.log(rros.length, _dataSource.items.length * 6);
//         // for (let l = _dataSource.items.length, i = 0; i < l; i++) {
//         //     hfStyleHelper.
//         // }
//     };

    const fn_updateDomElementsRender = () => {
        // _dataSource.bodyBounds.x = scrTargetArea.bodyLeft;
        // _dataSource.bodyBounds.y = scrTargetArea.bodyTop;

        let colw = _dtsc.cellWidth;
        let colh = _dtsc.cellHeight;
        let bdx = Math.abs(scrTargetArea.bodyLeft);
        let bdy = Math.abs(scrTargetArea.bodyTop);

        let startRow = Math.max(0, Math.floor(bdy / colh));
        let endRow = Math.min(_dtsc.items.length - 1, Math.floor((bdy + scrTargetArea.viewportHeight) / colh));
        let startCol = Math.max(0, Math.floor(bdx / colw));
        let endCol = Math.min(_dtsc.items[0].length - 1, Math.floor((bdx + scrTargetArea.viewportWidth) / colw));


        let allEls = _heBody.querySelectorAll('div.c_item');
        allEls.forEach(el => el.style.display = 'none');

        let idx = 0;
        for (let r = startRow; r <= endRow; r++) {
            const rowData = _dtsc.item(r);
            const keys = Object.keys(rowData);
            for (let c = startCol; c <= endCol; c++) {
                const el = allEls[idx++];
                if (!el) continue;

                el.style.display = 'block';
                // left/top 대신 translate3d 사용 (하드웨어 가속)
                el.style.transform = `translate3d(${c * colw}px, ${r * colh}px, 0)`;
                el.textContent = rowData[keys[c]];
            }
        }
    };
    // }}


    scrBoth.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.BOTH);
        fn_updateOutText();

        fn_updateDomElementsRender();

        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();
    });

    scrHori.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.HORIZONTAL);
        fn_updateOutText();

        fn_updateDomElementsRender();

        scrBoth.fn_updateAfterRect();
    });

    scrVert.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.VERTICAL);
        fn_updateOutText();

        fn_updateDomElementsRender();

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

        // let cx = scrTargetArea.bodyLeft;
        // let cy = scrTargetArea.bodyTop;
        // hfStyleHelper.setLeft(_heBody, cx);
        // hfStyleHelper.setTop(_heBody, cy);

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
        scrTargetArea.fn_applyBodyRectToElement(_heBody);
        fn_updateOutText();

        scrBoth.fn_updateAfterRect();
        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();
    };
    const fn_sizeDown = () => {
        scrTargetArea.bodyWidth -= 10;
        scrTargetArea.bodyHeight -= 10;
        scrTargetArea.fn_applyBodyRectToElement(_heBody);
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
        console.log(ke.code);

        const fn_ppval = () => {
            if (ke.ctrlKey) return 1;
            else if (ke.shiftKey) return 100;
            else return 10;
        };

        switch (ke.code) {
            case 'ArrowLeft': {
                scrTargetArea.bodyLeft += fn_ppval();
                scrTargetArea.fn_applyBodyRectToElement(_heBody);
                fn_updateOutText();

                scrBoth.fn_updateAfterRect();
                scrHori.fn_updateAfterRect();
                break;
            }
            case 'ArrowRight': {
                scrTargetArea.bodyLeft -= fn_ppval();
                scrTargetArea.fn_applyBodyRectToElement(_heBody);
                fn_updateOutText();

                scrBoth.fn_updateAfterRect();
                scrHori.fn_updateAfterRect();
                break;
            }
            case 'ArrowUp': {
                scrTargetArea.bodyTop += fn_ppval();
                scrTargetArea.fn_applyBodyRectToElement(_heBody);
                fn_updateOutText();

                scrBoth.fn_updateAfterRect();
                scrVert.fn_updateAfterRect();
                break;
            }
            case 'ArrowDown': {
                scrTargetArea.bodyTop -= fn_ppval();
                scrTargetArea.fn_applyBodyRectToElement(_heBody);
                fn_updateOutText();

                scrBoth.fn_updateAfterRect();
                scrVert.fn_updateAfterRect();
                break;
            }
            case 'Minus': {
                if (ke.ctrlKey) {
                    ke.preventDefault();
                    fn_sizeDown();
                }
                break;
            }
            case 'Equal': {
                if (ke.ctrlKey) {
                    ke.preventDefault();
                    fn_sizeUp();
                }
                break;
            }

            // case 'KeyA': {
            //     console.log('여기');
            //     break;
            // }
        }
    });

})();


