require("../utils/matchers");

describe.only("Create Google Calendar Event", () => {
    beforeAll(async () => {
    //   await page.goto(
    //     "https://www.google.com/calendar"
    //     )
        await Promise.all([
            page.goto("https://www.google.com/calendar"),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);
    });
  
    test("Create an Event", async () => {
        //await expect(page).toMatch('google');
        //if(await page.waitForXPath('//*[contains(text(), "Sign in")]')) {
            console.log('google do sign');


            await page.$eval("#identifierId", el => el.value = '');
            await page.type("#identifierId", "testeuichallenge@gmail.com");

            //await jestPuppeteer.debug();

            await expect(page).toWaitAndClick("#identifierNext > div > button");

            await page.waitForTimeout(5000);

            await expect(page).toWaitAndFill("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input", "123456789qwerty.");
            // await page.$eval("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input", el => el.value = '');
            // await page.type("#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input", "123456789qwerty.");

            await expect(page).toWaitAndClick("#passwordNext > div > button");
            
            await page.waitForTimeout(10000);

            //await expect(page).toMatch("calender");

            //await page.waitForTimeout(400);
            
            //await jestPuppeteer.debug();

//            /html/body/div[2]/div[1]/div[1]/div[1]/div/div

            const [getXpath] = await page.$x('/html/body/div[2]/div[1]/div[1]/div[1]/div/div');

            await getXpath.click();

            console.log(getXpath);
            

            //await expect(page).toWaitAndClick(getXpath);

            // await page.focus('/html/body/div[2]/div[1]/div[1]/div[1]/div/div')
            // await page.keyboard.type('\n');

            
            await page.waitForTimeout(400);

            await expect(page).toWaitAndClick("div.JPdR6b.QFf4q.qjTEB > div > div > span:nth-child(1)");

            const [event] = await page.$x('html/body/div[21]/div/div/span[1]');

            await event.click();


            //await jestPuppeteer.debug();

            
            await expect(page).toWaitAndFill("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc > div.ZX9XLb > div.mvRfff > div.rFrNMe.shdZ7e.Uj1FAb.zKHdkd > div.aCsJod.oJeWuf > div > div.Xb9hP > input", "Test CM");

            // notification = await page.$x("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc > div.ZX9XLb > div.mvRfff > div.rFrNMe.shdZ7e.Uj1FAb.zKHdkd > div.aCsJod.oJeWuf > div > div.Xb9hP > input");
            // await notification.click();
            
            // await page.waitForTimeout(400);

            // notificationTime = await page.$x("#c583 > div > div:nth-child(4) > div > div.tsUyod.XsN7kf > div > div > ul > li > div.jZ0DTb.SNlH9 > div > div:nth-child(1) > div.ry3kXd.Ulgu9 > div:nth-child(4) > div");
            // await notificationTime.click();
            
            await expect(page).toWaitAndClick("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc > div.ZX9XLb > div.mvRfff > div.rFrNMe.shdZ7e.Uj1FAb.zKHdkd > div.aCsJod.oJeWuf > div > div.Xb9hP > input");

            await page.waitForTimeout(1000);

            await expect(page).toWaitAndClick("#c583 > div > div:nth-child(4) > div > div.tsUyod.XsN7kf > div > div > ul > li > div.jZ0DTb.SNlH9 > div > div:nth-child(1) > div.ry3kXd.Ulgu9 > div:nth-child(4) > div");

            await expect(page).toWaitAndClick("#yDmH0d > div > div > div.RDlrG.Inn9w.iWO5td > span > div > div.q2nced > div.K0f0Xc.T8M5bd.cyTuMc > div.BTotkb.JaKw1 > div.uArJ5e.UQuaGc.Y5sE8d.pEVtpe.M9Bg4d");

            
            
            // const [event2] = await page.$x('/html/body/div[23]/div/div/span[1]/div[2]');

            // await event2.click();
            
            

            await page.waitForTimeout(10000);

            ///html/body/div[21]/div/div/span[1]

            //body > div.JPdR6b.QFf4q.qjTEB > div > div > span:nth-child(1)

            //body > div.JPdR6b.QFf4q.qjTEB > div > div > span:nth-child(1) > div.uyYuVb.oJeWuf

            //await expect(page).toWaitAndClick("#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div");

         //   https://calendar.google.com/calendar/
            
            
        // } else {
        //     console.log('not on sign in page');
        // }

    }, 99999999);
  });
  
  