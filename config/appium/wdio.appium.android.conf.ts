import { config as config_appium } from '@config/appium/wdio.appium.conf';
import { capabalities_appium_android } from '@config/appium/capabilities.appium';

export const config = {
    ...config_appium,
    capabilities: capabalities_appium_android,
};
