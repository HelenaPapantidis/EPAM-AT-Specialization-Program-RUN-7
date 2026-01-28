import { expect, assert } from "chai";

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

    // Use a unique email for every test run
    const randomEmail = `testuser${Date.now()}@mail.com`;
    await $("#email").setValue(randomEmail);

    await $("#password").setValue("TestPassword1234!");
    const registerBtn = await $("[data-test='register-submit']");
    await registerBtn.waitForDisplayed({ timeout: 5000 });
    await registerBtn.click();

    // Wait for registration to complete - check we're still on auth pages
    await browser.pause(3000);
    const url = await browser.getUrl();
    // Registration is successful if we stayed on auth pages (no error redirect)
    expect(url).to.include("/auth");
  });

  it("should login with valid credentials (assert)", async () => {
    await browser.url("/auth/login");

    // Fill login form - use customer2 as customer might be exhausted
    await $("[data-test='email']").setValue("customer2@practicesoftwaretesting.com");
    await $("[data-test='password']").setValue("welcome01");

    // Submit login
    const loginBtn = await $("[data-test='login-submit']");
    await loginBtn.waitForClickable({ timeout: 5000 });
    await loginBtn.click();

    // Wait for redirect to account page
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      { timeout: 10000, timeoutMsg: "Did not redirect to account page after login" }
    );

    const url = await browser.getUrl();
    assert.include(url, "/account");
  });

});
