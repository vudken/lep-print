import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import config from '../config.js';
import router from './routes.js';
import { logger } from '../logs/logger.js';

const app = express();
const port = config.server.port;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', router);

app.listen(port, () => {
    logger.debug(`Server is up on port ${port}`);
});