import * as chai from "chai";
chai.should();

describe("Product Details Feature", () => {

  it("should display product details page with correct info", async () => {
    await browser.url("/");

    await browser.waitUntil(
      async () => (await $$("a.card")).length > 0,
      { timeout: 20000, timeoutMsg: "Products did not load" }
    );

    const firstProduct = await $("a.card");
    const cardProductName = await firstProduct.$(".card-title").getText();
    await firstProduct.click();

    await browser.waitUntil(
      async () => (await browser.getUrl()).includes("/product/"),
      { timeout: 15000, timeoutMsg: "Product detail page did not load" }
    );

    const url = await browser.getUrl();
    url.should.include("/product/");

    const productName = await $("h1");
    await productName.waitForDisplayed({ timeout: 15000 });
    const productText = await productName.getText();
    productText.should.equal(cardProductName);

    const addToCartBtn = await $("#btn-add-to-cart");
    const isExisting = await addToCartBtn.isExisting();
    isExisting.should.be.true;
    const isClickable = await addToCartBtn.isClickable();
    isClickable.should.be.true;
  });

});
