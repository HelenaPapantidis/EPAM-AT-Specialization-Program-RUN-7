/**
 * Base Page Object containing common methods for all pages
 */
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
      {
        timeout,
        timeoutMsg: errorMessage || `URL did not contain ${urlPart} within ${timeout}ms`
      }
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

  async waitForClickable(element, timeout = 10000) {
    await element.waitForClickable({ timeout });
  }

  async getCurrentUrl() {
    return await browser.getUrl();
  }

  async waitForElements(selector, timeout = 10000, errorMessage = '') {
    await browser.waitUntil(
      async () => {
        const elements = await $$(selector);
        return elements.length > 0;
      },
      {
        timeout,
        timeoutMsg: errorMessage || `Elements ${selector} did not load within ${timeout}ms`
      }
    );
  }

  async isElementDisplayed(element) {
    try {
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }

  async waitForToastToDisappear(selector = '.ngx-toastr, .toast', timeout = 5000) {
    await browser.waitUntil(
      async () => {
        const toast = await $(selector);
        return !(await toast.isDisplayed());
      },
      { timeout, interval: 500 }
    ).catch(() => { });
  }


}
