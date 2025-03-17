import { expect } from '@playwright/test';
import config from '../playwright.config.js'; // Import config as an ES module

const { use: { baseURL } } = config;

class HomePage {

    constructor() {
        this.page = global.page;
    }

    async navigateTo() {
        console.log('Navigating to Home Page');
        await this.page.goto(baseURL, { timeout: 60000 });
        console.log('Navigation completed');
    }
    
    async isHomePageDisplayed() {
        console.log(`Verify Home Page`);
        const headerSelector = 'h1.font-size-36';
        await this.page.waitForSelector(headerSelector, { state: 'visible' });
        const headerText = await this.page.locator(headerSelector).innerText();
        return headerText.includes("cPanel Licenses");
    }

    async clickOrderNowButton(productNumber) {
        console.log(`Click Order Now button for the ${productNumber} product`);
    
        const orderNowButtonSelector = `(//footer//a[normalize-space(text()="Order Now")])[${productNumber}]`;
        await this.page.waitForSelector(orderNowButtonSelector, { state: 'visible' });
        await this.page.waitForSelector(orderNowButtonSelector, { state: 'attached' });
        await this.page.click(orderNowButtonSelector);
    }
}

export default HomePage;

