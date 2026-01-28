import { hfEventTypes, hfStyleHelper, dcs } from "../../hbjs/hfCommon.js";
import { hfScrollTargetArea, hfScrollType, hfScrollWave } from "../../hbjs/hfScrollWave.js";



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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


(() => {
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
//         let txt = `
// ViewportWidth: ${rctViewport.width},
// ViewportHeight: ${rctViewport.height},
// ViewportLeft: ${rctViewport.left},
// ViewportTop: ${rctViewport.top},
// BodyWidth: ${rctBody.width},
// BodyHeight: ${rctBody.height},
// BodyLeft: ${rctBody.left},
// BodyTop: ${rctBody.top},
//         `.trim();

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
        if (stp === hfScrollType.BOTH) {
            let tx = scrTargetArea.bodyLeft;
            let ty = scrTargetArea.bodyTop;
            hfStyleHelper.setLeft(_heBody, tx);
            hfStyleHelper.setTop(_heBody, ty);
        } else if (stp === hfScrollType.HORIZONTAL) {
            let tx = scrTargetArea.bodyLeft;
            hfStyleHelper.setLeft(_heBody, tx);
        } else if (stp === hfScrollType.VERTICAL) {
            let ty = scrTargetArea.bodyTop;
            hfStyleHelper.setTop(_heBody, ty);
        }
    };

    // /**
    //  * @param {string} stp
    //  */
    // const fn_updateBodySize = (stp) => {
    //     if (stp === hfScrollType.BOTH) {
    //         let tw = scrTargetArea.bodyWidth;
    //         let th = scrTargetArea.bodyHeight;
    //         hfStyleHelper.setWidth(_heBody, tw);
    //         hfStyleHelper.setHeight(_heBody, th);
    //     } else if (stp === hfScrollType.HORIZONTAL) {
    //         let tw = scrTargetArea.bodyWidth;
    //         hfStyleHelper.setWidth(_heBody, tw);
    //     } else if (stp === hfScrollType.VERTICAL) {
    //         let th = scrTargetArea.bodyHeight;
    //         hfStyleHelper.setHeight(_heBody, th);
    //     }
    // };

    scrBoth.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.BOTH);
        fn_updateOutText();

        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();
    });

    scrHori.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.HORIZONTAL);
        fn_updateOutText();

        scrBoth.fn_updateAfterRect();
    });

    scrVert.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.VERTICAL);
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

        let cx = scrTargetArea.bodyLeft;
        let cy = scrTargetArea.bodyTop;
        hfStyleHelper.setLeft(_heBody, cx);
        hfStyleHelper.setTop(_heBody, cy);

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
        }
    });




    // /**
    //  * 클립보드 이벤트를 처리하여 이미지 태그의 src를 변경합니다.
    //  */
    // document.addEventListener('paste', (event) => {
    //     // 1. 클립보드 데이터 확인
    //     let clipboardData = event.clipboardData;
    //     if (!clipboardData) return;

    //     // 2. 대상 이미지 요소 선택 및 타입 명시 (checkJs 오류 해결)
    //     /** @type {HTMLImageElement} */
    //     let targetImg = _heViewport.querySelector('img.c_body');
    //     if (!targetImg) return;

    //     // 3. 아이템 순회 및 이미지 처리
    //     const items = clipboardData.items;
    //     for (let i = 0; i < items.length; i++) {
    //         if (items[i].type.indexOf('image') !== -1) {
    //             const blob = items[i].getAsFile();
    //             if (blob) {
    //                 // 기존 ObjectURL이 있다면 메모리 해제 (선택 사항)
    //                 if (targetImg.src.startsWith('blob:')) {
    //                     URL.revokeObjectURL(targetImg.src);
    //                 }

    //                 targetImg.onload = () => {
    //                     let tw = targetImg.width;
    //                     let th = targetImg.height;
    //                     console.log(tw, th);
    //                     scrta.bodyWidth = tw;
    //                     scrta.bodyHeight = th;

    //                     // scrBoth.fn_updateAfterRect();
    //                     // scrHori.fn_updateAfterRect();
    //                     // scrVert.fn_updateAfterRect();

    //                     fn_resize(null);
    //                 };
    //                 // 4. 새로운 src 할당
    //                 targetImg.src = URL.createObjectURL(blob);

    //                 break; // 이미지 하나만 처리할 경우 루프 종료
    //             }
    //         }
    //     }
    // });

})();


