/**
 * @typedef {object} GameInfo
 * @property {HTMLDivElement} rootCont
 * @property {SVGSVGElement} svgCont
 * @property {SVGGElement} gCont
 */


class GameManager {
    constructor() {
        let md = this.#md;
        md.rootCont = document.querySelector('div.c_rootCont');
        md.svgCont = md.rootCont.lastElementChild;
        md.gCont = md.svgCont.lastElementChild;

        let t2 = [];
        for (let i = 0; i < 10; i++) {
            t2.push(`
<g style="overflow: hidden;" clip-path="url(#d_cp1)">
    <rect width="50" height="50" fill="red"></rect>
    <text x="10" y="30" fill="none" stroke="white"
        font-size="20">I love SVG!</text>
</g>
            `.trim());
        }
        md.gCont.insertAdjacentHTML('beforeend', t2.join(''));
        console.log(md.gCont.style.perspective);
        // md.svgCont.transformOrigin = '20px 20px';
        // md.svgCont.transformStyle = 'preserve-3d';
        // md.svgCont.style.perspective = '300px';
        // md.rootCont.style.transformStyle = 'preserve-3d';
        md.rootCont.style.perspective = '3000px';
        console.log(md.rootCont.style.perspective);

        /** @type {SVGGElement} */
        let lge = md.gCont.lastElementChild;

        let est = lge.style;
        // est.backfaceVisibility = 'hidden';
        est.transformStyle = 'preserve-3d';
        est.transformOrigin = '20px 20px';

        let rafid = -1;
        let rv = 0;
        let fn_frc = (_) => {
            rafid = requestAnimationFrame(fn_frc);
            est.transform = `translate(50px, 50px) rotateY(${rv}deg)`;
            rv = (rv + 1) % 360;
        };
        requestAnimationFrame(fn_frc);



        // /** @type {SVGGElement} */
        // let tx = md.gCont.lastElementChild;
        // // tx.style.transform = `translate(50px, 50px) rotateY(90deg)`;

        // let rafid = -1;
        // let rv = 0;
        // let fn_frc = (tm) => {
        //     // tm = Math.round(tm);

        //     rafid = requestAnimationFrame(fn_frc);
        //     // if ((tm % 2) === 0) return;
        //     let st = tx.style;
        //     st.backfaceVisibility = 'hidden';
        //     st.transformStyle = 'preserve-3d';
        //     st.transformOrigin = '20px 20px';
        //     st.transform = `translate(50px, 50px) rotateY(${rv}deg)`;
        //     rv = (rv + 1) % 360;
        //     // if (rv === 0) {
        //     //     cancelAnimationFrame(rafid);
        //     //     rafid = -1;
        //     // }
        //     // console.log(rv, st.transform);
        //     // tm = Math.round(tm);
        //     // console.log((tm % 2) === 0);
        // };
        // requestAnimationFrame(fn_frc);



/*
shape-rendering="crispEdges"
*/
//         let t1 = `
// <rect width="100" height="100" fill="blue"/>
// <rect width="100" height="100" fill="blue"/>
// <rect width="100" height="100" fill="blue"/>
// <rect width="100" height="100" fill="blue"/>
// <rect width="100" height="100" fill="blue"/>
//         `;
//         md.svgCont.insertAdjacentHTML('beforeend', t1);

//         md.svgCont.innerHTML = '';

//         md.svgCont.insertAdjacentHTML('beforeend', `
//   <defs>
//     <clipPath id="d_cp1">
//       <rect width="40" height="40" x="0" y="0"/>
//     </clipPath>
//   </defs>
//         `.trim());

//         let t2 = [];
//         for (let i = 0; i < 1000; i++) {
//             t2.push(`
// <g style="overflow: hidden;" clip-path="url(#d_cp1)">
//     <rect width="50" height="50" fill="blue"></rect>
//     <text x="10" y="30" fill="none" stroke="red"
//         font-size="20">I love SVG!</text>
// </g>
//             `.trim());
//         }
//         md.svgCont.insertAdjacentHTML('beforeend', t2.join(''));

    }

    /** @type {GameInfo} */
    #md = {
        rootCont: null,
        svgCont: null,
        gCont: null,
    };

    reset() {

    }

    stop() {

    }

    start() {

    }
}




/** @type {HTMLDivElement} */
let _rootCont = document.querySelector('div.c_rootCont');
// console.log(_rootCont);

let _game = new GameManager();










        // // /** @type {SVGRectElement} */
        // let tx = md.svgCont.lastElementChild;
        // console.log(getComputedStyle(tx));
        // console.log(tx.getAttribute('fill'));
        // console.log(tx.attributes.fill);
        // console.log(tx.attributes.fill.value);
        // console.log(tx.attributes.fill.textContent);

        // // /** @type {SVGRectElement} */
        // // let tx = md.rootCont.lastElementChild;
        // // console.log(""+tx);
        // // tx.style.fill = 'green';
        // // console.log(getComputedStyle(tx));
        // // console.log(tx.attributes);
        // // for (let ty of tx.attributes) {
        // //     console.log(`${ty.name}: ${ty.value}`);
        // // }
