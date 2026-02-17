import BasePage from "./BasePage.js";

class CartPage extends BasePage {
  get cartRows() {
    return $$("tbody tr");
  }

  async open() {
    await super.open("/checkout");
  }
}

export default new CartPage();
