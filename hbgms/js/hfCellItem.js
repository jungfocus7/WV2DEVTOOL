/**
 * CSS 컬러 이름과 HEX 코드를 매핑하는 객체
 * 자주 사용되는 기본 색상만 포함합니다. 필요에 따라 추가할 수 있습니다.
 */
/**
 * CSS Level 3/4의 모든 표준 컬러 이름과 HEX 코드를 매핑한 객체입니다.
 * (transparent와 currentColor 키워드는 제외되었습니다. 실제 색상 값만 포함합니다.)
 */
const COLOR_NAMES_TO_HEX = {
    "aliceblue": "#f0f8ff",
    "antiquewhite": "#faebd7",
    "aqua": "#00ffff", // Synonym for cyan
    "aquamarine": "#7fffd4",
    "azure": "#f0ffff",
    "beige": "#f5f5dc",
    "bisque": "#ffe4c4",
    "black": "#000000",
    "blanchedalmond": "#ffebcd",
    "blue": "#0000ff",
    "blueviolet": "#8a2be2",
    "brown": "#a52a2a",
    "burlywood": "#deb887",
    "cadetblue": "#5f9ea0",
    "chartreuse": "#7fff00",
    "chocolate": "#d2691e",
    "coral": "#ff7f50",
    "cornflowerblue": "#6495ed",
    "cornsilk": "#fff8dc",
    "crimson": "#dc143c",
    "cyan": "#00ffff", // Synonym for aqua
    "darkblue": "#00008b",
    "darkcyan": "#008b8b",
    "darkgoldenrod": "#b8860b",
    "darkgray": "#a9a9a9",
    "darkgreen": "#006400",
    "darkgrey": "#a9a9a9",
    "darkkhaki": "#bdb76b",
    "darkmagenta": "#8b008b",
    "darkolivegreen": "#556b2f",
    "darkorange": "#ff8c00",
    "darkorchid": "#9932cc",
    "darkred": "#8b0000",
    "darksalmon": "#e9967a",
    "darkseagreen": "#8fbc8f",
    "darkslateblue": "#483d8b",
    "darkslategray": "#2f4f4f",
    "darkslategrey": "#2f4f4f",
    "darkturquoise": "#00ced1",
    "darkviolet": "#9400d3",
    "deeppink": "#ff1493",
    "deepskyblue": "#00bfff",
    "dimgray": "#696969",
    "dimgrey": "#696969",
    "dodgerblue": "#1e90ff",
    "firebrick": "#b22222",
    "floralwhite": "#fffaf0",
    "forestgreen": "#228b22",
    "fuchsia": "#ff00ff", // Synonym for magenta
    "gainsboro": "#dcdcdc",
    "ghostwhite": "#f8f8ff",
    "gold": "#ffd700",
    "goldenrod": "#daa520",
    "gray": "#808080",
    "green": "#008000",
    "greenyellow": "#adff2f",
    "grey": "#808080", // Synonym for gray
    "honeydew": "#f0fff0",
    "hotpink": "#ff69b4",
    "indianred": "#cd5c5c",
    "indigo": "#4b0082",
    "ivory": "#fffff0",
    "khaki": "#f0e68c",
    "lavender": "#e6e6fa",
    "lavenderblush": "#fff0f5",
    "lawngreen": "#7cfc00",
    "lemonchiffon": "#fffacd",
    "lightblue": "#add8e6",
    "lightcoral": "#f08080",
    "lightcyan": "#e0ffff",
    "lightgoldenrodyellow": "#fafad2",
    "lightgray": "#d3d3d3",
    "lightgreen": "#90ee90",
    "lightgrey": "#d3d3d3",
    "lightpink": "#ffb6c1",
    "lightsalmon": "#ffa07a",
    "lightseagreen": "#20b2aa",
    "lightskyblue": "#87cefa",
    "lightslategray": "#778899",
    "lightslategrey": "#778899",
    "lightsteelblue": "#b0c4de",
    "lightyellow": "#ffffe0",
    "lime": "#00ff00",
    "limegreen": "#32cd32",
    "linen": "#faf0e6",
    "magenta": "#ff00ff", // Synonym for fuchsia
    "maroon": "#800000",
    "mediumaquamarine": "#66cdaa",
    "mediumblue": "#0000cd",
    "mediumorchid": "#ba55d3",
    "mediumpurple": "#9370db",
    "mediumseagreen": "#3cb371",
    "mediumslateblue": "#7b68ee",
    "mediumspringgreen": "#00fa9a",
    "mediumturquoise": "#48d1cc",
    "mediumvioletred": "#c71585",
    "midnightblue": "#191970",
    "mintcream": "#f5fffa",
    "mistyrose": "#ffe4e1",
    "moccasin": "#ffe4b5",
    "navajowhite": "#ffdead",
    "navy": "#000080",
    "oldlace": "#fdf5e6",
    "olive": "#808000",
    "olivedrab": "#6b8e23",
    "orange": "#ffa500",
    "orangered": "#ff4500",
    "orchid": "#da70d6",
    "palegoldenrod": "#eee8aa",
    "palegreen": "#98fb98",
    "paleturquoise": "#afeeee",
    "palevioletred": "#db7093",
    "papayawhip": "#ffefd5",
    "peachpuff": "#ffdab9",
    "peru": "#cd853f",
    "pink": "#ffc0cb",
    "plum": "#dda0dd",
    "powderblue": "#b0e0e6",
    "purple": "#800080",
    "rebeccapurple": "#663399",
    "red": "#ff0000",
    "rosybrown": "#bc8f8f",
    "royalblue": "#4169e1",
    "saddlebrown": "#8b4513",
    "salmon": "#fa8072",
    "sandybrown": "#f4a460",
    "seagreen": "#2e8b57",
    "seashell": "#fff5ee",
    "sienna": "#a0522d",
    "silver": "#c0c0c0",
    "skyblue": "#87ceeb",
    "slateblue": "#6a5acd",
    "slategray": "#708090",
    "slategrey": "#708090",
    "snow": "#fffafa",
    "springgreen": "#00ff7f",
    "steelblue": "#4682b4",
    "tan": "#d2b48c",
    "teal": "#008080",
    "thistle": "#d8bfd8",
    "tomato": "#ff6347",
    "turquoise": "#40e0d0",
    "violet": "#ee82ee",
    "wheat": "#f5deb3",
    "white": "#ffffff",
    "whitesmoke": "#f5f5f5",
    "yellow": "#ffff00",
    "yellowgreen": "#9acd32"
};

