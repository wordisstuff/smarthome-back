import { exec } from 'child_process';
import { authDb } from '../constants/index.js';

const allowedMacs = authDb.mac;
export const checkDevice = () => {
    exec(
        'sudo /smarthome-back/src/scripts/arp-scan.sh',
        (error, stdout, stderr) => {
            if (error) {
                console.error(`Помилка: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(stdout);
            const foundMac = allowedMacs.find(mac =>
                stdout.toLowerCase().includes(mac.toLowerCase()),
            );
            if (foundMac) {
                switch (foundMac.toLowerCase()) {
                    case '42:4B:13:10:02:24':
                        console.log('✅ Підключено телефон Hennadii');
                        break;
                    case '62:07:5C:44:10:D7':
                        console.log('✅ Підключено планшет дружини');
                        break;
                }
                console.log(`✅ Знайдено пристрій з MAC: ${foundMac}`);
            } else {
                console.log('❌ Жоден з дозволених MAC-адрес не знайдено.');
            }
        },
    );
};

// const { exec } = require('child_process');

// // Список дозволених MAC-адрес (нижній регістр!)

// // Функція перевірки присутності хоча б одного пристрою
// function checkForDevices() {}

// // Функція для відкриття клапана (або будь-якої іншої дії)
// function openValve() {
//     console.log('🚰 Відкриваємо клапан...');
//     // Тут твоя логіка — HTTP-запит до ESP32, зміна GPIO, тощо
// }

// // Перевірка кожну хвилину
// setInterval(checkForDevices, 60 * 1000);
