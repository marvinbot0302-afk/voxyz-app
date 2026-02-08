import { test, expect } from '@playwright/test';

const flavor = (process.env.EXPECT_FLAVOR || '').toLowerCase();

test.describe('flavor smoke', () => {
  test('root route shows correct entry page', async ({ page }) => {
    await page.goto('/');

    if (flavor === 'nfl') {
      await expect(page.getByRole('heading', { name: 'NFL Rules Tutor' })).toBeVisible();
      return;
    }
    if (flavor === 'poker') {
      await expect(page.getByRole('heading', { name: 'Poker Tutor' })).toBeVisible();
      return;
    }

    // default agentworld
    await expect(page.getByRole('heading', { name: 'VoxYZ Lab' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'NFL Rules Tutor' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Poker Tutor' })).toBeVisible();
  });

  test('direct routes exist', async ({ page }) => {
    await page.goto('/nfl');
    await expect(page.getByRole('heading', { name: 'NFL Rules Tutor' })).toBeVisible();

    await page.goto('/poker');
    await expect(page.getByRole('heading', { name: 'Poker Tutor' })).toBeVisible();
  });
});
