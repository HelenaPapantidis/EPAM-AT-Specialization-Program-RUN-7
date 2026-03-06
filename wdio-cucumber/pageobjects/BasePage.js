const DEFAULT_TIMEOUT = 30000;

export default class BasePage {
  async open(path) {
    await browser.url(path);
  }

  async waitForUrlContains(urlPart, timeout = DEFAULT_TIMEOUT, errorMessage = "") {
    await browser.waitUntil(async () => (await browser.getUrl()).includes(urlPart), {
      timeout,
      timeoutMsg: errorMessage || `URL did not contain "${urlPart}" within ${timeout}ms`,
    });
  }

  async scrollAndClick(element) {
    await element.scrollIntoView();
    await element.waitForClickable({ timeout: DEFAULT_TIMEOUT });
    await element.click();
  }
}
