# Software Testing Project: Playwright + TypeScript

## 1. Project Overview

โปรเจกต์นี้จัดทำขึ้นเพื่อฝึกปฏิบัติการทดสอบซอฟต์แวร์ (Software Testing) โดยใช้ Playwright ร่วมกับ TypeScript ในการทดสอบเว็บไซต์ SauceDemo

การทดสอบแบ่งออกเป็น 3 ระดับ ได้แก่

- **Unit Testing (UT):** ทดสอบการทำงานเฉพาะส่วน เช่น การตรวจสอบข้อมูลในหน้า Login และการเพิ่มหรือลบสินค้า
- **Integration Testing (IT):** ทดสอบการทำงานร่วมกันของส่วนต่าง ๆ โดยใช้แนวทาง Top-Down และ Bottom-Up
- **System Testing (ST):** ทดสอบการทำงานของระบบตั้งแต่การเข้าสู่ระบบจนถึงการสั่งซื้อสินค้า รวมถึงการตรวจสอบข้อมูลที่จำเป็นในขั้นตอน Checkout

เป้าหมายของโปรเจกต์คือการฝึกเขียน Automated Test ตรวจสอบผลลัพธ์ที่คาดหวัง และสร้างรายงานผลการทดสอบด้วย Playwright

## 2. Objectives

1. เรียนรู้การเขียน Automated Test ด้วย Playwright และ TypeScript
2. ทดสอบการตรวจสอบข้อมูลในหน้า Login
3. ทดสอบการเพิ่มและลบสินค้าจากตะกร้าสินค้า
4. เรียนรู้การทดสอบแบบ Top-Down Integration Testing
5. เรียนรู้การทดสอบแบบ Bottom-Up Integration Testing
6. ทดสอบกระบวนการสั่งซื้อสินค้าตั้งแต่ Login จนถึงการยืนยันคำสั่งซื้อ
7. ทดสอบการตรวจสอบข้อมูลที่จำเป็นในหน้า Checkout
8. สร้างรายงานผลการทดสอบในรูปแบบ HTML และ JSON

## 3. Tools and Technologies

- **Playwright Test:** ใช้เขียนและรัน Automated Test
- **TypeScript:** ใช้เขียนโค้ดทดสอบ
- **Node.js:** ใช้สำหรับรันสภาพแวดล้อม JavaScript
- **npm:** ใช้จัดการแพ็กเกจของโปรเจกต์
- **Chromium:** Browser ที่ใช้รันทดสอบ
- **HTML Reporter:** ใช้แสดงรายงานผลการทดสอบในรูปแบบหน้าเว็บ
- **JSON Reporter:** ใช้บันทึกผลการทดสอบเป็นข้อมูล JSON

## 4. Application Under Test

เว็บไซต์ที่ใช้ในการทดสอบคือ SauceDemo

URL: https://www.saucedemo.com/

เว็บไซต์นี้ใช้สำหรับทดสอบการเข้าสู่ระบบ การแสดงรายการสินค้า การจัดการตะกร้าสินค้า และกระบวนการ Checkout

บัญชีทดสอบที่ใช้ในกรณีทดสอบที่ต้องเข้าสู่ระบบ:

- Username: `standard_user`
- Password: `secret_sauce`

หมายเหตุ: ข้อมูลบัญชีข้างต้นเป็นบัญชีทดสอบของเว็บไซต์ SauceDemo ไม่ใช่ข้อมูลบัญชีส่วนตัว

## 5. Project Structure

```text
final-exam/
├── tests/
│   ├── unit/
│   │   ├── UT-01.spec.ts
│   │   └── UT-02.spec.ts
│   ├── integration/
│   │   ├── IT-01.spec.ts
│   │   └── IT-02.spec.ts
│   ├── system/
│   │   ├── ST-01.spec.ts
│   │   └── ST-02.spec.ts
│   └── example.spec.ts
├── reports/
│   └── results.json
├── playwright-report/
│   └── index.html
├── playwright.config.ts
├── package.json
├── package-lock.json
└── README.md
```

หมายเหตุ: โครงสร้างข้างต้นแสดงไฟล์หลักที่เกี่ยวข้องกับโปรเจกต์ โดยไฟล์รายงานจะปรากฏหลังจากรันการทดสอบสำเร็จตามการตั้งค่า Reporter และไฟล์ `example.spec.ts` เป็นไฟล์ตัวอย่างที่ Playwright สร้างไว้ตอนเริ่มโปรเจกต์ ไม่ใช่หนึ่งในไฟล์ทดสอบหลักของงานนี้

## 6. Test Cases

### 6.1 Unit Testing

#### UT-01: Login Form Validation

ไฟล์: `tests/unit/UT-01.spec.ts`

ทดสอบการตรวจสอบข้อมูลในหน้า Login จำนวน 3 กรณี

1. **UT-01.1: Empty username and password**
   - เว้นช่อง Username และ Password ว่าง
   - ตรวจสอบว่าระบบแสดงข้อความแจ้งเตือนเมื่อไม่ได้กรอกข้อมูล

