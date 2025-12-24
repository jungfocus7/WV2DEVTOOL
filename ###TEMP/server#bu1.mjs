import http from "node:http";



//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const _METHODS = {
    POST: 'POST',
    GET: 'GET',
};

const _EVENTS = {
    DATA: 'data',
    END: 'end',
};

const _PORT = 3000;


/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {object} rd
 */
const fn_reqPostEnd = (req, res, rd) => {
    let arr = [];

    /**
     * Request On Data
     * @param {any} chunk
     */
    const fn_reqOnData = (chunk) => {
        console.log('fn_reqOnData >>>');
        arr.push(chunk.toString());
    };

    /**
     * Request On End
     */
    const fn_reqOnEnd = () => {
        console.log('fn_reqOnEnd >>>');
        let rs = arr.join('');
        console.log('>>>', rs);
        rd.state = 'success';
        rd.data = 'data';
        console.log('>>>', rd);
    };

    req.on('data', fn_reqOnData);
    req.on('end', fn_reqOnEnd);
};

/**
 * Request Callback Function
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 */
const fn_reqcbf = (req, res) => {
    let rd = {
        state: 'error',
        data: '',
    };

    if (req.method === _METHODS.POST) {
        fn_reqPostEnd(req, res, rd);
        console.log('POST >>>');
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(rd, null, 2));
};


const _server = http.createServer(fn_reqcbf);

_server.listen(_PORT, () => {
    console.log(`Server running at http://localhost:${_PORT}/`);
});





//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const fn_getText = async (url) => {
    try {
        const res = await fetch(url, {
            method: 'POST',
            body: '0123456789',
        });

        if (!res.ok) {
            throw new Error(`HTTP error, status = ${res.status}`);
        }

        const txt = await res.text();
        console.log(txt);
        return txt;

    } catch (err) {
        console.error(`Error: ${err.message}`);
    }
};
// fn_getText('http://localhost:3000/');