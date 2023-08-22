import { config as config_wdio } from '@config/wdio.conf';
import { APPIUM_PORT } from '@fixtures/constants';

export const config = {
    ...config_wdio,
    // ====================
    // Appium Configuration
    // ====================
    // ============
    // Capabilities
    // ============
    // For all capabilities for Appium, BrowserStack, SauceLabs please check
    // Appium: http://appium.io/docs/en/writing-running-appium/caps/
    // BrowserStack: https://www.browserstack.com/app-automate/capabilities?tag=jsonwire
    // Sauce Labs: https://docs.saucelabs.com/dev/test-configuration-options/#mobile-appium-capabilities
    services: ['appium'],
    appium: {
        // For options see
        // https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-appium-service
        args: ['--allow-insecure'],
    },
    protocol: 'http',
    port: APPIUM_PORT,
    host: 'localhost',
    path: '/wd/hub',
};
