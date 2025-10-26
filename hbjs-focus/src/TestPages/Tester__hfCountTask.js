import { fn_print, btns } from "./SubCom.js";
import { hfCountTask } from "../hbjs/hfCountTask.js";



const ct = new hfCountTask(35, 55, 3);
fn_print(`ct.countStart: ${ ct.countStart };`);
fn_print(`ct.countEnd: ${ ct.countEnd };`);
fn_print(`ct.plusValue: ${ ct.plusValue };`);
fn_print(`ct.count: ${ ct.count };`);
fn_print('\n');


btns[1].addEventListener('click', (te) => {
    ct.prev();
    fn_print(`ct.countStart: ${ ct.countStart };`);
    fn_print(`ct.countEnd: ${ ct.countEnd };`);
    fn_print(`ct.plusValue: ${ ct.plusValue };`);
    fn_print(`ct.count: ${ ct.count };`);
    fn_print('\n');
});

btns[2].addEventListener('click', (te) => {
    ct.next();
    fn_print(`ct.countStart: ${ ct.countStart };`);
    fn_print(`ct.countEnd: ${ ct.countEnd };`);
    fn_print(`ct.plusValue: ${ ct.plusValue };`);
    fn_print(`ct.count: ${ ct.count };`);
    fn_print('\n');
});

btns[3].addEventListener('click', (te) => {
    ct.reset();
    fn_print(`ct.countStart: ${ ct.countStart };`);
    fn_print(`ct.countEnd: ${ ct.countEnd };`);
    fn_print(`ct.plusValue: ${ ct.plusValue };`);
    fn_print(`ct.count: ${ ct.count };`);
    fn_print('\n');
});
