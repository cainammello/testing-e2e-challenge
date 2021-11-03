module.exports =
    expect.extend({
        async toWaitAndFill(page, selector, content, {timeout} = {}) {
            timeout = timeout || 400;
            
            try {
                await expect(page).waitForSelector(selector, {timeout});
            } catch (error) {
                console.error("Expected " + selector + " to be visible within " + timeout + " milliseconds.");
                return {
                    message: () => `Expected ${selector} to be visible within ${timeout} milliseconds.`,
                    pass: false
                }
            }

            try {
                await page.evaluate(_selector => document.querySelector(_selector).value = "", selector);
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
