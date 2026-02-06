import ProfilePage from '../po/ProfilePage.js';
import HomePage from '../po/HomePage.js';
import ProductDetailsPage from '../po/ProductDetailsPage.js';
import FavoritesPage from '../po/FavoritesPage.js';
import { loginAsValidUser } from '../helpers/testHelpers.js';

describe("Profile Scenarios", () => {

  it("should update profile information", async () => {
    await loginAsValidUser();
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
    await loginAsValidUser();
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
