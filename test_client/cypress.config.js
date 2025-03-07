const { defineConfig } = require('cypress')
module.exports = defineConfig({
    e2e: {
        defaultBrowser: 'chrome',
        supportFile: false,
        specPattern: 'cypress/**/*.cy.js',
        screenshotOnRunFailure: true,
        screenshotsFolder: 'reports/screenshots',
        video: false,
        chromeWebSecurity: false,
        reporter: 'junit',
        reporterOptions: {
            mochaFile: 'reports/junit-[hash].xml'
        },
    }
})