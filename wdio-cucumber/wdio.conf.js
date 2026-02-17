import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const config = {
    runner: 'local',

    specs: ['./features/**/*.feature'],
    exclude: [],

    maxInstances: 1,
    capabilities: [{ browserName: 'chrome' }],

    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://practicesoftwaretesting.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'cucumber',
    reporters: ['spec', ['allure', { outputDir: 'allure-results' }]],

    cucumberOpts: {
        require: [path.join(__dirname, 'features', 'step-definitions', '*.js')],
        backtrace: false,
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tags: process.env.TAGS || '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false
    }
};
