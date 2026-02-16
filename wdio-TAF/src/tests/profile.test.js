import { ProfilePage } from '../po/index.js';
import { loginToAccount } from '../helpers/index.js';
import { profileData, validUser } from '../data/index.js';

describe("Profile Scenarios", () => {

  it("should update profile information", async () => {
    await loginToAccount(validUser.email, validUser.password);

    await ProfilePage.open();
    await ProfilePage.waitForPageLoad();

    await ProfilePage.updateProfile(profileData);

    await ProfilePage.waitForUpdateSuccess();

    await expect(ProfilePage.successAlert).toHaveText(/Your profile is successfully updated!/);
  });
});
