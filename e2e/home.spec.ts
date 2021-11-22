import {expect} from 'detox';
describe('Main Tests', () => {
  beforeAll(async () => {
    await device.launchApp({newInstance: true});
  });
  beforeEach(async () => {
    await device.reloadReactNative();
  });
  it('can signup successfully', async () => {
    // Check that we are on the home screen
    await expect(element(by.id('onboarding-screen'))).toBeVisible();
    await expect(element(by.id('metamask-demo'))).toBeVisible();
    //I navigate to the signup page
    await element(by.id('signup')).tap();
    await expect(element(by.id('email'))).toBeVisible();
    //I input the email "test@example.com" and password "test1234756789"
    await element(by.id('email')).typeText('test@example.com');
    await element(by.id('password')).typeText('test1234756789');
    //I confirm the signup
    await element(by.id('next')).tap();
    //I should be on the home screen
    await expect(element(by.id('userid'))).toBeVisible();
    //I should see the email address "test@example.com" on the home screen
    await expect(element(by.id('userid'))).toHaveText('test@example.com!');
  });
  it('can’t signup with invalid signup data', async () => {
    // Check that we are on the home screen
    await expect(element(by.id('onboarding-screen'))).toBeVisible();
    await expect(element(by.id('metamask-demo'))).toBeVisible();
    //I navigate to the signup page
    await element(by.id('signup')).tap();
    await expect(element(by.id('email'))).toBeVisible();
    //I input the email "test@e.x" and password "test"
    await element(by.id('email')).typeText('test@e.x');
    await element(by.id('password')).typeText('test');
    //I confirm the signup
    await element(by.id('next')).tap();
    //I should see validation errors for "email,password"
    await expect(element(by.id('emailValidation'))).toBeVisible();
    await expect(element(by.id('emailValidation'))).toHaveText(
      'Email is not correct',
    );
    await expect(element(by.id('passwordValidation'))).toBeVisible();
    await expect(element(by.id('passwordValidation'))).toHaveText(
      'You need to enter your password with more than 11 characters',
    );
  });
});
