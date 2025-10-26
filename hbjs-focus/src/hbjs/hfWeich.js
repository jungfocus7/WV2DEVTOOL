//#region `hfTween: 트윈 클래스`
//https://github.com/jungfocus7/jhb0b_as3_libs/blob/master/hbx/src/hbx/balence/CSmoothControl.as
export class hfWeich extends EventTarget {
    static ET_UPDATE = 'update';
    static ET_END = 'end';

    /**
     * 부드러운 움직임 객체
     * @param {number} now
     * @param {number} speed
     */
    constructor(now, speed = 0.3) {
        super();
        this.#running = false;
        this.#end = now;
        this.#now = now;
        this.#speed = speed;
        Object.seal(this);
    }

    #running = false;
    get running() {
        return this.#running;
    }

    #end = 0.0;
    get end() {
        return this.#end;
    }

    #now = 0.0;
    get now() {
        return this.#now;
    }

    #speed = 0.0;
    get speed() {
        return this.#speed;
    }


    #fid = -1;
    #clearFrame = () => {
        if (this.#fid === -1) return;
        cancelAnimationFrame(this.#fid);
        this.#fid = -1;
    }
    #loopFrame = (t) => {
        if (this.#running === false) return;
        const dst = this.#end - this.#now;
        if (Math.abs(dst) < 1) {
            this.#now = this.#end;
            this.dispatchEvent(new Event(hfWeich.ET_END));
            this.stop();
        }
        else {
            this.#now = this.#now + (dst * this.#speed);
            this.dispatchEvent(new Event(hfWeich.ET_UPDATE));
        }
        this.#fid = requestAnimationFrame(this.#loopFrame);
    }


    stop() {
        if (this.#running === true) {
            this.#clearFrame();
            this.#running = false;
        }
    }

    fromTo(end, now, speed = NaN) {
        if (this.#running === true)
            this.stop();
        this.#end = end;
        this.#now = now;
        if (isNaN(speed) === false)
            this.#speed = speed;
        this.#running = true;
        this.#fid = requestAnimationFrame(this.#loopFrame);
    }

    to(end, speed = NaN) {
        this.fromTo(end, this.#now, speed);
    }

}
//#endregion