import { ProductGridComponent } from "./ProductGridComponent";
import { BasePage } from './BasePage.js';

export class HomePage extends BasePage{
  
  constructor(page) {
    super(page);
    this.productGrid = new ProductGridComponent(page);
  }

async open() {
  await super.open("/");
}

  get searchInput() {
    return this.page.locator('[data-test="search-query"]');
  }

  get searchButton() {
    return this.page.getByRole("button", { name: "Search" });
  }

  async searchProduct(name) {
    await this.searchInput.fill(name);
    await this.searchButton.click();
  }

 getSearchHeading(searchTerm) {
  return this.page.getByRole("heading", {
    name: `Searched for: ${searchTerm}`,
  });
}
}
