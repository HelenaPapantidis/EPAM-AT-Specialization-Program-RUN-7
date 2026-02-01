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
      { timeout: 10000, timeoutMsg: "Login did not complete" },
    );

    await browser.url("/account/profile");

    const firstName = await $("[data-test='first-name']");
    await firstName.waitForDisplayed({ timeout: 10000 });

    await $("[data-test='first-name']").setValue("NewName");
    await $("[data-test='last-name']").setValue("TestLastName");
    await $("[data-test='phone']").setValue("1234567890");
    await $("[data-test='street']").setValue("123 Test Street");

    const saveBtn = await $("button[type='submit']");
    await saveBtn.scrollIntoView();
    await saveBtn.waitForClickable({ timeout: 5000 });
    await saveBtn.click();

    const successAlert = await $(".alert.alert-success");
    await successAlert.waitForDisplayed({ timeout: 5000 });
    await expect(successAlert).toBeDisplayed();
  });

  it("should add product to favorites", async () => {
    await browser.url("/auth/login");
    await $("[data-test='email']").setValue(
      "customer2@practicesoftwaretesting.com",
    );
    await $("[data-test='password']").setValue("welcome01");
    await $("[data-test='login-submit']").click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account"),
      { timeout: 10000, timeoutMsg: "Login did not complete" },
    );

    await browser.url("/");

    await browser.waitUntil(async () => (await $$("a.card")).length > 0, {
      timeout: 10000,
      timeoutMsg: "Products did not load",
    });

    const firstProduct = await $("a.card");
    await firstProduct.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/product/"),
      { timeout: 10000, timeoutMsg: "Product page did not load" },
    );

    const favoriteIcon = await $("[data-test='add-to-favorites']");
    await favoriteIcon.waitForDisplayed({ timeout: 10000 });
    await favoriteIcon.scrollIntoView();
    await favoriteIcon.click();

    const toast = await $(".toast-success");
    await toast.waitForDisplayed({ timeout: 5000 });

    await browser
      .waitUntil(async () => !(await toast.isDisplayed()), {
        timeout: 5000,
        interval: 500,
      })
      .catch(() => {});

    await browser.url("/account/favorites");

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/account/favorites"),
      { timeout: 10000, timeoutMsg: "Favorites page did not load" },
    );

    const favoriteCard = await $("app-favorites .card");
    await favoriteCard.waitForDisplayed({ timeout: 10000 });
    await expect(favoriteCard).toBeDisplayed();

    const deleteBtn = await $("[data-test='delete']");
    await deleteBtn.waitForClickable({ timeout: 5000 });
    await deleteBtn.click();

    await browser.waitUntil(
      async () => {
        const pageText = await $("[data-test='page-title']").parentElement();
        const text = await pageText.getText();
        return text.includes("There are no favorites yet");
      },
      { timeout: 5000, timeoutMsg: "Empty favorites message did not appear" },
    );
  });
});
