import _ndfs from "node:fs";
import _ndpath from "node:path";
import _ndurl from "node:url";


(async () => {
    const __filename = _ndurl.fileURLToPath(import.meta.url);
    // console.log('#__filename:', __filename);
    const __dirname = _ndpath.dirname(__filename);
    // console.log('#__dirname:', __dirname);


    const fn_ndgt = (tn) => {
        let tx = Math.log(Math.abs(tn)) * Math.LOG10E;
        let ty = Math.max(Math.floor(tx), 0);
        return ty + 1;
    };

    console.time('#total_process');

    const fn_processData = async () => {
        const dtfp = _ndpath.join(__dirname, 'fixed-data2.txt');
        if (_ndfs.existsSync(dtfp)) _ndfs.unlinkSync(dtfp);

        // 1. 스트림 생성 (appendFileSync 대신 사용)
        const wstrm = _ndfs.createWriteStream(dtfp);

        const lpp = 10000;
        const cc = 1000;
        const rc = 10000;
        const cml = fn_ndgt(cc);
        const rml = fn_ndgt(rc);

        console.log(`#Total Cells: ${cc * rc}`);

        for (let j = 0; j < rc; j++) {
            const rca = new Array(cc);
            for (let i = 0; i < cc; i++) {
                let cnx = (i + 1).toString().padStart(cml, '0');
                let rnx = (j + 1).toString().padStart(rml, '0');
                // 문자열 생성
                let tx = `C${cnx},R${rnx}`;
                rca[i] = tx;
            }

            // 2. 메모리에 쌓지 않고 즉시 스트림으로 전송
            const lst = rca.join('|') + '\n';
            const bc = wstrm.write(lst);

            // 3. 백프레셔(Backpressure) 관리: 버퍼가 차면 비워질 때까지 대기
            if (!bc) {
                await new Promise((res) => {
                    wstrm.once('drain', res);
                });
            }

            if (((j + 1) % lpp) === 0) {
                console.log(`${j + 1}행 처리 완료...`);
            }
        }

        wstrm.end();

        return new Promise((res) => {
            wstrm.on('finish', res);
        });
    };

    await fn_processData();

    console.timeEnd('#total_process');


    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
    console.log('end of work.');

})();