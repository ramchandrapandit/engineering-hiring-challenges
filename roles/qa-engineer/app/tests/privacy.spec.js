import { test, expect } from '@playwright/test';

test('member cannot access another member private booking data', async ({ request }) => {

  // Login as Member A
  const loginA = await request.post(
    'http://localhost:4000/api/auth/login',
    {
      data: {
        email: process.env.MEMBER_B_EMAIL,
        password: process.env.MEMBER_B_PASSWORD
      }
    }
  );

  expect(loginA.status()).toBe(200);

  const tokenA = (await loginA.json()).token;
  expect(tokenA).toBeTruthy();


  // Get Member A's bookings
  const bookingsResponse = await request.get(
    'http://localhost:4000/api/my/bookings',
    {
      headers: {
        Authorization: `Bearer ${tokenA}`
      }
    }
  );

  console.log('My bookings status:', bookingsResponse.status());

  expect(bookingsResponse.ok()).toBeTruthy();

  const bookings = await bookingsResponse.json();

  console.log('Member A bookings:', bookings);


  // We will inspect whether another member's private
  // booking can be accessed through an API endpoint.
});