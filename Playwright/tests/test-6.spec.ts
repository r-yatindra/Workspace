import { test, expect } from '@playwright/test';

test('fill todo list', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('feed cow');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy vegetables');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('buy flavor');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByRole('heading', { name: 'todos' })).toBeVisible();
  await expect(page.locator('body')).toContainText('Active');
  await expect(page.locator('body')).toContainText('Completed');
  await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeEmpty();
});


test('validations', async ({ page }) => {
  await page.getByRole('listitem').filter({ hasText: 'feed cow' }).getByLabel('Toggle Todo').check();
  await expect(page.locator('body')).toContainText('feed cow');
  await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'All' }).dblclick();
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - text: This is just a demo of TodoMVC for testing, not the
    - link "real TodoMVC app.":
      - /url: https://todomvc.com/
    - heading "todos" [level=1]
    - textbox "What needs to be done?"
    - checkbox "❯Mark all as complete"
    - text: ❯Mark all as complete
    - list:
      - listitem:
        - checkbox "Toggle Todo" [checked]
        - text: feed cow
      - listitem:
        - checkbox "Toggle Todo"
        - text: buy vegetables
      - listitem:
        - checkbox "Toggle Todo"
        - text: buy flavor
    - strong: "2"
    - text: items left
    - list:
      - listitem:
        - link "All":
          - /url: "#/"
      - listitem:
        - link "Active":
          - /url: "#/active"
      - listitem:
        - link "Completed":
          - /url: "#/completed"
    - button "Clear completed"
    - contentinfo:
      - paragraph: Double-click to edit a todo
      - paragraph:
        - text: Created by
        - link "Remo H. Jansen":
          - /url: http://github.com/remojansen/
      - paragraph:
        - text: Part of
        - link "TodoMVC":
          - /url: http://todomvc.com
    `);
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - text: This is just a demo of TodoMVC for testing, not the
    - link "real TodoMVC app.":
      - /url: https://todomvc.com/
    - heading "todos" [level=1]
    - textbox "What needs to be done?"
    - checkbox "❯Mark all as complete"
    - text: ❯Mark all as complete
    - list:
      - listitem:
        - checkbox "Toggle Todo"
        - text: buy vegetables
      - listitem:
        - checkbox "Toggle Todo"
        - text: buy flavor
    - strong: "2"
    - text: items left
    - list:
      - listitem:
        - link "All":
          - /url: "#/"
      - listitem:
        - link "Active":
          - /url: "#/active"
      - listitem:
        - link "Completed":
          - /url: "#/completed"
    - button "Clear completed"
    - contentinfo:
      - paragraph: Double-click to edit a todo
      - paragraph:
        - text: Created by
        - link "Remo H. Jansen":
          - /url: http://github.com/remojansen/
      - paragraph:
        - text: Part of
        - link "TodoMVC":
          - /url: http://todomvc.com
    `);
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - text: This is just a demo of TodoMVC for testing, not the
    - link "real TodoMVC app.":
      - /url: https://todomvc.com/
    - heading "todos" [level=1]
    - textbox "What needs to be done?"
    - checkbox "❯Mark all as complete"
    - text: ❯Mark all as complete
    - list:
      - listitem:
        - checkbox "Toggle Todo" [checked]
        - text: feed cow
    - strong: "2"
    - text: items left
    - list:
      - listitem:
        - link "All":
          - /url: "#/"
      - listitem:
        - link "Active":
          - /url: "#/active"
      - listitem:
        - link "Completed":
          - /url: "#/completed"
    - button "Clear completed"
    - contentinfo:
      - paragraph: Double-click to edit a todo
      - paragraph:
        - text: Created by
        - link "Remo H. Jansen":
          - /url: http://github.com/remojansen/
      - paragraph:
        - text: Part of
        - link "TodoMVC":
          - /url: http://todomvc.com
    `);
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await expect(page.locator('body')).toMatchAriaSnapshot(`
    - text: This is just a demo of TodoMVC for testing, not the
    - link "real TodoMVC app.":
      - /url: https://todomvc.com/
    - heading "todos" [level=1]
    - textbox "What needs to be done?"
    - checkbox "❯Mark all as complete"
    - text: ❯Mark all as complete
    - list:
      - listitem:
        - checkbox "Toggle Todo"
        - text: buy vegetables
      - listitem:
        - checkbox "Toggle Todo"
        - text: buy flavor
    - strong: "2"
    - text: items left
    - list:
      - listitem:
        - link "All":
          - /url: "#/"
      - listitem:
        - link "Active":
          - /url: "#/active"
      - listitem:
        - link "Completed":
          - /url: "#/completed"
    - contentinfo:
      - paragraph: Double-click to edit a todo
      - paragraph:
        - text: Created by
        - link "Remo H. Jansen":
          - /url: http://github.com/remojansen/
      - paragraph:
        - text: Part of
        - link "TodoMVC":
          - /url: http://todomvc.com
    `);
});