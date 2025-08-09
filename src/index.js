import { initMongoDB } from './db/initDb.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
    await initMongoDB();
    setupServer();
};

bootstrap();
