/**
 * @param {SVGGraphicsElement} sge
 * @param {number} rw (RealWidth)
 * @param {number} rh (RealHeight)
 * @return
 */
const fn_getSize = (sge, rw, rh) => {
    // 'scale(-8.14 0.34231)'.match(/-?\d+(\.\d+)?/g)
    const vs = sge.getAttribute('transform');
    // const mts = vs.match(/-?\d+(\.\d+)?/g);

    const trsf = sge.transform;
    // console.log(trsf);
    // console.log(trsf, Reflect.getPrototypeOf(trsf));
    const lst = trsf.baseVal;
    // console.log(trsf, lst);
    let i = 0;
    for (const tx of lst) {
        if (tx.type === SVGTransform.SVG_TRANSFORM_SCALE) {
            const ty = tx.matrix;
            let tw = rw * ty.a;
            let th = rh * ty.d;
            if (tw > 400) tw = 400;
            if (th > 400) th = 400;
            console.log(tw, th, lst.length, i);
            break;
        }
        i++;
    }
    // if (trsf instanceof SVGAnimatedTransformList) {
    //     for (const tx of trsf) {
    //         tx.type ===
    //     }
    // }

    return vs;
};

/**
 * @param {SVGGraphicsElement} sge
 * @param {number} rw (RealWidth)
 * @param {number} rh (RealHeight)
 * @param {number} aw (ApplyWidth)
 * @param {number} ah (ApplyHeight)
 */
const fn_setSize = (sge, rw, rh, aw, ah) => {
    let px = aw / rw;
    let py = ah / rh;
    // sge.setAttribute('transform', `scale(${px}, ${py}), rotate(45)`);
    sge.setAttribute('transform', `rotate(45), rotate(-45), scale(${px}, ${py})`);
    // sge.setAttribute('transform', `scale(${px}, ${py})`);
};


const _tgtpl = `
<g transform="scale(1.0 1.0)">
  <use href="#d_rc1" fill="red"/>
  <text x="25" y="25" font-family="Arial" font-size="11"
    fill="blue" text-anchor="middle" font-weight="bolder"
    dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
</g>`.trim();





const _svgrt = document.getElementById('svgrt_1');
// console.log(_svgrt);

const _drc = _svgrt.getBoundingClientRect();
// console.log(_drc);

_svgrt.insertAdjacentHTML('beforeend', `
<g transform="scale(1.0 1.0)">
  <use href="#d_rc1" fill="red"/>
  <text x="25" y="25" font-family="Arial" font-size="11"
    fill="blue" text-anchor="middle" font-weight="bolder"
    dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
</g>`.trim());
_svgrt.insertAdjacentHTML('beforeend', `
<g transform="scale(1.0 1.0)">
  <use href="#d_rc1" fill="green"/>
  <text x="25" y="25" font-family="Arial" font-size="11"
    fill="blue" text-anchor="middle" font-weight="bolder"
    dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
</g>`.trim());
_svgrt.insertAdjacentHTML('beforeend', `
<g transform="scale(1.0 1.0),translate(10 10)">
  <use href="#d_rc1" fill="blue"/>
  <text x="25" y="25" font-family="Arial" font-size="11"
    fill="whitesmoke" text-anchor="middle" font-weight="bolder"
    dominant-baseline="central" clip-path="url(#d_cp1)">xxxxxxx박종명xxxxxxx</text>
</g>`.trim());

const _ges = Array.from(_svgrt.children).filter((te) => {
    return te instanceof SVGGElement;
});
console.log(_ges, Array.isArray(_ges));


fn_setSize(_ges[0], 50, 50, 300, 300);
fn_setSize(_ges[1], 50, 50, 200, 200);
fn_setSize(_ges[2], 50, 50, 100, 100);

const _ge = _ges[2];

const fn_test = () => {
    // console.log(_ge.transform.baseVal);
    // console.log(_ge.getAttribute('transform'));
    console.log(fn_getSize(_ge, 50, 50));
};

window.addEventListener('mousemove', (me) => {
    let tx = me.clientX - _drc.left;
    let ty = me.clientY - _drc.top;
    if (tx < 0) tx = 0;
    if (ty < 0) ty = 0;

    // _ge.setAttribute('transform', `translate(${tx} ${ty})`);
    fn_setSize(_ge, 50, 50, tx, ty);

    fn_test();
});