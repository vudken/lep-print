import log4js from 'log4js';

log4js.configure({
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: '%d{dd/MM/yyyy hh:mm} - %[%m%]'
            }
        },
        app: {
            type: 'file',
            filename: './logs/app.log',
            layout: {
                type: 'pattern',
                pattern: '%d{dd/MM/yy hh:mm} [%p] - %m'
            }
        },
        err: {
            type: 'stderr',
            layout: {
                type: 'pattern',
                pattern: '%d{dd/MM/yy hh:mm} [%p] - %m'
            }
        },
        errToFile: {
            type: 'file',
            filename: './logs/err.log',
            layout: {
                type: 'pattern',
                pattern: '%d{dd/MM/yy hh:mm} [%p] - %m'
            }
        }
    },
    categories: {
        default: { appenders: ['out', 'app'], level: 'debug' },
        app: { appenders: ['app'], level: 'debug' },
        err: { appenders: ['err', 'errToFile'], level: 'ERROR' }
    }
});

export const logger = log4js.getLogger();
export const logToFile = log4js.getLogger('app');
export const logErr = log4js.getLogger('err');