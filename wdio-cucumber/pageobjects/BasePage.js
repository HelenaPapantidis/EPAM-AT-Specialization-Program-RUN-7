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

  async pollWithRetry(conditionFn, timeoutMsg = "Condition not met") {
    let refreshed = false;
    await browser.waitUntil(
      async () => {
        const result = await conditionFn();
        if (!result && !refreshed) {
          await browser.refresh();
          refreshed = true;
          return false;
        }
        return result;
      },
      { timeout: DEFAULT_TIMEOUT * 2, interval: 2000, timeoutMsg }
    );
  }
}
