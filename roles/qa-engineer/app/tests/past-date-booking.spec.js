import { test, expect } from '@playwright/test';

test('booking with a past event date should be rejected', async ({ request }) => {

  // Login as member
  const loginResponse = await request.post(
    'http://localhost:4000/api/auth/login',
    {
      data: {
        email: 'other@himalayacc.example',
        password: 'other12345'
      }
    }
  );

  expect(loginResponse.status()).toBe(200);

  const loginData = await loginResponse.json();
  const token = loginData.token;

  expect(token).toBeTruthy();

  // Attempt booking for a past date
  const bookingResponse = await request.post(
    'http://localhost:4000/api/bookings',
    {
      headers: {
        Authorization: `Bearer ${token}`
      },
      data: {
        spaceSlug: 'main-hall',
        eventDate: '2026-09-08',
        startTime: '10:00',
        endTime: '11:00',
        attendees: 10,
        purpose: 'Past Date Test',
        notes: '',
        visibility: 'public',
        addons: []
      }
    }
  );

  console.log('Booking status:', bookingResponse.status());

  const responseBody = await bookingResponse.text();
  console.log('Response:', responseBody);

  // Requirement: past dates must be rejected with 422
  expect(bookingResponse.status()).toBe(422);
});