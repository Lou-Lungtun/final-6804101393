
import { test, expect } from '@playwright/test';

test(
  'ST-02: checkout validation and recovery',
  {
    annotation: {
      type: 'description',
      description:
        'ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ',
    },
  },
  async ({ page }) => {
    // ขั้นตอนที่ 1: Login เพิ่มสินค้า และเปิด Checkout
    await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
      await page.goto('/');

      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();

      await expect(page).toHaveURL(/inventory\.html/);

      // เพิ่ม Backpack ลงตะกร้า
      const backpack = page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

      await backpack.getByRole('button', { name: 'Add to cart' }).click();

      await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

      // เปิด Cart และ Checkout
      await page.locator('.shopping_cart_link').click();

      await expect(page.locator('.cart_item')).toHaveCount(1);

      await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
      ).toBeVisible();

      await page.getByRole('button', { name: 'Checkout' }).click();

      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    // ขั้นตอนที่ 2: ไม่กรอกข้อมูลใด ๆ
    await test.step('ตรวจสอบ First Name is required', async () => {
      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('[data-test="error"]'))
        .toContainText('First Name is required');

      // ต้องยังอยู่ในหน้า Checkout Information
      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    // ขั้นตอนที่ 3: กรอก First Name แต่ไม่กรอก Last Name
    await test.step('ตรวจสอบ Last Name is required', async () => {
      await page.locator('[data-test="firstName"]').fill('John');

      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('[data-test="error"]'))
        .toContainText('Last Name is required');

      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    // ขั้นตอนที่ 4: กรอก Last Name แต่ไม่กรอก Postal Code
    await test.step('ตรวจสอบ Postal Code is required', async () => {
      await page.locator('[data-test="lastName"]').fill('Doe');

      await page.getByRole('button', { name: 'Continue' }).click();

      await expect(page.locator('[data-test="error"]'))
        .toContainText('Postal Code is required');

      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    // ขั้นตอนที่ 5: กรอกข้อมูลครบและสั่งซื้อ
    await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
      await page.locator('[data-test="postalCode"]').fill('50000');

      await page.getByRole('button', { name: 'Continue' }).click();

      // ตรวจสอบว่าเข้าสู่ Checkout Overview
      await expect(page).toHaveURL(/checkout-step-two\.html/);

      // ตรวจสอบว่ายังมี Backpack ในรายการสั่งซื้อ
      await expect(page.locator('.cart_item')).toHaveCount(1);

      await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
      ).toBeVisible();

      // ยืนยันคำสั่งซื้อ
      await page.getByRole('button', { name: 'Finish' }).click();

      // ตรวจสอบผลการสั่งซื้อ
      await expect(page).toHaveURL(/checkout-complete\.html/);

      await expect(
        page.getByText('Thank you for your order!')
      ).toBeVisible();
    });
  }
);
