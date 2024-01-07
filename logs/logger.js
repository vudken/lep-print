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
        }
    },
    categories: {
        default: { appenders: ['out', 'app'], level: 'debug' },
        app: { appenders: ['app'], level: 'debug' }
    }
});

export const logger = log4js.getLogger();
export const logToFile = log4js.getLogger('app');