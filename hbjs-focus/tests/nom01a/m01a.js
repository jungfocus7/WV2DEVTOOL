

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
(() => {

    /**
     * @type {HTMLDivElement}
     */
    const _rootCont = document.querySelector('div.c_root-cont');
    // console.log('_rootCont:', _rootCont);

    /**
     * @type {HTMLDivElement}
     */
    const _contentCont = _rootCont.querySelector('div.c_content-cont');
    // console.log('_contentCont:', _contentCont);

    /**
     * @type {HTMLDivElement}
     */
    const _heViewport = _rootCont.querySelector('div.c_viewport');
    // console.log('_heViewport:', _heViewport);

    /**
     * @type {HTMLDivElement}
     */
    const _heBody = _heViewport.querySelector('div.c_body');
    // console.log('_heBody:', _heBody);

    /**
     * @type {HTMLDivElement}
     */
    const _heImg = _heBody.querySelector('div.c_img');
    // console.log('_heImg:', _heImg);




    /**
     * 넘버인지 확인후 반환
     * @param {number | string} tv
     * @param {number} dv
     * @returns {number}
     */
    const fn_checkNumber = (tv, dv=0) => {
        let rv = NaN;
        if (typeof tv === 'number')
            rv = tv;
        else if (typeof tv === 'string')
            rv = Number.parseFloat(tv);

        if (Number.isFinite(rv))
            return rv;
        else
            return dv;
    };

    /**
     * HTMLElement 스타일 객체 반환
     * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
     * @param {boolean} bw writeable
     * @returns {CSSStyleDeclaration}
     */
    const fn_getStyle = (to, bw=false) => {
        if (to instanceof CSSStyleDeclaration)
            return to;
        else if (to instanceof HTMLElement) {
            if (bw)
                return to.style;
            else
                return getComputedStyle(to);
        }
        else
            return null;
    };

    /**
     * HTMLElement width(Number) 반환
     * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
     * @returns {number}
     */
    const fn_getWidth = (to) => {
        const csd = fn_getStyle(to);
        if (csd) {
            let tv = csd.getPropertyValue('width');
            return fn_checkNumber(tv);
        }
        else return 0;
    };

    /**
     * HTMLElement height(Number) 반환
     * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
     * @returns {number}
     */
    const fn_getHeight = (to) => {
        const csd = fn_getStyle(to);
        if (csd) {
            let tv = csd.getPropertyValue('height');
            return fn_checkNumber(tv);
        }
        else return 0;
    };

    /**
     * HTMLElement left(Number) 가져오기
     * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
     * @returns {number}
     */
    const fn_getLeft = (to) => {
        const csd = fn_getStyle(to);
        if (csd) {
            let tv = csd.getPropertyValue('left');
            return fn_checkNumber(tv);
        }
        else return 0;
    };

    /**
     * HTMLElement top(Number) 반환
     * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
     * @returns {number}
     */
    const fn_getTop = (to) => {
        const csd = fn_getStyle(to);
        if (csd) {
            let tv = csd.getPropertyValue('top');
            return fn_checkNumber(tv);
        }
        else return 0;
    };

    /**
     * HTMLElement Rect 반환
     * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
     * @returns {DOMRect}
     */
    const fn_getRect = (to) => {
        const csd = fn_getStyle(to);
        if (csd) {
            let tx = fn_getLeft(csd);
            let ty = fn_getTop(csd);
            let tw = fn_getWidth(csd);
            let th = fn_getHeight(csd);
            let rct = new DOMRect(tx, ty, tw, th);
            return rct;
        }
        else return null;
    };

    /**
     * HTMLElement width(Number) 설정
     * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
     * @param {number} tv
     */
    const fn_setWidth = (to, tv) => {
        const csd = fn_getStyle(to, true);
        if (csd) {
            tv = fn_checkNumber(tv);
            csd.setProperty('width', `${tv}px`);
        }
    };

    /**
     * HTMLElement height(Number) 설정
     * @param {CSSStyleDeclaration | HTMLElement} to TargetObject
     * @param {number} tv
     */
    const fn_setHeight = (to, tv) => {
        const csd = fn_getStyle(to, true);
        if (csd) {
            tv = fn_checkNumber(tv);
            csd.setProperty('height', `${tv}px`);
        }
    };



    // let ttd = 45;
    // window.addEventListener('click', () => {
    //     let rct = fn_getRect(_heImg);
    //     // console.log(rct);

    //     let ang = ttd;
    //     ttd += 7;
    //     // console.log(ang);

    //     let rda = (Math.PI / 180) * ang;
    //     // console.log(rda);

    //     let thx = Math.abs(Math.cos(rda));
    //     let thy = Math.abs(Math.sin(rda));
    //     // console.log(thx, thy);

    //     let nw = (rct.width * thx) + (rct.height * thy);
    //     let nh = (rct.width * thy) + (rct.height * thx);
    //     // console.log(nw, nh);

    //     // let tx = (nw - rct.width) / 2;
    //     // let ty = (nh - rct.height) / 2;
    //     // console.log(nw, nh);

    //     // let csd = fn_getStyle(_heImg, true);
    //     // csd.setProperty('transform', `translate(${tx}px, ${ty}px) rotate(${ang}deg)`);
    //     // csd.setProperty('transform', `rotate(${ang}deg)`);

    //     // fn_setWidth(_heBody, nw + 4);
    //     // fn_setHeight(_heBody, nh + 4);

    //     let maxwh = Math.sqrt(Math.pow(rct.width, 2) + Math.pow(rct.height, 2));
    //     console.log(maxwh);
    //     fn_setWidth(_heBody, maxwh + 4);
    //     fn_setHeight(_heBody, maxwh + 4);

    //     let csd = fn_getStyle(_heImg, true);
    //     let nx = (maxwh / 2) - (rct.width / 2);
    //     let ny = (maxwh / 2) - (rct.height / 2);
    //     csd.setProperty('transform', `translate(${nx}px, ${ny}px) rotate(${ang}deg)`);

    // });


    let drct = fn_getRect(_heImg);
    let ang = 0;

    const fn_updateCore = () => {
        let maxsz = Math.sqrt(Math.pow(drct.width, 2) + Math.pow(drct.height, 2));
        // console.log(maxsz);

        fn_setWidth(_heBody, maxsz + 4);
        fn_setHeight(_heBody, maxsz + 4);

        let csd = fn_getStyle(_heImg, true);
        csd.setProperty('width', `${drct.width}px`);
        csd.setProperty('height', `${drct.height}px`);

        let nx = (maxsz / 2) - (drct.width / 2);
        let ny = (maxsz / 2) - (drct.height / 2);
        csd.setProperty('transform', `translate(${nx}px, ${ny}px) rotate(${ang}deg)`);
    };

    const fn_rotateLeft = () => {
        ang -= 7;
        fn_updateCore();
    };

    const fn_rotateRight = () => {
        ang += 7;
        fn_updateCore();
    };

    const fn_sizeUp = () => {
        let cw = drct.width + 30;
        if (cw < 50) cw = 50;
        drct.width = cw;

        let ch = drct.height + 30;
        if (ch < 50) ch = 50;
        drct.height = ch;

        fn_updateCore();
    };

    const fn_sizeDown = () => {
        let cw = drct.width - 30;
        if (cw < 50) cw = 50;
        drct.width = cw;

        let ch = drct.height - 30;
        if (ch < 50) ch = 50;
        drct.height = ch;

        fn_updateCore();
    };

    window.addEventListener('keydown', (ke) => {
        // console.log(ke.code);

        switch (ke.code) {
            case 'KeyA': {
                fn_rotateLeft();
                break;
            }

            case 'KeyD': {
                fn_rotateRight();
                break;
            }

            case 'KeyW': {
                fn_sizeUp();
                break;
            }

            case 'KeyS': {
                fn_sizeDown();
                break;
            }
        }

    });

    fn_updateCore();

})();





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



        // let rda = (Math.PI / 180) * ang;
        // // console.log(rda);

        // let thx = Math.abs(Math.cos(rda));
        // let thy = Math.abs(Math.sin(rda));
        // // console.log(thx, thy);



    // window.addEventListener('click', () => {
    //     let rct = hfStyleHelper.getRect(_heImg);
    //     // console.log(rct);

    //     let ang = 45;
    //     // console.log(ang);

    //     let rda = (Math.PI / 180) * ang;
    //     // console.log(rda);

    //     let thx = Math.abs(Math.cos(rda));
    //     let thy = Math.abs(Math.sin(rda));
    //     // console.log(thx, thy);

    //     let nw = (rct.width * thx) + (rct.height * thy);
    //     let nh = (rct.width * thy) + (rct.height * thx);
    //     console.log(nw, nh);


    //     let csd = hfStyleHelper.getStyle(_heImg, true);
    //     csd.setProperty('transform', `rotate(${ang}deg)`);
    //     // csd.setProperty('transform', `translate(42px, 18px);`);
    //     // csd.setProperty('opacity', '0.1');
    //     // csd.transform = "translate(150px, 75px)";
    //     // csd.setProperty('transform', `translate(150px, 75px)`);

    // });


