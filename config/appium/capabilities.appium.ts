import { join } from 'path';
import { APP_ANDROID, APP_IOS } from '@fixtures/pathconstants';

export const capabalities_appium_android = [
    {
        platformName: 'Android',
        'appium:platformVersion': '9', // This is `appium:` for all Appium Capabilities which can be found here
        'appium:deviceName': 'emulator-5554',
        'appium:app': join('./app/', APP_ANDROID || ''), // The path to the app
        'appium:automationName': 'UiAutomator2', // Will be mandatory, see https://github.com/appium/appium/releases/tag/v1.13.0
        //'appium:autoGrantPermissions': true,
        //'appium:noReset': true, // Reset strategies differ per platform, see http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        //'appium:gpsEnabled': true,
        //"appium:autoWebview": true, //! IMPORTANT
        'appium:newCommandTimeout': '300',
    },
];

export const capabalities_appium_ios = [
    {
        platformName: 'iOS',
        'appium:platformVersion': '12', // This is `appium:` for all Appium Capabilities which can be found here
        'appium:deviceName': 'iPhone 11 Pro Max',
        'appium:app': join('./app/', APP_IOS || ''), // The path to the app
        'appium:automationName': 'Appium', // Will be mandatory, see https://github.com/appium/appium/releases/tag/v1.13.0
        //'appium:autoAcceptAlerts': true,
        //'appium:gpsEnabled': true,
        //'appium:noReset': true,  // Reset strategies differ per platform, see http://appium.io/docs/en/writing-running-appium/other/reset-strategies/
        //"appium:autoWebview": true, //! IMPORTANT
        'appium:newCommandTimeout': '300',
    },
];
