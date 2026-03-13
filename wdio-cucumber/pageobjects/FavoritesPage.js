import BasePage from "./BasePage.js";

class FavoritesPage extends BasePage {
  get favoriteCards() {
    return $$("[data-test*='favorite'], app-favorites .card, .app-favorites .card");
  }

  get deleteButton() {
    return $('[data-test="delete"]');
  }
  async open() {
    await super.open("/account/favorites");
  }

  async waitForPageLoad(timeout = 30000) {
    await this.waitForUrlContains("/account/favorites", timeout, "Favorites page did not load");
  }

  async waitForFavoriteCards(timeout = 60000) {
    await browser.waitUntil(async () => (await this.favoriteCards).length > 0, {
      timeout,
      interval: 500,
      timeoutMsg: "No favorite cards appeared",
    });
  }

  async hasFavorites() {
    return (await this.favoriteCards).length > 0;
  }

  async removeFromFavorites() {
    await this.deleteButton.waitForClickable({ timeout: 30000 });
    await this.deleteButton.click();
  }

  async waitForRemoval(timeout = 30000) {
    await browser.refresh();
    await browser.waitUntil(
      async () => {
        const cards = await this.favoriteCards;
        return cards.length === 0;
      },
      { timeout, interval: 1000, timeoutMsg: "Favorite card was not removed" }
    );
  }
}

export default new FavoritesPage();
