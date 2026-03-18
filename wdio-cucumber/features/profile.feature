Feature: User account features
  In order to personalize my experience
  As a signed-in user
  I want to manage my profile and save favorite products

  @regression @positive @auth @flaky
  Scenario: Update profile information
    When the user navigates to the profile page
    And the user updates the address fields with new values
    And the user clicks the save button
    Then the profile form should contain the updated values

  @regression @positive @auth @flaky
  Scenario: Add product to favorites
    When the user opens a product from the homepage
    And the user clicks the favorite icon on the product page
    Then the product should be added to favorites
    When the user removes the product from favorites
    Then the favorites list should be empty