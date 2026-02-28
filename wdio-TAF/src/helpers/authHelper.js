import { LoginPage } from '../po/index.js';

export async function loginToAccount(email, password, { retries = 3, timeout = 20000 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    await LoginPage.open();
    await LoginPage.login(email, password);

    try {
      await browser.waitUntil(
        async () => (await browser.getUrl()).includes('/account'),
        { timeout, interval: 500 }
      );
      return;
    } catch (err) {
      lastError = err;
      await browser.pause(750);
    }
  }

  const currentUrl = await browser.getUrl();
  throw new Error(
    `Login did not redirect to /account after ${retries} attempts. Current URL: ${currentUrl}. Last error: ${lastError?.message || lastError}`
  );
}
