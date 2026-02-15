import HomePage from "../support/page_object/HomePage";
import ProductDetailsPage from "../support/page_object/ProductDetailsPage";

describe("Product details", () => {
  it("View product details page", () => {
    cy.visit("/");

    HomePage.getProductTitleElements()
      .first()
      .invoke("text")
      .then((productName) => {
        HomePage.clickFirstProduct();

        cy.get("h1", { timeout: 20000 }).should("be.visible");

        cy.url().should("include", "/product/");

        ProductDetailsPage.getProductName()
          .should("be.visible")
          .invoke("text")
          .then((h1Text) => {
            expect(h1Text.trim()).to.eq(productName.trim());
          });

        ProductDetailsPage.descriptionBox.should("be.visible");

        ProductDetailsPage.addToCartButton
          .should("be.visible")
          .and("not.be.disabled");
      });
  });
});
