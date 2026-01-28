import * as chai from "chai";
chai.should();

describe("Product Details Feature", () => {

  it("should display product details page with correct info", async () => {
    // Navigate directly to a known product (Combination Pliers)
    await browser.url("/product/01KG2ZMEW4EP9YQ4HAKCN0RG4S");

    // Wait for page to fully load
    await browser.pause(5000);

    // URL should contain /product/
    const url = await browser.getUrl();
    url.should.include("/product/");

    // Product name should be visible (data-test='product-name')
    const productName = await $("[data-test='product-name']");
    await productName.waitForExist({ timeout: 15000 });
    await productName.waitForDisplayed({ timeout: 15000 });
    const nameText = await productName.getText();
    nameText.length.should.be.greaterThan(0);

    // Add to cart button should exist (id='btn-add-to-cart')
    const addToCartBtn = await $("#btn-add-to-cart");
    await addToCartBtn.waitForExist({ timeout: 15000 });
    const isDisplayed = await addToCartBtn.isDisplayed();
    isDisplayed.should.be.true;
  });

});
