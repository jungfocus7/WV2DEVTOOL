import { fn_checkCharacters } from "./_wtlib_b_.js";


{//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    const COLOR_RESET = '\x1b[0m';
    const COLOR_GREEN = '\x1b[32m';
    const COLOR_RED = '\x1b[31m';

    /**
     * @type {Map<string, boolean>}
     */
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
    const fn_fakeRun = (pch, cch, nch) => {
        let wo = `"${fn_convet3(pch)}${fn_convet3(cch)}${fn_convet3(nch)}"`;
        let br = fn_checkCharacters(cch, pch, nch);
        __map.set(wo, br);
    };

    /**
     *
     */
    const fn_outOfResult = () => {
        for (let etr of __map.entries()) {
            let wo = etr[0];
            let br = etr[1];
            if (br) {
                console.log(`${COLOR_GREEN}[SUCCESS]>>> ${wo} >>> ${br}${COLOR_RESET}`);
            } else {
                console.log(`${COLOR_RED}[ERROR]>>> ${wo} >>> ${br}${COLOR_RESET}`);
            }
        }
    };

    // /**
    //  * @param {string} wo
    //  */
    // const fn_cst = (wo) => {
    //     let em = fn_checkCharacters(wo[0], wo[1], wo[2]);
    //     if (em === '') {
    //         console.log(`${COLOR_GREEN}[SUCCESS]>>> ${wo} >>> ${em}${COLOR_RESET}`);
    //     } else {
    //         console.log(`${COLOR_RED}[ERROR]>>> ${wo} >>> ${em}${COLOR_RESET}`);
    //     }
    // };


    const __allChars = [undefined, ...Array.from('()/*+-.0123456789'), undefined];
    // const __allChars = [undefined, ...Array.from('()/*+-.7'), undefined];
    // const __allChars = Array.from('|7|');
    for (let pch of __allChars) {
        for (let cch of __allChars) {
            for (let nch of __allChars) {
                // fn_fakeRun32(pch, cch, nch);

                if (undefined !== cch) {
                    fn_fakeRun(pch, cch, nch);
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

    fn_outOfResult();
    // console.log(1004);

}
