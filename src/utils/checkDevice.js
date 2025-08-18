import { exec } from 'child_process';
import { authDb } from '../constants/index.js';

const allowedMacs = authDb.mac;

export const checkDevice = () => {
    exec(
        'sudo /smarthome-back/src/scripts/arp-scan.sh',
        (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Помилка: ${error.message}`);
                return;
            }

            if (stderr) {
                console.error(`⚠️ stderr: ${stderr}`);
                // Не return, бо arp-scan іноді в stderr лише warning’и
            }

            // 🔍 Розбираємо stdout на рядки
            const lines = stdout.split('\n');

            // 📦 Масив MAC-адрес
            const detectedMacs = [];

            for (const line of lines) {
                // Шукаємо рядки, які містять IP і MAC
                const match = line.match(
                    /^(\d+\.\d+\.\d+\.\d+)\s+([0-9a-fA-F:]{17})/,
                );
                if (match) {
                    const mac = match[2].toUpperCase();
                    detectedMacs.push(mac);
                }
            }

            console.log('🔍 Знайдені MAC-адреси:', detectedMacs);

            // ✅ Перевірка, чи є хоч один із дозволених MAC
            const foundMac = detectedMacs.find(mac =>
                allowedMacs.some(allowed => allowed.toUpperCase() === mac),
            );

            if (foundMac) {
                switch (foundMac) {
                    case '42:4B:13:10:02:24':
                        console.log('✅ Підключено телефон Hennadii');
                        break;
                    case '62:07:5C:44:10:D7':
                        console.log('✅ Підключено планшет дружини');
                        break;
                }
                console.log(`✅ Доступ дозволено для MAC: ${foundMac}`);
            } else {
                console.log('❌ Жоден з дозволених MAC не знайдено.');
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
