import Page from '@pages/page';
import { RectReturn } from '@wdio/protocols/build/types';
/**
 * To make a Gesture methods more robust for multiple devices and also
 * multiple screen sizes the advice is to work with percentages instead of
 * actual coordinates. The percentages will calculate the position on the
 * screen based on the SCREEN_SIZE which will be determined once if needed
 * multiple times.
 */
interface scrollOptions {
    limit: number;
    percentage: number;
    soft: boolean;
}
const DEFAULT_SCROLL_OPTIONS: Partial<scrollOptions> = {
    limit: 3,
    percentage: 1,
    soft: false,
};
type direction = 'right' | 'left' | 'up' | 'down';

interface XY {
    x: number;
    y: number;
}

/**
 * The values in the below object are percentages of the screen
 */
const SWIPE_DIRECTION_PERCENTAGES = {
    down: {
        start: { x: 0.5, y: 0.2 },
        end: { x: 0.5, y: 0.8 },
    },
    left: {
        start: { x: 0.95, y: 0.5 },
        end: { x: 0.05, y: 0.5 },
    },
    right: {
        start: { x: 0.05, y: 0.5 },
        end: { x: 0.95, y: 0.5 },
    },
    up: {
        start: { x: 0.5, y: 0.8 },
        end: { x: 0.5, y: 0.2 },
    },
};

class Gestures extends Page {
    async tapOnElement(element: WebdriverIO.Element) {
        await browser.touchAction({
            action: 'tap',
            x: 100,
            y: 100,
            element: element,
        });
    }

    async tapOnCoords(x: number, y: number) {
        await browser.touchAction({
            action: 'tap',
            x: x,
            y: y,
        });
    }

    /**
     * Check if an element is visible and if not swipe up a portion of the screen to
     * check if it visible after x amount of scrolls
     */
    async scrollDownTo(element: WebdriverIO.Element, options: Partial<scrollOptions> = {}) {
        options = { ...DEFAULT_SCROLL_OPTIONS, ...options };
        console.log('limit :>> ', options.limit);
        // If the element is not displayed and we haven't scrolled the max amount of scrolls
        // then scroll and execute the method again
        if (!(await this.isDisplayedInViewport(element)) && options.limit > 0) {
            console.log('element :>> element is not displayed');
            await this.swipeUp(options.percentage);
            await this.scrollDownTo(element, {
                limit: --options.limit,
                percentage: options.percentage,
                soft: options.soft,
            });
        }
        if (await this.isDisplayedInViewport(element)) {
            console.log('element :>> element is displayed');
            return true;
        }
        if (options.limit < 0) {
            // If the element is still not visible after the max amount of scrolls  it fail if `soft` return false
            if (options.soft) {
                console.log('element :>> element is not displayed');
                return false;
            } else throw new Error(`The element '${element.selector}' could not be found or is not displayed.`);
        }
    }
    async scrollUpTo(element: WebdriverIO.Element, options: Partial<scrollOptions> = {}) {
        options = { ...DEFAULT_SCROLL_OPTIONS, ...options };
        console.log('limit :>> ', options.limit);
        // If the element is not displayed and we haven't scrolled the max amount of scrolls
        // then scroll and execute the method again
        if (!(await this.isDisplayedInViewport(element)) && options.limit > 0) {
            console.log('element :>> element is not displayed');
            await this.swipeDown(options.percentage);
            await this.scrollUpTo(element, {
                limit: --options.limit,
                percentage: options.percentage,
                soft: options.soft,
            });
        }
        if (await this.isDisplayedInViewport(element)) {
            console.log('element :>> element is displayed');
            return true;
        }
        if (options.limit < 0) {
            // If the element is still not visible after the max amount of scrolls  it fail if `soft` return false
            if (options.soft) {
                console.log('element :>> element is not displayed');
                return false;
            } else throw new Error(`The element '${element.selector}' could not be found or is not displayed.`);
        }
    }

    /**
     * Check if an element is visible and if not swipe up a portion of the screen to
     * check if it visible after x amount of scrolls
     */
    async swipeUpTillBottom(commonElement: Promise<WebdriverIO.Element>): Promise<boolean> {
        // If the element is not displayed, and we haven't scrolled the max amount of scrolls
        // then scroll and execute the method again
        if (await this.isDisplayedInViewport(await commonElement)) {
            const element = await commonElement;
            const currentPosition: string = JSON.stringify(await element.getLocation());
            await this.swipeUp(0.45);
            const newPos: string = JSON.stringify(await element.getLocation());

            console.info(`Initial element position: ${currentPosition} and after swipe: ${newPos}`);
            if (currentPosition !== newPos) {
                console.info('Position of the element changed after swipe: Possible to swipe again');
                return true;
            }
            console.info('Position of the element is the same after swipe: It is end of list');
            return false;
        } else {
            await this.swipeUp(0.2);
            if (!(await this.isDisplayedInViewport(await commonElement))) {
                throw new Error(
                    `The element '${(await commonElement).selector.toString()}' could not be found or is not visible.`
                );
            }
            await this.swipeUpTillBottom(commonElement);
        }
    }

    /**
     * Swipe down based on a percentage
     */
    async swipeDown(percentage = 1) {
        console.info(`Swiping down with [${percentage}] percentage`);
        await this.swipeOnPercentage(
            SWIPE_DIRECTION_PERCENTAGES.down.start,
            SWIPE_DIRECTION_PERCENTAGES.down.end,
            percentage,
            'down'
        );
    }

