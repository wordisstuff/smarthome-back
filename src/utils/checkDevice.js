import { exec } from 'child_process';
import { authDb } from '../constants/index.js';
import path from 'path';

const allowedMacs = authDb.mac.filter(Boolean);
const scriptPath = path.join(process.cwd(), 'src/scripts/arp-scan.sh');

let cachedResult = false;
let cachedMac = null;
let lastCheckedAt = 0;

const CACHE_TIME = 30 * 1000;

const scanDevices = () => {
    return new Promise(resolve => {
        exec(`sudo ${scriptPath}`, (error, stdout, stderr) => {
            if (error) {
                console.error(`❌ Помилка: ${error.message}`);
                return resolve({ isTrusted: false, mac: null });
            }

            if (stderr) {
                console.error(`⚠️ stderr: ${stderr}`);
            }

            const detectedMacs = stdout
                .split('\n')
                .map(line =>
                    line.match(/([0-9a-fA-F]{1,2}:){5}[0-9a-fA-F]{1,2}/),
                )
                .filter(Boolean)
                .map(match =>
                    match[0]
                        .split(':')
                        .map(part => part.padStart(2, '0'))
                        .join(':')
                        .toUpperCase(),
                );

            console.log('🔍 Знайдені MAC-адреси:', detectedMacs);

            const foundMac = detectedMacs.find(mac =>
                allowedMacs.some(allowed => allowed.toUpperCase() === mac),
            );

            if (!foundMac) {
                console.log('❌ Жоден з дозволених MAC не знайдено.');
                return resolve({ isTrusted: false, mac: null });
            }

            console.log(`✅ Доступ дозволено для MAC: ${foundMac}`);

            resolve({ isTrusted: true, mac: foundMac });
        });
    });
};

export const checkDevice = async () => {
    const now = Date.now();

    if (now - lastCheckedAt < CACHE_TIME) {
        console.log(
            `⚡ Trusted device cache: ${cachedResult ? 'allowed' : 'blocked'}`,
        );

        return cachedResult;
    }

    const result = await scanDevices();

    cachedResult = result.isTrusted;
    cachedMac = result.mac;
    lastCheckedAt = now;

    return cachedResult;
};

export const getTrustedDeviceInfo = () => {
    return {
        isTrusted: cachedResult,
        mac: cachedMac,
        lastCheckedAt,
    };
};
