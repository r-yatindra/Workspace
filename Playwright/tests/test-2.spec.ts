import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&dsh=S721467227%3A1772935408654488&emr=1&ifkv=ASfE1-qoQrrB72ddw9bbYKuZztqAguBv4jKkcI2zVkNkSWZYnmOEfHnSiIot_HVKF91aj_SYp7ZtFA&ltmpl=default&ltmplcache=2&osid=1&passive=true&rm=false&scc=1&service=mail&ss=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin');
  await page.getByRole('textbox', { name: 'Email or phone' }).click();
  await page.getByRole('textbox', { name: 'Email or phone' }).fill('r.yatindra');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('link', { name: 'Try again' }).click();
  await page.getByLabel('Create an account').locator('svg').click();
  await page.getByLabel('Create an account').locator('svg').click();
});