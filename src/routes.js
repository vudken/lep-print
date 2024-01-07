import express from 'express';
import { getTodayDate } from './utils.js';
import Crew from './components/Crew.js';
import { getTasksHtml } from './views/task.view.js';

const router = express.Router();
const crew = new Crew();

router.get('/', async (req, res) => {
    res.render('index', {
        area: `LEP AVD`,
        date: getTodayDate(),
        tasks: await getTasksHtml(crew.getEmailByArea('avd')),
    });
});

router.get('/tasks/:area', async (req, res) => {
    const area = req.params.area;
    res.send({
        area: crew.getNameByArea(area),
        date: getTodayDate(),
        tasks: await getTasksHtml(crew.getEmailByArea(req.params.area)),
    });
});

export default router;
