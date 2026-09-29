import { test } from '@playwright/test';
import { loginAsSuperadmin } from './helpers/auth';

test('login test1', async ({ page }) => {
    await loginAsSuperadmin(page);
});