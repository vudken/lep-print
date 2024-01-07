import { sortAlpabetically, getTaskComment } from '../utils.js';
import FleetcompleteAPIClient from '../services/Fleetcomplete.api.js';

const fac = new FleetcompleteAPIClient();

const getNoTasksHtml = () => {
    return `<tr>
                <th colspan="5" style="text-align: center">
                    <br>Apsveicam, jums pašlaik nav aktīvu pieteikumu!</br>  
                    Поздравляем, на данный момент у вас нету активных заявок!
                </th>
            </tr>`;
};

export const getTasksHtml = async (email) => {
    const tasks = sortAlpabetically(await fac.getTasksByEmail(email));

    let i = 1;
    let html = '';

    if (tasks.length === 0) {
        html = getNoTasksHtml();
    } else {
        for (const task of tasks) {
            const comment = getTaskComment(await fac.getTaskById(task.id));
            html += `<tr>
            <th scope="row">${i++}</th>
            <td><div>${comment ? '<b>' + task.address + ':</b>' : task.address}</div><b>${comment ? comment : ''}</b></td>
            <td>${task.created}</td>
            <td>${task.description}</td>
            <td>  </td>
            </tr>`;
        }
    }

    return html;
};