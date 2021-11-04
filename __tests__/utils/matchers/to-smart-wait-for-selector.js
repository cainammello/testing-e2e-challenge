const jestPuppeteerConfig = require("../../jest-puppeteer.config");

module.exports =
    expect.extend({
        async toSmartWaitForSelector(page, selector, {timeout, waitDelay, triesCount, isVisible} = {}) {
            timeout = timeout || jestPuppeteerConfig.launch.waitElementTimeout;
            waitDelay = waitDelay || 500;
            waitTriesCount = triesCount || 3;

            const _doTryOrThrow = async (action, triesCount, delay) => {
                try {
                    return await action();
                } catch{
                    if (triesCount < 1) {
                        console.error(`expected ${selector} to be visible within ${timeout} milliseconds, with ${waitTriesCount} attempt${triesCount<2 ? "s" : ""}.`);
                        throw error;
                    } else {
                        console.warn(`The element ${selector} was not visible on the page, ${triesCount} attempt${triesCount>1 ? "s" : ""} remain${triesCount<2 ? "s" : ""}, trying again...`);
                        await page.waitForTimeout(delay);
                        return await _doTryOrThrow(action, triesCount - 1, delay*2);
                    }
                }
            }

            try {
                await page.waitForTimeout(timeout);
                await _doTryOrThrow(async () => {
                    if(isVisible != null){
                        await page.waitForSelector(selector, {timeout:timeout, visible:isVisible});
                    }else{
                        await page.waitForSelector(selector, {timeout:timeout});
                    }
                }, waitTriesCount, waitDelay)
            } catch{
                return {
                    message: () => `expected ${selector} to be visible within ${timeout} milliseconds, and with ${triesCount} attempt${triesCount>2 ? "s" : ""}.`,
                    pass: false
                }
            }

            return {
                message: () => `Success on wait for an element to be visible on the page`,
                pass: true
            }
        }
    });
