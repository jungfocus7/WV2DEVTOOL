import { dcs } from "../../hbjs/hfCommon.js";
import { fn_print } from "./page_com.js";


const fn_clear = () => {
    dcs.log('fn_clear');
};

const fn_stop = () => {
    dcs.log('fn_stop');
};

const fn_init = () => {
    // dcs.log('fn_init');
};

export default {
    fn_clear, fn_stop, fn_init
};

