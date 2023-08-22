import { selector } from '@fixtures/types';
import { Location } from 'webdriverio/build/commands/element/getLocation';
import { Size } from 'webdriverio/build/commands/element/getSize';

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
    /**
     * @description Returns proper selector acording to platformName
     * @param selector
     * @returns
     */
    selector = (selector: selector) => {
        const platformName = driver.capabilities['platformName'].toLowerCase();
        return selector?.[platformName] ? selector[platformName] : selector['common'];
    };

    protected getElement(androidLoc: string, iosLoc: string) {
        return $(
            this.selector({
                android: androidLoc,
                ios: iosLoc,
            })
        );
    }

    get lblProgressSpinner() {
        return this.getElement('', '//XCUIElementTypeActivityIndicator[@name="In progress"]');
    }

    async isDisplayedInViewport(element: WebdriverIO.Element, overlapElement?: WebdriverIO.Element) {
        let screenSize: Size;
        let elementLocation: Location;
        let overlapElementSize: Size;
        if (await (await element).isDisplayed()) {
            console.log('element :>> element is displayed');
            screenSize = await driver.getWindowSize();
            console.log('screenSize :>> ', screenSize);
            elementLocation = await element.getLocation();
            console.log('elementLocation :>> ', elementLocation);
            if (elementLocation.y >= 0 && elementLocation.y <= screenSize.height) {
                if (overlapElement && (await overlapElement.isDisplayed())) {
                    overlapElementSize = await overlapElement.getSize();
                    console.log('overlapElementSize :>> ', overlapElementSize);
                    return elementLocation.y <= screenSize.height - overlapElementSize.height;
                }
                return true;
            }
        } else return false;
    }

    async clickIfDisplayed(element: WebdriverIO.Element, timeout = 5000): Promise<boolean> {
        try {
            await element.waitForDisplayed({ timeout: timeout });
            await (await element).click();
            return true;
        } catch (error) {
            console.error(`Element with selector: ${element.selector.toString()} is not displayed`);
            return false;
        }
    }

    async waitForSpinnerToComplete(timeout = 2000) {
        try {
            await this.lblProgressSpinner.waitForDisplayed({ timeout: timeout });
        } catch (error) {
            console.error(`Progress spinner is not displayed`);
        }
        await this.lblProgressSpinner.waitForDisplayed({ reverse: true, timeout: timeout });
    }
}
