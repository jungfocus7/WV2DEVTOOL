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
            md.cbf?.(hfFrameRepeater.ET_UPDATE, ++md.rc, md.rc);
            if (md.rc >= md.re) {
                md.cbf?.(hfFrameRepeater.ET_END, md.re, md.rc);
                this.#clearFrame();
            }
        }
    }

    reset() {
        const md = this.#md;
        this.#clearFrame();
        md.fc = 0;
        md.rc = 0;
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

/** @type {FrameRepeaterCallback} */
const fn_cbf = (et, re, rc) => {
    if (et === hfFrameRepeater.ET_UPDATE) {

    } else if (et === hfFrameRepeater.ET_END) {

    }
    console.log(et, re, rc);
};
const _frpt = new hfFrameRepeater(2, 500, fn_cbf);
window.addEventListener('keydown', (ke) => {
    let kcd = ke.code;
    if (kcd === 'Backquote') {
        _frpt.reset();
    } else if (kcd === 'Digit1') {
        _frpt.start();
    } else if (kcd === 'Digit2') {
        _frpt.stop();
    }
});























/*
    #loopFrame(_) {
        const md = this.#md;
        md.fid = requestAnimationFrame(md.fnfrc);
        // ++md.fc;
        // console.log('>>> ', md.fc, md.fd);
        if ((++md.fc % md.fd) === 0) {
            // console.log('Update >>>');
            ++md.rc;
            md.cbf?.(hfFrameRepeater.ET_UPDATE, md.re, md.rc);
            if (md.rc === md.re) {
                // console.log('End >>>');
                md.cbf?.(hfFrameRepeater.ET_END, md.re, md.rc);
                this.#clearFrame();
            }
            // console.log('>>> ', md.fc, md.fd, md.rc);
        }

        // console.log(md.fc, md.fd, md.rc);
    }

 */