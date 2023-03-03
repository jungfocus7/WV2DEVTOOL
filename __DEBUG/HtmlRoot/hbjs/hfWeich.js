//#region `hfTween: 트윈 클래스`
//https://github.com/jungfocus7/jhb0b_as3_libs/blob/master/hbx/src/hbx/balence/CSmoothControl.as
export class hfWeich extends EventTarget {
    static ET_UPDATE = 'update';
    static ET_END = 'end';

    constructor(now, speed = 0.3) {
        super();
        this.#running = false;
        this.#end = now;
        this.#now = now;
        this.#speed = speed;
        Object.seal(this);
    }

    #running = false;
    get Running() {
        return this.#running;
    }

    #end = 0.0;
    get End() {
        return this.#end;
    }

    #now = 0.0;
    get Now() {
        return this.#now;
    }

    #speed = 0.0;
    get Speed() {
        return this.#speed;
    }


    #fid = -1;
    #ClearFrame = () => {
        if (this.#fid === -1) return;
        cancelAnimationFrame(this.#fid);
        this.#fid = -1;
    };
    #LoopFrame = (t) => {
        if (this.#running === false) return;
        const dst = this.#end - this.#now;
        if (Math.abs(dst) < 1) {
            this.#now = this.#end;
            this.dispatchEvent(new Event(hfWeich.ET_END));
            this.Stop();
        }
        else {
            this.#now = this.#now + (dst * this.#speed);
            this.dispatchEvent(new Event(hfWeich.ET_UPDATE));
        }
        this.#fid = requestAnimationFrame(this.#LoopFrame);
    };


    /**
     * 멈추기
     */
    Stop() {
        if (this.#running === true) {
            this.#ClearFrame();
            this.#running = false;
        }
    }

    /**
     * 시작점에서 시작
     * @param {number} end
     * @param {number} now
     * @param {number} speed
     */
    FromTo(end, now, speed = NaN) {
        if (this.#running === true)
            this.Stop();
        this.#end = end;
        this.#now = now;
        if (isNaN(speed) === false)
            this.#speed = speed;
        this.#running = true;
        this.#fid = requestAnimationFrame(this.#LoopFrame);
    }

    /**
     * 현시점에서 시작
     * @param {number} end
     * @param {number} speed
     */
    To(end, speed = NaN) {
        this.FromTo(end, this.#now, speed);
    }
}
//#endregion