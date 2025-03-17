import { expect } from '@playwright/test';

class AccountPage {
    addon = '';
    price = '';
    ip = '';
    dueTodayPrice = '';

    constructor() {
        this.page = global.page;
    }

    async isAccountPageDisplayed() {
        console.log(`Verify Account Page`);
        const headerSelector = 'h1.font-size-36';
        await this.page.waitForSelector(headerSelector, { state: 'visible' });
        const headerText = await this.page.locator(headerSelector).innerText();
        return headerText.includes("Configure");
    }

    async enterIpAddress(ipAddress) {
        if (ipAddress.toLowerCase() === "random") {
            ipAddress = this.generateRandomIp();
        }
        console.log(`Enter ${ipAddress} IP Address`);
        this.ip = ipAddress;
        await this.page.locator(`//label[contains(text(),"IP Address")]/following-sibling::input`).fill(ipAddress);
    }

    async chooseAddon(addon) {
        console.log(`Choose ${addon} addon`);
        await this.page.click(`(//input[@type='checkbox'])[${addon}]/following-sibling::ins`);
        this.addon = await this.page.locator(`(//input[@type='checkbox'])[${addon}]/../..`).innerText();
        const priceText = await this.page.locator(`(//input[@type='checkbox'])[${addon}]/../../../../div[@class='panel-price']`).innerText();
        this.price = priceText.match(/\$([\d]+(\.\d{2})?)/);
    }

    async clickContinueButton() {
        console.log(`Click Continue Button`);
        await this.page.click('.total-due-today');
        const continueButton = this.page.locator('#btnCompleteProductConfig');
        await continueButton.waitFor({ state: 'attached' });
        await this.page.waitForSelector('#btnCompleteProductConfig:enabled');
        await continueButton.click();
    }

    async isOrderSummaryUpdated() {
        console.log(`Is Order Summary updated`);
        const selector = "//div[@id='orderSummary']//span[@class='pull-left float-left' and contains(text(),'+')]";
        await this.page.waitForSelector(selector, { state: 'visible' });
        const element = await this.page.locator(selector);
        return await element.isVisible();
    }

    async isAddonPresent() {
        console.log(`Verify ${this.addon} addon`);
        return await this.page.locator(`(//span[normalize-space(text()) = '${this.addon}'])[1]/preceding-sibling::span[@class='item-title']`).isVisible;
    }

    async isAddonPriceCorrect() {
        console.log(`Verify ${this.price} addon price`);
        const priceText = await this.page.locator("(//span[normalize-space(text()) = 'Monthly CloudLinux'])[1]/../..//div[@class='col-sm-4 item-price']/span[2]").innerText();
        const priceMatch = priceText.match(/\$([\d]+(\.\d{2})?)/)
        expect(priceMatch ? priceMatch[1] : null).toBe(this.price[1]);
    }

    async clickCheckoutButton() {
        console.log('Clicking on the Checkout button');
        await this.page.click('#checkout');
    }

    async clickCheckoutButton() {
        console.log('Clicking on the Checkout button');
        await this.page.click('#checkout');
    }

    async verifyProductName(name) {
        console.log(`Verify product ${name} name`);
        await this.page.locator(`//td[normalize-space(text()) = '${name}']`).isVisible;
    }

    async isIpAddressCorrect() {
        console.log(`Verify ${this.ip} address`);
        const ipUi = await this.page.locator("//tr[1]/td[3]").innerText();
        expect(ipUi).toBe(this.ip);
    }

    async isBonusCorrect(bonus) {
        bonus = (bonus === 'saved') ? this.dueTodayPrice : bonus;
        console.log(`Verify ${bonus} Bonus`);
        const bonusUi = await this.page.locator("//tr[1]/td[5]").innerText();
        console.log(`Verify ${bonus} Bonus UI`);
        expect(bonusUi.trim()).toContain(bonus.trim());
    }

    async isSectionDisplayed(name) {
        console.log(`Verify ${name} of section`);
        return await this.page.locator(`//span[text()='${name}']`).isVisible;
    }

    async isCompleteOrderButtonDisabled() {
        console.log('Verifying that the "Complete Order" button is displayed and disabled');
        const button = this.page.locator('#btnCompleteOrder');
        const isVisible = await button.isVisible();
        console.log(`Button is visible: ${isVisible}`);
        const isDisabled = await button.isDisabled();
        console.log(`Button is disabled: ${isDisabled}`);
        expect(isVisible).toBeTruthy();
        expect(isDisabled).toBeTruthy();
    }

    async saveDueTodayPrice() {
        console.log(`Save Due Today Price`);
        const parentElement = await page.locator('.total-due-today');
        this.dueTodayPrice = await parentElement.locator('.amt').textContent();
    }

    generateRandomIp() {
        const firstOctet = Math.floor(Math.random() * 2) + 1;
        const remainingOctets = Array.from({ length: 3 }, () => Math.floor(Math.random() * 9) + 1);
        return [firstOctet, ...remainingOctets].join('.');
    }

}

export default AccountPage;