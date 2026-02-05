import BasePage from './BasePage.js';


class FavoritesPage extends BasePage {
  
  get favoriteCard() {
    return $("app-favorites .card");
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

  //////////////////////////////////////////////////////////////

  async open() {
    await super.open('/account/favorites');
  }

  
  async waitForPageLoad(timeout = 10000) {
    await this.waitForUrlContains(
      "/account/favorites",
      timeout,
      "Favorites page did not load"
    );
  }

  
  async waitForFavoriteCard(timeout = 10000) {
    await this.waitForElement(this.favoriteCard, timeout);
  }

  async isFavoriteCardDisplayed() {
    return await this.isElementDisplayed(this.favoriteCard);
  }

  
  async deleteFavorite() {
    await this.clickElement(this.deleteButton);
  }

  async waitForEmptyMessage(timeout = 5000) {
    await browser.waitUntil(
      async () => {
        const pageText = await this.emptyFavoritesMessage;
        const text = await pageText.getText();
        return text.includes("There are no favorites yet");
      },
      { timeout, timeoutMsg: "Empty favorites message did not appear" }
    );
  }

  
  async isEmpty() {
    const text = await this.getElementText(this.emptyFavoritesMessage);
    return text.includes("There are no favorites yet");
  }
}

export default new FavoritesPage();
