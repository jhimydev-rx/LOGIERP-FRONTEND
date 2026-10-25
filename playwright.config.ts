import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  use: { baseURL: 'http://127.0.0.1:4200', headless: true },
  reporter: 'list',
  workers: 1,
});
