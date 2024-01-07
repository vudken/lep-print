import { logger } from '../logs/logger.js';

export const isEmpty = (obj) => {
    return Object.entries(obj).length === 0;
};

export const getTodayDate = () => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${(day >= 10 ? day : '0' + day)}.${(month >= 10) ? month : '0' + month}.${date.getFullYear()}`;
};

export const getTaskFromListByTaskId = (tasks, id) => {
    return (tasks.some(task => task.id == id)) ? (
        tasks.find(task => task.id == id)
    ) : (
        -1
    );
};

export const concatenateAddressFlatN = (address, flatN) => {
    return address === undefined ? 'unknown' : `${address} ${flatN === '' ? '' : '- ' + flatN}`;
};

export const getTaskBtnArr = (tasks) => {
    const btns = [];
    tasks.forEach(task => {
        btns.push([{ text: concatenateAddressFlatN(task.address, task.flatN), callback_data: task.id }]);
    });
    btns.push([{ text: 'Закрыть меню', callback_data: 'closeMenu' }]);

    return btns.sort();
};

export const validatePhotoNeeded = (ctx) => {
    ctx.session.isPhotoNeeded = true;
};

export const invalidatePhotoNeeded = (ctx) => {
    ctx.session.isPhotoNeeded = false;
};

export const isTaskValid = (task) => {
    return task !== null && task !== undefined && task !== -1;
};

export const sortAlpabetically = (tasks) => {
    return tasks.sort((a, b) => {
        let textA = a.address.toUpperCase();
        let textB = b.address.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
};

export const getTaskComment = (task) => {
    let comment = '';
    try {
        comment = task.data.response.formsData.requesterform.fields.kavesanas_iemesls;
    } catch (error) {
        logger.error(`An error occured while getting comment from: ${task.data.response.task.location.address.split(",")[0]}`);
    }

    const regex = /^#.+/gm;
    if (comment !== null && comment !== undefined) {
        comment = comment.match(regex);
    }

    if (comment !== null && comment !== undefined) {
        comment = comment.toString().slice(1);
    }

    return comment;
};

export const isAsap = (strToCheck) => {
    return strToCheck.toLowerCase().includes('asap');
};

export const isMaintenance = (strToCheck) => {
    return strToCheck.toLowerCase().includes('apkope');
};