import { getAreaAddressBelongsTo } from '../resources/fileReader.js';
import { concatenateAddressFlatN } from '../utils.js';

class Task {
    constructor(data, crew) {
        if (!data || !data.id || !data.name || !data.status || !data.location || !data.createdAtTimestamp || !data.driver || !data.driver.email) {
            throw new Error('Invalid data provided for Task creation. Missing required properties.');
        }
        
        this.id = data.id;
        this.name = data.name;
        this.status = data.status;
        this.address = this.#formatAddress(data);
        this.description = this.#formatDescription(data, (data.driver.email === 'ad@e-lade.lv' ? { forTg: true } : {}));
        this.created = this.#formatCreatedAt(data);
        this.area = getAreaAddressBelongsTo(this.address);
        this.chatId = crew.getChatIdByArea(this.area);
        this.areaName = crew.getNameByChatId(this.chatId);
        this.email = crew.getEmailByChatId(this.chatId);
        this.flatN = this.description.match(/(\d{1,3}(?!\w)(?=.*\=?.*\d{7,8}))|(\d{8})|$/)[0];
        this.fullAddress = concatenateAddressFlatN(this.address, this.flatN)
        this.txt = `<b>Новая заявка!\n${this.address}:</b>\n\n${this.description}`;
        this.isCompleted = false;
    }

    getId() {
        return this.id;
    }

    getStatus() {
        return this.status;
    }

    getAddress() {
        return this.address;
    }

    getDescription() {
        return this.description;
    }

    getCreated() {
        return this.created;
    }

    getArea() {
        return this.area;
    }

    getAreaName() {
        return this.areaName;
    }

    getEmail() {
        return this.email;
    }

    getChatId() {
        return this.chatId;
    }

    getFlatN() {
        return this.flatN;
    }

    getTxt() {
        return this.txt;
    }

    getIsCompleted() {
        return this.isCompleted;
    }

    setIsCompleted() {
        return this.isCompleted;
    }
    
    #formatAddress(task) {
        if (!task.location || !task.location.address) {
            throw new Error('Invalid task data. Missing location or location.address.');
        }
        return task.location.address.split(/(?<=\d{1,5}\s?((k-\d)?|[aA-zZ]?))(,|\s(\(|,|\s)|\()/)[0];
    };

    #formatDescription(task, opts = {}) {
        let txt = '';
        if (task.description != null) {
            txt = task.description.replaceAll(/(^\d{2}\.\d{2}\.?)|([;,+])|([Zz]\/?[Cc])/g, '');
        }

        const separator = /(?=[Dd][Zz](\.|\s)?\s?\s?[Nn][Rr])/g;
        const symbolsAmount = 520;

        if (txt.length > symbolsAmount) {
            txt = txt.substring(0, symbolsAmount) + '...';
        }

        if (txt.match(/2\d{7}/)) {
            const strArr = txt.split(separator);

            let filtered = [];
            strArr.filter(str => {
                if (str != undefined) {
                    const match = str.match(/2\d{7}/);
                    if (match) {
                        const i = match['index'];
                        const j = i + 8;
                        const output = str.substring(0, i) + (opts['forTg'] ? '+371' : '') + str.substring(i, j) + '\n' + str.substring(j) + "\n\n";

                        filtered.push(output);
                    } else if (str.length > 8) {
                        filtered.push(str + "\n");
                    }
                }
            });
            txt = filtered.join('').trim();
        }

        return txt;
    };

    #formatCreatedAt(task) {
        let createdAt = task.createdAtTimestamp.substr(0, 10),
            formatted = createdAt.substr(8, 8) + createdAt.substr(4, 4);
        formatted = formatted.replace('-', '.');
        return formatted.substr(0, formatted.length - 1);
    };

    set phoneNumber(phoneNumber) {
        this._phoneNumber = phoneNumber;
    }

    set doorKey(doorKey) {
        this._doorKey = doorKey;
    }
}

export default Task;