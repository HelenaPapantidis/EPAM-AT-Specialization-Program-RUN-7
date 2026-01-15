Feature: User account features
  In order to personalize my experience
  As a signed-in user
  I want to manage my profile and save favorite products

  Background:
    Given the user is registered and signed in

  Scenario: Update profile information
    When the user navigates to the profile page
    And the user updates the first name field with new value
    And the user clicks the save button
    Then a success message should be displayed
    And the updated information should be visible on the profile page

  Scenario: Add product to favorites
    When the user opens a product from the homepage
    And the user clicks the favorite icon on the product page
    Then the product should be added to favorites
    And the favorite icon should be marked as selected
