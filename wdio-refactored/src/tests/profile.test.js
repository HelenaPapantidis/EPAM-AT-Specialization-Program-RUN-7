import { ProfilePage, HomePage, ProductDetailsPage, FavoritesPage } from '../po/index.js';
import { loginAsValidUser } from '../helpers/index.js';
import { profileData } from '../data/index.js';

describe("Profile Scenarios", () => {

  beforeEach(async () => {
    await loginAsValidUser();
  });

  it("should update profile information", async () => {
    await ProfilePage.open();
    await ProfilePage.waitForPageLoad();

    await ProfilePage.updateProfile(profileData);

    await expect(ProfilePage.successAlert).toHaveText(/Your profile is successfully updated!/);
  });

  it("should add product to favorites", async () => {
    await HomePage.open();
    await HomePage.waitForProductsToLoad();
    const expectedProductName = await HomePage.getProductCardTitle(await HomePage.firstProductCard);
    await HomePage.clickFirstProduct();
    await ProductDetailsPage.waitForPageLoad();
    await ProductDetailsPage.addToFavorites();
    await ProductDetailsPage.waitForSuccessToast();
    await ProductDetailsPage.waitForToastDisappear();

    await FavoritesPage.open();
    await FavoritesPage.waitForPageLoad();

    await FavoritesPage.waitForFavoriteCard();
    await expect(FavoritesPage.favoriteCardName).toHaveText(expectedProductName);

    await FavoritesPage.deleteFavorite();
    await expect(FavoritesPage.emptyFavoritesMessage).toHaveText(/There are no favorites yet/);
  });
});
