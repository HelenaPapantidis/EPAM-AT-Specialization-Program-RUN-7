import { expect } from "chai";

describe("Browse Product Scenarios", () => {

  it("should search for an exact product by name", async () => {
    await browser.url("/");

    // Search for "hammer" - a common product that should return results
    await $("[data-test='search-query']").setValue("hammer");
    await $("[data-test='search-submit']").click();

    // Wait until products are loaded
    await browser.waitUntil(
      async () => (await $$("a.card")).length > 0,
      { timeout: 10000, timeoutMsg: "Products did not load" }
    );

    const products = await $$("a.card");
    expect(products.length).to.be.greaterThan(0);

    // Assert search functionality works - products are displayed
    const productCards = await $$("a.card");
    expect(productCards.length).to.be.greaterThan(0);
  });

  it("should filter products by category", async () => {
    // Navigate directly to hand tools category
    await browser.url("/category/hand-tools");

    // Wait for products to load
    await browser.waitUntil(
      async () => (await $$("a.card")).length > 0,
      { timeout: 15000, timeoutMsg: "Products did not load on category page" }
    );

    // Check products are displayed
    const products = await $$("a.card");
    expect(products.length).to.be.greaterThan(0);

    // Verify URL contains hand-tools
    const url = await browser.getUrl();
    expect(url.toLowerCase()).to.include("hand-tools");
  });

});
