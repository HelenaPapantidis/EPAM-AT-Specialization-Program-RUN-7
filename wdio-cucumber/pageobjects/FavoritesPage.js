import BasePage from './BasePage.js';

class FavoritesPage extends BasePage {

  get favoriteCard() {
    return $("[data-test='favorite-1'], app-favorites .card, .app-favorites .card");
  }

  async open() {
    await super.open('/account/favorites');
  }

  async waitForPageLoad(timeout = 30000) {
    await this.waitForUrlContains("/account/favorites", timeout, "Favorites page did not load");
  }

  async waitForFavoriteCard(timeout = 30000) {
    await this.waitForElement(this.favoriteCard, timeout);
  }

  async isFavoriteCardDisplayed() {
    return await this.isElementDisplayed(this.favoriteCard);
  }
}

export default new FavoritesPage();
