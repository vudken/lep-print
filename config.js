import 'dotenv/config';
export default {
    server: {
        port: process.env.PORT || 8080,
        host: 'localhost',
    },
    database: {

    },
    apiKey: process.env.API_KEY,
    environment: process.env.NODE_ENV || 'development',
};