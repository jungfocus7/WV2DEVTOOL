export const hfSVGHelper = Object.freeze({
//#region (x, y)
    /**
     * width 반환
     * @param {SVGRectElement} se
     */
    get_width: (se) => {
        if (se instanceof SVGRectElement)
            return se.width.baseVal.value;
        else
            return 0;
    },

    /**
     * height 입력
     * @param {SVGRectElement} se
     * @param {number} tv
     */
    set_width: (se, tv) => {
        if (se instanceof SVGRectElement)
            se.width.baseVal.value = tv;
    },


    /**
     * height 반환
     * @param {SVGRectElement} se
     */
    get_height: (se) => {
        if (se instanceof SVGRectElement)
            return se.height.baseVal.value;
        else
            return 0;
    },

    /**
     * height 입력
     * @param {SVGRectElement} se
     * @param {number} tv
     */
    set_height: (se, tv) => {
        if (se instanceof SVGRectElement)
            se.height.baseVal.value = tv;
    },
//#endregion


//#region (w, h)
    /**
     * x 반환
     * @param {SVGRectElement
     *  | SVGTextElement | SVGGElement} se
     */
    get_x: (se) => {
        if (se instanceof SVGRectElement)
            return se.x.baseVal.value;
        else if (se instanceof SVGTextElement)
            return se.x.baseVal.getItem(0).value;
        else if (se instanceof SVGGElement) {

            // const stf = se.transform.baseVal.getItem(0);
            // stf.setTranslate
            // return se.transform.baseVal.getItem(0).value;
        }
        else
            return 0;
    },

    /**
     * x 입력
     * @param {SVGRectElement | SVGTextElement} se
     * @param {number} tv
     */
    set_x: (se, tv) => {
        if (se instanceof SVGRectElement)
            se.x.baseVal.value = tv;
        else if (se instanceof SVGTextElement)
            se.x.baseVal.getItem(0).value = tv;
    },

    /**
     * y 반환
     * @param {SVGRectElement} se
     */
    get_y: (se) => {
        if (se instanceof SVGRectElement)
            return se.y.baseVal.value;
        else if (se instanceof SVGTextElement)
            return se.y.baseVal.getItem(0).value;
        else
            return 0;
    },

    /**
     * y 입력
     * @param {SVGRectElement | SVGTextElement} se
     * @param {number} tv
     */
    set_y: (se, tv) => {
        if (se instanceof SVGRectElement)
            se.y.baseVal.value = tv;
        else if (se instanceof SVGTextElement)
            se.y.baseVal.getItem(0).value = tv;
    },
//#endregion







    // /**
    //  * @param {SVGAnimatedLength
    //  *  | SVGAnimatedLengthList
    //  *  | SVGAnimatedTransformList} val
    //  */
    // get_val: (val) => {
    //     if (val instanceof SVGAnimatedLength)
    //         return val.baseVal.value;
    //     else if (val instanceof SVGAnimatedLengthList)
    //         return val.baseVal.getItem(0).value;
    //     else if (val instanceof SVGAnimatedTransformList)
    //         return val.baseVal.getItem(0).value;
    //     else
    //         return 0;
    //     // if (val instanceof SVGAnimatedLength) {
    //     //     /** @type {SVGAnimatedLength} */
    //     //     const x0 = val;
    //     //     x0.baseVal.getItem(0)

    //     //     return val.baseVal.value;
    //     // }
    //     // else if (val instanceof SVGAnimatedLengthList) {
    //     //     /** @type {SVGAnimatedLengthList} */
    //     //     const x0 = val;
    //     //     x0.baseVal.getItem
    //     //     // SVGAnimatedLengthList(val).baseVal
    //     //     // return SVGAnimatedLengthList(val). .get.value;
    //     // }
    //     // return 0;
    // },

    // /**
    //  * @param {SVGAnimatedLength
    //  *  | SVGAnimatedLengthList
    //  *  | SVGAnimatedTransformList} val
    //  * @param {number} tv
    //  */
    // set_val: (val, tv) => {
    //     // val.baseVal.value = tv;
    //     if (val instanceof SVGAnimatedLength)
    //         val.baseVal.value = tv;
    //     else if (val instanceof SVGAnimatedLengthList)
    //         val.baseVal.getItem(0).value = tv;
    //     else if (val instanceof SVGAnimatedTransformList)
    //         val.baseVal.getItem(0).value = tv;
    // }

});