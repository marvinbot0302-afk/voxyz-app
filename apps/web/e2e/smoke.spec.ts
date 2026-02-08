import { test, expect } from '@playwright/test';

test.describe('smoke', () => {
  test('home loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Next\.js|VoxYZ|voxyz/i);
  });

  test('/nfl loads', async ({ page }) => {
    await page.goto('/nfl');
    await expect(page.getByRole('heading', { name: 'NFL Rules Tutor' })).toBeVisible();
    await expect(page.getByText('Explain this play')).toBeVisible();
  });

  test('/poker loads', async ({ page }) => {
    await page.goto('/poker');
    await expect(page.getByRole('heading', { name: 'Poker Tutor' })).toBeVisible();
    await expect(page.getByText('Hand Lab')).toBeVisible();
  });
});
