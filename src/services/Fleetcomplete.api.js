import axios from 'axios';
import axiosRateLimit from 'axios-rate-limit';
import Task from '../models/Task.js';
import Crew from '../components/Crew.js';
import { isEmpty, isMaintenance } from '../utils.js';
import config from '../../config.js';

const crew = new Crew();

class FleetcompleteAPIClient {
    constructor() {
        this.key = config.apiKey;
        this.url = 'http://app.ecofleet.com/seeme/Api/Tasks';
        this.parameters = `&__proto__=&key=${this.key}&json`;

        this.axiosRateLimitInstance = axiosRateLimit(axios.create(), {
            maxRequests: 60,
            perMilliseconds: 30000,
        });
    }

    async getTaskById(taskId) {
        return await this.axiosRateLimitInstance.get(`${this.url}/getData?id=${taskId}${this.parameters}`);
    }

    async getTasksByEmail(email = crew.getEmailByChatId(0), obj = { includeCompleted: false, includeMaintenance: false }) {
        const date = new Date();
        const begTimestamp = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        const res = await axios.get(`${this.url}/get?begTimestamp=${begTimestamp}&driver=${email}${this.parameters}`);
        let tasks = res.data.response.tasks;

        if (isEmpty(tasks)) {
            return [];
        } else {
            tasks = tasks.___xmlNodeValues.map(obj => obj.task);
            tasks = tasks.filter(task => task !== undefined);

            if (!obj.includeCompleted) tasks = tasks.filter(task => task.status != 'DONE');
            if (!obj.includeMaintenance) tasks = tasks.filter(task => !isMaintenance(task.name));

            tasks = tasks.map(task => task = new Task(task, crew));
            return tasks;
        }
    }

    async getAllTasks() {
        const allTasks = await Promise.all(
            crew.getAllChatIds().splice(2).map(async (id) => {
                return await this.getTasksByEmail(crew.getEmailByChatId(id), { includeCompleted: true });
            })
        );

        return allTasks.flat();
    }
}

export default FleetcompleteAPIClient;