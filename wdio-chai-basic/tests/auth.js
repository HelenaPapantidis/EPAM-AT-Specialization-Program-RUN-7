import { assert } from "chai";

describe("Auth Scenarios", () => {

  it("should register a new user", async () => {
    await browser.url("/auth/login");
    await $("[data-test='register-link']").click();
    await $("[data-test='first-name']").setValue("Test");
    await $("[data-test='last-name']").setValue("User");
    await $("#dob").setValue("1990-01-01");
    await $("[data-test='street']").setValue("123 Test St");
    await $("#postal_code").setValue("12345");

    await $("[data-test='city']").setValue("New York");
    await $("[data-test='state']").setValue("Minnesota");
    await $("#country").selectByVisibleText("Serbia");
    await $("#phone").setValue("1234567890");

    const randomEmail = `testuser${Date.now()}@mail.com`;
    await $("#email").setValue(randomEmail);

    await $("#password").setValue("TestPassword1234!");
    const registerBtn = await $("[data-test='register-submit']");
    await registerBtn.waitForDisplayed({ timeout: 15000 });
    await registerBtn.click();

    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl.includes("/auth") || currentUrl.includes("/account");
    }, {
      timeout: 20000,
      timeoutMsg: 'Registration did not complete in time'
    });

    const url = await browser.getUrl();
    assert.match(url, /\/(auth|account)/, "URL should contain /auth or /account");
  });

  it("should login with valid credentials (assert)", async () => {
    await browser.url("/auth/login");

    await $("[data-test='email']").setValue("customer2@practicesoftwaretesting.com");
    await $("[data-test='password']").setValue("welcome01");

    const loginBtn = await $("[data-test='login-submit']");
    await loginBtn.waitForClickable({ timeout: 15000 });
    await loginBtn.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      { timeout: 20000, timeoutMsg: "Did not redirect to account page after login" }
    );

    const url = await browser.getUrl();
    assert.include(url, "/account", "URL should contain /account after login");
  });

});
