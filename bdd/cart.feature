Feature: Shopping cart
  In order to purchase products
  As a user
  I want to add products to cart and manage my basket

  Background:
    Given the user is on the homepage

  @smoke @positive
  Scenario: Add product to basket
    When the user clicks on a product from the list
    And the user clicks the "Add to cart" button
    And the user opens the cart page
    Then the product should be displayed in the cart
    And the quantity should be set to 1
