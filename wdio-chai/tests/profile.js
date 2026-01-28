import * as chai from "chai";

chai.should();

describe("Profile Scenarios", () => {

  it("should update profile information", async () => {
    // Login first
    await browser.url("/auth/login");
    await $("[data-test='email']").setValue("customer2@practicesoftwaretesting.com");
    await $("[data-test='password']").setValue("welcome01");
    await $("[data-test='login-submit']").click();

    // Wait for login to complete
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      { timeout: 10000, timeoutMsg: "Login did not complete" }
    );

    // Navigate directly to profile page
    await browser.url("/account/profile");

    // Wait for profile page to load
    const firstName = await $("#first_name");
    await firstName.waitForDisplayed({ timeout: 10000 });

    // Update first name
    await firstName.clearValue();
    await firstName.setValue("NewName");

    // Save profile - find submit button
    const saveBtn = await $("button[type='submit']");
    await saveBtn.waitForClickable({ timeout: 5000 });
    await saveBtn.click();

    // Wait for success message or toast
    await browser.pause(2000);

    // Assert updated value persists
    const updatedValue = await firstName.getValue();
    updatedValue.should.equal("NewName");
  });

});
