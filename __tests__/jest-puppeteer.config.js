const fs = require('fs');
const browserViewSize = {
    width: 1280,
    height: 720
}

/** If it is running on Mac OS */
let chromeExecutable = 'local-chrome/mac-os/Google\ Chrome.app/Contents/MacOS/Google\ Chrome';
// check if directory exists
if (!fs.existsSync(chromeExecutable)) {
    try {
        /** If it is running on Linux OS */
        chromeExecutable = `./local-chrome/linux/chrome-${require("./local-chrome/chrome.json").version}/opt/google/chrome/chrome`;
    } catch (error) {
        chromeExecutable = null;
        /** Skipping log once isn't necessary to show this info */
    }
}

module.exports = {
    launch: {
        headless: false, //process.env.HEADLESS !== 'false',
        slowMo: process.env.SLOWMO ? process.env.SLOWMO : 0,
        devtools: true,
        product: "chrome",
        /** Shows Chrome errors log */
        dumpio: true,
        devtools: false,
        ignoreHTTPSErrors: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--start-maximized", "--no-cache", "--detectOpenHandles", `--window-size=${browserViewSize.width + (browserViewSize.enableDevTools ? 480 : 0)},${browserViewSize.height + 192}`],
        defaultViewport: browserViewSize,
        executablePath: chromeExecutable,
    },
    browserContext: "incognito",
}
