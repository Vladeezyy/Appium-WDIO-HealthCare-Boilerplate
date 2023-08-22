import AllureReporter from '@wdio/allure-reporter';
import Page from './page';
import gesturesHelper from '@helpers/gestures.helper';
import { ENTER_KEY } from '@fixtures/constants';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
class LoginPage extends Page {
    /**
     * @description Getter method for selector
     */
    get imageIntelyCareLogo() {
        return $(
            this.selector({
                android: 'id=IntelyCare Logo',
                ios: 'id=LoginLogoImage',
            })
        );
    }
    get inputEmail() {
        return $(
            this.selector({
                android: 'id=email',
                ios: 'id=LoginVC.email',
            })
        );
    }
    get inputPwd() {
        return $(
            this.selector({
                android: 'id=password',
                ios: 'id=LoginVC.password',
            })
        );
    }
    get btnForgotPwd() {
        return $(
            this.selector({
                android: 'id=com.intelycare.m:id/forgotPassButton',
                ios: '//XCUIElementTypeStaticText[@name="Forgot Password?"]',
            })
        );
    }
    get btnLogIn() {
        return $(
            this.selector({
                android: 'id=loginButton',
                ios: 'id=LoginVC.loginButton',
            })
        );
    }
    get textWelcome() {
        return $(
            this.selector({
                android: 'id=com.intelycare.m:id/greetingText',
            })
        );
    }
    get btnShowPwd() {
        return $(
            this.selector({
                android: 'id=com.intelycare.m:id/text_input_end_icon',
            })
        );
    }
    get btnApplyNow() {
        return $(
            this.selector({
                android: 'id=com.intelycare.m:id/loginButton',
            })
        );
    }
    get textVersion() {
        return $(
            this.selector({
                android: 'id=com.intelycare.m:id/versionNumber',
                ios: 'id=LoginVC.versionLabel',
            })
        );
    }
    get btnCustomEnv() {
        return $(
            this.selector({
                android: '//*[@text="Custom Environment"]',
                ios: 'id=Custom Environment',
            })
        );
    }
    get inputEnvAddress() {
        return $(
            this.selector({
                android: '//*[contains(@resource-id,"customPanel")]//android.widget.EditText',
                ios: '//XCUIElementTypeAlert//XCUIElementTypeTextField',
            })
        );
    }
    get btnSetEnv() {
        return $(
            this.selector({
                android: '//*[@text="SET ENV"]',
                ios: 'id=Set',
            })
        );
    }

    get pinDescription() {
        return $(
            this.selector({
                android: 'id=com.intelycare.m:id/createPinDescription',
                ios: '',
            })
        );
    }

    get newContactInfoPopup() {
        return $(
            this.selector({
                android: '~New Contact Info to Get in Touch with the Right Teams at IntelyCare! ',
                ios: '',
            })
        );
    }

    get closeNewContactPopup() {
        return $(
            this.selector({
                android: '~Close',
                ios: '',
            })
        );
    }

    async setCustomEnv(envUrl: string) {
        AllureReporter.startStep(`Set Environment - ${envUrl}`);
        await gesturesHelper.scrollDownTo(await this.textVersion);
        await (await this.textVersion).click();
        await (await this.btnCustomEnv).click();
        await (await this.inputEnvAddress).setValue(envUrl);
        await (await this.btnSetEnv).click();
        AllureReporter.endStep();
    }

    async login(email: string, password: string) {
        AllureReporter.startStep('Enter email and password and click "Log In" btn');
        await gesturesHelper.scrollUpTo(await this.inputEmail);
        await (await this.inputEmail).setValue(email);
        await (await this.inputPwd).setValue(password);
        if (driver.isIOS) await (await this.inputPwd).sendKeys([ENTER_KEY]);
        await (await this.btnLogIn).click();
        AllureReporter.endStep();
    }
}
export default new LoginPage();
