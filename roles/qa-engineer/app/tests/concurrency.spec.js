import { test, expect } from '@playwright/test';
test('only one simultaneous booking should succeed', async ({ request }) => {

  // Login Member A
  const loginA = await request.post(
    'http://localhost:4000/api/auth/login',
    {
      data: {
        email: process.env.MEMBER_A_EMAIL,
        password: process.env.MEMBER_A_PASSWORD
      }
    }
  );

  expect(loginA.status()).toBe(200);

  const tokenA = (await loginA.json()).token;
  expect(tokenA).toBeTruthy();


  // Login Member B
  const loginB = await request.post(
    'http://localhost:4000/api/auth/login',
    {
      data: {
        email: process.env.MEMBER_B_EMAIL,
        password: process.env.MEMBER_B_PASSWORD
      }
    }
  );

  expect(loginB.status()).toBe(200);

  const tokenB = (await loginB.json()).token;
  expect(tokenB).toBeTruthy();


  // Same slot for both members
  const bookingData = {
    spaceSlug: 'main-hall',
    eventDate: '2026-11-27',
    startTime: '10:00',
    endTime: '11:00',
    attendees: 10,
    purpose: 'Concurrency Test',
    notes: '',
    visibility: 'public',
    addons: []
  };


  // Send both booking requests at the same time
  const [responseA, responseB] = await Promise.all([
    request.post('http://localhost:4000/api/bookings', {
      headers: {
        Authorization: `Bearer ${tokenA}`
      },
      data: bookingData
    }),

    request.post('http://localhost:4000/api/bookings', {
      headers: {
        Authorization: `Bearer ${tokenB}`
      },
      data: bookingData
    })
  ]);


  // Get the results
  const statusA = responseA.status();
  const statusB = responseB.status();

  console.log('Member A status:', statusA);
  console.log('Member B status:', statusB);


  // Exactly one must succeed
  const successfulRequests = [statusA, statusB]
    .filter(status => status === 201)
    .length;

  expect(successfulRequests).toBe(1);


  // The other request must be rejected because of conflict
  const conflictRequests = [statusA, statusB]
    .filter(status => status === 409)
    .length;

  expect(conflictRequests).toBe(1);
});