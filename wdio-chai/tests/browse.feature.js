import { expect } from "chai";

describe("Browse Product Scenarios", () => {

  it("should search for an exact product by name", async () => {
    await browser.url("/");

    await $("[data-test='search-query']").setValue("hammer");
    await $("[data-test='search-submit']").click();

    await browser.waitUntil(
      async () => (await $$("a.card")).length > 0,
      { timeout: 10000, timeoutMsg: "Products did not load" }
    );

    const products = await $$("a.card");
    expect(products.length).to.be.greaterThan(0);
  });

  it("should filter products by category", async () => {
    await browser.url("/category/hand-tools");

    await browser.waitUntil(
      async () => (await $$("a.card")).length > 0,
      { timeout: 15000, timeoutMsg: "Products did not load on category page" }
    );

    const products = await $$("a.card");
    expect(products.length).to.be.greaterThan(0);

    const url = await browser.getUrl();
    expect(url.toLowerCase()).to.include("hand-tools");
  });

});
