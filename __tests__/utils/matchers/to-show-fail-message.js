module.exports = 
  expect.extend({
    toShowFailMessage(received, expected, message) {
      if (received === expected) {
        return {
          pass: true,
          message: () => message,
        }
      } else {
        return {
          pass: false,
          message: () => message
        }
      }
    }
  });

