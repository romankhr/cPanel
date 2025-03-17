import { Given, When, Then, Before } from '@cucumber/cucumber';
import HomePage from '../../../pages/homePage.js';
import AccountPage from '../../../pages/accountPage.js';
import { expect } from '@playwright/test';

let homePage;
let accountPage;

Before(async function () {
    homePage = new HomePage();
    accountPage = new AccountPage();
});

Given('User opens cPanel Home Page', async function () {
    await homePage.navigateTo();
});

Then('Verify that user redirects to Home Page', async function () {
    expect(await homePage.isHomePageDisplayed()).toBeTruthy();
});

When('User chooses {int} product to order on Home Page', async function (productNumber) {
    await homePage.clickOrderNowButton(productNumber);
});

Then('Verify that user redirects to Account Page', async function () {
    expect(await accountPage.isAccountPageDisplayed()).toBeTruthy();
});

When('Save Total Due Today price on Account Page', async function () {
    await accountPage.saveDueTodayPrice();
});

When('User enters {string} IP Address on Account Page', async function (ipAddress) {
    await accountPage.enterIpAddress(ipAddress);
});

When('User chooses {int} addon on Account Page', async function (addon) {
    await accountPage.chooseAddon(addon);
});

Then('Verify the "Order Summary" is updated on Account Page', async function () {
    expect(await accountPage.isOrderSummaryUpdated()).toBeTruthy();
});

When('User clicks Continue button on Account Page', async function () {
    await accountPage.clickContinueButton();
});

Then('Verify the expected addons is present in Step 2 Review & Checkou on Account Page', async function () {
    expect(await accountPage.isAddonPresent()).toBeTruthy();
});

Then('Verify the addons price is correct in Step 2 Review & Checkou on Account Page', async function () {
    await accountPage.isAddonPriceCorrect();
});

When('User clicks Checkout button on Account Page', async function () {
    await accountPage.clickCheckoutButton();
});

Then('Verify {string} is correct on Account Page', async function (name) {
    await accountPage.verifyProductName(name);
});

Then('Verify IP address on Account Page', async function () {
    await accountPage.isIpAddressCorrect();
});

Then('Verify {string} Bonus: The “Due Today“ price on Account Page', async function (bonus) {
    await accountPage.isBonusCorrect(bonus);
});

Then('Verify the {string} is displayed on Account Page', async function (name) {
    expect(await accountPage.isSectionDisplayed(name)).toBeTruthy();
});

Then("Verify the 'Complete Order' Button is displayed and is Disabled on Account Page", async function () {
    await accountPage.isCompleteOrderButtonDisabled();
});