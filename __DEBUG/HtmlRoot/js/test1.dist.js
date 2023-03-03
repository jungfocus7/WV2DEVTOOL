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
}
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
}
Stop() {
if (this.#running === true) {
this.#ClearFrame();
this.#running = false;
}
}
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
To(end, speed = NaN) {
this.FromTo(end, this.#now, speed);
}
}
export const hfnum = Object.seal({
/**
* 넘버가 맞는지 확인
* @param {number} tv
* @returns boolean
*/
IsNumber: (tv) => {
return typeof tv === 'number';
},
/**
* 넘버가 아닌지 확인
* @param {number} tv
* @returns boolean
*/
NotNumber: (tv) => {
return typeof tv !== 'number';
},
/**
* 넘버가 실수인지 확인
* @param {number} tv
* @returns boolean
*/
IsFloat: (tv) => {
return (tv % 1) !== 0;
},
/**
* 넘버가 음수인지 확인
* @param {number} tv
* @returns boolean
*/
IsMinus: (tv) => {
return tv < 0;
},
/**
* 난수 만들기 0~n
* @param {number} tv
* @returns number
*/
Random: (tv) => {
return Math.round(Math.random() * (tv - 1));
},
/**
* 난수 만들기 min~max
* @param {number} min
* @param {number} max
* @returns number
*/
RandRange: (min, max) => {
return min + Math.round(Math.random() * (max - min));
},
/**
* 넘버가 홀수인지 확인
* @param {number} tv
* @returns boolean
*/
IsOdd: (tv) => {
return (tv % 2) > 0;
},
/**
* 넘버가 짝수인지 확인
* @param {number} tv
* @returns boolean
*/
IsEven: (tv) => {
return (tv % 2) === 0;
}
});
export const hfstr = Object.seal({
/**
* 문자열 유효성 확인
* @param {string} str
* @returns boolean
*/
IsStr: (str) => {
if (typeof str === 'string')
return str.trim() !== '';
else
return false;
},
/**
* 이름에서 마지막 번호 확인
* @param {string} str
* @param {string} token
* @returns number
*/
GetLastNum: (str, token = '_') => {
const ti = str.lastIndexOf(token) + 1;
return ~~str.substring(ti);
},
/**
* 문자열 >> ArrayBuffer 변환
* @param {string} str
* @returns Uint16Array
*/
Str2Ab: (str) => {
const l = str.length;
let tab = new Uint16Array(new ArrayBuffer(l * 2));
for (let i = 0; i < l; i++) {
tab[i] = str.charCodeAt(i);
}
return tab;
},
/**
* ArrayBuffer >> 문자열 변환
* @param {Uint16Array} ab
* @returns string
*/
Ab2Str: (ab) => {
return String.fromCharCode.apply(null, ab);
}
});
export const hfarr = Object.seal({
/**
* 배열객체 유효성 확인
* @param {array} arr
* @returns boolean
*/
NotEmpty: (arr) => {
return Array.isArray(arr) && (arr.length > 0);
},
/**
* 배열에 요소 확인
* @param {array} arr
* @param {temp object} te
* @returns boolean
*/
IsContains: (arr, te) => {
if (hfarr.NotEmpty(arr) === false) return false;
let tb = false;
const l = arr.length
for (let i = 0; i < l; i++) {
if (arr[i] === te) {
tb = true;
break;
}
}
return tb;
},
/**
* 배열 섞기
* @param {array} arr
* @returns void
*/
Shuffle: (arr) => {
if (hfarr.NotEmpty(arr) === false) return;
const l = arr.length;
for (let i = 0; i < l; i++) {
let te = arr[i];
let ti = hfnum.RandRange(0, l - 1);
arr[i] = arr[ti];
arr[ti] = te;
}
},
/**
* 배열 복사
* @param {array} arr
* @returns array
*/
Copy: (arr) => {
if (hfarr.NotEmpty(arr) === false) return null;
return arr.slice();
}
});
export const hfdtime = Object.seal({
/**
* 시간 스탬프 기본
* @param {Date} td
* @returns string
*/
TimeStamp: (td) => {
const df1 = td.getFullYear().toString().substring(2);
const df2 = (td.getMonth() + 1).toString().padStart(2, '0');
const df3 = td.getDate().toString().padStart(2, '0');
const df4 = td.getHours().toString().padStart(2, '0');
const df5 = td.getMinutes().toString().padStart(2, '0');
const df6 = td.getSeconds().toString().padStart(2, '0');
const df7 = td.getMilliseconds().toString().padStart(3, '0');
return `${df1}/${df2}/${df3} ${df4}:${df5}:${df6}.${df7}`;
}
});