2. **UT-01.2: Missing password**
   - กรอก Username แต่ไม่กรอก Password
   - ตรวจสอบว่าระบบแจ้งเตือนเมื่อข้อมูลไม่ครบ

3. **UT-01.3: Invalid login details**
   - กรอกข้อมูลเข้าสู่ระบบที่ไม่ถูกต้อง
   - ตรวจสอบว่าระบบไม่อนุญาตให้เข้าสู่ระบบและแสดงข้อความแจ้งเตือน

#### UT-02: Add and Remove Product

ไฟล์: `tests/unit/UT-02.spec.ts`

ทดสอบการเพิ่มและลบสินค้า Sauce Labs Backpack จากตะกร้าสินค้า โดยตรวจสอบการเปลี่ยนแปลงของปุ่มและจำนวนสินค้าในตะกร้า

### 6.2 Integration Testing

#### IT-01: Top-Down Integration Testing

ไฟล์: `tests/integration/IT-01.spec.ts`

ทดสอบโดยเริ่มจากกระบวนการ Login จริง จากนั้นใช้ Inventory Stub จำลองส่วนแสดงรายการสินค้า เพื่อทดสอบการทำงานจากส่วนบนลงสู่ส่วนล่าง (Top-Down)

วัตถุประสงค์คือฝึกทดสอบการเชื่อมต่อระหว่างส่วนการทำงาน โดยจำลองส่วนที่ยังไม่ได้นำมาทดสอบจริงด้วย Stub

#### IT-02: Bottom-Up Integration Testing

ไฟล์: `tests/integration/IT-02.spec.ts`

ทดสอบโดยใช้ Driver เตรียมสถานะการเข้าสู่ระบบ แล้วเปิดหน้า Inventory เพื่อทดสอบการทำงานของรายการสินค้าและตะกร้าสินค้าจริง

ขั้นตอนหลัก:

1. เตรียมสถานะ Login ด้วย Cookie และ localStorage
2. เปิดหน้า Inventory โดยตรง
3. ตรวจสอบว่ามีสินค้า 6 รายการ
4. เพิ่ม Sauce Labs Backpack และ Sauce Labs Bike Light ลงในตะกร้า
5. ตรวจสอบว่าจำนวนสินค้าในตะกร้าเท่ากับ 2
6. เปิดหน้า Cart และตรวจสอบว่าสินค้าทั้งสองรายการปรากฏอยู่

### 6.3 System Testing

#### ST-01: Complete Purchase of Two Products

ไฟล์: `tests/system/ST-01.spec.ts`

ทดสอบกระบวนการสั่งซื้อสินค้าตั้งแต่ต้นจนจบ (End-to-End)

ขั้นตอนหลัก:

1. เข้าสู่ระบบด้วยบัญชีทดสอบ
2. เพิ่ม Sauce Labs Backpack ลงในตะกร้า
3. เพิ่ม Sauce Labs Bike Light ลงในตะกร้า
4. เปิดหน้า Cart และตรวจสอบสินค้า
5. เริ่มขั้นตอน Checkout
6. กรอกข้อมูลผู้ซื้อ ได้แก่ First Name, Last Name และ Postal Code
7. ตรวจสอบข้อมูลในหน้า Checkout Overview
8. ยืนยันคำสั่งซื้อด้วยปุ่ม Finish
9. ตรวจสอบข้อความยืนยัน `Thank you for your order!`

#### ST-02: Checkout Validation and Recovery

ไฟล์: `tests/system/ST-02.spec.ts`

ทดสอบการตรวจสอบข้อมูลที่จำเป็นในหน้า Checkout และการแก้ไขข้อมูลให้ถูกต้องจนสามารถสั่งซื้อสำเร็จ

ขั้นตอนหลัก:

1. เข้าสู่ระบบและเพิ่ม Sauce Labs Backpack ลงในตะกร้า
2. เปิดหน้า Checkout
3. ไม่กรอก First Name และตรวจสอบข้อความ `Error: First Name is required`
4. กรอก First Name แต่ไม่กรอก Last Name แล้วตรวจสอบข้อความ `Error: Last Name is required`
5. กรอก Last Name แต่ไม่กรอก Postal Code แล้วตรวจสอบข้อความ `Error: Postal Code is required`
6. กรอกข้อมูลที่จำเป็นให้ครบ
7. ดำเนินการไปยังหน้า Checkout Overview
8. ยืนยันคำสั่งซื้อ
9. ตรวจสอบข้อความยืนยัน `Thank you for your order!`

## 7. Playwright Configuration

ไฟล์: `playwright.config.ts`

การตั้งค่าหลักของโปรเจกต์:

- `testDir: './tests'` กำหนดโฟลเดอร์ที่เก็บไฟล์ทดสอบ
- `timeout: 30_000` กำหนดเวลา Timeout ของการทดสอบแต่ละรายการเป็น 30 วินาที
- `retries: 0` ไม่ให้ลองทดสอบซ้ำโดยอัตโนมัติเมื่อทดสอบไม่ผ่าน
- `workers: 1` ให้รันทดสอบทีละ Worker
- `baseURL: 'https://www.saucedemo.com'` กำหนด URL หลักของเว็บไซต์
- `screenshot: 'only-on-failure'` บันทึกภาพหน้าจอเมื่อการทดสอบไม่ผ่าน
- `trace: 'retain-on-failure'` เก็บ Trace เมื่อการทดสอบไม่ผ่าน
- `video: 'retain-on-failure'` เก็บวิดีโอเมื่อการทดสอบไม่ผ่าน

