const jestPuppeteerConfig = require("../../jest-puppeteer.config");

module.exports =
    expect.extend({
        async toWaitAndFill(page, selector, content, {timeout} = {}) {
            timeout = timeout || jestPuppeteerConfig.waitElementTimeout;
            
            try {
                await page.waitForSelector(selector, {visible: true, timeout});
            } catch (error) {
                console.error("Expected " + selector + " to be visible within " + timeout + " milliseconds.");
                return {
                    message: () => `Expected ${selector} to be visible within ${timeout} milliseconds.`,
                    pass: false
                }
            }

            try {
                await page.$eval(selector, _el => _el.value = "");
                await page.type(selector, content);
            } catch (error) {
                console.error("Expected " + selector + " to be editable within " + timeout + " milliseconds.");
                return {
                    message: () => `Expected ${selector} to be editable within ${timeout} milliseconds.`,
                    pass: false
                }
            }

            return {
                message: () => `Expected "${selector}" not to be visible and editable within ${timeout} milliseconds.`,
                pass: true
            }
        }
    });
