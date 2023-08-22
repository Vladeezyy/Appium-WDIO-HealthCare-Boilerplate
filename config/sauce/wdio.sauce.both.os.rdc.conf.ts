import { config as config_browserstack } from '@config/sauce/wdio.sauce.conf';
import { capabalities_sauce_android_rdc, capabalities_sauce_ios_rdc } from '@config/sauce/capabilities.sauce';

export const config = {
    ...config_browserstack,
    capabilities: [...capabalities_sauce_android_rdc, ...capabalities_sauce_ios_rdc],
};
