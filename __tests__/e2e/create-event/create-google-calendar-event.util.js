require("../../utils/matchers");
const jestPuppeteerConfig = require("../../jest-puppeteer.config");

async function openCreateEventModal () {
    const creatButtonXpath = "/html/body/div[2]/div[1]/div[1]/div[1]/div/div";
    // Waiting for the Create button 
    await page.waitForXPath(creatButtonXpath);

    const [createButton] = await page.$x(creatButtonXpath);

    await expect(page).toWaitAndClick(createButton);

    await page.waitForTimeout(jestPuppeteerConfig);

    // Click the Event button
    await expect(page).toWaitAndClick("div.JPdR6b.QFf4q.qjTEB > div > div > span:nth-child(1)");

    // wait for the modal to be opened
    await expect(page).toSmartWaitForSelector("html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div");
}

async function selectEventNotification (eventNotificationTime) {
    await expect(page).toWaitAndClick("#tabEvent > div > div:nth-child(7) > div.Lvl1Vd > div > div.tsUyod.XsN7kf > div > div");
        
    const [notificationBeforeEvent] = await page.$x("/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[7]/div[2]/div/div[4]/div/div[2]/div/div/ul/li/div[1]/div");
    await expect(page).toWaitAndClick(notificationBeforeEvent);

    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

    const notificationsSelector = "html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(7) > div:nth-of-type(2) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div > div > ul > li > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div";
    await expect(page).toSmartWaitForSelector(notificationsSelector);

    const notificationsNodeElements = await page.$$(notificationsSelector);
    const notificationsTimes = await page.$$(notificationsSelector + " > *:nth-child(2)");

    const notificationsTimesText = [];

    for(let notification of notificationsTimes) {
        notificationText = await page.evaluate(el => el.innerText, notification);
        //remove the last word ("before") from the string and add it to the list
        notificationsTimesText.push(notificationText.substring(0, notificationText.lastIndexOf(" ")));
    }
    
    // Create an array with objects containing event notification possible values and elements
    const notifications = notificationsTimesText.map((value, i) => {
        return {"value": value, "element": notificationsNodeElements[i]}
    });

    for(let notification of notifications) {
        // select the option the matches the chosen eventNotificationTime
        if(notification.value === eventNotificationTime) {
            await expect(page).toWaitAndClick(notification.element);
            break;
        }
    }
}

async function selectCustomNotification (customNotificationMock) {
    const [addCustomNotification] = await page.$x("/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[7]/div[2]/div/div[4]/div/div[2]/div/div/div/div/div");
    await expect(page).toWaitAndClick(addCustomNotification);

    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

    const numberOfNotifications = (await page.$$("html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(7) > div:nth-of-type(2) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div > div > ul > li > div:nth-of-type(1) > div")).length;

    const lastAddedNotification = await page.$(`html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(7) > div:nth-of-type(2) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div > div > ul > li:nth-of-type(${numberOfNotifications}) > div:nth-of-type(1) > div`);

    //Click the last added notification
    await expect(page).toWaitAndClick(lastAddedNotification);

    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);
    
    // Click custom notification line
    await expect(page).toWaitAndClick("html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(7) > div:nth-of-type(2) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div > div > ul > li > div:nth-of-type(1) > div > div:nth-of-type(2) > div:nth-of-type(7)");

    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

    await expect(page).toSmartWaitForSelector("html > body > div:nth-of-type(4) > div:nth-of-type(2) > div > div:nth-of-type(2)");

    const [notificationType] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div");
    await expect(page).toWaitAndClick(notificationType);

    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

    await expect(page).toSmartWaitForSelector("html > body > div:nth-of-type(4) > div:nth-of-type(2) > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div > div > div:nth-of-type(2)");

    if (customNotificationMock.type === "Notification") {
        const [notificationOption] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div/div[2]/div[2]");
        await expect(page).toWaitAndClick(notificationOption);
    } else if (customNotificationMock.type === "Email") {
        const [emailOption] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div/div[2]/div[1]");
        await expect(page).toWaitAndClick(emailOption);
    }

    const [periodSelector] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div");
    await expect(page).toWaitAndClick(periodSelector);

    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

    await expect(page).toSmartWaitForSelector("html > body > div:nth-of-type(4) > div:nth-of-type(2) > div > div:nth-of-type(2) > span > div > div:nth-of-type(3) > div > div > div:nth-of-type(2)");

    if (customNotificationMock.period === "minutes") {
        const [minutesSelect] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div/div[2]/div[1]");
        await expect(page).toWaitAndClick(minutesSelect);
    } else if (customNotificationMock.period === "hours") {
        const [hoursSelect] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div/div[2]/div[2]");
        await expect(page).toWaitAndClick(hoursSelect);
    } else if (customNotificationMock.period === "days") {
        const [daysSelect] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div/div[2]/div[3]");
        await expect(page).toWaitAndClick(daysSelect);
    } else if (customNotificationMock.period === "weeks") {
        const [weeksSelect] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div/div[2]/div[4]");
        await expect(page).toWaitAndClick(weeksSelect);
    }
    
    await expect(page).toWaitAndFill("html > body > div:nth-of-type(4) > div:nth-of-type(2) > div > div:nth-of-type(2) > span > div > div:nth-of-type(2) > div > label > div:nth-of-type(1) > div > input", customNotificationMock.number);

    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

    const [doneButton] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/div[3]/div[2]");
    await expect(page).toWaitAndClick(doneButton);

    // Wait for Add Custom Notification Modal to disappear
    await page.waitForFunction((_selector) => !document.querySelector(_selector), 1000, "html > body > div:nth-of-type(4) > div:nth-of-type(2) > div > div:nth-of-type(2)");
}

