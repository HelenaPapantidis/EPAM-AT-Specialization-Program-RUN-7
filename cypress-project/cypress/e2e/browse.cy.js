import HomePage from "../support/page_object/HomePage";

describe("Product browsing", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Search functionality", () => {
    it("Search for product in search field", () => {

      const searchTerm = "Pliers";
      HomePage.searchProduct(searchTerm);
      HomePage.searchCaption.should("contain", searchTerm);
    });
  });
  
    describe("Category filtering", () => {
      it("Filter products by category", () => {
        const category = "Hand Tools";
        cy.openHeaderCategoriesMenu();
        cy.selectCategoryFromDropdown(category);
        cy.url().should("include", "category");
        cy.get('h2').should("contain.text", category);
      });
    });
  });
