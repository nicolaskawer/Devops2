const { Builder, By, Capabilities, until } = require('selenium-webdriver');
import('chai').then(({ expect }) => {
  async function registerTest(browser) {
    let driver;
    let firefoxCapabilities = Capabilities.firefox();

    if (browser === 'chrome') {
      driver = await new Builder()
        .usingServer('http://localhost:4444/wd/hub')
        .forBrowser('chrome')
        .build();
    } else if (browser === 'firefox') {
      driver = await new Builder()
        .forBrowser('firefox')
        .usingWebDriverProxy('http://localhost:4444/wd/hub')
        .withCapabilities(firefoxCapabilities)
        .build();
    } else {
      console.log("Unsupported browser.");
      return;
    }

    try {
      // Navigate to registration page
      await driver.get('http://localhost:3000');

      // Fill registration form
      await driver.findElement(By.id('firstName')).sendKeys('Hadar');
      await driver.findElement(By.id('lastName')).sendKeys('Hey');
      await driver.findElement(By.id('idCard')).sendKeys('000000000');
      await driver.findElement(By.id('password')).sendKeys('88878');
      await driver.findElement(By.id('role')).sendKeys('Student');

      // Submit the form
      await driver.findElement(By.css('button[type="submit"]')).click();

      await driver.sleep(3000);
    }
    catch (error) {
      console.error("An error occurred:", error);
    } finally {
      await driver.quit();
    }
  }

  async function runTests() {
    // Run tests in Chrome
    console.log("Running registration test in Chrome...");
    await registerTest('chrome');

    // Run tests in Firefox
    console.log("Running registration test in Firefox...");
    await registerTest('firefox');

    console.log("All registration tests completed.");
  }

  runTests();
}); 
