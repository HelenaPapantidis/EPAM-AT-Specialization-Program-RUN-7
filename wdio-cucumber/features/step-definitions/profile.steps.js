import { When, Then } from '@wdio/cucumber-framework';
import assert from 'node:assert/strict';

import { HomePage, ProductDetailsPage, ProfilePage, FavoritesPage } from '../../pageobjects/index.js';
import { buildProfileUpdateData } from '../../utils/profileData.js';

const state = {};

When('the user navigates to the profile page', async () => {
  await ProfilePage.open();
  await ProfilePage.waitForPageLoad();
});

When('the user updates the first name field with new value', async () => {
  const data = buildProfileUpdateData();
  state.updatedFirstName = data.firstName;
  await ProfilePage.setInputValue(ProfilePage.firstNameInput, state.updatedFirstName);
});

When('the user clicks the save button', async () => {
  await ProfilePage.scrollAndClick(ProfilePage.updateProfileButton);
});

Then('the updated information should be visible on the profile page', async () => {
  const value = await ProfilePage.firstNameInput.getValue();
  assert.equal(value, state.updatedFirstName);
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
  assert.ok(await FavoritesPage.isFavoriteCardDisplayed(), 'Favorite card not displayed');
});

Then('the favorite icon should be marked as selected', async () => {
  assert.ok(await FavoritesPage.isFavoriteCardDisplayed(), 'Product not in favorites');
});
