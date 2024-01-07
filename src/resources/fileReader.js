import fs from 'fs';
import color from '../../logs/color.js';
import { logToFile } from '../../logs/logger.js';

const listsFolder = './src/resources/addressLists/';
const listNames = [];

fs.readdirSync(listsFolder).forEach(list => {
    listNames.push(list);
});

export const getAreaAddressBelongsTo = (address) => {
    if (address === undefined || address === null) {
        throw new Error(`${color.red}Address is not defined at getAreaNameAddressBelongsTo()${color.end}`);
    }

    let area;
    listNames.forEach(listName => {
        const file = listsFolder + listName;
        const addresses = fs.readFileSync(file, 'utf8').toLowerCase();
        const re = new RegExp(`${address.toLowerCase().trim()}\\b`, 'g');

        if (addresses.match(re)) {
            area = listName.replace('\.txt', '');
        }
    });

    if (area === undefined) {
        logToFile.warn(`Address ${address} is not found in any of the lists`);
        area = 'tmp';
    }

    return area;
};