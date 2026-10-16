
import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', {
  annotation: {
    type: 'description',
    description: 'ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()'
  }
}, async ({ page }) => {

  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    // เปิดเว็บไซต์ SauceDemo จริง
    await page.goto('/');

    // กรอก Username และ Password
    await page.locator('[data-test="username"]')
      .fill('standard_user');

    await page.locator('[data-test="password"]')
      .fill('secret_sauce');

    // กด Login
    await page.getByRole('button', { name: 'Login' }).click();

    // ตรวจสอบว่า Login สำเร็จและเข้าสู่หน้า Inventory
    await expect(page).toHaveURL(/inventory\.html/);
  });

  await test.step('สร้าง Inventory Stub', async () => {
    // จำลองหน้า Inventory ด้วย HTML ที่เราสร้างขึ้นเอง
    await page.setContent(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Mock Inventory</title>
        </head>
        <body>
          <h1>Mock Inventory Ready</h1>

          <div class="inventory-item">
            <h2>Mock Backpack</h2>
          </div>

          <div class="inventory-item">
            <h2>Mock Bike Light</h2>
          </div>
        </body>
      </html>
    `);
  });

  await test.step('ตรวจสอบผลจาก Stub', async () => {
    // ตรวจสอบข้อความยืนยันว่า Stub พร้อมใช้งาน
    await expect(
      page.getByRole('heading', { name: 'Mock Inventory Ready' })
    ).toBeVisible();

    // ตรวจสอบว่ามีสินค้าจำลองทั้งหมด 2 รายการ
    await expect(page.locator('.inventory-item'))
      .toHaveCount(2);

    // ตรวจสอบชื่อสินค้าจำลองรายการที่ 1
    await expect(
      page.getByRole('heading', { name: 'Mock Backpack' })
    ).toBeVisible();

    // ตรวจสอบชื่อสินค้าจำลองรายการที่ 2
    await expect(
      page.getByRole('heading', { name: 'Mock Bike Light' })
    ).toBeVisible();
  });

});
