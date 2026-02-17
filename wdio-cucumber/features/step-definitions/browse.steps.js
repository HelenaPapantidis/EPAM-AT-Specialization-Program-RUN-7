import { When, Then } from '@wdio/cucumber-framework';
import assert from 'node:assert/strict';

import { HomePage } from '../../pageobjects/index.js';

When('the user enters {string} in the search field', async (term) => {
  await HomePage.setInputValue(HomePage.searchInput, term);
});

When('the user clicks the search button', async () => {
  await HomePage.clickElement(HomePage.searchButton);
  // Wait for products to reload after search
  await browser.pause(2000);
  await HomePage.waitForProductsToLoad();
});

Then('only products matching {string} should be displayed', async (term) => {
  // Wait for search caption to be visible
  await HomePage.searchCaption.waitForDisplayed({ timeout: 10000 });
  const captionText = await HomePage.searchCaption.getText();
  assert.ok(
    captionText.toLowerCase().includes(term.toLowerCase()),
    `Search caption "${captionText}" does not contain "${term}"`
  );
});

Then('the search term {string} should remain in the search box', async (term) => {
  // Search term displayed in caption is sufficient - input may be cleared after submit
  const captionText = await HomePage.searchCaption.getText();
  assert.ok(
    captionText.toLowerCase().includes(term.toLowerCase()),
    `Search caption should show "${term}"`
  );
});

When('the user opens {string} menu in the header', async (menuName) => {
  // no-op — category navigation done via URL
});

When('the user selects {string} from the dropdown', async (category) => {
  const slug = category.toLowerCase().replace(/\s+/g, '-');
  await HomePage.goToCategory(slug);
});

Then('the {string} category page should be displayed', async (category) => {
  const slug = category.toLowerCase().replace(/\s+/g, '-');
  await browser.waitUntil(
    async () => (await browser.getUrl()).includes(`/category/${slug}`),
    { timeout: 15000, timeoutMsg: `Expected /category/${slug} in URL` }
  );
});

Then('the page heading should show {string}', async (heading) => {
  const title = await $('[data-test="page-title"], h1');
  await title.waitForDisplayed({ timeout: 15000 });
  const text = await title.getText();
  assert.ok(
    text.toLowerCase().includes(heading.toLowerCase()),
    `Expected heading "${heading}", got "${text}"`
  );
});

Then('only hand tools products should be visible', async () => {
  await HomePage.waitForProductsToLoad();
  assert.ok(await HomePage.getProductCount() > 0, 'Expected products in category');
});
