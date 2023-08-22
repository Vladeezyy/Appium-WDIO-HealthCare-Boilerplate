import Page from './page';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
class LandingPage extends Page {
    /**
     * @description Getter method for selector
     */
    get btnLogin() {
        return $(
            this.selector({
                android: 'id=loginButton',
                ios: 'id=InitialLoginVC.loginButton',
            })
        );
    }
    get btnSignUp() {
        return $(
            this.selector({
                android: 'id=signUpButton',
                ios: 'id=InitialLoginVC.signUpButton',
            })
        );
    }
}
export default new LandingPage();
