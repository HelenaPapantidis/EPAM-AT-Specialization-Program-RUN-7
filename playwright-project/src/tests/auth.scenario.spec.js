import { test, expect } from "@src/tests/fixtures";
import { generateUniqueUser, validCredentials } from "@/data/testData";

test.describe("Authentication Scenarios", () => {
  test("User can successfully register with valid data", async ({ registrationPage, page }) => {
    const user = generateUniqueUser();

    await test.step("User opens registration page", async () => {
      await registrationPage.open();
    });

    await test.step("User fills and submits registration form", async () => {
      await registrationPage.register(user);
    });

    await test.step("Verify redirect after successful registration", async () => {
      await expect(page).toHaveURL(/register|account|login/, {
        timeout: 10000,
      });
    });
  });

  test("User can successfully login with valid credentials", async ({ loginPage, page }) => {
    await test.step("User is on login page", async () => {
      await loginPage.open();
    });

    await test.step("User logs in with valid credentials", async () => {
      await loginPage.login(validCredentials.email, validCredentials.password);
    });

    await test.step("Verify redirect to account page", async () => {
      await expect(page).toHaveURL(/account/, { timeout: 10000 });
    });

    await test.step("Verify page title contains 'My account'", async () => {
      await expect(page.locator('[data-test="page-title"]')).toContainText(
        "My account",
      );
    });
  });
});
