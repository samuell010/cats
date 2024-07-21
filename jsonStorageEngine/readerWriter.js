'use strict';

const fs = require('fs').promises;

// Function to read data from storage
async function readStorage(storageFile) {
    try {
        const data = await fs.readFile(storageFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // Handle the error, e.g., log it or rethrow it
        console.error(`Error reading file ${storageFile}:`, err.message);
        return []; // Return an empty array if there's an error
    }
}

// Function to write data to storage
async function writeStorage(storageFile, data) {
    try {
        await fs.writeFile(storageFile, JSON.stringify(data, null, 4), {
            encoding: 'utf8',
            flag: 'w'
        });
        return true;
    } catch (err) {
        // Handle the error, e.g., log it or rethrow it
        console.error(`Error writing to file ${storageFile}:`, err.message);
        return false;
    }
}

// Export the functions for use in other modules
module.exports = { readStorage, writeStorage };
