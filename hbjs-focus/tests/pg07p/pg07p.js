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
TargetArea.vwr: ${(100 * scrTargetArea.vwr).toFixed(1)}%,
TargetArea.vhr: ${(100 * scrTargetArea.vhr).toFixed(1)}%,
TargetArea.hspr: ${(100 * scrTargetArea.hspr).toFixed(1)}%,
TargetArea.vspr: ${(100 * scrTargetArea.vspr).toFixed(1)}%,
ViewportWidth: ${scrTargetArea.viewportWidth},
ViewportHeight: ${scrTargetArea.viewportHeight},
BodyWidth: ${scrTargetArea.bodyWidth},
BodyHeight: ${scrTargetArea.bodyHeight},
BodyLeft: ${scrTargetArea.bodyLeft},
BodyTop: ${scrTargetArea.bodyTop},
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




    // window.addEventListener('keydown', (ke) => {
    //     switch (ke.code) {
    //         case 'Digit1': {
    //             scrTargetArea.bodyWidth = 1200;
    //             scrTargetArea.bodyHeight = 1200;

    //             // fn_updateBodySize(hfScrollType.BOTH);
    //             // fn_updateBodyPosition(hfScrollType.BOTH);
    //             scrTargetArea.fn_applyBodyRectToElement(_heBody);
    //             fn_updateOutText();

    //             scrBoth.fn_updateAfterRect();
    //             scrHori.fn_updateAfterRect();
    //             scrVert.fn_updateAfterRect();

    //             break;
    //         }
    //     }
    // });

    const fn_sizeUp = () => {
        scrTargetArea.bodyWidth += 100;
        scrTargetArea.bodyHeight += 100;
        scrTargetArea.fn_applyBodyRectToElement(_heBody);
        fn_updateOutText();

        scrBoth.fn_updateAfterRect();
        scrHori.fn_updateAfterRect();
        scrVert.fn_updateAfterRect();
    };
    const fn_sizeDown = () => {
        scrTargetArea.bodyWidth -= 100;
        scrTargetArea.bodyHeight -= 100;
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


