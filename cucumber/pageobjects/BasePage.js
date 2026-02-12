export default class BasePage {

  async open(path) {
    await browser.url(path);
  }

  async waitForElement(element, timeout = 10000) {
    await element.waitForDisplayed({ timeout });
  }

  async waitForUrlContains(urlPart, timeout = 10000, errorMessage = '') {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes(urlPart),
      { timeout, timeoutMsg: errorMessage || `URL did not contain "${urlPart}" within ${timeout}ms` }
    );
  }

  async scrollAndClick(element) {
    await element.scrollIntoView();
    await element.waitForClickable();
    await element.click();
  }

  async setInputValue(element, value) {
    await element.waitForDisplayed();
    await element.setValue(value);
  }

  async clickElement(element) {
    await element.waitForClickable();
    await element.click();
  }

  async getElementText(element) {
    await element.waitForDisplayed();
    return await element.getText();
  }

  async selectByVisibleText(element, text) {
    await element.waitForDisplayed();
    await element.selectByVisibleText(text);
  }

  async isElementDisplayed(element) {
    try {
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }
}
