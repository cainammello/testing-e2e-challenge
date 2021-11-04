require("./index.js");
const jestPuppeteerConfig = require("../../jest-puppeteer.config");

module.exports =
    expect.extend({
        async toFillDatePicker(page, selector, date, timeout = hc.config.testing.waitElementTimeout) {

            async function _selectDay(day) {
                // await expect(page).toSmartWaitForSelector("html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(2) > div");
                // const dayElement = (await page.$x(`//td[contains(@class, 'day') and not(contains(@class, 'old')) and not(contains(@class, 'new')) and text() = '${day}']`))[0];
                // await dayElement.click();
            }

            async function _selectMonth(month) {
                await expect(page).toSmartWaitForSelector(".datepicker .datepicker-months .datepicker-switch");
                const monthElement = (await page.$$(".datepicker .datepicker-months .month"))[month];
                await monthElement.click();
            }

            async function _selectYear(year) {
                await expect(page).toSmartWaitForSelector(".datepicker .datepicker-years .datepicker-switch");
                const yearsSwitchElement = await page.$(".datepicker .datepicker-years .datepicker-switch");
                const yearsSwitchElementText = await page.evaluate(element => element.textContent, yearsSwitchElement);

                const [initialYear, finalYear] = yearsSwitchElementText.split("-").map(yearStr => parseInt(yearStr));
                if (initialYear <= year && year <= finalYear) {
                    const yearElement = (await page.$x(`//span[contains(@class, 'year') and text() = '${year}']`))[0];
                    await yearElement.click();
                } else {
                    const directionButton = (year < initialYear) ? ".prev" : ".next";
                    await expect(page).toWaitAndClick(`.datepicker .datepicker-years ${directionButton}`);
                    await _selectYear(year);
                }
            }

            async function _selectDate() {
                await expect(page).toWaitAndClick(selector);

                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate();

                await page.waitForTimeout(hc.config.testing.animationDelay);
                await expect(page).toWaitAndClick(".datepicker .datepicker-days .datepicker-switch");
                await expect(page).toWaitAndClick(".datepicker .datepicker-months .datepicker-switch");

                await _selectYear(year);
                await _selectMonth(month);
                await _selectDay(day);
            }

            try{
                await _selectDate();
            }catch{
                console.error("Error to select date " + date + " with selector " + selector);
                return{
                    message: () => `Error to select date `,
                    pass: false
                }
            }

            return {
                message: () => `The date picker with the selector "${selector}" was filled successfully.`,
                pass: true
            }
        }
    });
