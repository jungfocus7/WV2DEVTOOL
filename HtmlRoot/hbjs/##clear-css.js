'use strict';
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');



// css 주석제거
// ^[ \t]*\/\*[^\*\/]*\*\/[ \t]*$
/**
 * 에프터 기타 주석 제거
 * @param {string} rstr
 * @returns string
 */
const fn_clearComments = (rstr) => {
    const rex = /^[ \t]*\/\*[^\*\/]*\*\/[ \t]*$/gm;
    return rstr.replaceAll(rex, '');
};

const fn_clearWhitespace = (rstr) => {
    const rex = /^\s+/gm;
    return rstr.replaceAll(rex, '');
};


const _rlst = [];

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
            _rlst.push(ts);
        }

        if (_rlst.length > 0) {
            let rstr = fn_clearComments(_rlst.join('\n'));
            rstr = fn_clearWhitespace(rstr).trim();
            console.log(rstr);
            const op = path.resolve(__dirname, '../css/Root.dist.css');
            fs.writeFileSync(op, rstr, {encoding: 'utf8'});
        }
    }
    catch (e) {
        console.log(`# Error  ${e}`);
    }
};

fn_work(path.resolve(__dirname, '../Root.css'));
