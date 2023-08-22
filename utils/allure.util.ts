import { SAUCE_URL_TEST } from '@fixtures/constants';
import AllureReporter from '@wdio/allure-reporter';

export function addJobLinkToReport() {
    const SAUCE_URL_JOB = SAUCE_URL_TEST + driver.sessionId;
    AllureReporter.addDescription(
        `<p><strong><a href="${SAUCE_URL_JOB}" target="_blank"><button>Session</button></a><strong></p>`,
        'html'
    );
}
export function addEnvironmentToReport() {
    if (driver.isAndroid) {
        AllureReporter.addEnvironment('Platform', 'android');
        AllureReporter.addEnvironment('Platform Version', driver.capabilities['platformVersion']);
        AllureReporter.addEnvironment('App', process.env.BUILD_NAME_ANDROID);
    }
    AllureReporter.addEnvironment('', '');
    if (driver.isIOS) {
        AllureReporter.addEnvironment('Platform ', 'ios');
        AllureReporter.addEnvironment('Platform Version ', driver.capabilities['platformVersion']);
        AllureReporter.addEnvironment('App ', process.env.BUILD_NAME_IOS);
    }
}