Reporter ที่ใช้:

- `list` แสดงผลการทดสอบใน Terminal
- `html` สร้างรายงาน HTML ในโฟลเดอร์ `playwright-report`
- `json` บันทึกผลการทดสอบในไฟล์ `reports/results.json`

## 8. Installation and Setup

### Prerequisites

ติดตั้งโปรแกรมต่อไปนี้ก่อนเริ่มใช้งาน:

- Node.js
- npm
- Visual Studio Code หรือ Code Editor ที่รองรับ TypeScript

### Install Dependencies

เปิด Terminal ในโฟลเดอร์โปรเจกต์ แล้วรันคำสั่ง:

```bash
npm install
```

### Install Playwright Browser

ติดตั้ง Chromium สำหรับการทดสอบ:

```bash
npx playwright install chromium
```

หากโฟลเดอร์ `reports` ยังไม่มี ให้สร้างโฟลเดอร์ก่อนรันการทดสอบ:

```powershell
New-Item -ItemType Directory -Force reports
```

## 9. Running Tests

### Run All Tests

รันการทดสอบทั้งหมด:

```bash
npx playwright test
```

### Run Unit Tests

```bash
npx playwright test tests/unit
```

### Run Integration Tests

```bash
npx playwright test tests/integration
```

### Run System Tests

```bash
npx playwright test tests/system
```

### Run a Specific Test File

ตัวอย่างการรัน UT-01:

```bash
npx playwright test tests/unit/UT-01.spec.ts
```

## 10. Test Reports

หลังจากรันการทดสอบ ให้ตรวจสอบรายงานที่สร้างขึ้น

### HTML Report

ไฟล์รายงาน:

`playwright-report/index.html`

เปิดรายงานด้วยคำสั่ง:

```bash
npx playwright show-report
```

รายงาน HTML ใช้ตรวจสอบจำนวนการทดสอบที่ผ่านและไม่ผ่าน รายละเอียดของแต่ละ Test และข้อมูลประกอบเมื่อเกิดข้อผิดพลาด

### JSON Report

ไฟล์รายงาน:

`reports/results.json`

ไฟล์นี้เก็บผลการทดสอบในรูปแบบ JSON ซึ่งสามารถนำไปอ่านหรือประมวลผลด้วยโปรแกรมอื่นได้

## 11. Test Execution Summary

ผลการทดสอบครั้งล่าสุดที่บันทึกไว้ใน Terminal:

- Total tests: 10
- Passed: 10
- Failed: 0

ผลดังกล่าวรวมการทดสอบตัวอย่างจาก `tests/example.spec.ts` จำนวน 2 รายการด้วย ดังนั้นมีการทดสอบที่เกี่ยวข้องกับชุดทดสอบหลักของงานนี้ 8 รายการ

หมายเหตุ: ควรรัน `npx playwright test` อีกครั้งก่อนส่งงาน เพื่อยืนยันผลล่าสุด และอัปเดตตัวเลขในหัวข้อนี้หากผลการทดสอบเปลี่ยนแปลง

## 12. Expected Results

ผลลัพธ์ที่คาดหวังจากการทดสอบ:

- ระบบแจ้งเตือนเมื่อกรอกข้อมูล Login ไม่ครบหรือไม่ถูกต้อง
- สามารถเพิ่มและลบสินค้าออกจากตะกร้าสินค้าได้
- สามารถตรวจสอบจำนวนและชื่อสินค้าในตะกร้าได้
- สามารถทดสอบการเชื่อมต่อส่วนต่าง ๆ ด้วยแนวทาง Top-Down และ Bottom-Up
- ระบบแจ้งเตือนเมื่อไม่ได้กรอกข้อมูลที่จำเป็นในหน้า Checkout
- เมื่อกรอกข้อมูลครบถ้วน จะสามารถดำเนินการสั่งซื้อจนถึงขั้นตอนยืนยันคำสั่งซื้อได้
- มีรายงานผลการทดสอบในรูปแบบ HTML และ JSON

## 13. Conclusion

โปรเจกต์นี้เป็นการฝึกปฏิบัติการทดสอบซอฟต์แวร์ด้วย Playwright และ TypeScript ครอบคลุม Unit Testing, Integration Testing และ System Testing

การทดสอบช่วยตรวจสอบการทำงานของหน้า Login การจัดการสินค้าในตะกร้า การทำงานร่วมกันของส่วนต่าง ๆ และกระบวนการ Checkout ตั้งแต่เริ่มต้นจนถึงการยืนยันคำสั่งซื้อ

นอกจากนี้ ยังมีการตั้งค่า Reporter เพื่อบันทึกผลการทดสอบทั้งในรูปแบบ HTML และ JSON ทำให้สามารถตรวจสอบผลการทดสอบและใช้เป็นหลักฐานประกอบการส่งงานได้

