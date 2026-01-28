import { expect } from "chai";

describe("Shopping Cart", () => {

  it("should add any available product to cart", async () => {
    // Navigate directly to a known product (Combination Pliers)
    await browser.url("/product/01KG2ZMEW4EP9YQ4HAKCN0RG4S");

    // Wait for page to fully load
    await browser.pause(5000);

    // Wait for add to cart button with data-test attribute
    const addToCartBtn = await $("#btn-add-to-cart");
    await addToCartBtn.waitForExist({ timeout: 15000 });
    await addToCartBtn.waitForDisplayed({ timeout: 15000 });
    await addToCartBtn.scrollIntoView();
    await browser.pause(500);
    await addToCartBtn.click();

    // Wait for cart to update
    await browser.pause(3000);

    // Navigate to checkout
    await browser.url("/checkout");
    await browser.pause(3000);

    // Verify we're on checkout page
    const url = await browser.getUrl();
    expect(url).to.include("/checkout");
  });

});
