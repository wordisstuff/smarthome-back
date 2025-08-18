import { initMongoDB } from './db/initDb.js';
import { setupServer } from './server.js';
import { checkDevice } from './utils/checkDevice.js';

const bootstrap = async () => {
    await initMongoDB();
    checkDevice();
    setInterval(checkDevice, 60 * 1000);
    setupServer();
};

bootstrap();
