import BasePage from './BasePage.js';

class FavoritesPage extends BasePage {
  
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
    await super.open('/account/favorites');
  }

  async waitForPageLoad(timeout = 30000) {
    await browser.waitUntil(
      async () => (await browser.getUrl()).includes('/account/favorites'),
      { timeout, timeoutMsg: 'Favorites page did not load' }
    );
  }

  async waitForFavoriteCard(timeout = 30000) {
    await this.favoriteCard.waitForDisplayed({ timeout });
  }

  async isFavoriteCardDisplayed() {
    return await this.favoriteCard.isDisplayed();
  }

  async deleteFavorite() {
    await this.deleteButton.click();
  }

  async waitForEmptyMessage(timeout = 30000) {
    await browser.waitUntil(
      async () => {
        const pageText = await this.emptyFavoritesMessage;
        const text = await pageText.getText();
        return text.includes("There are no favorites yet");
      },
      { timeout, timeoutMsg: "Empty favorites message did not appear" }
    );
  }
}

export default new FavoritesPage();
