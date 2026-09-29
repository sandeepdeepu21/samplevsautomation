import { test } from '@playwright/test';
import { loginAsSuperadmin } from './helpers/auth';

test('login test1', async ({ page }) => {
    await loginAsSuperadmin(page);
});


// import { test, expect } from '@playwright/test';

// test('admin can add a user', async ({ page }) => {
//   await page.goto('https://cc.cloudvoice.in/auth/login/');
//   await page.getByRole('textbox', { name: 'Email' }).fill('superadmin');
//   await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
//   await page.getByRole('button', { name: 'Sign In' }).click();

//   const profile = page.getByRole('listitem').filter({
//     has: page.getByRole('img', { name: 'Profile' }),
//   });
//   await expect(profile).toContainText('adminuser');

//   await page.goto('https://cc.cloudvoice.in/users');
//   const usersToolbar = page.getByRole('toolbar').filter({
//     has: page.getByRole('heading', { name: 'Manage Users' }),
//   });
//   await usersToolbar.getByRole('button').first().click();

//   const userDialog = page.getByRole('dialog', { name: /User Details/ });
//   await expect(userDialog).toBeVisible();
//   await userDialog.getByLabel('Username').fill('sample1');
//   await userDialog.locator('input[name="user-secret-input"]').fill('Sample1@123');
//   await userDialog.getByLabel('Full Name').fill('Sample Added');
//   await userDialog.getByLabel('Mobile').fill('8897903701');
//   await userDialog.getByLabel('Email').fill('msandeep.deepu21@gmail.com');

//   await userDialog.getByRole('button', { name: 'Select Role' }).click();
//   await page.getByRole('option', { name: 'Manager', exact: true }).click();
//   await userDialog.getByRole('button', { name: 'Select SIP Router' }).click();
//   await page.getByRole('option', { name: 'Router', exact: true }).click();

//   await userDialog.getByRole('button', { name: 'Save' }).click();
//   await expect(userDialog).toBeHidden();
//   await expect(page.getByRole('cell', { name: 'sample1', exact: true })).toBeVisible();
// });
