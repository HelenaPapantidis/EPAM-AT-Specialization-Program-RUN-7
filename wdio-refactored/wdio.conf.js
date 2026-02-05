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
         "./test/**/*.test.js"
    ],
    
    // Patterns to exclude
    exclude: [
        // 'path/to/excluded/files'
    ],
    
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
    
    baseUrl: "https://practicesoftwaretesting.com",
    
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
     * Gets executed before test execution begins
     */
    // before: function (capabilities, specs) {
    //     console.log('Starting test execution...');
    // },
    
    /**
     * Gets executed after all tests are done
     */
    // after: function (result, capabilities, specs) {
    //     console.log('Test execution completed');
    // },
}
