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
const _heBody = _heViewport.querySelector('img.c_body');
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
            hfStyleHelper.setLeft(_heBody, tx);
            hfStyleHelper.setTop(_heBody, ty);
        } else if (stp === hfScrollType.HORIZONTAL) {
            let tx = scrta.bodyLeft;
            hfStyleHelper.setLeft(_heBody, tx);
        } else if (stp === hfScrollType.VERTICAL) {
            let ty = scrta.bodyTop;
            hfStyleHelper.setTop(_heBody, ty);
        }
    };

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
        scrta.viewportWidth = vpw;
        scrta.viewportHeight = vph;

        let cx = scrta.bodyLeft;
        let cy = scrta.bodyTop;
        hfStyleHelper.setLeft(_heBody, cx);
        hfStyleHelper.setTop(_heBody, cy);

        fn_updateOutText();
    };
    let rsosv = new ResizeObserver((_) => {
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


