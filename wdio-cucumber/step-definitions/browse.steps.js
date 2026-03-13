import { When, Then } from "@wdio/cucumber-framework";
import { HomePage } from "../pageobjects/index.js";

// Search scenario steps

When("the user enters {string} in the search field", async (term) => {
  await HomePage.searchInput.waitForDisplayed();
  await HomePage.searchInput.setValue(term);
});

When("the user clicks the search button", async () => {
  await HomePage.searchButton.click();
  await HomePage.waitForProductsToLoad();
});

Then("the search page title should contain {string}", async (term) => {
  const title = await HomePage.getSearchPageTitleText();
  expect(title.toLowerCase()).toContain(term.toLowerCase());
});

// Category filter scenario steps

When("the user opens {string} menu in the header", async (_menuName) => {
  await HomePage.categoriesMenu.click();
});

When("the user selects {string} from the dropdown", async (category) => {
  const categoryLink = await $(`a=${category}`);
  await categoryLink.waitForDisplayed({ timeout: 30000 });
  await categoryLink.click();
});

Then("the {string} category page should be displayed", async (category) => {
  const url = await browser.getUrl();
  expect(url.toLowerCase()).toContain(category.toLowerCase().replaceAll(" ", "-"));
});

Then("the page heading should show {string}", async (heading) => {
  const text = await HomePage.getCategoryPageTitleText();
  expect(text.toLowerCase()).toContain(heading.toLowerCase());
});

Then("products should be visible", async () => {
  await HomePage.waitForProductsToLoad();
  const count = (await HomePage.productCards).length;
  expect(count).toBeGreaterThan(0);
});
