
import { test, expect } from '@playwright/test';

test(
  'ST-01: complete purchase of two products',
  {
    annotation: {
      type: 'description',
      description:
        'ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ',
    },
  },
  async ({ page }) => {
    // ขั้นตอนที่ 1: Login และตรวจสอบ Inventory
    await test.step('Login และตรวจสอบ Inventory', async () => {
      await page.goto('/');

      await page.locator('[data-test="username"]').fill('standard_user');
      await page.locator('[data-test="password"]').fill('secret_sauce');
      await page.locator('[data-test="login-button"]').click();

      // ต้องเข้าสู่หน้า Inventory ได้
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(page.locator('.inventory_list')).toBeVisible();
    });

    // ขั้นตอนที่ 2: เพิ่มสินค้าสองรายการ
    await test.step('เพิ่มสินค้าสองรายการ', async () => {
      const backpack = page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Backpack' });

      const bikeLight = page
        .locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Bike Light' });

      await backpack.getByRole('button', { name: 'Add to cart' }).click();
      await bikeLight.getByRole('button', { name: 'Add to cart' }).click();

      // ตรวจสอบว่ามีสินค้าในตะกร้า 2 รายการ
      await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    });

    // ขั้นตอนที่ 3: ตรวจสอบ Cart
    await test.step('ตรวจสอบ Cart', async () => {
      await page.locator('.shopping_cart_link').click();

      await expect(page).toHaveURL(/cart\.html/);
      await expect(page.locator('.cart_item')).toHaveCount(2);

      await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
      ).toBeVisible();

      await expect(
        page.getByText('Sauce Labs Bike Light', { exact: true })
      ).toBeVisible();

      // เริ่ม Checkout
      await page.getByRole('button', { name: 'Checkout' }).click();

      await expect(page).toHaveURL(/checkout-step-one\.html/);
    });

    // ขั้นตอนที่ 4: กรอกข้อมูล Checkout
    await test.step('กรอก Checkout Information', async () => {
      await page.locator('[data-test="firstName"]').fill('John');
      await page.locator('[data-test="lastName"]').fill('Doe');
      await page.locator('[data-test="postalCode"]').fill('50000');

      await page.getByRole('button', { name: 'Continue' }).click();

      // ต้องเข้าสู่หน้า Checkout Overview
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });

    // ขั้นตอนที่ 5: ตรวจสอบ Overview และสั่งซื้อ
    await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
      await expect(page.locator('.cart_item')).toHaveCount(2);

      await expect(
        page.getByText('Sauce Labs Backpack', { exact: true })
      ).toBeVisible();

      await expect(
        page.getByText('Sauce Labs Bike Light', { exact: true })
      ).toBeVisible();

      await page.getByRole('button', { name: 'Finish' }).click();
    });

    // ขั้นตอนที่ 6: ตรวจสอบว่าสั่งซื้อสำเร็จ
    await test.step('ตรวจสอบ Order Complete', async () => {
      await expect(page).toHaveURL(/checkout-complete\.html/);

      await expect(
        page.getByText('Thank you for your order!')
      ).toBeVisible();
    });
  }
);
