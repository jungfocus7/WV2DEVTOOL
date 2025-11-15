//#region `Signature definition`
/**
 * @callback FrameRepeaterCallback
 * @param {string} et - EventType
 * @param {number} re
 * @param {number} rc
 * @returns {void}
 */
//#endregion


class hfFrameRepeater {
    static ET_UPDATE = 'update';
    static ET_END = 'end';

    /**
     * @param {number} fd - FrameDelay
     * @param {number} re - RepeatEnd
     * @param {FrameRepeaterCallback} cbf
     */
    constructor(fd, re, cbf) {
        const md = this.#md;
        md.fd = fd;
        md.re = re;
        md.fnfrc = this.#loopFrame.bind(this);
        md.cbf = cbf;
        Object.seal(this);
    }
    #md = Object.seal({
        fd: 60, fc: 0,
        re: 3, rc: 0,
        /** @type {FrameRequestCallback} */ fnfrc: null,
        /** @type {FrameRepeaterCallback} */ cbf: null,
        fid: -1,
    });

    get running() {
        return this.#md.fid !== -1;
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
        if ((++md.fc % md.fd) === 0) {
            md.cbf?.(hfFrameRepeater.ET_UPDATE, md.re, ++md.rc);
            if (md.rc >= md.re) {
                md.cbf?.(hfFrameRepeater.ET_END, md.re, md.rc);
                this.#clearFrame();
            }
        }
    }

    toString() {
        const md = this.#md;
        return `re: ${md.re}, rc: ${md.rc}`;
    }

    reset() {
        const md = this.#md;
        this.#clearFrame();
        md.fc = 0;
        md.rc = 0;
    }

    dispose() {
        const md = this.#md;
        this.reset();
        md.fnfrc = null;
        md.cbf = null;
    }

    stop() {
        this.#clearFrame();
    }

    start() {
        const md = this.#md;
        if (this.running) return;
        if (md.rc < md.re) {
            md.fid = requestAnimationFrame(md.fnfrc);
        }
    }

};
Object.freeze(hfFrameRepeater);

export {
    hfFrameRepeater
};
