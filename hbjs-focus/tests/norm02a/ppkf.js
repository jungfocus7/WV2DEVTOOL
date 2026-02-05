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

let arr = new Array(3000);
arr.fill('박종명');
arr[256] = '임헌진';
let fi = fn_binarySearch(arr, '임헌진');
console.log(fi);
