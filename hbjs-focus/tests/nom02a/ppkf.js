(() => {

/**
 *
 * @param {any[]} arr
 * @param {any} fv
 * @returns
 */
const fn_binarySearch = (arr, fv) => {
    let fi = -1;

    let li = 0;
    let ri = arr.length - 1;
    let mi, cv;

    while (li <= ri) {
        mi = Math.floor((li + ri) / 2);
        cv = arr[mi];

        if (cv < fv)
            li = mi + 1;
        else if (cv > fv)
            ri = mi - 1;
        else {
            fi = mi;
            break;
        }
    }

    return fi;
};

// const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// const fv = 5;
// const fi = fn_binarySearch(arr, fv);
// console.log(fi); // 2

// let arr = new Array(3000);
// arr.fill('박종명');
// arr[256] = '임헌진';
// let fi = fn_binarySearch(arr, '임헌진');
// console.log(fi);

// const _configData = {
//     colw: 100, colh: 30,
//     columns: [
//         {colnm: 'CNM01'}, {colnm: 'CNM02'}, {colnm: 'CNM03'},
//         {colnm: 'CNM04'}, {colnm: 'CNM05'}, {colnm: 'CNM06'},
//     ],
//     rows: [
//         {txt: 'RT01'}
//     ]
// };
// const _items = [
//     {
//         colnm: 'CNM01', colh: 100,
//         rows: [
//             {}
//         ],
//     },
// ];



// const _dataSource = Object.seal({
//     cellWidth: 100, cellHeight: 30,
//     items: [
//         {CNM01: '', CNM02: '', CNM03: ''},
//         {CNM01: '', CNM02: '', CNM03: ''},
//         {CNM01: '', CNM02: '', CNM03: ''},
//     ],
// });

/*
    #md = Object.seal({
        cellWidth: 70, cellHeight: 30,
        items: new Map([
            ['F00000001', {CNM01: '', CNM02: '', CNM03: ''}],
            ['F00000002', {CNM01: '', CNM02: '', CNM03: ''}],
            ['F00000003', {CNM01: '', CNM02: '', CNM03: ''}],
        ]),
    });
    */


const _dataSource = Object.seal(new class {
    #md = Object.seal({
        cellWidth: 300, cellHeight: 300,
        items: [
            {CNM01: '', CNM02: '', CNM03: '', CNM04: '', CNM05: '', CNM06: ''},
            {CNM01: '', CNM02: '', CNM03: '', CNM04: '', CNM05: '', CNM06: ''},
            {CNM01: '', CNM02: '', CNM03: '', CNM04: '', CNM05: '', CNM06: ''},
            {CNM01: '', CNM02: '', CNM03: '', CNM04: '', CNM05: '', CNM06: ''},
            {CNM01: '', CNM02: '', CNM03: '', CNM04: '', CNM05: '', CNM06: ''},
            {CNM01: '', CNM02: '', CNM03: '', CNM04: '', CNM05: '', CNM06: ''},
        ],
    });
    constructor() { }

    /**
     * @returns
     */
    getRowCount() {
        const md = this.#md;
        return md.items.length;
    }

    /**
     * @param {number} i
     * @returns
     */
    getRowItem(i) {
        const md = this.#md;
        return md.items.at(i);
    }

});




})();

