import { Before, After } from "@wdio/cucumber-framework";
import { LoginPage } from "../pageobjects/index.js";

Before({ tags: "@auth" }, async () => {
  await browser.deleteCookies();
  await LoginPage.open();

  const email = process.env.TEST_USER_EMAIL || "customer@practicesoftwaretesting.com";
  const password = process.env.TEST_USER_PASSWORD || "welcome01";

  await LoginPage.emailInput.waitForDisplayed({ timeout: 30000 });
  await LoginPage.login(email, password);
  await browser.url("/account");

  await browser.waitUntil(async () => (await browser.getUrl()).includes("/account"), {
    timeout: 30000,
    timeoutMsg: "Not authenticated after login",
  });
});

After({ tags: "@auth" }, async () => {
  await browser.deleteCookies();
});
