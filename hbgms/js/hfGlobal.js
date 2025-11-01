export const hfGlobal = Object.freeze({
    /**
     * 난수 만들기 min~max
     * @param {number} min
     * @param {number} max
     * @returns number
     */
    randRange: (min, max) => {
        return min + Math.round(Math.random() * (max - min));
    },

    colorNames: Object.freeze([
        // White & Neutral
        'white', 'whitesmoke', 'gainsboro', 'lightgray', 'silver', 'darkgray', 'gray', 'dimgray', 'black',
        // Red & Pink
        'red', 'darkred', 'crimson', 'firebrick', 'indianred', 'lightcoral', 'salmon', 'darksalmon', 'lightsalmon',
        'coral', 'tomato', 'orangered', 'deeppink', 'hotpink', 'pink', 'lightpink', 'palevioletred', 'mediumvioletred',
        // Orange & Brown
        'orange', 'darkorange', 'gold', 'goldenrod', 'darkgoldenrod', 'peru', 'chocolate', 'sienna', 'brown',
        'maroon', 'saddlebrown', 'sandybrown', 'burlywood', 'tan', 'rosybrown', 'peachpuff', 'bisque', 'moccasin',
        // Yellow
        'yellow', 'lightyellow', 'lemonchiffon', 'lightgoldenrodyellow', 'papayawhip', 'mistyrose', 'cornsilk',
        'blanchedalmond', 'navajowhite', 'antiquewhite', 'wheat', 'oldlace', 'linen', 'seashell', 'snow',
        'honeydew', 'mintcream', 'azure', 'aliceblue', 'ghostwhite', 'ivory', 'floralwhite', 'beige', 'khaki', 'darkkhaki',
        // Green
        'green', 'darkgreen', 'forestgreen', 'seagreen', 'mediumseagreen', 'darkseagreen', 'lightseagreen',
        'palegreen', 'springgreen', 'mediumspringgreen', 'limegreen', 'lime', 'chartreuse', 'lawngreen',
        'greenyellow', 'yellowgreen', 'olivedrab', 'olive', 'darkolivegreen', 'teal', 'darkcyan',
        // Cyan & Blue
        'cyan', 'aqua', 'lightcyan', 'paleturquoise', 'aquamarine', 'turquoise', 'mediumturquoise',
        'darkturquoise', 'cadetblue', 'steelblue', 'lightsteelblue', 'powderblue', 'lightblue', 'skyblue',
        'lightskyblue', 'deepskyblue', 'dodgerblue', 'cornflowerblue', 'royalblue', 'blue', 'mediumblue',
        'darkblue', 'navy', 'midnightblue', 'slateblue', 'darkslateblue', 'mediumslateblue',
        // Purple & Magenta
        'purple', 'darkmagenta', 'darkorchid', 'mediumorchid', 'orchid', 'violet', 'plum', 'thistle',
        'lavender', 'fuchsia', 'magenta', 'blueviolet', 'indigo', 'rebeccapurple',
        // Additional Grays (Aliases)
        'grey', 'lightgrey', 'darkgrey', 'dimgrey', 'slategrey', 'darkslategrey', 'lightslategrey'
    ]),

});
