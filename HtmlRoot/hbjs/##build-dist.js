'use strict';
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');



/**
 * 한줄 주석 여부
 * @param {string} ts (trim str)
 * @returns boolean
 */
const fn_checkComments = (ts) => {
    const rex = /^[ \t]*\/\/[^\r\n]*$/;
    return rex.test(ts);
};


/**
 * 레기온 주석 여부
 * @param {string} ts (trim str)
 * @returns boolean
 */
const fn_checkRegion = (ts) => {
    return ts.startsWith('//#region ') || ts.startsWith('//#endregion ');
};


/**
 * 에프터 기타 주석 제거
 * @param {string} rstr
 * @returns string
 */
const fn_afterClearComments = (rstr) => {
    const rex = /\/\*[^\*\/]*\*\//gm;
    return rstr.replaceAll(rex, '');
};


const _rlst = [`
// ### lastest update 230304
// The MIT License (MIT)
// Copyright (c) 2023-present jungfocus7
`.trim()];


/**
 * 핵심 작업
 * @param {string} ip input
 * @param {string} op output
 */
const fn_work = async (ip) => {
    try {
        const ifp = ip;
        fs.accessSync(ifp);

        const rl = readline.createInterface({
            input: fs.createReadStream(ifp),
            crlfDelay: Infinity,
        });

        for await (const ls of rl) {
            const ts = ls.trim();
            if (ts === '') continue;
            if (fn_checkComments(ts) || fn_checkRegion(ts)) { }
            else {
                _rlst.push(ts);
            }
        }
    }
    catch (e) {
        console.log(`# Error  ${e}`);
    }
};


/**
 * 작업 진입점
 * @param {array<string>} ta
 */
const fn_entry = async (ta) => {
    const ipa = ta;
    for (const ip of ipa) {
        await fn_work(ip);
    }

    if (_rlst.length > 0) {
        const rstr = fn_afterClearComments(_rlst.join('\n'));
        // console.log(rstr);
        const op = path.resolve(__dirname, '../js/hflib.js');
        fs.writeFileSync(op, rstr, {encoding: 'utf8'});
    }
}


const ipa = [
    path.resolve(__dirname, 'hfCommon.js'),
    path.resolve(__dirname, 'hfCountTask.js'),
    path.resolve(__dirname, 'hfTween.js'),
    path.resolve(__dirname, 'hfWeich.js'),
];
fn_entry(ipa);

