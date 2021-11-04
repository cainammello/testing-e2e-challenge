require("../../utils/matchers");
const jestPuppeteerConfig = require("../../jest-puppeteer.config");
const createGoogleCalendarEventUtil = require("./create-google-calendar-event.util.js");

describe.only("Google Calendar Event", () => {
    beforeAll(async () => {
        await Promise.all([
            page.goto("https://www.google.com/calendar"),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        // Waiting for the email input to make sure we are in the right page
        await expect(page).toSmartWaitForSelector("#identifierId");

        // Fills out the email
        await expect(page).toWaitAndFill("#identifierId", "testeuichallenge@gmail.com");

        // Clicks next button
        await expect(page).toWaitAndClick("#identifierNext > div > button");

        const passwordInput = "#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input";
        
        // Waiting for the password input to make sure we are in the right page
        await expect(page).toSmartWaitForSelector(passwordInput);

        // CLicks next button
        await expect(page).toWaitAndFill(passwordInput, "123456789qwerty.");

        await Promise.all([
            await expect(page).toWaitAndClick("#passwordNext > div > button"),
            page.waitForNavigation({waitUntil: 'networkidle2'})
        ]);

    });
  
    test("Create an Event and Check it", async () => {        
       
        await createGoogleCalendarEventUtil.openCreateEventModal();
        
        //Fill out event Tittle
        await expect(page).toWaitAndFill("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc > div.ZX9XLb > div.mvRfff > div.rFrNMe.shdZ7e.Uj1FAb.zKHdkd > div.aCsJod.oJeWuf > div > div.Xb9hP > input", "Test CM");

        await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

        await createGoogleCalendarEventUtil.selectDate(new Date("10-15-2021"));

        await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

        await createGoogleCalendarEventUtil.selectEventTime({initial: "T000000" ,final: "T013000"});

        await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

        await createGoogleCalendarEventUtil.selectEventNotification("10 minutes");

        await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

        await createGoogleCalendarEventUtil.selectCustomNotification(
            {
                type: "Email",
                number: "35",
                period: "days"
            }
        );

        await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

        await createGoogleCalendarEventUtil.saveAndWaitSuccess();

        await createGoogleCalendarEventUtil.checkIfEventWasCreatedOnCalendar();

    });
  });
  
  