import path from 'path';
import helmet from 'helmet';
import hpp from 'hpp';
import express from 'express';
import { fileURLToPath } from 'url';
import config from '../config.js';
import router from './routes.js';
import { logErr, logger } from '../logs/logger.js';
import rateLimit from 'express-rate-limit';

process.on('uncaughtException', async function (err) {
    logErr.error(err);
});

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});
const app = express();
const port = config.server.port;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(limiter);
app.use(helmet());
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            scriptSrc: [
                "'self'",
                "https://kit.fontawesome.com/655ce7c6a1.js",
                "https://code.jquery.com/jquery-3.7.1.min.js",
                "https://cdn.jsdelivr.net/npm/sweetalert2@11",
                "https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.min.js",
                "https://cdnjs.cloudflare.com/ajax/libs/popper.js/2.11.8/umd/popper.min.js",
                "unsafe-inline",
            ],
            styleSrc: [
                "'self'",
                "https://fonts.googleapis.com",
                "'unsafe-inline'"
            ],
            fontSrc: [
                "'self'",
                "https://fonts.gstatic.com",
                "https://ka-f.fontawesome.com"
            ],
            connectSrc: [
                "'self'",
                "https://ka-f.fontawesome.com"
            ]
        },
    })
);
app.use(hpp());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/', router);

app.disable('x-powered-by');

app.listen(port, () => {
    logger.debug(`Server is up on port ${port}`);
    setTimeout(() => {
        throw new Error('Test ERROR');
    }, 5000);
});