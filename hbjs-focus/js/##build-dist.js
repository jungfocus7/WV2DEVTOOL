// console.log('XXXXXX')

// import { accessSync, createReadStream, writeFileSync } from "node:fs";
// import { resolve } from "node:path";
// import { createInterface } from "node:readline";

// import path from "path";
// import { fileURLToPath } from "url";


// // 1. 현재 모듈의 URL을 파일 시스템 경로로 변환
// const __filename = fileURLToPath(import.meta.url);

// // 2. 경로에서 파일명을 제외하고 디렉토리 경로만 추출
// const __dirname = path.dirname(__filename);


// /**
//  * 한줄 주석 여부
//  * @param {string} ts (trim str)
//  * @returns boolean
//  */
// const fn_checkComments = (ts) => {
//     const rex = /^[ \t]*\/\/[^\r\n]*$/;
//     return rex.test(ts);
// };


// /**
//  * 레기온 주석 여부
//  * @param {string} ts (trim str)
//  * @returns boolean
//  */
// const fn_checkRegion = (ts) => {
//     return ts.startsWith('//#region ') || ts.startsWith('//#endregion ');
// };


// /**
//  * 에프터 기타 주석 제거
//  * @param {string} rstr
//  * @returns string
//  */
// const fn_afterClearComments = (rstr) => {
//     const rex = /\/\*[^\*\/]*\*\//gm;
//     return rstr.replaceAll(rex, '');
// };


// const _rlst = [`
// // ### lastest update 230304
// // The MIT License (MIT)
// // Copyright (c) 2023-present jungfocus7
// `.trim()];


// /**
//  * 핵심 작업
//  * @param {string} ip input
//  * @param {string} op output
//  */
// const fn_work = async (ip) => {
//     try {
//         const ifp = ip;
//         accessSync(ifp);

//         const rl = createInterface({
//             input: createReadStream(ifp),
//             crlfDelay: Infinity,
//         });

//         for await (const ls of rl) {
//             if (ls === '') continue;
//             const ts = ls.trim();
//             if (fn_checkComments(ts) || fn_checkRegion(ts)) {
//                 // console.log('pass', ts);
//             }
//             else {
//                 _rlst.push(ls.trim());
//             }
//         }
//     }
//     catch (e) {
//         console.log(`# Error  ${e}`);
//     }
// };


// const fn_entry = async (ta) => {
//     const ipa = ta;
//     for (const ip of ipa) {
//         await fn_work(ip);
//     }

//     if (_rlst.length > 0) {
//         const rstr = fn_afterClearComments(_rlst.join('\n'));
//         // console.log(rstr);
//         const op = resolve(__dirname, `../js/hflib.js`);
//         writeFileSync(op, rstr, {encoding: 'utf8'});
//     }
// }


// const ipa = [
//     resolve(__dirname, 'hfCommon.js'),
//     resolve(__dirname, 'hfCountTask.js'),
//     resolve(__dirname, 'hfTween.js'),
//     resolve(__dirname, 'hfWeich.js'),
// ];
// fn_entry(ipa);

