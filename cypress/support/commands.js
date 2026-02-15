import LoginPage from './page_object/LoginPage';

// Custom login command - uses LoginPage for consistency
Cypress.Commands.add('login', (email, password) => {
  LoginPage.goToLogin();
  LoginPage.login(email, password);
  LoginPage.verifyLoginSuccess();
});

// Add more custom commands if needed
// Example: Cypress.Commands.add('logout', () => { ... })

Cypress.Commands.add('openHeaderCategoriesMenu', () => {
  cy.get('a[data-test="nav-categories"]').click();
});

Cypress.Commands.add('selectCategoryFromDropdown', (categoryName) => {
  cy.contains('li', categoryName).click();
});

Cypress.Commands.add('goToProfile', () => {
  cy.get('[data-test="nav-profile"]').should('be.visible').click();
});