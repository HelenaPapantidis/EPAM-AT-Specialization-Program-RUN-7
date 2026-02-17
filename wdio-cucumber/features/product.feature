Feature: Product details
  In order to make informed purchase decisions
  As a user
  I want to view product information

  Background:
    Given the user is on the homepage

   @regression @positive
  Scenario: View product details page
    When the user clicks on any product from the list
    Then the product details page should be displayed
    And the URL should contain "/product/"
    And the product name should be visible
    And the "Add to cart" button should be clickable
