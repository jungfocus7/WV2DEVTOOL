import { fn_print, btns } from "./SubCom.js";
import { hfCountTask } from "../hbjs/hfCountTask.js";



const fn_printAll = () => {
    fn_print(`countStart: ${ _cnt.countStart };`);
    fn_print(`countEnd: ${ _cnt.countEnd };`);
    fn_print(`plusValue: ${ _cnt.plusValue };`);
    fn_print(`count: ${ _cnt.count };`);
    fn_print('\n');
};
const _cnt = new hfCountTask(35, 55, 3);
fn_printAll();

window.addEventListener('keydown', (te) => {
    const key = te.key;

    let br = false;
    if (key === 'ArrowUp') {
        _cnt.prev();
        br = true;
    } else if (key === 'ArrowDown') {
        _cnt.next();
        br = true;
    }

    if (br) {
        fn_printAll();
    }
});




// btns[1].addEventListener('click', (te) => {
//     ct.prev();
//     fn_print(`ct.countStart: ${ ct.countStart };`);
//     fn_print(`ct.countEnd: ${ ct.countEnd };`);
//     fn_print(`ct.plusValue: ${ ct.plusValue };`);
//     fn_print(`ct.count: ${ ct.count };`);
//     fn_print('\n');
// });

// btns[2].addEventListener('click', (te) => {
//     ct.next();
//     fn_print(`ct.countStart: ${ ct.countStart };`);
//     fn_print(`ct.countEnd: ${ ct.countEnd };`);
//     fn_print(`ct.plusValue: ${ ct.plusValue };`);
//     fn_print(`ct.count: ${ ct.count };`);
//     fn_print('\n');
// });

// btns[3].addEventListener('click', (te) => {
//     ct.reset();
//     fn_print(`ct.countStart: ${ ct.countStart };`);
//     fn_print(`ct.countEnd: ${ ct.countEnd };`);
//     fn_print(`ct.plusValue: ${ ct.plusValue };`);
//     fn_print(`ct.count: ${ ct.count };`);
//     fn_print('\n');
// });
