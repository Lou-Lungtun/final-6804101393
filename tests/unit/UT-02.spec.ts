
import { test, expect } from '@playwright/test';

test.describe('UT-02: Add and Remove Product', () => {

  test('UT-02: Add and remove Sauce Labs Backpack', {
    annotation: {
      type: 'description',
      description: 'ตรวจสอบการเพิ่มและนำ Sauce Labs Backpack ออกจากตะกร้าสินค้า'
    }
  }, async ({ page }) => {

    await test.step('เข้าสู่ระบบ SauceDemo', async () => {
      await page.goto('/');

      await page.locator('[data-test="username"]')
        .fill('standard_user');

      await page.locator('[data-test="password"]')
        .fill('secret_sauce');

      await page.getByRole('button', { name: 'Login' })
        .click();

      await expect(page).toHaveURL(/inventory\.html/);
    });

    await test.step('เพิ่ม Sauce Labs Backpack ลงตะกร้า', async () => {
      await page.getByRole('button', { name: 'Add to cart' }).first()
        .click();

      await expect(page.locator('.shopping_cart_badge'))
        .toHaveText('1');

      await expect(
        page.getByRole('button', { name: 'Remove' }).first()
      ).toBeVisible();
    });

    await test.step('นำสินค้าออกจากตะกร้า', async () => {
      await page.getByRole('button', { name: 'Remove' }).first()
        .click();

      await expect(page.locator('.shopping_cart_badge')) 
        .toHaveCount(0);

      await expect(
        page.getByRole('button', { name: 'Add to cart' }).first()
      ).toBeVisible();
    });

  });

});
