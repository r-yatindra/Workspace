import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.agoda.com');
  await expect(page.getByRole('link', { name: 'Agoda logo Home link' })).toBeVisible();
  await page.getByRole('heading', { name: 'Flights', exact: true }).click();
  await expect(page.getByRole('button', { name: 'One-way' })).toBeVisible();
  await page.getByRole('combobox', { name: 'Flying from' }).click();
  await page.getByRole('combobox', { name: 'Flying from' }).fill('pune');
  await page.getByText('Pune AirportPNQ').click();
  await page.getByRole('combobox', { name: 'Flying to' }).fill('delhi');
  await page.getByText('New Delhi, IndiaAll airports').click();
  await page.getByRole('button', { name: 'Tue Mar 10' }).click();
  await page.getByRole('button', { name: 'Economy', exact: true }).click();
  await page.getByRole('button', { name: 'Passengers and cabin class' }).click();
  await page.getByRole('button', { name: 'SEARCH FLIGHTS' }).click();
  await expect(page.getByTestId('title')).toContainText('Flights from Pune to New Delhi');
  await expect(page.getByTestId('flex-date-box-2')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Best - \'' })).toBeVisible();
});