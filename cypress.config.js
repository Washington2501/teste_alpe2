const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    env: {
      BASE_URL: 'https://api.escuelajs.co/api/v1',
      supportFile: 'cypress/support/e2e.js'
      // implement node event listeners here
    }
  },
});
