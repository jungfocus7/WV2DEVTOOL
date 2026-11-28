import { fn_err } from "./_hfcom.mjs";
import { hfEventTypes } from "./hfEventTypes.mjs";


//#region [Signature Definitions]
/**
 * @callback hfFrameRepeater_callback
 * @param {string} cbt - callback type
 * @param {number} re - repeat end
 * @param {number} rc - repeat count
 * @returns {void}
 */

/**
 * @typedef {object} hfFrameRepeater_mds
 * @property {number} fd - frame delay
 * @property {number} fc - frame count
 * @property {number} re - repeat end
 * @property {number} rc - repeat count
 * @property {FrameRequestCallback} fnfrc
 * @property {hfFrameRepeater_callback} cbf
 * @property {number} fid - frameRequest id
 */
//#endregion


/**
 * Frame 반복기
 */
export class hfFrameRepeater {
    static CBT_UPDATE = hfEventTypes.UPDATE;
    static CBT_END = hfEventTypes.END;
    // static CBT_UPDATE = 'update';
    // static CBT_END = 'end';

    /**
     * @type {hfFrameRepeater_mds}
     */
    #md = Object.seal({
        fd: 60, fc: 0,
        re: 3, rc: 0,

        fnfrc: undefined,
        cbf: undefined,

        fid: -1,
    });

    /**
     * @param {number} fd - FrameDelay
     * @param {hfFrameRepeater_callback} cbf
     */
    constructor(fd, cbf) {
        const md = this.#md;

        if (Number.isFinite(fd) && (typeof cbf === 'function')) {
            md.fd = fd;
            md.fnfrc = this.#fn_loopFrame.bind(this);
            md.cbf = cbf;

            Object.seal(this);
        } else {
            // throw 'err';
            fn_err('Invalid (fd, cbf)args.');
        }
    }

    /**
     * ??
     */
    get running() {
        return this.#md.fid !== -1;
    }

    /**
     * ??
     */
    toString() {
        const md = this.#md;

        return `re: ${md.re}, rc: ${md.rc}`;
    }

    /**
     * ??
     */
    #fn_clearFrame() {
        const md = this.#md;

        if (md.fid !== -1) {
            globalThis.cancelAnimationFrame(md.fid);
            md.fid = -1;
        }
    }

    /**
     * @param {DOMHighResTimeStamp} _
     */
    #fn_loopFrame(_) {
        const md = this.#md;

        if ((++md.fc % md.fd) === 0) {
            md.cbf(hfFrameRepeater.CBT_UPDATE, md.re, ++md.rc);

            if (md.rc >= md.re) {
                md.cbf(hfFrameRepeater.CBT_END, md.re, md.rc);
                this.#fn_clearFrame();
                return;
            }
        }

        md.fid = globalThis.requestAnimationFrame(md.fnfrc);
    }

    /**
     * ??
     */
    fn_reset() {
        const md = this.#md;

        this.#fn_clearFrame();
        md.fc = 0;
        md.rc = 0;
    }

    /**
     * ??
     */
    fn_dispose() {
        const md = this.#md;

        this.fn_reset();
        md.fnfrc = undefined;
        md.cbf = undefined;
    }

    /**
     * ??
     */
    fn_stop() {
        this.#fn_clearFrame();
    }

    /**
     * @param {number} re - repeat end
     * @returns
     */
    fn_run(re=undefined) {
        const md = this.#md;

        if (Number.isFinite(re)) {
            this.fn_reset();
            md.re = re;
        } else {
            this.fn_stop();
        }

        if (md.re > md.rc) {
            md.fid = globalThis.requestAnimationFrame(md.fnfrc);
        } else {
            // fn_err('err');
        }
    }

};
Object.freeze(hfFrameRepeater);
Object.freeze(hfFrameRepeater.prototype);


// {
//     let repeater = new hfFrameRepeater(30, (cbt, re, rc) => {
//         console.log(cbt, re, rc);
//     });

//     globalThis.addEventListener('keydown', (ke) => {
//         if ('ArrowUp' === ke.code) {
//             repeater.fn_stop();
//         } else if ('ArrowLeft' === ke.code) {
//             repeater.fn_run(20);
//         } else if ('ArrowRight' === ke.code) {
//             repeater.fn_run();
//         }
//     });
// };
