import { config as config_sauce } from '@config/sauce/wdio.sauce.conf';
import { capabalities_sauce_android_emulator } from '@config/sauce/capabilities.sauce';

export const config = {
    ...config_sauce,
    capabilities: capabalities_sauce_android_emulator,
};
