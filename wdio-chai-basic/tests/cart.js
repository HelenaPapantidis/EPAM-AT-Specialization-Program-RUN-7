import { expect } from "chai";

describe("Shopping Cart", () => {
  it("should add product to basket", async () => {
    await browser.url("/");

    await browser.waitUntil(async () => (await $$("a.card")).length > 0, {
      timeout: 20000,
      timeoutMsg: "Products did not load",
    });

    const firstProduct = await $("a.card");
    await firstProduct.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/product/"),
      { timeout: 15000, timeoutMsg: "Product detail page did not load" }
    );

    const addToCartBtn = await $("[data-test='add-to-cart']");
    await addToCartBtn.waitForClickable({ timeout: 15000 });
    await addToCartBtn.click();

    await browser.waitUntil(
      async () => {
        const cartBadge = await $("[data-test='cart-quantity']");
        return (
          (await cartBadge.isExisting()) && (await cartBadge.getText()) !== "0"
        );
      },
      { timeout: 15000, timeoutMsg: "Cart did not update" },
    );

    const toast = await $(".ngx-toastr, .toast");
    if (await toast.isDisplayed()) {
      await toast.waitForDisplayed({ timeout: 10000, reverse: true });
    }

    const cartIcon = await $("[data-test='nav-cart']");
    await cartIcon.waitForClickable({ timeout: 10000 });
    await cartIcon.click();

    await browser.waitUntil(async () => (await $$("tbody tr")).length > 0, {
      timeout: 30000,
      timeoutMsg: "Cart items did not load",
    });

    const cartItems = await $$("tbody tr");
    expect(cartItems.length).to.be.greaterThan(0);

    const quantityField = await $("input[type='number']");
    await quantityField.waitForExist({ timeout: 10000 });
    const quantityValue = await quantityField.getValue();
    expect(quantityValue).to.equal("1");
  });
});
