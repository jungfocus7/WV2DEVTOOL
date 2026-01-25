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
const _viewport = _rootCont.querySelector('div.c_viewport');
// dcs.log('_viewport:', _viewport);

/**
 * @type {HTMLDivElement}
 */
const _img = _viewport.querySelector('img.c_img');
// dcs.log('_img:', _img);

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


    let rctViewport = hfStyleHelper.getRect(_viewport);
    // dcs.log('rctViewport:', rctViewport);

    let rctBody = hfStyleHelper.getRect(_img);
    // dcs.log('rctBody:', rctBody);

    let scrta = new hfScrollTargetArea(rctViewport, rctBody);
    // dcs.log('scrta:', scrta);


    let scrBoth = new hfScrollWave({
        targetArea: scrta,
        scrollType: hfScrollType.BOTH,
        heGround: bscr,
    });

    let scrHori = new hfScrollWave({
        targetArea: scrta,
        scrollType: hfScrollType.HORIZONTAL,
        heGround: hscr,
    });

    let scrVert = new hfScrollWave({
        targetArea: scrta,
        scrollType: hfScrollType.VERTICAL,
        heGround: vscr,
    });


    const fn_updateOutText = () => {
        let txt = `
rctViewport.width: ${rctViewport.width},
rctViewport.height: ${rctViewport.height},
rctViewport.left: ${rctViewport.left},
rctViewport.top: ${rctViewport.top},
rctBody.width: ${rctBody.width},
rctBody.height: ${rctBody.height},
rctBody.left: ${rctBody.left},
rctBody.top: ${rctBody.top},
        `.trim();

        _tam.value = txt;
    };

    /**
     * @param {string} stp
     */
    const fn_updateBodyPosition = (stp) => {
        if (stp === hfScrollType.BOTH) {
            let tx = scrta.bodyLeft;
            let ty = scrta.bodyTop;
            hfStyleHelper.setLeft(_img, tx);
            hfStyleHelper.setTop(_img, ty);
        } else if (stp === hfScrollType.HORIZONTAL) {
            let tx = scrta.bodyLeft;
            hfStyleHelper.setLeft(_img, tx);
        } else if (stp === hfScrollType.VERTICAL) {
            let ty = scrta.bodyTop;
            hfStyleHelper.setTop(_img, ty);
        }
    };

    scrBoth.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.BOTH);
        fn_updateOutText();

        scrHori.horiScrollRatio = scrBoth.horiScrollRatio;
        scrVert.vertScrollRatio = scrBoth.vertScrollRatio;
    });

    scrHori.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.HORIZONTAL);
        fn_updateOutText();

        scrBoth.horiScrollRatio = scrHori.horiScrollRatio;
    });

    scrVert.addEventListener(hfEventTypes.SCROLL, (_) => {
        fn_updateBodyPosition(hfScrollType.VERTICAL);
        fn_updateOutText();

        scrBoth.vertScrollRatio = scrVert.vertScrollRatio;
    });


    /**
     * @param {Event} _
     */
    const fn_resize = (_) => {
        let vpw = hfStyleHelper.getWidth(_viewport);
        let vph = hfStyleHelper.getHeight(_viewport);
        scrta.viewportWidth = vpw;
        scrta.viewportHeight = vph;

        let hspr = scrBoth.horiScrollRatio;
        let vspr = scrBoth.vertScrollRatio;
        scrta.fn_calcBodyLeft(hspr);
        scrta.fn_calcBodyTop(vspr);

        let tx = scrta.bodyLeft;
        let ty = scrta.bodyTop;
        hfStyleHelper.setLeft(_img, tx);
        hfStyleHelper.setTop(_img, ty);

        let vwr = scrta.viewportWidthRatio;
        let vhr = scrta.viewportHeightRatio;
        scrBoth.thumbWidthRatio = vwr;
        scrBoth.thumbHeightRatio = vhr;

        scrHori.thumbWidthRatio = vwr;
        scrVert.thumbHeightRatio = vhr;


        /*
        md.twr = scrta.viewportWidthRatio;
        md.thr = scrta.viewportHeightRatio;
        */

        /*
        scrBoth.fn_updateViewportSize(_viewport);

        let tx = scrta.bodyLeft;
        let ty = scrta.bodyTop;
        hfStyleHelper.setLeft(_img, tx);
        hfStyleHelper.setTop(_img, ty);

        fn_updateOutText();
        */

        // scrta.fn_updateViewportBounds(_viewport);
        // scrta.fn_updateBodyBounds(_img);
        // scrBoth.fn_updateViewportSize(rctViewport.width, rctViewport.height);
        // scrBoth.fn_updateBodyPosition();

        // let tx = scrta.bodyLeft;
        // let ty = scrta.bodyTop;
        // hfStyleHelper.setLeft(_img, tx);
        // hfStyleHelper.setTop(_img, ty);

/*
        scrta.fn_updateViewportBounds(_viewport);
        scrta.fn_updateBodyBounds(_img);
        dcs.log('rctViewport:', rctViewport);
        dcs.log('rctBody:', rctBody);

        let tx = scrta.bodyLeft;
        let ty = scrta.bodyTop;
        hfStyleHelper.setLeft(_img, tx);
        hfStyleHelper.setTop(_img, ty);
*/
        // fn_updateBodyPosition(hfScrollType.BOTH);

        /*
        hfStyleHelper.updateRect(_viewport, rctViewport);
        hfStyleHelper.updateRect(_img, rctBody);
        dcs.log('rctViewport:', rctViewport);
        // dcs.log('rctBody:', rctBody);
        // scrBoth.fn_updateViewportSize(rctViewport.width, rctViewport.height);

        let vwr = scrta.viewportWidthRatio;
        let vhr = scrta.viewportHeightRatio;
        scrBoth.thumbWidthRatio = vwr;
        scrBoth.thumbHeightRatio = vhr;

        scrHori.thumbWidthRatio = vwr;
        scrVert.thumbHeightRatio = vhr;

        fn_updateBodyPosition(hfScrollType.BOTH);
        fn_updateOutText();

        scrHori.horiScrollRatio = scrBoth.horiScrollRatio;
        scrVert.vertScrollRatio = scrBoth.vertScrollRatio;*/
    };
    let rsosv = new ResizeObserver((ros) => {
        fn_resize(null);
    });
    rsosv.observe(_contentCont);

})();




//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// const _contentCont = document.querySelector('div.c_root-cont>div.c_content-cont');

// let _scrta = new hfScrollTargetArea(
//     new DOMRect(), new DOMRect());
// dcs.log(_scrta);



// import { dcs } from "../../hbjs/hfCommon.js";
// import { hfScrollWaveType, hfScrollWave } from "../../hbjs/hfScrollWave.js";

// dcs.log('~~~~~~~~~~~~~~');
// // dcs.log(hfScrollWaveType, hfScrollWave);
// // dcs.log(document.querySelector('div.c_scroll-cont>div#vscr'));

// let _scwvV = new hfScrollWave({
//   logicType: hfScrollWaveType.VERTICAL,
//   heGround: document.querySelector('div.c_scroll-cont>div#vscr'),
// });


// console.log('...');


