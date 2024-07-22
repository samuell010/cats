'use strict';

const http = require('http');
const path = require('path');
const fs = require('fs').promises;

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

const publicPath = path.join(__dirname, 'public');
const homePath = path.join(publicPath, 'index.html');

const server = http.createServer(async (req, res) => {
    const { pathname } = new URL(`http://${req.headers.host}${req.url}`);
    const route = decodeURIComponent(pathname);

    const method = req.method.toUpperCase();

    if (method === 'GET') {
        if (route === '/') {
            const result = await read(homePath);
            send(res, result);
        } else if (isIn(route, ...resourceRoutes)) {
            const result = await read(path.join(publicPath, route));
            if (result.fileData) {
                send(res, result);
            } else {
                send(res, await read(homePath));
            }
        } else {
            sendError(res, 'Resource not found', register.TYPES.ERROR);
        }
    } else if (method === 'POST') {
        const body = await getRequestPostBodyData(req);
        if (route === '/search') {
            const number = body.number;
            const result = await register.get(number, 'number');
            if (result) {
                sendJson(res, result);
            } else {
                sendJson(res, { error: 'Cat not found' });
            }
        } else if (route === '/addCat') {
            register.insert(body)
                .then(result => sendJson(res, result))
                .catch(error => sendJson(res, error));
        } else if (route === '/remove') {
            register.remove(body.number)
                .then(result => sendJson(res, result))
                .catch(error => sendJson(res, error));
        } else if (route === '/update') {
            register.update(body.number, body)
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
