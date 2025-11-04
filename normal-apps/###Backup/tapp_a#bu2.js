import { hfGlobal } from "./hfGlobal.js";
import { CellItem_ta } from "./CellItem_ta.js";


/** @type {SVGSVGElement} */
const _svgrt = document.getElementById('svgrt_1');
// console.log(_svgrt);
// _svgrt.setAttribute('transform', 'translate(30, 30)');
// console.log(_svgrt.transform);

// /** @type {DOMRect} */
// const _drc = _svgrt.getBoundingClientRect();
// console.log(_drc);

CellItem_ta.readForInit(_svgrt, null);
/** @type {CellItem_ta[]} */
const _cels = [];


(() => {
    const rrw = 100;
    const rrh = 100;

    for (const tk in hfGlobal.colorInfos) {
        const tv = hfGlobal.colorInfos[tk];
        // console.log(tk, tv);
        _cels.push(new CellItem_ta({
            width: rrw, height: rrh,
            x: 0, y: 0,
            crcd: tv,
            crnm: tk,
        }));
    }

    const colcnt = 7;
    let i = 0;
    for (const cel of _cels) {
        let tx = rrw * (i % colcnt);
        let ty = rrh * Math.floor(i / colcnt);
        cel.setX(tx, false);
        cel.setY(ty, false);
        cel.applyFromRect();
        i++;
    }

})();


const fn_setClipboard = (txt) => {
    navigator.clipboard.writeText(txt)
        .then(() => {
            // 성공적으로 복사되었을 때
            console.log(`Copied to clipboard\n${txt}`);
        })
        .catch((err) => {
            // 복사 실패 (예: HTTPS 환경이 아니거나 권한이 없는 경우)
            console.log(`Failed to copy to clipboard ${err}`);
        });
};

window.addEventListener('click', (me) => {
    const mx = me.clientX;
    const my = me.clientY;
    // console.log(mx, my);

    const drc = _svgrt.getBoundingClientRect()
    const bl = drc.left + 4;
    const bt = drc.top + 4;
    for (const cel of _cels) {
        const rct = cel.getRect();
        // console.log(rct);

        let cl = bl + rct.left;
        let cr = bl + rct.right;
        let ct = bt + rct.top;
        let cb = bt + rct.bottom;
        if (((mx > cl) && (mx < cr)) &&
            ((my > ct) && (my < cb))) {
            // console.log(cel);
            fn_setClipboard(cel.getColorInfo());
            break;
        }
    }
});









// window.addEventListener('click', (me) => {
//     const mx = me.clientX;
//     const my = me.clientY;

//     // const fe = document.elementFromPoint(mx, my);
//     // console.log(fe, _cels.length);

//     const bl = _drc.left + 4;
//     const bt = _drc.top + 4;
//     let i = 0;
//     for (const cel of _cels) {
//         const rct = cel.getRect();
//         // console.log(rct);

//         let cl = bl + rct.left;
//         let cr = bl + rct.right;
//         let ct = bt + rct.top;
//         let cb = bt + rct.bottom;
//         if (((mx > cl) && (mx < cr)) &&
//             ((my > ct) && (my < cb))) {
//             console.log(cel);
//             fn_setClipboard(cel.getColorInfo());
//             break;
//         }

//         // let tw = rct.width;
//         // let th = rct.height;
//         // let tx = _drc.left + rct.x;
//         // let ty = _drc.top + rct.y;

//         // let tl = (_drc.left + 4) + rct.left;
//         // let tr = (_drc.right + 4) + rct.right;
//         // let tt = (_drc.left + 4) + rct.top;
//         // let tb = (_drc.right + 4) + rct.bottom;
//         // if (i == 0) {
//         //     console.log(mx, my);
//         //     console.log(rct);
//         //     console.log(tl, tt, tr, tb);
//         //     break;
//         // }
//         // i++;

//         // let cl = (_drc.left + 4) + rct.left;
//         // let cr = (_drc.right + 4) + rct.right;
//         // let ct = (_drc.left + 4) + rct.top;
//         // let cb = (_drc.right + 4) + rct.bottom;
//         // if (((mx > cl) && (mx < cr)) &&
//         //     ((my > ct) && (my < cb))) {
//         //     console.log(cl, ct, cr, cb);
//         // }
//     }


//     // // 1. 텍스트를 클립보드에 씁니다.
//     // navigator.clipboard.writeText('textToCopy')
//     //     .then(() => {
//     //         // 성공적으로 복사되었을 때
//     //         // messageElement.textContent = '✅ 복사 완료!';
//     //         console.log('클립보드에 텍스트 복사 성공!');

//     //         // 2초 후 메시지 제거
//     //         setTimeout(() => {
//     //             // messageElement.textContent = '';
//     //         }, 2000);
//     //     })
//     //     .catch(err => {
//     //         // 복사 실패 (예: HTTPS 환경이 아니거나 권한이 없는 경우)
//     //         // messageElement.textContent = '❌ 복사 실패. 콘솔을 확인하세요.';
//     //         console.error('클립보드 복사 실패:', err);
//     //     });

// });




// window.addEventListener('mousemove', (me) => {
//     const rmx = _drc.width - 100;
//     const rmy = _drc.height - 100;
//     let tx = me.clientX - _drc.left;
//     let ty = me.clientY - _drc.top;
//     if (tx < 0) tx = 0;
//     else if (tx > rmx) tx = rmx;
//     if (ty < 0) ty = 0;
//     else if (ty > rmy) ty = rmy;
//     _cella[0].setWidth(tx, false);
//     _cella[0].setHeight(ty, false);
//     _cella[0].applyFromRect();
//     _cella[1].setX(tx, false);
//     _cella[1].setY(ty, false);
//     _cella[1].applyFromRect();
// });
