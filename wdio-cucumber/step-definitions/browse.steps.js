import { When, Then } from '@wdio/cucumber-framework';
import { HomePage } from '../pageobjects/index.js';

When('the user enters {string} in the search field', async (term) => {
  await HomePage.setInputValue(HomePage.searchInput, term);
});

When('the user clicks the search button', async () => {
  await HomePage.clickElement(HomePage.searchButton);
  await HomePage.waitForProductsToLoad();
});

Then('only products matching {string} should be displayed', async (term) => {
  await expect(HomePage.searchCaption).toBeDisplayed();
  await expect(HomePage.searchCaption).toHaveText(
    expect.stringContaining(term),
    { ignoreCase: true }
  );
});

Then('the search term {string} should remain in the search box', async (term) => {
  await expect(HomePage.searchCaption).toHaveText(
    expect.stringContaining(term),
    { ignoreCase: true }
  );
});

When('the user opens {string} menu in the header', async (_menuName) => {
  await HomePage.categoriesMenu.click();
});

When('the user selects {string} from the dropdown', async (category) => {
  const categoryLink = await $(`a=${category}`);
  await categoryLink.waitForDisplayed({ timeout: 10000 });
  await categoryLink.click();
});

Then('the {string} category page should be displayed', async (category) => {
  await expect(browser).toHaveUrl(
    expect.stringContaining(category.toLowerCase().replace(/\s+/g, '-'))
  );
});

Then('the page heading should show {string}', async (heading) => {
  await expect(HomePage.categoryPageTitle).toHaveText(
    expect.stringContaining(heading),
    { ignoreCase: true }
  );
});

Then('only hand tools products should be visible', async () => {
  await HomePage.waitForProductsToLoad();
  expect(await HomePage.getProductCount()).toBeGreaterThan(0);
});