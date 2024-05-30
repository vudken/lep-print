import 'dotenv/config';
const env = process.env;

class Crew {
    constructor() {
        this.members = {
            0: { name: 'LEP AVD', email: env.AVD_EMAIL, chatId: parseInt(env.AVD_CHAT_ID), area: 'avd' },
            1: { name: 'Lep Completed', email: env.COMP_EMAIL, chatId: parseInt(env.COMP_CHAT_ID), area: 'comp' },
            2: { name: 'Automātika', email: env.AUTO_EMAIL, chatId: parseInt(env.AUTO_CHAT_ID), area: 'auto' },
            3: { name: 'Remontdarbi', email: env.RM_EMAIL, chatId: parseInt(env.RM_CHAT_ID), area: 'rm' },
            // 4: { name: 'Pieteikumi', email: env.TMP_EMAIL, chatId: parseInt(env.TMP_CHAT_ID_DEV), area: 'tmp' },
            4: { name: 'Pieteikumi', email: env.TMP_EMAIL, chatId: parseInt(env.TMP_CHAT_ID), area: 'tmp' },
            5: { name: 'Brekši', email: env.PRIVATI_EMAIL, chatId: parseInt(env.PRIVATI_CHAT_ID), area: 'privati' },
            // 5: { name: 'Brekši', email: env.PRIVATI_EMAIL, chatId: parseInt(env.TMP_CHAT_ID), area: 'privati' }, //TEST
            6: { name: 'Purvciems A', email: env.ZONA_A_EMAIL, chatId: parseInt(env.ZONA_A_CHAT_ID), area: 'zonaA' },
            7: { name: 'Purvciems B', email: env.ZONA_B_EMAIL, chatId: parseInt(env.ZONA_B_CHAT_ID), area: 'zonaB' },
            8: { name: 'Teika-Purvciems', email: env.TEIKA_PURV_EMAIL, chatId: parseInt(env.TEIKA_PURV_CHAT_ID), area: 'teikaPurv' },
            9: { name: 'Mežciems', email: env.MEZCIEMS_EMAIL, chatId: parseInt(env.MEZCIEMS_CHAT_ID), area: 'mezciems' },
            10: { name: 'Jugla', email: env.JUGLA_EMAIL, chatId: parseInt(env.JUGLA_CHAT_ID), area: 'jugla' },
            11: { name: 'Sarkandaugava', email: env.SARKA_EMAIL, chatId: parseInt(env.SARKA_CHAT_ID), area: 'sarka' },
            12: { name: 'Vecmilgravis-Jaunciems', email: env.VECMIL_EMAIL, chatId: parseInt(env.VECMIL_CHAT_ID), area: 'vecmil' },
            13: { name: 'Sagatavošanā esošās tames', email: env.TAME_EMAIL, chatId: undefined, area: 'tames' },
            14: { name: 'Nav saskaņots', email: env.NAV_SASK_EMAIL, chatId: undefined, area: 'navSask' },
            15: { name: 'Nav piekļuves', email: env.NAV_PIEK_EMAIL, chatId: undefined, area: 'navPiek' },
            16: { name: 'Avārijas dienesta', email: env.PAPIL_UZD_EMAIL, chatId: undefined, area: 'ad' },
            17: { name: 'LEP brigāde 1', email: env.LEP_BRIGADE_1, chatId: undefined, area: 'lb1' },
            18: { name: 'LEP brigāde 2', email: env.LEP_BRIGADE_2, chatId: undefined, area: 'lb2' },
            19: { name: 'LEP brigāde 3', email: env.LEP_BRIGADE_3, chatId: undefined, area: 'lb3' },
            20: { name: 'LEP elektriķi', email: env.LEP_ELEKTRIKI, chatId: undefined, area: 'elek' },
        };
    }

    toArray() {
        return Object.values(this.members);
    }

    isKeyExist(key) {
        return this.toArray().hasOwnProperty(key);
    }

    isUserExist(id) {
        return this.getAllChatIds().some(chatId => chatId === id);
    }

    isAreaExist(area) {
        return this.toArray().some(val => val.area === area);
    }

    isEmailExist(email) {
        return this.toArray().some(val => val.email === email);
    }

    getEmailByChatId(id) {
        return (this.isUserExist(id)) ? (
            this.toArray().find(val => val.chatId === id).email
        ) : (
            -1
        );
    }

    getEmailByArea(area) {
        return (this.isAreaExist(area)) ? (
            this.toArray().find(val => val.area === area).email
        ) : (
            -1
        );
    }

    getNameByChatId(id) {
        return (this.isUserExist(id)) ? (
            this.toArray().find(val => val.chatId === id).name
        ) : (
            -1
        );
    }

    getNameByEmail(email) {
        return (this.isEmailExist(email)) ? (
            this.toArray().find(val => val.email === email).name
        ) : (
            -1
        );
    }

    getNameByArea(area) {
        return (this.isAreaExist(area)) ? (
            this.toArray().find(val => val.area === area).name
        ) : (
            -1
        );
    }

    getChatIdByArea(area) {
        return (this.isAreaExist(area)) ? (
            this.toArray().find(val => val.area === area).chatId
        ) : (
            -1
        );
    }

    getAllAreas() {
        return this
            .toArray()
            .filter(val => typeof val != "function")
            .map(val => val.area);
    }

    getAllChatIds() {
        return this
            .toArray()
            .filter(val => typeof val != "function")
            .map(val => val.chatId);
    }

    getAllNames() {
        return this
            .toArray()
            .filter(val => typeof val != "function")
            .map(val => val.name);
    }

    getAllEmails() {
        return this
            .toArray()
            .filter(val => typeof val != "function")
            .map(val => val.email);
    }

}

export default Crew;