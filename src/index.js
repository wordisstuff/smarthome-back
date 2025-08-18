import { initMongoDB } from './db/initDb.js';
import { setupServer } from './server.js';
import { checkDevice } from './utils/checkDevice.js';

const bootstrap = async () => {
    await initMongoDB();
    setInterval(checkDevice, 60 * 1000);
    // checkDevice();
    setupServer();
};

bootstrap();
