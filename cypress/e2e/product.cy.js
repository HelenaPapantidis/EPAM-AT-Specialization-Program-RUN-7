import HomePage from "../support/page_object/HomePage";
import ProductDetailsPage from "../support/page_object/ProductDetailsPage";

describe("Product details", () => {
  it("View product details page", () => {
    cy.visit("/");

    HomePage.productTitleElements
      .first()
      .invoke("text")
      .then((productName) => {
        HomePage.clickFirstProduct();

        cy.get('[data-test="product-name"]', { timeout: 30000 }).should("be.visible");

        cy.url().should("include", "/product/");

        ProductDetailsPage.productName
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
