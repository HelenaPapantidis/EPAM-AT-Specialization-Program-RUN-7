import { expect } from "chai";

describe("Profile Scenarios", () => {
  it("should update profile information", async () => {
    await browser.url("/auth/login");
    await $("[data-test='email']").setValue(
      "customer2@practicesoftwaretesting.com",
    );
    await $("[data-test='password']").setValue("welcome01");
    await $("[data-test='login-submit']").click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      { timeout: 20000, timeoutMsg: "Login did not complete" },
    );

    await browser.url("/account/profile");

    const firstName = await $("[data-test='first-name']");
    await firstName.waitForDisplayed({ timeout: 15000 });

    await $("[data-test='first-name']").setValue("NewName");
    await $("[data-test='last-name']").setValue("TestLastName");
    await $("[data-test='phone']").setValue("1234567890");
    await $("[data-test='street']").setValue("123 Test Street");

    const saveBtn = await $("button[type='submit']");
    await saveBtn.scrollIntoView();
    await saveBtn.waitForClickable({ timeout: 20000 });
    await saveBtn.click();

    const successAlert = await $(".alert.alert-success");
    await successAlert.waitForDisplayed({ timeout: 15000 });
    expect(await successAlert.isDisplayed()).to.be.true;
  });

  it("should add product to favorites and remove from favorites", async () => {
    await browser.url("/auth/login");
    await $("[data-test='email']").setValue(
      "customer2@practicesoftwaretesting.com",
    );
    await $("[data-test='password']").setValue("welcome01");
    await $("[data-test='login-submit']").click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      { timeout: 20000, timeoutMsg: "Login did not complete" },
    );

    await browser.url("/");

    await browser.waitUntil(async () => (await $$("a.card")).length > 0, {
      timeout: 20000,
      timeoutMsg: "Products did not load",
    });

    const firstProduct = await $("a.card");
    await firstProduct.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/product/"),
      { timeout: 15000, timeoutMsg: "Product page did not load" },
    );

    const favoriteIcon = await $("[data-test='add-to-favorites']");
    await favoriteIcon.waitForDisplayed({ timeout: 15000 });
    await favoriteIcon.scrollIntoView();
    await favoriteIcon.click();

    const toast = await $(".toast-success");
    await toast.waitForDisplayed({ timeout: 10000 });

    if (await toast.isDisplayed()) {
      await toast.waitForDisplayed({ timeout: 10000, reverse: true });
    }

    await browser.url("/account/favorites");

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account/favorites"),
      { timeout: 15000, timeoutMsg: "Favorites page did not load" },
    );

    const favoriteCard = await $("app-favorites .card");
    await favoriteCard.waitForDisplayed({ timeout: 15000 });
    expect(await favoriteCard.isDisplayed()).to.be.true;

    const deleteBtn = await $("[data-test='delete']");
    await deleteBtn.waitForClickable({ timeout: 10000 });
    await deleteBtn.click();

    const noFavoritesMsg = await $("div*=There are no favorites yet");
    await noFavoritesMsg.waitForDisplayed({ timeout: 10000 });
    expect(await noFavoritesMsg.isDisplayed()).to.be.true;
  });
});
