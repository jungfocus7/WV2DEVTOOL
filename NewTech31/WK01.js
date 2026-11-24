import { fn_checkCharacters } from "./_wtlib_b.js";


{//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const COLOR_RESET = '\x1b[0m';
    const COLOR_GREEN = '\x1b[32m';
    const COLOR_RED = '\x1b[31m';

    // const __collected = new Set();
    const __map = new Map();


    /**
     * @param {string} ch
     * @returns
     */
    const fn_convet3 = (ch) => {
        return (undefined === ch) ? '|' : ch;
    };

    /**
     * @param {string} pch
     * @param {string} cch
     * @param {string} nch
     */
    const fn_fakeRun32 = (pch, cch, nch) => {
        // let wo = `"${pch}${cch}${nch}"`;
        let wo = `"${fn_convet3(pch)}${fn_convet3(cch)}${fn_convet3(nch)}"`;
        // if (__map.has(wo)) {
        //     let cnt = __map.get(wo) + 1;
        //     __map.set(wo, cnt);
        // } else {
        //     __map.set(wo, 1);
        // }
        // if ('"|7|"' !== wo) {
        //     return;
        // }
        // if ('".7."' !== wo) {
        //     return;
        // }

        let br = fn_checkCharacters(cch, pch, nch);
        if (br) {
            // console.log(`>>> ${wo}, ${br}`);
            console.log(`${COLOR_GREEN}[SUCCESS]>>> ${wo} >>> ${br}${COLOR_RESET}`);
        } else {
            // console.error(`>>> "${wo}", ${br}`);
            // console.log(`${COLOR_RED}[ERROR]>>> ${wo} >>> ${br}${COLOR_RESET}`);
        }
    };


    // const __allChars = [undefined, ...Array.from('()/*+-.0123456789'), undefined];
    const __allChars = [undefined, ...Array.from('()/*+-.7'), undefined];
    // const __allChars = Array.from('|7|');
    for (let pch of __allChars) {
        for (let cch of __allChars) {
            for (let nch of __allChars) {
                // fn_fakeRun32(pch, cch, nch);

                if (undefined !== cch) {
                    fn_fakeRun32(pch, cch, nch);
                }

                // if (
                //     (undefined !== cch) && (undefined !== nch) &&
                //     (undefined === pch) && ('-' === cch)
                // ) {
                //     fn_fakeRun32(pch, cch, nch);
                // } else {
                //     fn_fakeRun32(pch, cch, nch);
                // }
            }
        }
    }

    console.log(1004);

}
