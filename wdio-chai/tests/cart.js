describe("Shopping Cart", () => {
  it("should add product to basket", async () => {
    await browser.url("/");

    await browser.waitUntil(async () => (await $$("a.card")).length > 0, {
      timeout: 10000,
      timeoutMsg: "Products did not load",
    });

    const firstProduct = await $("a.card");
    await firstProduct.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/product/"),
      { timeout: 10000, timeoutMsg: "Product detail page did not load" }
    );

    const addToCartBtn = await $("[data-test='add-to-cart']");
    await addToCartBtn.waitForClickable({ timeout: 10000 });
    await addToCartBtn.click();

    await browser.waitUntil(
      async () => {
        const cartBadge = await $("[data-test='cart-quantity']");
        return (
          (await cartBadge.isExisting()) && (await cartBadge.getText()) !== "0"
        );
      },
      { timeout: 10000, timeoutMsg: "Cart did not update" },
    );

    await browser
      .waitUntil(
        async () => {
          const toast = await $(".ngx-toastr, .toast");
          return !(await toast.isDisplayed());
        },
        { timeout: 5000, interval: 500 },
      )
      .catch(() => {});

    const cartIcon = await $("[data-test='nav-cart']");
    await cartIcon.waitForClickable({ timeout: 5000 });
    await cartIcon.click();

    await browser.waitUntil(async () => (await $$("tbody tr")).length > 0, {
      timeout: 10000,
      timeoutMsg: "Cart items did not load",
    });

    const cartItems = await $$("tbody tr");
    await expect(cartItems.length).toBeGreaterThan(0);

    const quantityField = await $("input[type='number']");
    await quantityField.waitForExist({ timeout: 5000 });
    await expect(quantityField).toHaveValue("1");
  });
});
