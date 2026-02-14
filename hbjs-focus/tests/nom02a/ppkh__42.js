(() => {
    // const dtfp = 'http://127.0.0.1:5501/tests/nom02a/fixed-data.txt';
    // const dtfp = 'http://127.0.0.1:5501/tests/nom02a/ppkh.html';
    const dtfp = 'http://127.0.0.1:5501/tests/nom02a/fixed-data2.txt';
    console.log(dtfp);

    const fn_loadData = async () => {
        try {
            const res = await fetch(dtfp);
            if (!res.ok) {
                throw `HTTP error! status: ${res.status}`;
            }

            const txt = await res.text();
            console.log('yes', txt.length);

            console.log(txt.substring(0, 1000));
        } catch (err) {
            console.error('error:', err);
        }
    };

    fn_loadData();


})();

































// import _nd_fs from "node:fs";
// import _nd_path from "node:path";
// import _nd_url from "node:url";


// const __filename = _nd_url.fileURLToPath(import.meta.url);
// // console.log('#__filename:', __filename);
// const __dirname = _nd_path.dirname(__filename);
// // console.log('#__dirname:', __dirname);


// (() => {
//     // const dtfp = _nd_path.join(__dirname, 'fixed-data.txt');
//     // const dtfp = _nd_url.pathToFileURL(_nd_path.join(__dirname, 'fixed-data.txt')).href;
//     const dtfp = 'http://localhost:port/file.txt';
//     console.log(dtfp);
//     // console.log(_nd_url.pathToFileURL(dtfp).href);

//     // const fn_loadData = async () => {
//     //     try {
//     //         const res = await fetch('https://www.google.com/search?q=nodejs+file+path+to+url&sca_esv=074920bdea4960d4&sxsrf=ANbL-n5tvPkhmR6tfhvlZ0RQY7EF2OqpnA%3A1770666022725&source=hp&ei=JjiKaaeiKrzd2roPlsy1sAI&iflsig=AFdpzrgAAAAAaYpGNisNG-vBw6mUzDh3lDVyhj7lPa88&ved=0ahUKEwinzbH6lM2SAxW8rlYBHRZmDSYQ4dUDCCA&uact=5&oq=nodejs+file+path+to+url&gs_lp=Egdnd3Mtd2l6Ihdub2RlanMgZmlsZSBwYXRoIHRvIHVybDIEEAAYHjIFEAAY7wUyBRAAGO8FMgUQABjvBTIFEAAY7wVI9zFQAFi0MHAAeACQAQCYAYEBoAGEFKoBBDAuMjO4AQPIAQD4AQGYAhegAv8UwgIKECMYgAQYJxiKBcICDBAjGIAEGBMYJxiKBcICCxAAGIAEGLEDGIMBwgIKEAAYgAQYQxiKBcICERAuGIAEGLEDGNEDGIMBGMcBwgIFEAAYgATCAgsQLhiABBjRAxjHAcICBBAjGCfCAgoQABiABBgUGIcCwgIHEAAYgAQYE8ICBhAAGBMYHsICCBAAGBMYChgewgIIEAAYExgIGB7CAgYQABgIGB6YAwCSBwQwLjIzoAeligGyBwQwLjIzuAf_FMIHCDEuNi4xNS4xyAdWgAgA&sclient=gws-wiz');
//     //         if (!res.ok) {
//     //             throw `HTTP error! status: ${res.status}`;
//     //         }

//     //         const txt = await res.text();
//     //         console.log('yes');
//     //     } catch (err) {
//     //         console.error('error:', err);
//     //     }
//     // };

//     // fn_loadData();


// })();














// async function getLocalFile() {
//   try {
//     // Open a file picker
//     const [fileHandle] = await window.showOpenFilePicker();
//     const file = await fileHandle.getFile();
//     const contents = await file.text();
//     console.log('File contents:', contents);
//   } catch (err) {
//     console.error('Error reading file:', err);
//   }
// }


// window.addEventListener('click', () => {
//     getLocalFile();
// });





/*

import _nd_fs from "node:fs";
import _nd_path from "node:path";
import _nd_url from "node:url";

const __filename = _nd_url.fileURLToPath(import.meta.url);
const __dirname = _nd_path.dirname(__filename);

(async () => {
    const fn_ndgt = (tn) => {
        let tx = Math.log(Math.abs(tn)) * Math.LOG10E;
        let ty = Math.max(Math.floor(tx), 0);
        return ty + 1;
    };

    console.time('#total_process');

    const fn_processData = async () => {
        const dtfp = _nd_path.join(__dirname, 'fixed-data2.txt');
        if (_nd_fs.existsSync(dtfp)) _nd_fs.unlinkSync(dtfp);

        // 1. 스트림 생성 (appendFileSync 대신 사용)
        const writeStream = _nd_fs.createWriteStream(dtfp);

        const cc = 1000;
        const rc = 1000000;
        const cml = fn_ndgt(cc);
        const rml = fn_ndgt(rc);

        console.log(`#Total Cells: ${cc * rc}`);

        for (let j = 0; j < rc; j++) {
            const rca = new Array(cc);
            for (let i = 0; i < cc; i++) {
                // 바로 문자열 생성
                rca[i] = `C${(i + 1).toString().padStart(cml, '0')},R${(j + 1).toString().padStart(rml, '0')}`;
            }

            // 2. 메모리에 쌓지 않고 즉시 스트림으로 전송
            const line = rca.join('|') + '\n';
            const canContinue = writeStream.write(line);

            // 3. 백프레셔(Backpressure) 관리: 버퍼가 차면 비워질 때까지 대기
            if (!canContinue) {
                await new Promise(resolve => writeStream.once('drain', resolve));
            }

            if ((j + 1) % 10000 === 0) console.log(`${j + 1}행 처리 완료...`);
        }

        writeStream.end();
        return new Promise(resolve => writeStream.on('finish', resolve));
    };

    await fn_processData();


    console.timeEnd('#total_process');


    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('end of work.');

})();
*/