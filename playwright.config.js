import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  retries: 2, 
  use: {
    headless: false, 
    baseURL: 'https://store.cpanel.net/store/cpanel-licenses', 
    viewport: { width: 1280, height: 720 }, 
    actionTimeout: 60000,
    navigationTimeout: 60000,
  },
});
