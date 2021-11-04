const jestPuppeteerConfig = require("../../jest-puppeteer.config");
// var targetNode = document.querySelector ("a[href*='stackoverflow']");
// if (targetNode) {
//     //--- Simulate a natural mouse-click sequence.
//     triggerMouseEvent (targetNode, "mouseover");
//     triggerMouseEvent (targetNode, "mousedown");
//     triggerMouseEvent (targetNode, "mouseup");
//     triggerMouseEvent (targetNode, "click");
// }
// else
//     console.log ("*** Target node not found!");

function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}

module.exports =
    expect.extend({
        async toWaitAndClick(page, selector, {timeout, clickDelay, clickButton, clickCount} = {}) {
            timeout = timeout || jestPuppeteerConfig.launch.waitElementTimeout;
            clickDelay = clickDelay || 0;
            clickCount = clickCount || 1;
            clickButton = clickButton || "left";

            async function _doTryOrThrow(action, triesCount = 3, delay = 800) {
                try {
                    return await action();
                } catch (error) {
                    if (triesCount <= 1) {
                        throw error;
                    } else {
                        console.warn(`Can't perform click on ${selector}, trying again...`);
                        await page.waitForTimeout(delay);
                        return await _doTryOrThrow(action, triesCount - 1);
                    }
                }
            }

            try {
                await page.waitForTimeout(400);
                //await expect(page).toSmartWaitForSelector(selector, {timeout, visible: true});
                //await expect(page).toWaitForSelector(selector, {timeout, visible: true});
            } catch (error) {
                console.error("Expected " + selector + " to be visible within " + timeout + " milliseconds.");
                return {
                    message: () => `Expected ${selector} to be visible within ${timeout} milliseconds.`,
                    pass: false
                }
            }

            try {
                await _doTryOrThrow(async () => {
                    if (typeof(selector) === "object") {
                        await selector.click();
                    }else{
                        await page.click(selector, {delay: clickDelay, button: clickButton, clickCount});
                    }
                });
                //await _doTryOrThrow();
            } catch (error) {
                console.error("Expected " + selector + " to be clickable within " + timeout + " milliseconds.");
                return {
                    message: () => `Expected ${selector} to be clickable within ${timeout} milliseconds.`,
                    pass: false
                }
            }

            return {
                message: () => `Expected "${selector}" not to be visible and clickable within ${timeout} milliseconds.`,
                pass: true
            }
        }
    });
