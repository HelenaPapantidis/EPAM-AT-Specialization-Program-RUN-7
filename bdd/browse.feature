Feature: Product browsing
  In order to find the right products
  As a user
  I want to search and filter products effectively

  Background:
    Given the user is on the homepage

  Scenario: Search for an exact product by name
    When the user enters "Pliers" in the search field
    And the user clicks the search button
    Then only products matching "Pliers" should be displayed
    And the search term "Pliers" should remain in the search box

  Scenario: Filter products by category
    When the user opens "Categories" menu in the header
    And the user selects "Hand Tools" from the dropdown
    Then the "Hand Tools" category page should be displayed
    And the page heading should show "Hand Tools"
    And only hand tools products should be visible
