'use strict';

const http = require('http');
const path = require('path');

const {
    port,
    host,
    storageEngine,
    storage,
    library
} = require('./config.json');

const { 
    read, 
    send, 
    sendJson, 
    sendError, 
    isIn, 
    getRequestPostBodyData 
} = require(path.join(__dirname, library.folder, library.requestHandler));

const storageEnginePath = path.join(__dirname, storageEngine.folder);
const dataStoragePath = path.join(storageEnginePath, storageEngine.dataStorageFile);
const storagePath = path.join(__dirname, storage.folder);

const { createDataStorage } = require(dataStoragePath);
const register = createDataStorage(storagePath, storage.storageConfigFile);

const resourceRoutes = [
    '/pages/',
    '/styles/',
    '/js/',
    '/images/'
];

const homePath = path.join(__dirname, 'menu.html');

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);

    const method = req.method.toUpperCase();

    if (method === 'GET') {
        if (route === '/') {
            const result = await read(homePath);
            send(res, result);
        } else if (route === '/keys') {
            sendJson(res, await register.KEYS);
        } else if (route === '/all') {
            sendJson(res, await register.getAll());
        } else if (isIn(route, ...resourceRoutes)) {
            const result = await read(path.join(__dirname, route));
            if (result.fileData) {
                send(res, result);
            } else {
                send(res, await read(homePath));
            }
        } else {
            sendError(res, 'Resource not found', register.TYPES.ERROR);
        }
    } else if (method === 'POST') {
        if (route === '/search') {
            const body = await getRequestPostBodyData(req);
            sendJson(res, await register.get(body.number, 'number')); // Adjusted to match the cat data field
        } else if (route === '/addCat') {
            const body = await getRequestPostBodyData(req);
            register.insert(body)
                .then(result => sendJson(res, result))
                .catch(error => sendJson(res, error));
        } else if (route === '/remove') {
            const body = await getRequestPostBodyData(req);
            register.remove(body.number) // Adjusted to match the cat data field
                .then(result => sendJson(res, result))
                .catch(error => sendJson(res, error));
        } else {
            sendError(res, 'Resource not found', register.TYPES.ERROR);
        }
    } else {
        sendError(res, 'Method not allowed', register.TYPES.ERROR, 405);
    }
});

server.listen(port, host, () => console.log(`Server ${host}:${port} serving...`));
