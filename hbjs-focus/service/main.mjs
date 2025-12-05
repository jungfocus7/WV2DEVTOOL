import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;

const server = http.createServer((_, res) => {
    // let hfp = path.join(path.resolve(`../${__dirname}`), 'index.html');
    let hfp = 'C:\\__hbxwork\\99github\\WV2DEVTOOL\\hbjs-focus\\index.html';
    console.log('>>>', hfp);
    fs.readFile(hfp, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404: 파일을 찾을 수 없습니다.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            res.end(data);
        }
    });
});

// Start the server and listen for incoming requests
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});