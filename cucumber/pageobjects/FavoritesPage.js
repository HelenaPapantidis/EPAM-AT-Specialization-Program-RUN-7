import BasePage from './BasePage.js';

class FavoritesPage extends BasePage {

  get favoriteCard() {
    return $("app-favorites .card");
  }

  async open() {
    await super.open('/account/favorites');
  }

  async waitForPageLoad(timeout = 10000) {
    await this.waitForUrlContains("/account/favorites", timeout, "Favorites page did not load");
  }

  async waitForFavoriteCard(timeout = 10000) {
    await this.waitForElement(this.favoriteCard, timeout);
  }

  async isFavoriteCardDisplayed() {
    return await this.isElementDisplayed(this.favoriteCard);
  }
}

export default new FavoritesPage();
