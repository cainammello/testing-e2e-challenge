require("../utils/matchers");
const createGoogleCalendarEventUtil = require("./create-google-calendar-event.util.js");

describe.only("Create Google Calendar Event", () => {
    beforeAll(async () => {
    //   await page.goto(
    //     "https://www.google.com/calendar"
    //     )
        await Promise.all([
            page.goto("https://www.google.com/calendar"),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        // Waiting for the email input to make sure we are in the right page
        await expect(page).toSmartWaitForSelector("#identifierId");

    });
  
    test("Create an Event", async () => {        
        console.log('google do sign');

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
        
        const creatButtonXpath = "/html/body/div[2]/div[1]/div[1]/div[1]/div/div";
        // Waiting for the Create button 
        await page.waitForXPath(creatButtonXpath);

        const [createButton] = await page.$x(creatButtonXpath);
    
        // await jestPuppeteer.debug();

        await expect(page).toWaitAndClick(createButton);


        //await createButton.click();
        //console.log("----> createButton", createButton);
        
        
        await page.waitForTimeout(400);

        // Click the Event button
        await expect(page).toWaitAndClick("div.JPdR6b.QFf4q.qjTEB > div > div > span:nth-child(1)");

        // const [event] = await page.$x('html/body/div[21]/div/div/span[1]');

        // await event.click();


        //await jestPuppeteer.debug();

        //Fill out event Tittle
        await expect(page).toWaitAndFill("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc > div.ZX9XLb > div.mvRfff > div.rFrNMe.shdZ7e.Uj1FAb.zKHdkd > div.aCsJod.oJeWuf > div > div.Xb9hP > input", "Test CM");

        // notification = await page.$x("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc > div.ZX9XLb > div.mvRfff > div.rFrNMe.shdZ7e.Uj1FAb.zKHdkd > div.aCsJod.oJeWuf > div > div.Xb9hP > input");
        // await notification.click();
        
        // await page.waitForTimeout(400);

        // notificationTime = await page.$x("#c583 > div > div:nth-child(4) > div > div.tsUyod.XsN7kf > div > div > ul > li > div.jZ0DTb.SNlH9 > div > div:nth-child(1) > div.ry3kXd.Ulgu9 > div:nth-child(4) > div");
        // await notificationTime.click();
        
        await expect(page).toWaitAndClick("#tabEvent > div > div:nth-child(7) > div.Lvl1Vd > div > div.tsUyod.XsN7kf > div > div");

        
        
        const [notificationBeforeEvent] = await page.$x("/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[1]/div[2]/div[2]/span[1]/div/div[7]/div[2]/div/div[4]/div/div[2]/div/div/ul/li/div[1]/div");

        

        await expect(page).toWaitAndClick(notificationBeforeEvent);

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
        
        const notifications = notificationsTimesText.map((value, i) => {
            return {"value": value, "element": notificationsNodeElements[i]}
        });

        for(let notification of notifications) {
            if(notification.value === "15 minutes") {
                await expect(page).toWaitAndClick(notification.element);
                break;
            }
        }

        await page.waitForTimeout(400);

        await createGoogleCalendarEventUtil.selectCustomNotification(
            custonNotification = {
                type: "Email",
                number: "35",
                period: "days"
            }
        );

        await page.waitForTimeout(400);

        [saveButton] = await page.$x("/html/body/div[4]/div/div/div[2]/span/div/div[1]/div[3]/div[2]/div[4]");
        await expect(page).toWaitAndClick(saveButton);

        // try {
            
        // } catch (error) {
        //     console.error("Expected " + saveButton + " to be" + "To be Clicked, but it didn't.");
        // }
          

      //  await page.waitForTimeout(1000);
        
        // Wait for the save modal. If it won't shown up, the test will fail

        // await page.waitForFunction(
        //     'document.querySelector("body").innerText.includes("Event saved")'
        // );

        //await page.waitForXPath('//*[contains(text(), "Event saved")]');

        //await page.waitForTimeout(10000);

        //await jestPuppeteer.debug();

        // await expect(page).toWaitAndClick("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc > div.ZX9XLb > div.mvRfff > div.rFrNMe.shdZ7e.Uj1FAb.zKHdkd > div.aCsJod.oJeWuf > div > div.Xb9hP > input");

        // await page.waitForTimeout(1000);

        // await expect(page).toWaitAndClick("#c583 > div > div:nth-child(4) > div > div.tsUyod.XsN7kf > div > div > ul > li > div.jZ0DTb.SNlH9 > div > div:nth-child(1) > div.ry3kXd.Ulgu9 > div:nth-child(4) > div");

        // await expect(page).toWaitAndClick("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc.T8M5bd.cyTuMc > div.BTotkb.JaKw1 > div.uArJ5e.UQuaGc.Y5sE8d.pEVtpe.M9Bg4d");

        

    });
  });
  
  