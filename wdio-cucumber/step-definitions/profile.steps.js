import { When, Then } from "@wdio/cucumber-framework";
import { HomePage, ProductDetailsPage, ProfilePage, FavoritesPage } from "../pageobjects/index.js";
import { profileUpdateData } from "../utils/profileData.js";

// Profile update scenario steps
When("the user navigates to the profile page", async () => {
  await ProfilePage.open();
  await ProfilePage.waitForPageLoad();
});

When("the user updates the address fields with new values", async () => {
  await ProfilePage.updateFields(profileUpdateData);
});

When("the user clicks the save button", async () => {
  await ProfilePage.submitProfile();
});

Then("the profile form should contain the updated values", async () => {
  await expect(ProfilePage.phoneInput).toHaveValue(profileUpdateData.phone);
  await expect(ProfilePage.streetInput).toHaveValue(profileUpdateData.street);
  await expect(ProfilePage.postalCodeInput).toHaveValue(profileUpdateData.postalCode);
  await expect(ProfilePage.cityInput).toHaveValue(profileUpdateData.city);
  await expect(ProfilePage.stateInput).toHaveValue(profileUpdateData.state);
});

// Favorite products scenario steps
When("the user opens a product from the homepage", async () => {
  await HomePage.open();
  await HomePage.clickFirstProduct();
});

When("the user clicks the favorite icon on the product page", async () => {
  await ProductDetailsPage.addToFavorites();
});

Then("the product should be added to favorites", async () => {
  await FavoritesPage.open();
  await FavoritesPage.waitForPageLoad();
  await FavoritesPage.waitForFavoriteCards();
  expect(await FavoritesPage.hasFavorites()).toBe(true);
});

When("the user removes the product from favorites", async () => {
  await FavoritesPage.removeFromFavorites();
});

Then("the favorites list should be empty", async () => {
  await FavoritesPage.waitForRemoval();
  expect(await FavoritesPage.hasFavorites()).toBe(false);
});
