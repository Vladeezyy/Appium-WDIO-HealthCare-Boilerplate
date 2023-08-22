import { config as config_wdio } from '@config/wdio.conf';
import { REGION } from '@fixtures/constants';

export const config = {
    ...config_wdio,
    // ====================
    // Sauce Labs Configuration
    // ====================
    // ============
    // Capabilities
    // ============
    // For all capabilities for appium and sauce labs please check
    // Appium: http://appium.io/docs/en/writing-running-appium/caps/
    // Sauce Labs: https://wiki.saucelabs.com/display/DOCS/Appium+Capabilities+for+Real+Device+Testing
    services: ['sauce'],
    //hostname: 'ondemand.eu-central-1.saucelabs.com',
    //port: 443,
    //baseUrl: 'wd/hub',
    user: process.env.SAUCE_USER || '',
    key: process.env.SAUCE_KEY || '',
    region: REGION || 'us',

    connectionRetryTimeout: 3 * 60 * 1000,
};
