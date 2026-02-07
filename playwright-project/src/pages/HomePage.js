import { ProductGridComponent } from "./ProductGridComponent";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.productGrid = new ProductGridComponent(page);
  }

  async open() {
    await this.page.goto("/");
  }

  async searchProduct(name) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

  async verifySearchHeading(searchTerm) {
    const heading = this.page.getByRole("heading", {
      name: `Searched for: ${searchTerm}`,
    });
    await heading.waitFor({ state: "visible" });
  }
}
