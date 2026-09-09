import { test, expect } from '@playwright/test';

test('BUG-008: CSV export should contain UTF-8 BOM', async ({ request }) => {

  // 1. Login as staff
  const loginResponse = await request.post(
    'http://localhost:4000/api/auth/login',
    {
      data: {
        email: 'staff@himalayacc.example',
        password: 'staff12345'
      }
    }
  );

  expect(loginResponse.status()).toBe(200);

  // 2. Get authentication cookies from the login response
  const cookies = await loginResponse.headers()['set-cookie'];

  expect(cookies).toBeTruthy();

  // 3. Request CSV using the authenticated session
  const csvResponse = await request.get(
    'http://localhost:4000/api/staff/bookings.csv',
    {
      headers: {
        Cookie: cookies
      }
    }
  );

  expect(csvResponse.status()).toBe(200);

  // 4. Read the raw CSV bytes
  const body = await csvResponse.body();

  // 5. UTF-8 BOM must be EF BB BF
  const hasBom =
    body.length >= 3 &&
    body[0] === 0xef &&
    body[1] === 0xbb &&
    body[2] === 0xbf;

  console.log(
    'First three bytes:',
    body[0].toString(16),
    body[1].toString(16),
    body[2].toString(16)
  );

  // 6. BUG-008 assertion
  expect(hasBom).toBeTruthy();
});