/**
 * HEX 코드 또는 CSS 컬러 이름을 받아 완전히 대비되는 색상을 반환합니다.
 * @param {string} cr - CSS 색상 코드 (HEX 또는 컬러 이름).
 * @returns {string} 대비되는 HEX 색상 코드 (예: '#000000').
 */
const fn_getRevertColor = (cr) => {
    let colorString = cr.toLowerCase().trim();
    let hex;

    // 1. 컬러 이름인지 확인
    if (COLOR_NAMES_TO_HEX[colorString]) {
        hex = COLOR_NAMES_TO_HEX[colorString];
    }
    // 2. HEX 코드인지 확인 및 정리
    else {
        hex = colorString.startsWith('#') ? colorString.substring(1) : colorString;

        // 3자리 HEX 코드를 6자리로 확장 (예: fff -> ffffff)
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }

        // 유효한 6자리 HEX 코드가 아니면 (예: 'abc') 기본값인 검은색을 가정합니다.
        if (hex.length !== 6 || !/^[0-9a-fA-F]{6}$/.test(hex)) {
            console.error(`Error: Invalid color input: ${cr}. Defaulting to #000000.`);
            hex = '000000';
        }
    }

    // 4. HEX 코드 반전 계산 (0xFFFFFF ^ 현재 값)
    // hex가 '#ffffff' (white)라면 0xFFFFFF, 반전하면 0 (black)이 됩니다.
    // hex가 '#ff0000' (red)라면 0xFFFFFF ^ 0xFF0000 = 0x00FFFF (cyan)이 됩니다.
    const hexToDecimal = parseInt(hex.substring(1) || hex, 16);
    const revertColorDecimal = 0xFFFFFF ^ hexToDecimal;

    // 5. 10진수 값을 다시 16진수 문자열로 변환하고 6자리로 패딩
    let revertHex = revertColorDecimal.toString(16);
    revertHex = '000000'.substring(0, 6 - revertHex.length) + revertHex;

    return '#' + revertHex;
};

// /**
//  * HEX 색상 코드에 대해 완전히 대비되는 (반전된) 색상을 계산합니다.
//  * @param {string} cr - CSS HEX 색상 코드 (예: '#ffffff' 또는 'ffffff').
//  * @returns {string} 대비되는 HEX 색상 코드 (예: '#000000').
//  */
// const fn_getRevertColor = (cr) => {
//     // 1. # 기호 제거
//     let hex = cr.startsWith('#') ? cr.substring(1) : cr;

//     // 2. 6자리 코드가 아닌 경우 처리 (예: #fff -> #ffffff)
//     if (hex.length === 3) {
//         hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
//     }

//     // 3. 16진수 값을 반전 (0xFFFFFF - 현재 값)
//     // parseInt(hex, 16)으로 현재 16진수 코드를 10진수 숫자로 변환합니다.
//     const revertColorDecimal = 0xFFFFFF ^ parseInt(hex, 16);

