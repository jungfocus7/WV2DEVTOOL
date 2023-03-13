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
},
/**
* 시간 문자열 포맷으로 만들기
* @param {string} fs1
* @param {Date} td
*/
Format: (fs1, td) => {
const re1 = /\\./g;
const mc1 = Array.from(fs1.matchAll(re1));
const len = fs1.length - mc1.length;
const buf1 = new Uint16Array(new ArrayBuffer(len * 2));
let i = 0;
for (const m1 of mc1) {
const fi = m1.index - i;
const tv = m1[0];
const li = tv.length - 1;
buf1[fi] = tv[li].charCodeAt(0);
++i;
}
const buf2 = new Uint16Array(new ArrayBuffer(len * 2));
const ke = fs1.length - 1; i = 0;
let bp = false;
for (let k = 0; k <= ke; ++k) {
const tc = fs1[k];
if (bp) {
bp = false;
buf2[i++] = '\0'.charCodeAt(0);
}
else {
bp = tc === '\\';
if (bp && (k < ke))
continue;
else
buf2[i++] = tc.charCodeAt(0);
}
}
let mrs = String.fromCharCode.apply(null, buf2);
const re2 = /y+|M+|d+|H+|m+|s+|f+/g;
const fn_r = (tx, l1) => {
const l2 = tx.length;
if (l1 < l2)
return tx.substring(l2 - l1);
else if (l1 > l2)
return tx.padStart(l1, '0');
return tx;
};
const fn_me = (tx, td) => {
const l1 = tx.length;
if (tx[0] === 'y')
return fn_r(td.getFullYear().toString(), l1);
else if (tx[0] === 'M')
return fn_r((td.getMonth() + 1).toString(), l1);
else if (tx[0] === 'd')
return fn_r(td.getDate().toString(), l1);
else if (tx[0] === 'H')
return fn_r(td.getHours().toString(), l1);
else if (tx[0] === 'm')
return fn_r(td.getMinutes().toString(), l1);
else if (tx[0] === 's')
return fn_r(td.getSeconds().toString(), l1);
else if (tx[0] === 'f')
return fn_r(td.getMilliseconds().toString(), l1);
return tx;
};
mrs = mrs.replace(re2, (tx) => {
return fn_me(tx, td);
});
for (i = 0; i < len; ++i) {
const tc = String.fromCharCode(buf1[i]);
if (tc === '\0')
buf1[i] = mrs[i].charCodeAt(0);
}
const res = String.fromCharCode.apply(null, buf1);
return res;
}
});
export class hfCountTask {
/**
*
* @param {number} countStart
* @param {number} countEnd
* @param {number} plusValue
*/
constructor(countStart = 1, countEnd = 10, plusValue = 1) {
this.#countStart = countStart;
this.#countEnd = countEnd;
this.#plusValue = plusValue;
this.#count = countStart;
}
#countStart = 0;
get CountStart() {
return this.#countStart;
}
#countEnd = 0;
get CountEnd() {
return this.#countEnd;
}
#plusValue = 0;
get PlusValue() {
return this.#plusValue;
}
#count = 0;
get Count() {
return this.#count;
}
/**
* 이전 단계
* @returns boolean
*/
Prev() {
const tc = this.#count - this.#plusValue;
if (tc < this.#countStart)
return false;
else {
this.#count = tc;
return true;
}
}
/**
* 다음 단계
* @returns boolean
*/
Next() {
const tc = this.#count + this.#plusValue;
if (tc > this.#countEnd)
return false;
else {
this.#count = tc;
return true;
}
}
/**
* 리셋 하기
*/
Reset() {
this.#count = this.#countStart;
}
/**
* 마지막으로 리셋하기
*/
ResetEnd() {
this.#count = this.#countEnd;
}
}
export const hfEaseBack = Object.seal({
easeIn(t, b, c, d, s = 1.70158) {
return c * (t /= d) * t * ((s + 1) * t - s) + b;
},
easeOut(t, b, c, d, s = 1.70158) {
return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
},
easeInOut(t, b, c, d, s = 1.70158) {
if ((t /= d / 2) < 1)
return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
}
});
export const hfEaseBounce = Object.seal({
easeIn(t, b, c, d) {
return c - this.easeOut(d - t, 0, c, d) + b;
},
easeOut(t, b, c, d) {
if ((t /= d) < (1 / 2.75))
return c * (7.5625 * t * t) + b;
else if (t < (2 / 2.75))
return c * (7.5625 * (t -= (1.5 / 2.75)) * t + 0.75) + b;
else if (t < (2.5 / 2.75))
return c * (7.5625 * (t -= (2.25 / 2.75)) * t + 0.9375) + b;
else
return c * (7.5625 * (t -= (2.625 / 2.75)) * t + 0.984375) + b;
},
easeInOut(t, b, c, d) {
if (t < d/2)
return this.easeIn(t * 2, 0, c, d) * 0.5 + b;
else
return this.easeOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
}
});
export const hfEaseCircular = Object.seal({
easeIn(t, b, c, d) {
return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
},
easeOut(t, b, c, d) {
return c * Math.sqrt(1 - (t = t/d - 1) * t) + b;
},
easeInOut(t, b, c, d) {
if ((t /= d / 2) < 1)
return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
}
});
export const hfEaseElastic = Object.seal({
easeIn(t, b, c, d, a = 0, p = 0) {
if (t == 0) return b;
if ((t /= d) == 1) return b + c;
if (!p) p = d * 0.3;
let s;
if (!a || a < Math.abs(c)) {
a = c;
s = p / 4;
}
else {
s = p / (2 * Math.PI) * Math.asin(c / a);
}
return -(a * Math.pow(2, 10 * (t -= 1)) *
Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
},
easeOut(t, b, c, d, a = 0, p = 0) {
if (t == 0) return b;
if ((t /= d) == 1) return b + c;
if (!p) p = d * 0.3;
let s;
if (!a || a < Math.abs(c)) {
a = c;
s = p / 4;
}
else {
s = p / (2 * Math.PI) * Math.asin(c / a);
}
return a * Math.pow(2, -10 * t) *
Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
},
easeInOut(t, b, c, d, a = 0, p = 0) {
if (t == 0) return b;
if ((t /= d / 2) == 2) return b + c;
if (!p) p = d * (0.3 * 1.5);
let s;
if (!a || a < Math.abs(c)) {
a = c;
s = p / 4;
}
else {
s = p / (2 * Math.PI) * Math.asin(c / a);
}
if (t < 1) {
return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) *
Math.sin((t * d - s) * (2 * Math.PI) /p)) + b;
}
return a * Math.pow(2, -10 * (t -= 1)) *
Math.sin((t * d - s) * (2 * Math.PI) / p ) * 0.5 + c + b;
}
});
export const hfEaseExponential = Object.seal({
easeIn(t, b, c, d) {
return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
},
easeOut(t, b, c, d) {
return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
},
easeInOut(t, b, c, d) {
if (t == 0) return b;
if (t == d) return b + c;
if ((t /= d / 2) < 1)
return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
});
export class hfTween extends EventTarget {
/**
* 업데이트 이벤트 상수
*/
static ET_UPDATE = 'update';
/**
* 엔드 이벤트 상수
*/
static ET_END = 'end';
/**
* 생성자
* @param {number} current
* @param {number} duration
* @param {function} ease
*/
constructor(current = 0, duration = 36, ease = null) {
super();
this.#running = false;
this.#begin = current;
this.#end = current;
this.#current = current;
this.#time = 0;
this.#duration = duration;
const fx = ease ?? hfEaseBack.easeInOut;
this.#ease = fx.bind(hfEaseBack);
Object.seal(this);
}
#running = false;
get Running() {
return this.#running;
}
#begin = 0.0;
get Begin() {
return this.#begin;
}
#end = 0.0;
get End() {
return this.#end;
}
#current = 0.0;
get Current() {
return this.#current;
}
#time = 0;
get Time() {
return this.#time;
}
#duration = 0;
get Duration() {
return this.#duration;
}
#ease = 0;
get Ease() {
return this.#ease;
}
#fid = -1;
#ClearFrame = () => {
if (this.#fid === -1) return;
cancelAnimationFrame(this.#fid);
this.#fid = -1;
};
#LoopFrame = (t) => {
if (this.#running === false) return;
if (this.#time < this.#duration) {
++this.#time;
this.#current = this.#ease(this.#time, this.#begin, this.#end, this.#duration);
this.dispatchEvent(new Event(hfTween.ET_UPDATE));
if (this.#time >= this.#duration) {
this.dispatchEvent(new Event(hfTween.ET_END));
this.Stop();
}
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
* @param {number} begin
* @param {number} change
*/
FromTo(begin, change) {
if (this.#running === true)
this.Stop();
this.#time = 0;
this.#begin = begin;
this.#end = change - begin;
this.#current = begin;
this.#running = true;
this.#fid = requestAnimationFrame(this.#LoopFrame);
}
/**
* 현시점에서 시작
* @param {number} change
*/
To(change) {
this.FromTo(this.#current, change);
}
}
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
