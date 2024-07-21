'use strict';

const path = require('path');

const { storage, storageEngine } = require('./config.json');

const storagePath = path.join(__dirname, storage.folder);

const enginePath=path.join(__dirname,storageEngine.folder);

// console.log('storagePath',storagePath);
// console.log('engine',enginePath);

const { createStorageLayer } = require(path.join(enginePath,'storageLayer.js'));
const {
    getAllFromStorage,
    getFromStorage,
    addToStorage,
    removeFromStorage,
    getKeys
}=createStorageLayer(storagePath, storage.storageConfigFile);

getAllFromStorage().then(console.log).catch(console.log);
// getFromStorage(1).then(console.log).catch(console.log);
// getFromStorage('River','lastname').then(console.log).catch(console.log);

const tmp = {
    id: "6",
    firstname: 'Vera',
    lastname: 'River',
    department: 'ict',
    salary: "5000"
}

// addToStorage(tmp).then(console.log).catch(console.log);
// removeFromStorage(5).then(console.log).catch(console.log);

getKeys().then(console.log).catch(console.log);