import { fn_print, btns } from "./SubCom.js";
import { hfWeich } from "../hbjs/hfWeich.js";



const cc = document.getElementById('_cc');
const svgcont = document.getElementById('_svgcont');
let tx = parseInt(cc.getAttribute('cx'), 10);
let ty = parseInt(cc.getAttribute('cy'), 10);
// console.log(tx, ty);

let tc = 0;
const fn_cbf = (et, _) => {
    if (et === hfWeich.ET_UPDATE) {
        tx = twx.now;
        ty = twy.now;
        fn_print(`UPDATE: (X=${ tx }, Y=${ ty });`);
        if (tc == 0) {
            tc = 1;
        } else {
            cc.setAttribute('cx', tx);
            cc.setAttribute('cy', ty);
            // console.log(`UPDATE: (X=${ tx }, Y=${ ty });`);
            tc = 0;
        }
    } else if (et === hfWeich.ET_END) {
        tx = twx.end;
        ty = twy.end;
        fn_print(`END: (X=${ tx }, Y=${ ty });`);
    }
};
const twx = new hfWeich(tx, 0.2, 1.0, fn_cbf);
const twy = new hfWeich(ty, 0.2, 1.0, fn_cbf);

svgcont.addEventListener('click', (te) => {
    const mx = te.offsetX;
    const my = te.offsetY;
    fn_print(`BEGIN: (X=${ mx }, Y=${ my });`);
    twx.to(mx);
    twy.to(my);
});


btns[1].addEventListener('click', (te) => {
    twx.stop();
    twy.stop();
});