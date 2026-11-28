//#region [Signature Definitions]
/**
 * @callback hfWeich_callback
 * @param {string} cbt - EventType
 * @param {number} cv - CurrentValue
 * @returns {void}
 */
//#endregion


/**
 * [hfWeich: (LastUpdated: 251114)]
 * https://github.com/jungfocus7/jhb0b_as3_libs/blob/master/hbx/src/hbx/balence/CSmoothControl.as
 */
export class hfWeich {
    static CT_UPDATE = 'update';
    static CT_END = 'end';

    #md = Object.seal({
        end: 0.0,
        now: 0.0,
        speed: 0.0,
        dst: 1.0,
        fid: -1,
        /** @type {FrameRequestCallback} */ fnfrc: null,
        /** @type {hfWeich_callback} */ cbf: null,
    });

    /**
     * @param {number} now - 0.0
     * @param {number} speed - 0.3
     * @param {number} dst - 1.0
     * @param {hfWeich_callback} cbf
     */
    constructor(now, speed=0.3, dst=1.0, cbf=null) {
        const md = this.#md;

        md.end = now;
        md.now = now;
        md.speed = speed;
        md.dst = dst;

        md.fnfrc = this.#fn_loopFrame.bind(this);
        md.cbf = cbf;

        Object.seal(this);
    }

    get running() {
        return this.#md.fid !== -1;
    }

    get end() {
        return this.#md.end;
    }

    get now() {
        return this.#md.now;
    }

    get speed() {
        return this.#md.speed;
    }

    #fn_clearFrame() {
        const md = this.#md;

        if (md.fid !== -1) {
            globalThis.cancelAnimationFrame(md.fid);
            md.fid = -1;
        }
    }

    /**
     *
     * @param {DOMHighResTimeStamp} _
     */
    #fn_loopFrame(_) {
        const md = this.#md;

        let dst = md.end - md.now;
        if (Math.abs(dst) < md.dst) {
            md.now = md.end;
            md.cbf(hfWeich.CT_UPDATE, md.now);
            md.cbf(hfWeich.CT_END, md.now);

            this.#fn_clearFrame();
        } else {
            md.now = md.now + (dst * md.speed);
            md.cbf(hfWeich.CT_UPDATE, md.now);
        }

        md.fid = globalThis.requestAnimationFrame(md.fnfrc);
    }

    fn_stop() {
        this.#fn_clearFrame();
    }

    /**
     * @param {number} end
     * @param {number} now
     */
    fn_fromTo(end, now) {
        const md = this.#md;

        this.fn_stop();

        md.end = end;
        md.now = now;

        md.fid = globalThis.requestAnimationFrame(md.fnfrc);
    }

    /**
     * @param {number} end
     */
    fn_to(end) {
        this.fn_fromTo(end, this.#md.now);
    }

};
Object.freeze(hfWeich);
Object.freeze(hfWeich.prototype);
