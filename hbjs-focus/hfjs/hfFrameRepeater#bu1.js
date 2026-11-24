import { hfEventTypes } from "./hfEventTypes.mjs";


//#region [Signature Definitions]
/**
 * @callback hfFrameRepeater_callback
 * @param {string} ct - callback type
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


/*export */class hfFrameRepeater {
    // static CT_UPDATE = hfEventTypes.UPDATE;
    // static CT_END = hfEventTypes.END;
    static CT_UPDATE = 'update';
    static CT_END = 'end';

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
     * @param {hfFrameRepeater_callback} cbf
     */
    constructor(cbf) {
        const md = this.#md;

        md.fnfrc = this.#fn_loopFrame.bind(this);
        md.cbf = cbf;

        Object.seal(this);
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
            md.cbf(hfFrameRepeater.CT_UPDATE, md.re, ++md.rc);
            if (md.rc >= md.re) {
                md.cbf(hfFrameRepeater.CT_END, md.re, md.rc);
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
     * @param {number} fd - frame delay
     * @param {number} re - repeat end
     * @returns
     */
    fn_run(fd=undefined, re=undefined) {
        const md = this.#md;

        if (Number.isFinite(fd) && Number.isFinite(re)) {
            this.fn_reset();

            md.fd = fd;
            md.re = re;
        } else {
            this.fn_stop();
        }

        if (md.re > md.rc) {
            md.fid = globalThis.requestAnimationFrame(md.fnfrc);
        } else {
            throw 'err';
        }

        // if () md.re = re;
        // this.fn_reset();

        // if (Number.isFinite(fd)) md.fd = fd;
        // if (Number.isFinite(re)) md.re = re;

        // if (md.rc < md.re) {
        //     md.fid = globalThis.requestAnimationFrame(md.fnfrc);
        // }
    }

};
Object.freeze(hfFrameRepeater);
Object.freeze(hfFrameRepeater.prototype);


{
    let repeater = new hfFrameRepeater((ct, re, rc) => {
        console.log(ct, re, rc);
    });
    // repeater.fn_start();

    globalThis.addEventListener('keydown', (ke) => {
        if ('ArrowUp' === ke.code) {
            repeater.fn_stop();
        } else if ('ArrowLeft' === ke.code) {
            repeater.fn_run(30, 20);
        } else if ('ArrowRight' === ke.code) {
            repeater.fn_run();
        }
    });
};

