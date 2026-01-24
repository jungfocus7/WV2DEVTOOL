import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// console.log(import.meta.url);
const __filename = url.fileURLToPath(import.meta.url);
console.log('#__filename:', __filename);
const __dirname = path.dirname(__filename);
console.log('#__dirname:', __dirname);


/** 호스트명 */
const _hostName = 'localhost';
console.log('#_hostName:', _hostName);

/** 포트 */
const _port = 3000;
console.log('#_port:', _port);

/**
 * 리소스 마메타입들
 */
const _mimeTypes = Object.freeze({
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.ico': 'image/x-icon',
});


/**
 * @param {http.ServerResponse} res
 * @param {string} ctp
 * @param {string} txt
 */
const fn_defaultEnd = (res, ctp, txt) => {
    let body = (typeof txt === 'string') ? txt : '';
    res.writeHead(200, {
        'Content-Type': `${ctp}; charset=utf-8`,
        'Content-Length': Buffer.byteLength(body),
    });
    res.end(body);
};

/**
 * 등록한 리소스만 열어준다.
 */
const _hrfa = [
    '/sub/main.css',
    '/sub/main.js',
    '/hbjs/hfCommon.js',
    '/hbjs/hfCountTask.js',
    '/hbjs/hfFrameRepeater.js',
    '/hbjs/hfNumberRanger.js',
    '/hbjs/hfScrollLogic.js',
    '/hbjs/hfScrollWave.js',
    '/hbjs/hfStyleFunctions.js',
    '/hbjs/hfTween.js',
    '/hbjs/hfWeich.js',
    '/sub/pages/page01.js',
    '/sub/pages/page02.js',
    '/sub/pages/page03.js',
    '/sub/pages/page04.js',
    '/sub/pages/page05.js',
    '/sub/pages/page06.js',
    '/sub/pages/page07.js',
    '/sub/pages/page91.js',
    '/sub/pages/page07_p.html',
];

const _server = http.createServer(async (req, res) => {
    // console.log(`#method: ${req.method}, #url: ${req.url}`);

    if (req.method === 'GET') {
        if (req.url === '/') {
            try {
                let hfp = path.join(path.dirname(__dirname), 'index.html');
                // console.log('#hfp:', hfp);
                let data = await fs.readFile(hfp);
                // fn_defaultEnd(res, _mimeTypes['.html'], 'success');
                fn_defaultEnd(res, _mimeTypes['.html'], data.toString());
                return;
            } catch (err) {
                console.log(err);
            }
        } else {
            if (_hrfa.indexOf(req.url) > -1) {
                try {
                    let hfp = path.join(path.dirname(__dirname), req.url);
                    // console.log('#hfp:', hfp);
                    let data = await fs.readFile(hfp);
                    let exn = path.extname(hfp);
                    // console.log('#exn:', exn);
                    fn_defaultEnd(res, _mimeTypes[exn], data.toString());
                    return;
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    fn_defaultEnd(res, _mimeTypes['.txt'], 'error');
});

_server.listen(_port, () => {
    console.log(`Server running at http://${_hostName}:${_port}/`);
});

