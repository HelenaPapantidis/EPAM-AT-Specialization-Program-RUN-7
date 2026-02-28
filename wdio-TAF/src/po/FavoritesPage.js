import BasePage from "./BasePage.js";

class FavoritesPage extends BasePage {
  
  get favoriteCards() {
    return $$("app-favorites .card");
  }

  get favoriteCard() {
    return $("app-favorites .card");
  }

  get favoriteCardName() {
    return $("app-favorites .card [data-test='product-name']");
  }

  get deleteButton() {
    return $("[data-test='delete']");
  }

  get pageTitle() {
    return $("[data-test='page-title']");
  }

  get emptyFavoritesMessage() {
    return this.pageTitle.parentElement();
  }

  async open() {
    await super.open("/account/favorites");
  }

  async waitForPageLoad(timeout = 30000) {
    await browser.waitUntil(async () => (await browser.getUrl()).includes("/account/favorites"), {
      timeout,
      timeoutMsg: "Favorites page did not load",
    });
  }

  async waitForAnyFavorite(timeout = 60000) {
    await browser.waitUntil(
      async () => (await this.favoriteCards).length > 0,
      { timeout, interval: 500, timeoutMsg: 'No favorites appeared' }
    );
  }

  async removeFirstFavorite(timeout = 20000) {
    const cards = await this.favoriteCards;
    if (cards.length === 0) return;

    const firstCard = cards[0];
    const deleteBtn = await firstCard.$("[data-test='delete']");
    await deleteBtn.waitForClickable({ timeout: 10000 });
    await deleteBtn.click();

    await browser.waitUntil(
      async () => (await this.favoriteCards).length < cards.length,
      { timeout, interval: 500, timeoutMsg: 'Favorite was not removed' }
    );
  }
}

export default new FavoritesPage();
