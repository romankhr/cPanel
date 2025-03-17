import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';

setDefaultTimeout(60000);

let browser, context, page;

Before(async function () {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  global.page = await context.newPage();
});

After(async function () {
  if (browser) {
    await browser.close();
  }
});
