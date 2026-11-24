import { fn_checkCurrent } from "./_wtlib.js";


{//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const COLOR_RESET = '\x1b[0m';
    const COLOR_GREEN = '\x1b[32m';
    const COLOR_RED = '\x1b[31m';
    // const COLOR_YELLOW = '\x1b[33m';
    // const COLOR_BLUE  = '\x1b[34m';
    // const COLOR_CYAN  = '\x1b[36m';


    /**
     * @param {string} wo
     */
    const fn_fakeRun = (wo) => {
        let br = fn_checkCurrent(wo[1], wo[0], wo[2]);
        if (br) {
            // console.log(`>>> ${wo}, ${br}`);
            console.log(`${COLOR_GREEN}[SUCCESS]> ${wo}, ${br}${COLOR_RESET}`);
        } else {
            // console.error(`>>> "${wo}", ${br}`);
            console.log(`${COLOR_RED}[ERROR]> ${wo}, ${br}${COLOR_RESET}`);
        }
    };

    // const _wos = [
    //     '*--'
    // ];
    // for (let wo of _wos) {
    //     fn_fakeRun(wo);
    // }

    // const __allChars = '()/*+-.0123456789';
    // for (let ca of __allChars) {
    //     for (let cb of __allChars) {
    //         for (let cc of __allChars) {
    //             let wo = ca + cb + cc;
    //             // fn_fakeRun(wo);
    //             if (wo.indexOf('--') === 0) {
    //                 fn_fakeRun(wo);
    //             }
    //         }
    //     }
    // }

    let br = fn_checkCurrent('-', undefined, '-');
    if (br) {
        console.log(`${COLOR_GREEN}[SUCCESS]> ${br}${COLOR_RESET}`);
    } else {
        console.log(`${COLOR_RED}[ERROR]> ${br}${COLOR_RESET}`);
    }

}




// {//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//     const args = process.argv;
//     const fp = args[1];
//     if (fp.indexOf("_wtlib.js") > -1) {
//         const COLOR_RESET = '\x1b[0m';
//         const COLOR_GREEN = '\x1b[32m';
//         const COLOR_RED = '\x1b[31m';
//         // const COLOR_YELLOW = '\x1b[33m';
//         // const COLOR_BLUE  = '\x1b[34m';
//         // const COLOR_CYAN  = '\x1b[36m';
//         const __allChars = '()/*+-.0123456789';
//         for (let ca of __allChars) {
//             for (let cb of __allChars) {
//                 for (let cc of __allChars) {
//                     let wo = ca + cb + cc;
//                     if ('(-0' === wo) {
//                         console.log(1004);
//                     }
//                     let br = fn_checkCurrent(wo[1], wo[0], wo[2]);
//                     if (br) {
//                         // console.log(`>>> ${wo}, ${br}`);
//                         // console.log(`${COLOR_GREEN}[INFO]> ${wo}, ${br}${COLOR_RESET}`);
//                     } else {
//                         // console.error(`>>> "${wo}", ${br}`);
//                         console.log(`${COLOR_RED}[ERROR]> ${wo}, ${br}${COLOR_RESET}`);
//                     }
//                 }
//             }
//         }
//     }
// }


// //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// {
//     console.log(fn_checkCurrent);


//     // const __allChars = '()/*+-.0123456789';
//     // for (let ca of __allChars) {
//     //     for (let cb of __allChars) {
//     //         for (let cc of __allChars) {
//     //             let wo = ca + cb + cc;
//     //             let br = fn_checkCurrent(wo[1], wo[0], wo[2]);
//     //             if (br) {
//     //                 // console.log(`>>> ${wo}: ${br}`);
//     //             } else {
//     //                 console.error(`>>> "${wo}": ${br}`);
//     //             }
//     //         }
//     //     }
//     // }



//     // const _wors = [
//     //     '///', '/*/', '/*/'

//     // ];
//     // for (let wor of _wors) {
//     //     let br = fn_chkcc(_wors[1], _wors[0], _wors[2]);
//     //     if (br) {
//     //         console.log(`>>> ${_wors}: ${br}`);
//     //     } else {
//     //         console.error(false);
//     //     }
//     // }
// }



// let _pc;
// let _cc = '/';
// let _nc;

// if ('*' === _cc)  {

// }