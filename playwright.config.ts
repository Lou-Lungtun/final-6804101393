
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // โฟลเดอร์ที่เก็บไฟล์ทดสอบ
  testDir: './tests',

  // เวลาสูงสุดของแต่ละ Test คือ 30 วินาที
  timeout: 30_000,

  // ไม่ทดสอบซ้ำเมื่อเกิดข้อผิดพลาด
  retries: 0,

  // ทดสอบทีละ 1 Worker เพื่อให้อ่านผลได้ง่าย
  workers: 1,

  // แสดงผลใน Terminal พร้อมสร้าง HTML และ JSON Report
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],

  // ตั้งค่าเว็บไซต์และหลักฐานการทดสอบ
  use: {
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },

  // ใช้ Chromium เพียง Browser เดียวก่อน
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
