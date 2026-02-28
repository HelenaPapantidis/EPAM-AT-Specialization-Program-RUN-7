import { When, Then } from '@wdio/cucumber-framework';
import { HomePage, ProductDetailsPage, ProfilePage, FavoritesPage } from '../pageobjects/index.js';
import { buildProfileUpdateData } from '../utils/profileData.js';

const state = {};

When('the user navigates to the profile page', async () => {
  await ProfilePage.open();
  await ProfilePage.waitForPageLoad();
});

When('the user updates the first name field with new value', async () => {
  const data = buildProfileUpdateData();
  state.updatedFirstName = data.firstName;
  await ProfilePage.updateProfile({ firstName: state.updatedFirstName });
});

When('the user clicks the save button', async () => {
  await ProfilePage.scrollAndClick(ProfilePage.updateProfileButton);
});

When('the user opens a product from the homepage', async () => {
  await HomePage.open();
  await HomePage.clickFirstProduct();
});

When('the user clicks the favorite icon on the product page', async () => {
  await ProductDetailsPage.waitForPageLoad();
  await ProductDetailsPage.addToFavorites();
});

Then('the product should be added to favorites', async () => {
  await FavoritesPage.open();
  await FavoritesPage.waitForPageLoad(15000);
  await FavoritesPage.waitForFavoriteCard(15000);
  await expect(FavoritesPage.favoriteCard).toBeDisplayed();
});

Then('the user removes the product from favorites', async () => {
  await FavoritesPage.removeFromFavorites();
  await browser.waitUntil(
    async () => !(await FavoritesPage.favoriteCard.isExisting()),
    { timeout: 10000, timeoutMsg: 'Favorite card was not removed' }
  );
});
