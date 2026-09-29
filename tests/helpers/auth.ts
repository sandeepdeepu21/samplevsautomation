import { expect, type Page } from '@playwright/test';

export function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export async function loginAsSuperadmin(page: Page): Promise<void> {
  await page.goto('https://cc.cloudvoice.in/auth/login/');
  await page.getByRole('textbox', { name: 'Email' }).fill(requiredEnv('SUPERADMIN_USERNAME'));
  await page.getByRole('textbox', { name: 'Password' }).fill(requiredEnv('SUPERADMIN_PASSWORD'));
  await page.getByRole('button', { name: 'Sign In' }).click();

  const profile = page.getByRole('listitem').filter({
    has: page.getByRole('img', { name: 'Profile' }),
  });
  await expect(profile).toContainText('adminuser');
}