import { test, expect } from '@playwright/test';
import { loginAsSuperadmin, requiredEnv } from './helpers/auth';

test('admin can add a user or confirm the existing user', async ({ page }) => {
  await loginAsSuperadmin(page);
  await page.goto('https://cc.cloudvoice.in/users');
  const usersToolbar = page.getByRole('toolbar').filter({
    has: page.getByRole('heading', { name: 'Manage Users' }),
  });
  await usersToolbar.getByRole('button').first().click();

  const userDialog = page.getByRole('dialog', { name: /User Details/ });
  await expect(userDialog).toBeVisible();
  await userDialog.getByLabel('Username').fill(requiredEnv('TEST_USER_USERNAME'));
  await userDialog.locator('input[name="user-secret-input"]').fill(requiredEnv('TEST_USER_PASSWORD'));
  await userDialog.getByLabel('Full Name').fill(requiredEnv('TEST_USER_FULL_NAME'));
  await userDialog.getByLabel('Mobile').fill(requiredEnv('TEST_USER_MOBILE'));
  await userDialog.getByLabel('Email').fill(requiredEnv('TEST_USER_EMAIL'));

  await userDialog.getByRole('button', { name: 'Select Role' }).click();
  await page.getByRole('option', { name: 'Manager', exact: true }).click();
  await userDialog.getByRole('button', { name: 'Select SIP Router' }).click();
  await page.getByRole('option', { name: 'Router', exact: true }).click();

  await userDialog.getByRole('button', { name: 'Save' }).click();

  const duplicateNotice = userDialog.getByText('User or Email already exists');
  await expect.poll(async () =>
    (await duplicateNotice.isVisible()) || !(await userDialog.isVisible()),
  ).toBe(true);

  if (await duplicateNotice.isVisible()) {
    await userDialog.getByRole('button', { name: 'Cancel' }).click();
  } else {
    await expect(userDialog).toBeHidden();
  }

  const search = page.getByRole('textbox', { name: 'Keyword Search' });
  const username = requiredEnv('TEST_USER_USERNAME');
  await search.fill(username);
  await expect(page.getByRole('cell', { name: username, exact: true })).toBeVisible();
});
