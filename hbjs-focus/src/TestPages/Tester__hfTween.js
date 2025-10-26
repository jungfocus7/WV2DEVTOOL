import { fn_print, btns } from "./SubCom.js";
import { hfEaseCircular, hfTween } from "../hbjs/hfTween.js";



const cc = document.getElementById('_cc');
const svgcont = document.getElementById('_svgcont');
let tx = parseInt(cc.getAttribute('cx'), 10);
let ty = parseInt(cc.getAttribute('cy'), 10);
// console.log(tx, ty);

const twx = new hfTween(tx, 36, hfEaseCircular.easeInOut);
const twy = new hfTween(ty, 36, hfEaseCircular.easeInOut);
const twcUpdate = (te) => {
    // console.log(te);
    tx = twx.current;
    ty = twy.current;
    fn_print(`UPDATE: (X=${ tx }, Y=${ ty });`);
    cc.setAttribute('cx', tx);
    cc.setAttribute('cy', ty);
};
const twcEnd = (te) => {
    // console.log(te);
    tx = twx.current;
    ty = twy.current;
    fn_print(`END: (X=${ tx }, Y=${ ty });`);
    cc.setAttribute('cx', tx);
    cc.setAttribute('cy', ty);
};
twx.addEventListener(hfTween.ET_UPDATE, twcUpdate);
twy.addEventListener(hfTween.ET_UPDATE, twcUpdate);
twx.addEventListener(hfTween.ET_END, twcEnd);
twy.addEventListener(hfTween.ET_END, twcEnd);

svgcont.addEventListener('click', (te) => {
    const mx = te.offsetX;
    const my = te.offsetY;
    fn_print(`BEGIN: (X=${ mx }, Y=${ my });`);
    twx.to(mx);
    twy.to(my);
});


btns[1].addEventListener('click', (te) => {
    twx.stop();
    twy.Stop();
});
