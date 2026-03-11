import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy some ice-cream');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy some chocolate');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'buy some ice-cream' }).getByLabel('Toggle Todo').check();
  await expect(page.getByText('buy some ice-cream')).toBeVisible();
  await expect(page.getByText('buy some chocolate')).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
//  await expect(page.getByTestId('todo-title')).toBeVisible();
//  await expect(page.getByTestId('todo-title')).toMatchAriaSnapshot('- text: buy some chocolate');
});