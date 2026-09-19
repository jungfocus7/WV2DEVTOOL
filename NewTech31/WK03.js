import {
    fn_convert3,
    fn_checkCharacters,
    fn_checkNumChar,
} from "./_hfBaseMod.js";
import {
} from "./_hfEvaler.js";


//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const COLOR_RESET = '\x1b[0m';
const COLOR_GREEN = '\x1b[32m';
const COLOR_RED = '\x1b[31m';

// const __allChars = [undefined, ...Array.from('()/*+-.0123456789'), undefined];
const __allChars = [undefined, ...Array.from('()/*+-.7'), undefined];
// const __allChars = Array.from('|7|');

{
    /**
     * @type {Map<string, string>}
     */
    const __map = new Map();

    /**
     * @param {string} pch
     * @param {string} cch
     * @param {string} nch
     */
    const fn_fakeRun = (pch, cch, nch) => {
        let wo = `"${fn_convert3(pch)}${fn_convert3(cch)}${fn_convert3(nch)}"`;
        let em = fn_checkCharacters(cch, pch, nch);
        __map.set(wo, em);
    };

    /** */
    const fn_outOfResult = () => {
        for (let etr of __map.entries()) {
            let wo = etr[0];
            let me = etr[1];
            if (me === 'yes') {
                console.log(`${COLOR_GREEN}[SUCCESS]>>> ${wo} >>> true${COLOR_RESET}`);
            } else {
                console.log(`${COLOR_RED}[ERROR]>>> ${wo} >>> false${COLOR_RESET}`);
            }
        }
    };

    /** */
    const fn_entry = () => {
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
    };

    // fn_entry();
}

{
    const _buff = Array.from('');

    /**
     * @type {Map<string, string>}
     */
    const __map2 = new Map();

    /**
     * @param {string} pch
     * @param {string} cch
     * @param {string} nch
     */
    const fn_fakeRun2 = (pch, cch, nch) => {
        let wo = `"${fn_convert3(pch)}${fn_convert3(cch)}${fn_convert3(nch)}"`;
        let em = fn_checkNumChar(cch, _buff, pch, nch);
        __map2.set(wo, em);
    };

    /** */
    const fn_outOfResult2 = () => {
        for (let etr of __map2.entries()) {
            let wo = etr[0];
            let me = etr[1];
            if (me === 'yes') {
                console.log(`${COLOR_GREEN}[SUCCESS]>>> ${wo} >>> true${COLOR_RESET}`);
            } else {
                console.log(`${COLOR_RED}[ERROR]>>> ${wo} >>> false${COLOR_RESET}`);
            }
        }
    };

    /** */
    const fn_entry2 = () => {
        for (let pch of __allChars) {
            for (let cch of __allChars) {
                for (let nch of __allChars) {
                    if (undefined !== cch) {
                        fn_fakeRun2(pch, cch, nch);
                    }
                }
            }
        }

        fn_outOfResult2();
    };

    fn_entry2();
}
