require("../utils/matchers");

async function selectCustomNotification (customNotificationMock) {
    custonNotification = {
        type: "Notificaton" || "Email",
        number: "45",
        period: "minutes" || "hours" || "days" || "weeks"
    }

    const [addCustomNotification] = await page.$x("/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[7]/div[2]/div/div[4]/div/div[2]/div/div/div/div/div");
    await expect(page).toWaitAndClick(addCustomNotification);

    await page.waitForTimeout(400);

    const numberOfNotifications = (await page.$$("html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(7) > div:nth-of-type(2) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div > div > ul > li > div:nth-of-type(1) > div")).length;

    const lastAddedNotification = await page.$(`html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(7) > div:nth-of-type(2) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div > div > ul > li:nth-of-type(${numberOfNotifications}) > div:nth-of-type(1) > div`);

    //Click the last added notification
    await expect(page).toWaitAndClick(lastAddedNotification);

    await page.waitForTimeout(400);

    const [addCustom] = await page.$x("/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[7]/div[2]/div/div[4]/div/div[2]/div/div/ul/li[2]/div[1]/div/div[2]/div[7]");
    await expect(page).toWaitAndClick(addCustom);

    await page.waitForTimeout(400);

    const [notificationType] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div");
    await expect(page).toWaitAndClick(notificationType);

    await page.waitForTimeout(400);

    if (customNotificationMock.type === "Notification") {
        const [notificationOption] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div/div[2]/div[2]");
        await expect(page).toWaitAndClick(notificationOption);
    } else if (customNotificationMock.type === "Email") {
        const [emailOption] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div/div[2]/div[1]");
        await expect(page).toWaitAndClick(emailOption);
    }

    await page.waitForTimeout(400);

    await expect(page).toWaitAndFill("html > body > div:nth-of-type(4) > div:nth-of-type(2) > div > div:nth-of-type(2) > span > div > div:nth-of-type(2) > div > label > div:nth-of-type(1) > div > input", customNotificationMock.number);

    await page.waitForTimeout(400);

    const [periodSelector] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div");
    await expect(page).toWaitAndClick(periodSelector);

    await page.waitForTimeout(400);

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

    await page.waitForTimeout(400);

    const [doneButton] = await page.$x("/html/body/div[4]/div[2]/div/div[2]/div[3]/div[2]");
    await expect(page).toWaitAndClick(doneButton);

    // Wait for Add Custom Notification Modal to disappear
    await page.waitForFunction((_selector) => !document.querySelector(_selector), 1000, "html > body > div:nth-of-type(4) > div:nth-of-type(2) > div > div:nth-of-type(2)");
}

module.exports = {
    selectCustomNotification
}

    

    //get the lenth of this
    // html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(7) > div:nth-of-type(2) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div > div > ul > li > div:nth-of-type(1) > div
    
    //time notification selectors
    //html > body > div:nth-of-type(4) > div > div > div:nth-of-type(2) > span > div > div:nth-of-type(1) > div:nth-of-type(3) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(2) > span:nth-of-type(1) > div > div:nth-of-type(7) > div:nth-of-type(2) > div > div:nth-of-type(4) > div > div:nth-of-type(2) > div > div > ul > li:nth-of-type(1) > div:nth-of-type(1) > div

    // add custom notification
    // /html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[7]/div[2]/div/div[4]/div/div[2]/div/div/div/div/div

    //custom notification
    // /html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[7]/div[2]/div/div[4]/div/div[2]/div/div/ul/li[4]/div[1]/div/div[2]/div[7]

    //notifiation types
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div

    // email option
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div/div[2]/div[1]

    // notification option
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[1]/div/div/div[2]/div[2]

    // notificationnumber input
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[2]/div/label/div[1]/div/input

    // period notification selector
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div

    // period notification options selectors 
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div/div[2]/div[1]
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div/div[2]/div[2]
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div/div[2]/div[3]
    // /html/body/div[4]/div[2]/div/div[2]/span/div/div[3]/div/div/div[2]/div[4]

    // notification done button
    // /html/body/div[4]/div[2]/div/div[2]/div[3]/div[2]

// await expect(page).toWaitAndFill("#identifierId", "testeuichallenge@gmail.com");

// await expect(page).toWaitAndClick(createButton);

// await expect(page).toSmartWaitForSelector(notificationsSelector);

// await page.waitForTimeout(400);