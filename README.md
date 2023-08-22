# Mobile App Automation Framework

Automation framework to run tests using Appium, WebdriverIO(async-await mode) for:

-   iOS/Android Native Apps

## Technologies Stack

-   [Node.js](https://nodejs.org/en/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [WebdriverIO Framework](https://webdriver.io/)
-   [Appium Service](https://webdriver.io/docs/appium-service/)
-   [Sauce Service](https://webdriver.io/docs/sauce-service)
-   [Axios Library](https://axios-http.com/) - promise based HTTP client. Used for Making http requests from node.js.
-   [Allure Framework](https://docs.qameta.io/allure-report/) - provide HTML reports for automation project.  
    We are using version for wdio [@wdio/allure-reporter](https://webdriver.io/docs/allure-reporter).
-   [Mailsac Service](https://mailsac.com/) - Email Service. [API](https://mailsac.com/docs/api).

## Reports

HTML Reporting system that is hosted in []().  
Implemented with use of [Allure Framework](https://webdriver.io/docs/allure-reporter/).  
Click to open reports

<p><strong><a href="" target="_blank">Report</a></strong></p>

## Setup

### Installation

1.  Running `git clone git@bitbucket.org:intelycare/mobile_automation.git`.
1.  Running `npm install`.
1.  Installing Appium on a local machine [here](./docs/APPIUM.md).
1.  Setting up Android and iOS on a local machine [here](./docs/ANDROID_IOS_SETUP.md).

### How to run the tests

1.  Making the app available:

    -   Local:
        1.  Go to `package.json` for scripts `app:download:ios` and `app:download:android` to specify the preferred version of apps.
            `BUILD_NAME` can be `latest`, `Payload-xxx.ipa` or `app-debug-xxx.apk`. Check Sauce Labs App Manager to find accessible versions.
        1.  Run scripts `app:download:ios` and `app:download:android` to download apps.
    -   Sauce Labs:
        1.  Create a `.env` file. Add your Sauce Labs creds (`SAUCE_USER=xxx` and `SAUCE_KEY=xxx`).
        1.  Go to `package.json` for scripts `app:get:ios` and `app:get:android` to specify the preferred version of apps.  
            `BUILD_NAME` can be `latest`, `Payload-xxx.ipa` or `app-debug-xxx.apk`.  
            If the specific version is needed check **Sauce Labs App Management** to find it (`Payload-xxx.ipa` or `app-debug-xxx.apk`).
        1.  If the latest build is needed just set scripts `app:get:ios` and `app:get:android` env variable `BUILD_NAME` to the latest and run them.
            Then use the output version in the next step.
        1.  To run tests on Sauce Labs we need to specify the preferred version of apps by adding `BUILD_NAME_IOS=Payload-xxx.ipa`
            `BUILD_NAME_ANDROID=app-debug-xxx.apk` to `.env` file.

1.  Running tests:
    -   Local:
        1. Launch emulator
        1. Run scripts `npm run test:appium:android` or `npm run test:appium:ios` specify relative path to the test or suite(check suiteList.ts) `--spec ./test/xxx` or `--suite ShiftVisibility`
    -   Sauce Labs:
        1. Run scripts `npm run test:sauce:android` or `npm run test:sauce:ios`

We defined a default configuration (config/wdio.conf.js) which is used for specific configurations: appium(local run), sauce(Sauce Labs cloud service). They all can be executed when you run one of scripts from `package.json` like `test:sauce:both:os` or `test:appium:android`.

Environment variables:

-   `SAUCE_USER` - `sauce` username. Get it from [SauceLabs](https://app.saucelabs.com/dashboard/)
-   `SAUCE_KEY` - `sauce` access key. Get it from [SauceLabs](https://app.saucelabs.com/dashboard/)
-   `BUILD_NAME_IOS` - used to specify ios app version when running on `sauce`
-   `BUILD_NAME_ANDROID` - used to specify android app version when running on `sauce`

**Appium**:

There is commands that may help you:  
Run appium server on port 4444:

```bash
npx appium -p 4444
```

Check available emulators(need to be created in Android Studio):

```bash
emulator -list-avds
```

Run emulator with name from previous command(contains way to your Android SDK(Need to be added to PATH)):

```bash
cd *path to /AppData/Local/Android/Sdk/emulator* && emulator -avd Pixel_4_12_31
```

Run this command to start your tests on Appium:

```bash
npm run test:appium:android
```

### Test structure

All test cases should be coded inside the test folder. There you can organize tests for different apps and define generic classes with getters and setters to use classes those methods inside other classes.

We work with the Page Object Pattern described in [Page Object WDIO](https://webdriver.io/docs/pageobjects.html). The main idea is to encapsulate logic into page classes and use the logic in the spec files to run the tests.

For instance we defined the LoginPage and the element as attributes in a class and reuse them in the code.

`helpers` folder contain some base flexible methods for different functionality.
`fixtures` folder contain some predefined variables and types.
`api` folder contain API requests that are used for automation.
`scripts` folder that contain bash scripts
