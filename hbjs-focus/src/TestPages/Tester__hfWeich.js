import { fn_print, btns } from "./SubCom.js";
import { hfWeich } from "../hbjs/hfWeich.js";



const cc = document.getElementById('_cc');
const svgcont = document.getElementById('_svgcont');
let tx = parseInt(cc.getAttribute('cx'), 10);
let ty = parseInt(cc.getAttribute('cy'), 10);
// console.log(tx, ty);

const twx = new hfWeich(tx);
const twy = new hfWeich(ty);
const twcUpdate = (te) => {
    // console.log(te);
    tx = twx.now;
    ty = twy.now;
    fn_print(`UPDATE: (X=${ tx }, Y=${ ty });`);
    cc.setAttribute('cx', tx);
    cc.setAttribute('cy', ty);
};
const twcend = (te) => {
    // console.log(te);
    tx = twx.end;
    ty = twy.end;
    fn_print(`END: (X=${ tx }, Y=${ ty });`);
    cc.setAttribute('cx', tx);
    cc.setAttribute('cy', ty);
};
twx.addEventListener(hfWeich.ET_UPDATE, twcUpdate);
twy.addEventListener(hfWeich.ET_UPDATE, twcUpdate);
twx.addEventListener(hfWeich.ET_END, twcend);
twy.addEventListener(hfWeich.ET_END, twcend);

svgcont.addEventListener('click', (te) => {
    const mx = te.offsetX;
    const my = te.offsetY;
    fn_print(`BEGIN: (X=${ mx }, Y=${ my });`);
    twx.to(mx);
    twy.to(my);
});


btns[1].addEventListener('click', (te) => {
    twx.Stop();
    twy.Stop();
});