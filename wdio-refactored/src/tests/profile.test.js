import { ProfilePage, HomePage, ProductDetailsPage, FavoritesPage } from '../po/index.js';
import { loginAsValidUser } from '../helpers/index.js';

describe("Profile Scenarios", () => {

  beforeEach(async () => {
    await loginAsValidUser();
  });

  it("should update profile information", async () => {
    await ProfilePage.open();
    await ProfilePage.waitForPageLoad();

    await ProfilePage.updateProfile({
      firstName: "NewName",
      lastName: "TestLastName",
      phone: "1234567890",
      street: "123 Test Street",
      postalCode: "12345",
      city: "TestCity"
    });

    await expect(ProfilePage.successAlert).toBeDisplayed();
    const alertText = await ProfilePage.successAlert.getText();
    await expect(alertText).toContain("Your profile is successfully updated!");
  });

  it("should add product to favorites", async () => {
    await HomePage.open();
    await HomePage.clickFirstProduct();
    await ProductDetailsPage.waitForPageLoad();
    await ProductDetailsPage.addToFavorites();
    await ProductDetailsPage.waitForSuccessToast();
    await ProductDetailsPage.waitForToastDisappear();

    await FavoritesPage.open();
    await FavoritesPage.waitForPageLoad();

    await FavoritesPage.waitForFavoriteCard();
    const isFavoriteDisplayed = await FavoritesPage.isFavoriteCardDisplayed();
    await expect(isFavoriteDisplayed).toBe(true);

    await FavoritesPage.deleteFavorite();
    await FavoritesPage.waitForEmptyMessage();
  });
});
