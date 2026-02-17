import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../..');
const wdioTafRoot = path.resolve(__dirname, '../..');

dotenv.config({ path: path.join(projectRoot, '.env') });

export const config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    runner: 'local',
    
    //
    // ==================
    // Specify Test Files
    // ==================
    specs: [
         path.join(__dirname, "../tests/**/*.test.js")
    ],
    
    // Patterns to exclude
    exclude: [
        // 'path/to/excluded/files'
    ],

    // Retry failed spec files up to 1 time
    specFileRetries: 1,
    specFileRetriesDelay: 0,
    specFileRetriesDeferred: false,
    
    //
    // ============
    // Capabilities
    // ============
    maxInstances: 1,
    
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-background-networking',
                '--disable-sync',
                '--disable-translate',
                '--metrics-recording-only',
                '--no-first-run',
                '--safebrowsing-disable-auto-update',
                '--log-level=3',
                '--start-maximized'
            ],
            excludeSwitches: ['enable-logging']
        }
    }],

    //
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'error',
    
    bail: 0,
    
    baseUrl: process.env.BASE_URL || "https://practicesoftwaretesting.com",
    
    waitforTimeout: 30000,
    
    connectionRetryTimeout: 120000,
    
    connectionRetryCount: 2,
    
    framework: 'mocha',
    
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    //
    // =====
    // Hooks
    // =====
    /**
     * Take screenshot on test failure and save to screenshots/ folder
     */
    afterTest: async function (test, context, { error, passed }) {
        if (!passed) {
            const screenshotDir = path.resolve(wdioTafRoot, 'screenshots');
            if (!fs.existsSync(screenshotDir)) {
                fs.mkdirSync(screenshotDir, { recursive: true });
            }

            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const testName = test.title.replace(/\s+/g, '_');
            const filePath = path.join(screenshotDir, `${testName}_${timestamp}.png`);

            await browser.saveScreenshot(filePath);
            console.log(`\n📸 Screenshot saved: ${filePath}`);
        }
    },
}
