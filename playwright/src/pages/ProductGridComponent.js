import { BasePage } from "./BasePage.js";
import { expect } from "@playwright/test";

export class ProductGridComponent extends BasePage {
  constructor(page) {
    super(page);
  }

  get products() {
    return this.page.locator('a[href^="/product/"]');
  }

 async waitUntilLoaded() {
  try {
    await expect(this.products.first()).toBeVisible({
      timeout: 20000
    });
  } catch (error) {
    console.warn("Grid did not load. Refreshing page...");
    await this.page.reload({ waitUntil: "domcontentloaded" });

    await expect(this.products.first()).toBeVisible({
      timeout: 30000
    });
  }
}

  async openFirstProduct() {
    const firstProduct = this.products.first();

    await expect(firstProduct).toBeVisible({ timeout: 30000 });

    await Promise.all([this.page.waitForURL(/product/), firstProduct.click()]);
  }

  async getFirstProductName() {
    return await this.products.first().locator("h5").innerText();
  }
}