//     // 4. 10진수 값을 다시 16진수 문자열로 변환
//     let revertHex = revertColorDecimal.toString(16);

//     // 5. 6자리로 패딩 (예: '0' -> '000000'이 아닌, 결과가 6자리가 아닐 때 앞에 0 채우기)
//     // 예: #f0f0f0의 반전은 #0f0f0f (자리수가 유지됨)
//     // 0xFFFFFF (16777215)를 사용했으므로 6자리가 보장됩니다.
//     // 만약 결과가 6자리가 되지 않았다면(매우 작은 값), 앞에 0을 채웁니다.
//     revertHex = '000000'.substring(0, 6 - revertHex.length) + revertHex;

//     // 6. 최종 # 기호 붙여서 반환
//     return '#' + revertHex;
// };



/**
 * @type {hfCellItem}
 */
export const hfCellItem = Object.freeze(class {
    /**
     * @param {hfCellItem_args} args
     */
    constructor({srt, fcr, txt, rw, rh, rx, ry}) {
        const gd = this.#gd;
        gd.srt = srt;
        this.#initOnce(fcr, txt, rw, rh, rx, ry);
        Object.seal(this);
    }

    /** @type {hfCellItem_gd} */
    #gd = Object.seal({
        srt: null,
        ge: null,
        re: null,
        te: null,
        drc: new DOMRect(0, 0, 10, 10),
        mg: 4,
    });

    /**
     * @param {string} fcr
     * @param {string} txt
     * @param {number} rw
     * @param {number} rh
     * @param {number} rx
     * @param {number} ry
     */
    #initOnce(fcr, txt, rw, rh, rx, ry) {
        // console.log(fcr, txt, rw, rh, rx, ry);
        const gd = this.#gd;
        const tpls = `
<g transform="translate(0, 0)">
    <rect width="50" height="50" fill="${fcr}" rx="0"
        style="pointer-events: none;"/>
    <text x="25" y="25" font-family="Arial" font-size="9"
        fill="${fn_getRevertColor(fcr)}" text-anchor="middle"
        dominant-baseline="central"
        style="pointer-events: none; user-select: none;">${txt}</text>
</g>
        `.trim();
        gd.srt.insertAdjacentHTML('beforeend', tpls);
        gd.ge = gd.srt.lastElementChild;
        gd.re = gd.ge.firstElementChild;
        gd.te = gd.ge.lastElementChild;
        // console.log(gd.ge, gd.re, gd.te);

        this.set_width(rw);
        this.set_height(rh);
        this.set_x(rx);
        this.set_y(ry);

        this.#checkArea();
    }

    #checkArea() {
        const gd = this.#gd;
        let rw = this.get_width();
        let rh = this.get_height();

        const drc = gd.te.getBoundingClientRect();
        let tw = drc.width;
        let th = drc.height;

        if ((tw > rw) || (th > rh))
            gd.te.style.visibility = 'collapse';
        else
            gd.te.style.visibility = 'visible';
    }

//#region [Size]
    get_rect() {
        const gd = this.#gd;
        return gd.drc;
    }

    /** @returns {number} */
    get_width() {
        const gd = this.#gd;
        return gd.drc.width;
    }

    /** @returns {number} */
    get_height() {
        const gd = this.#gd;
        return gd.drc.height;
    }

    /** @param {number} tv */
    set_width(tv) {
        const gd = this.#gd;
        gd.drc.width = tv;
        gd.re.width.baseVal.value = tv - gd.mg - gd.mg;
        gd.re.x.baseVal.value = gd.mg;
        gd.te.x.baseVal.getItem(0).value = Math.round(tv / 2);
    }

    /** @param {number} tv */
    set_height(tv) {
        const gd = this.#gd;
        gd.drc.height = tv;
        gd.re.height.baseVal.value = tv - gd.mg - gd.mg;
        gd.re.y.baseVal.value = gd.mg;
        gd.te.y.baseVal.getItem(0).value = Math.round(tv / 2);
    }
//#endregion

//#region [Location]
    get_x() {
        const gd = this.#gd;
        const tf = gd.ge.transform.baseVal.getItem(0);
        return tf.matrix.e;
    }

    get_y() {
        const gd = this.#gd;
        const tf = gd.ge.transform.baseVal.getItem(0);
        return tf.matrix.f;
    }

    set_x(tv) {
        const gd = this.#gd;
        gd.drc.x = tv;
        const tf = gd.ge.transform.baseVal.getItem(0);
        tf.matrix.e = tv;
    }

    set_y(tv) {
        const gd = this.#gd;
        gd.drc.y = tv;
        const tf = gd.ge.transform.baseVal.getItem(0);
        tf.matrix.f = tv;
    }
//#endregion

});


// const _xx = new hfCellItem(null, 100, 100, 10, 10);
// _xx.get_width