async function selectEventTime (time) {
    const baseTimeSelectorXpath = "html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div:nth-of-type(2)";
    const dateExtraInformationIsShown = "html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div[style*='overflow: visible;']";

    if (await page.$(dateExtraInformationIsShown) === null ) {
        await expect(page).toWaitAndClick("html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div");
    }

    if (time.initial) {
        await expect(page).toWaitAndClick(baseTimeSelectorXpath + " > div:nth-of-type(1) > div:nth-of-type(1) > div > label > div:nth-of-type(1) > div > input");

        await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

        await expect(page).toSmartWaitForSelector(baseTimeSelectorXpath + " > div:nth-of-type(1) > div:nth-of-type(2)");

        await expect(page).toWaitAndClick(`${baseTimeSelectorXpath} > div:nth-of-type(1) > div:nth-of-type(2) [data-ical=${time.initial}]`);    
    }
    
    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);
    
    if (time.final) {
        await expect(page).toWaitAndClick(baseTimeSelectorXpath + " > div:nth-of-type(2) > div:nth-of-type(1) > div > label > div:nth-of-type(1) > div > input");

        await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

        await expect(page).toSmartWaitForSelector(baseTimeSelectorXpath + " > div:nth-of-type(2) > div:nth-of-type(2)");

        await expect(page).toWaitAndClick(`${baseTimeSelectorXpath} > div:nth-of-type(2) > div:nth-of-type(2) [data-ical=${time.final}]`);
    }
}

async function selectDate (eventDate) {
    const dateExtraInformationIsShown = "html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div[style*='overflow: visible;']";

    if (await page.$(dateExtraInformationIsShown) === null ) {
        await expect(page).toWaitAndClick("html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(1) > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div");
    }

    const dateInput = "html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div > div:nth-of-type(2) > div > div:nth-of-type(1) > div:nth-of-type(1) > div > label > div:nth-of-type(1) > div > input"
    await expect(page).toWaitAndFill(dateInput, eventDate.toLocaleDateString('en-US'));

    await page.keyboard.press('Enter');
}

async function saveAndWaitSuccess () {
    [saveButton] = await page.$x("/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[2]/div[4]");
    await expect(page).toWaitAndClick(saveButton);
    
    await page.waitForTimeout(jestPuppeteerConfig.animationDelay);

    await expect(await page.$x("//div[contains(., 'Event saved')]")).not.toBeNull();
}

async function checkIfEventWasCreatedOnCalendar () {
    const moreEventsOnThisDay = "html > body > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > div > div > div > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(4) > div > div:nth-of-type(5) > div > div [data-opens-day-overview]";
    if (await page.$(moreEventsOnThisDay) !== null ) {
        console.log("i am here")
        await expect(page).toWaitAndClick(moreEventsOnThisDay);
    }
    
    const [eventCreated] = await page.$x("//span[contains(., 'Test CM 11-04-2021 4:30-17:30')]");
    await expect(eventCreated).not.toBeNull();
    
    const moreEventsOnThisDayCloseButton = "html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div";
    if (await page.$(moreEventsOnThisDay) !== null ) {
        await expect(page).toWaitAndClick(moreEventsOnThisDayCloseButton);
    }
}

module.exports = {
    selectCustomNotification,
    selectEventTime,
    selectDate,
    openCreateEventModal,
    selectEventNotification,
    saveAndWaitSuccess,
    checkIfEventWasCreatedOnCalendar
}