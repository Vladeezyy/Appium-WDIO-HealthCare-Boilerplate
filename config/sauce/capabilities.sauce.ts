import { APPIUM_VERSION } from '@fixtures/constants';
import moment from 'moment';
import { getFacilityLocationOrDefault } from '@utils/util';

const buildName = {
    android: {
        emulator: `ANDROID. Emulators: ${moment().format()}`,
        rdc: `ANDROID. Real device: ${moment().format()}`,
    },
    ios: {
        simulator: `IOS. Simulators: ${moment().format()}`,
        rdc: `IOS. Real device: ${moment().format()}`,
    },
};

const timeZone = getFacilityLocationOrDefault().sauceTimezone;

export const capabalities_sauce_android_rdc = [
    {
        platformName: 'Android',
        'appium:app': `storage:filename=${process.env.BUILD_NAME_ANDROID}`,
        'appium:deviceName': 'Samsung.*',
        'appium:platformVersion': '10',
        'appium:automationName': 'UiAutomator2',
        'appium:newCommandTimeout': '500',
        // Sauce Labs specific options
        'sauce:options': {
            phoneOnly: true,
            appiumVersion: APPIUM_VERSION,
            // Group builds by build name
            build: buildName.android.rdc,
            idleTimeout: '500',
            maxDuration: 1800,
            //cacheId: 'jnc0x1256',
        },
        // Always default the language to a language you prefer so you know the app language is always as expected
        'appium:language': 'en',
        'appium:locale': 'us',
    },
];

export const capabalities_sauce_android_emulator = [
    {
        platformName: 'Android',
        'appium:platformVersion': '9.0',
        'appium:deviceName': 'Google Pixel 3 XL GoogleAPI Emulator',
        'appium:app': `storage:filename=${process.env.BUILD_NAME_ANDROID}`,
        'appium:automationName': 'UiAutomator2',
        'appium:newCommandTimeout': '500',
        // Sauce Labs specific options
        'sauce:options': {
            phoneOnly: true,
            appiumVersion: APPIUM_VERSION,
            // Group builds by build name
            build: buildName.android.emulator,
            idleTimeout: '500',
            maxDuration: 1800,
        },
        // Always default the language to a language you prefer so you know the app language is always as expected
        'appium:language': 'en',
        'appium:locale': 'us',
    },
];

export const capabalities_sauce_ios_emulator = [
    {
        platformName: 'iOS',
        'appium:app': `storage:filename=${process.env.BUILD_NAME_IOS}`,
        'appium:deviceName': 'iPhone Simulator',
        'appium:platformVersion': '16.2',
        'appium:automationName': 'XCUITest',
        'appium:newCommandTimeout': '500',
        // Sauce Labs specific options
        'sauce:options': {
            phoneOnly: true,
            // appiumVersion: APPIUM_VERSION,
            // Group builds by build name
            build: buildName.ios.simulator,
            idleTimeout: '500',
            maxDuration: 1800,
            timeZone: timeZone,
        },
        // Always default the language to a language you prefer so you know the app language is always as expected
        'appium:language': 'en',
        'appium:locale': 'us',
    },
];

export const capabalities_sauce_ios_rdc = [
    {
        platformName: 'iOS',
        'appium:app': `storage:filename=${process.env.BUILD_NAME_IOS}`,
        'appium:deviceName': 'iPhone.*',
        'appium:platformVersion': '13',
        'appium:automationName': 'XCUITest',
        'appium:newCommandTimeout': '500',
        // Sauce Labs specific options
        'sauce:options': {
            phoneOnly: true,
            appiumVersion: APPIUM_VERSION,
            // Group builds by build name
            build: buildName.ios.rdc,
            idleTimeout: '500',
            maxDuration: 1800,
        },
        // Always default the language to a language you prefer so you know the app language is always as expected
        'appium:language': 'en',
        'appium:locale': 'us',
    },
];
