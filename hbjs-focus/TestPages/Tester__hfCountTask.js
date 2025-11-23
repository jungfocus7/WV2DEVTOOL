import { fn_print, btns } from "./SubCom.js";
import { hfCountTask } from "../hbjs/hfCountTask.js";



const fn_printAll = () => {
    // fn_print(`begin: ${ _cnt.begin };`);
    // fn_print(`end: ${ _cnt.end };`);
    // fn_print(`add: ${ _cnt.add };`);
    // fn_print(`now: ${ _cnt.now };\n`);
    let msg = `
begin: ${ _cnt.begin },
end: ${ _cnt.end },
add: ${ _cnt.add },
now: ${ _cnt.now },
    `.trim();
    fn_print(msg, false);
};
const _cnt = new hfCountTask(17, 321, -21.2134);
fn_printAll();

window.addEventListener('keydown', (ke) => {
    const key = ke.code;

    let br = false;
    if (key === 'ArrowLeft') {
        _cnt.prev();
        br = true;
    } else if (key === 'ArrowRight') {
        _cnt.next();
        br = true;
    } else if (key === 'Delete') {
        fn_print();
        return;
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
