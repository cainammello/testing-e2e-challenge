// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  preset: "jest-puppeteer",
  globals: {
      URL: "http://localhost:8080"
    },
    testMatch: [
      "**/__tests__/**/*.test.js"
    ],
    verbose: true,
    testTimeout: 300000,
    maxWorkers: 2
};
  
module.exports = config;
  
  // Or async function
  module.exports = async () => {
    return {
        preset: "jest-puppeteer",
        globals: {
          URL: "http://localhost:8080"
        },
        testMatch: [
          "**/__tests__/**/*.test.js"
        ],
        verbose: true,
        testTimeout: 30000,
        maxWorkers: 2
    };
};