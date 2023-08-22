import * as fs from 'fs';

export const APP_IOS = fs
    .readdirSync(`./app/`)
    .filter((file) => file.includes('.ipa'))
    .pop();
export const APP_ANDROID = fs
    .readdirSync(`./app/`)
    .filter((file) => file.includes('.apk'))
    .pop();
