'use strict';
describe('QA Challenge Test', () => {
  beforeEach(() => {
    jest.setTimeout(170000);
  });
  it('should confirm we are on the home screen', async () => {
    // Check that we are on the home screen
    await expect(element(by.id('home-screen'))).toBeVisible();
  });
});
