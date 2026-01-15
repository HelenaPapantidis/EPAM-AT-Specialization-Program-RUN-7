Feature: Login and registration
  In order to access my account
  As a user
  I want to sign up and sign in securely

  Background:
    Given the user is on the login page

  Scenario: Successful user registration
    When the user clicks on "Register your account" link
    And the user fills in the registration form with valid data
    And the user clicks the Register button
    Then a success message should be displayed
    And the user should be redirected to the login page

  Scenario: Successful user login
    Given a test account exists with email "customer@practicesoftwaretesting.com" and password "welcome01"
    When the user enters email "customer@practicesoftwaretesting.com"
    And the user enters password "welcome01"
    And the user clicks the Login button
    Then the user should be redirected to the account page
    And the page should display "My account"
