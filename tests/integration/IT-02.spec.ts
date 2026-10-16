
import { test, expect, BrowserContext, Page } from '@playwright/test';

// Driver ทำหน้าที่เตรียมสถานะ Login
// และเปิดหน้า Inventory โดยตรง
async function driverOpenInventory(
  context: BrowserContext,
  page: Page
) {
  // ขั้นตอนที่ 1: เปิดเว็บไซต์ SauceDemo
  await page.goto('https://www.saucedemo.com/');

  // ขั้นตอนที่ 2: ล้าง Cookie เก่าที่อาจค้างอยู่
  await context.clearCookies();

  // ขั้นตอนที่ 3: ล้าง localStorage เดิม
  await page.evaluate(() => {
    localStorage.clear();
  });

  // ขั้นตอนที่ 4: เพิ่ม Cookie ตามข้อกำหนด
  await context.addCookies([
    {
      name: 'session-username',
      value: 'standard_user',
      domain: 'www.saucedemo.com',
      path: '/',
      httpOnly: false,
      secure: true,
      sameSite: 'Lax',
    },
  ]);

  // ขั้นตอนที่ 5: เตรียมข้อมูลชื่อผู้ใช้ใน localStorage
  await page.evaluate(() => {
    localStorage.setItem('session-username', 'standard_user');
  });

  // ขั้นตอนที่ 6: เปิดหน้า Inventory โดยตรง
  await page.goto('https://www.saucedemo.com/inventory.html');

  // รอให้หน้าเว็บโหลดเอกสาร HTML
  await page.waitForLoadState('domcontentloaded');
}

test(
  'IT-02: DRIVER login state -> REAL Inventory and Cart',
  {
    annotation: {
      type: 'description',
      description:
        'ใช้ Driver เตรียมสถานะ Login แล้วทดสอบ Inventory และ Cart จริง',
    },
  },
  async ({ page, context }) => {
    // ขั้นตอนที่ 1: Driver เตรียมสถานะ Login
    await test.step(
      'Driver เตรียมสถานะ Login และเปิด Inventory',
      async () => {
        await driverOpenInventory(context, page);

        // ตรวจสอบว่าอยู่ในหน้า Inventory
        await expect(page).toHaveURL(/inventory\.html/);

        // ตรวจสอบว่ารายการสินค้าแสดงอยู่
        await expect(page.locator('.inventory_list')).toBeVisible();
      }
    );

    // ขั้นตอนที่ 2: ตรวจสอบจำนวนสินค้า
    await test.step('ตรวจสอบสินค้าครบ 6 รายการ', async () => {
      await expect(page.locator('.inventory_item')).toHaveCount(6);
    });

    // ขั้นตอนที่ 3: เพิ่มสินค้า 2 รายการลงตะกร้า
    await test.step(
      'เพิ่ม Backpack และ Bike Light ลง Cart',
      async () => {
        // ค้นหาสินค้า Sauce Labs Backpack
        const backpack = page
          .locator('.inventory_item')
          .filter({ hasText: 'Sauce Labs Backpack' });

        // เพิ่ม Backpack ลงตะกร้า
        await backpack
          .getByRole('button', { name: 'Add to cart' })
          .click();

        // ค้นหาสินค้า Sauce Labs Bike Light
        const bikeLight = page
          .locator('.inventory_item')
          .filter({ hasText: 'Sauce Labs Bike Light' });

        // เพิ่ม Bike Light ลงตะกร้า
        await bikeLight
          .getByRole('button', { name: 'Add to cart' })
          .click();

        // ตรวจสอบจำนวนสินค้าในตะกร้า
        await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
      }
    );

    // ขั้นตอนที่ 4: เปิด Cart และตรวจสอบสินค้า
    await test.step(
      'เปิด Cart และตรวจสอบสินค้าทั้งสองรายการ',
      async () => {
        // คลิกไอคอนตะกร้าสินค้า
        await page.locator('.shopping_cart_link').click();

        // ตรวจสอบว่าอยู่ในหน้า Cart
        await expect(page).toHaveURL(/cart\.html/);

        // ตรวจสอบว่ามีสินค้า 2 รายการ
        await expect(page.locator('.cart_item')).toHaveCount(2);

        // ตรวจสอบว่ามี Sauce Labs Backpack
        await expect(
          page.getByText('Sauce Labs Backpack', { exact: true })
        ).toBeVisible();

        // ตรวจสอบว่ามี Sauce Labs Bike Light
        await expect(
          page.getByText('Sauce Labs Bike Light', { exact: true })
        ).toBeVisible();
      }
    );
  }
);
