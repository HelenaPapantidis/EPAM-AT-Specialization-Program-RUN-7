import { HomePage, ProductDetailsPage, FavoritesPage } from "../po/index.js";
import { loginToAccount } from "../helpers/index.js";
import { validUser } from "../data/index.js";

describe("Favorites Scenarios", () => {
  it("should add product to favorites", async () => {
    await loginToAccount(validUser.email, validUser.password);

    await HomePage.open();
    await HomePage.clickFirstProduct();
    await ProductDetailsPage.waitForPageLoad();
    await ProductDetailsPage.addToFavorites();

    await FavoritesPage.open();
    await FavoritesPage.waitForPageLoad();
    await FavoritesPage.waitForAnyFavorite(60000);
    await expect(FavoritesPage.favoriteCard).toBeDisplayed();

    // Cleanup: remove one favorite so reruns don't snowball.
    await FavoritesPage.removeFirstFavorite();
  });
});