    /**
     * Swipe Up based on a percentage
     */
    async swipeUp(percentage = 1) {
        console.info(`Swiping up with [${percentage}] percentage`);
        await this.swipeOnPercentage(
            SWIPE_DIRECTION_PERCENTAGES.up.start,
            SWIPE_DIRECTION_PERCENTAGES.up.end,
            percentage,
            'up'
        );
    }

    /**
     * Swipe left based on a percentage
     */
    async swipeLeft(percentage = 1) {
        await this.swipeOnPercentage(
            SWIPE_DIRECTION_PERCENTAGES.left.start,
            SWIPE_DIRECTION_PERCENTAGES.left.end,
            percentage,
            'left'
        );
    }

    /**
     * Swipe right based on a percentage
     */
    async swipeRight(percentage = 1) {
        await this.swipeOnPercentage(
            SWIPE_DIRECTION_PERCENTAGES.right.start,
            SWIPE_DIRECTION_PERCENTAGES.right.end,
            percentage,
            'right'
        );
    }

    /**
     * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are
     * percentages of the screen.
     */
    async swipeOnPercentage(from: XY, to: XY, percentage: number, direction: direction) {
        // Get the screen size and store it so it can be re-used.
        // This will save a lot of webdriver calls if this methods is used multiple times.
        const SCREEN_SIZE = await driver.getWindowRect();
        // Get the start position on the screen for the swipe
        const pressCoords = this.getDeviceScreenCoords(SCREEN_SIZE, from);
        console.log('pressCoords :>> ', pressCoords);
        // Get the move to position on the screen for the swipe
        let releaseCoords = this.getDeviceScreenCoords(SCREEN_SIZE, to);
        releaseCoords = this.getReleaseCoords(pressCoords, releaseCoords, percentage, direction);
        await this.swipe(pressCoords, releaseCoords);
    }

    /**
     * Get Release Coords
     *
     * Get Release Coords based on percentage and direction
     * @param {XY} pressCoords
     * @param {XY} releaseCoords
     * @param {number} percentage
     * @param {direction} direction
     * @returns {XY}
     */
    getReleaseCoords(pressCoords: XY, releaseCoords: XY, percentage: number, direction: direction) {
        if (direction === 'up')
            releaseCoords = {
                x: releaseCoords.x,
                y: Math.round(pressCoords.y + percentage * (releaseCoords.y - pressCoords.y)),
            };
        if (direction === 'down')
            releaseCoords = {
                x: releaseCoords.x,
                y: Math.round(pressCoords.y + percentage * (releaseCoords.y - pressCoords.y)),
            };
        if (direction === 'left')
            releaseCoords = {
                x: Math.round(pressCoords.x + percentage * (releaseCoords.x - pressCoords.x)),
                y: releaseCoords.y,
            };
        if (direction === 'right')
            releaseCoords = {
                x: Math.round(pressCoords.x + percentage * (releaseCoords.x - pressCoords.x)),
                y: releaseCoords.y,
            };
        console.log('releaseCoords :>> ', releaseCoords);
        return releaseCoords;
    }
    /**
     * Swipe from coordinates (from) to the new coordinates (to). The given coordinates are in pixels.
     */
    async swipe(from: XY, to: XY) {
        await driver.performActions([
            {
                // a. Create the event
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    // b. Move finger into start position
                    { type: 'pointerMove', duration: 0, x: from.x, y: from.y },
                    // c. Finger comes down into contact with screen
                    { type: 'pointerDown', button: 0 },
                    // d. Pause for a little bit
                    { type: 'pause', duration: 100 },
                    // e. Finger moves to end position
                    //    We move our finger from the center of the element to the
                    //    starting position of the element.
                    //    Play with the duration to make the swipe go slower / faster
                    { type: 'pointerMove', duration: 500, x: to.x, y: to.y },
                    // f. Finger gets up, off the screen
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
        // Add a pause, just to make sure the swipe is done
        await driver.pause(1000);
    }

    /**
     * Get the screen coordinates based on a device his screen size
     */
    getDeviceScreenCoords(screenSize: RectReturn, coordinates: XY): XY {
        return {
            x: Math.round(screenSize.width * coordinates.x),
            y: Math.round(screenSize.height * coordinates.y),
        };
    }

    /**
     * Calculate the x y coordinates based on a percentage
     */
    calculateXY({ x, y }: XY, calculate: 'x' | 'y' | 'xy', percentage: number): XY {
        let calculatedXY: XY;
        if (calculate === 'x')
            calculatedXY = {
                x: x * percentage,
                y: y,
            };
        if (calculate === 'y')
            calculatedXY = {
                x: x,
                y: y * percentage,
            };
        if (calculate === 'xy')
            calculatedXY = {
                x: x * percentage,
                y: y * percentage,
            };
        console.log('baseXY :>> ', { x, y });
        console.log('calculatedXY :>> ', calculatedXY);
        return calculatedXY;
    }

    async makeSignature(signatureArea: WebdriverIO.Element) {
        const locX = (await (await signatureArea.getLocation()).x) + 50;
        const locY = (await (await signatureArea.getLocation()).y) + 50;

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: locX, y: locY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 100 },
                    { type: 'pointerMove', duration: 1000, x: locX + 200, y: locY },
                    { type: 'pointerUp', button: 0 },
                ],
            },
        ]);
    }
}

export default new Gestures();
