//#region `Signature definition`
/**
 * @callback CallbackFunction
 * @param {string} et - EventType
 * @param {number} cv - CurrentValue
 * @returns {void}
 */
//#endregion


//#region `hfWeich: (LastUpdated: 251114)`
//https://github.com/jungfocus7/jhb0b_as3_libs/blob/master/hbx/src/hbx/balence/CSmoothControl.as
class hfWeich {
    static ET_UPDATE = 'update';
    static ET_END = 'end';

    /**
     * @param {number} now
     * @param {number} speed
     * @param {CallbackFunction} cbf
     */
    constructor(now, speed=0.3, cbf=null) {
        const md = this.#md;
        md.end = now;
        md.now = now;
        md.speed = speed;
        md.fnfrc = this.#loopFrame.bind(this);
        md.cbf = cbf;
        Object.seal(this);
    }
    #md = Object.seal({
        end: 0.0,
        now: 0.0,
        speed: 0.0,
        fid: -1,
        /** @type {FrameRequestCallback} */ fnfrc: null,
        /** @type {CallbackFunction} */ cbf: null,
    });

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

    #clearFrame() {
        const md = this.#md;
        if (md.fid === -1) return;
        cancelAnimationFrame(md.fid);
        md.fid = -1;
    }

    /** @type {FrameRequestCallback} */
    #loopFrame(_) {
        const md = this.#md;
        md.fid = requestAnimationFrame(md.fnfrc);
        const dst = md.end - md.now;
        if (Math.abs(dst) < 1) {
            md.now = md.end;
            md.cbf(hfWeich.ET_UPDATE, md.now);
            md.cbf(hfWeich.ET_END, md.now);
            this.#clearFrame();
        } else {
            md.now = md.now + (dst * md.speed);
            md.cbf(hfWeich.ET_UPDATE, md.now);
        }

    }


    stop() {
        this.#clearFrame();
    }

    fromTo(end, now, speed=NaN) {
        const md = this.#md;
        this.stop();
        md.end = end;
        md.now = now;
        if (Number.isFinite(speed)) md.speed = speed;
        md.fid = requestAnimationFrame(md.fnfrc);
    }

    to(end, speed=NaN) {
        this.fromTo(end, this.#md.now, speed);
    }

}
Object.freeze(hfWeich);
//#endregion


export {
    hfWeich
}