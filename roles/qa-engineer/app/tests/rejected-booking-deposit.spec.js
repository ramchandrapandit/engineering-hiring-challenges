import { test, expect } from '@playwright/test';

test('rejected booking should have deposit released or refunded', async ({ request }) => {

  // -----------------------------
  // 1. Login as member
  // -----------------------------
  const memberLogin = await request.post(
    'http://localhost:4000/api/auth/login',
    {
      data: {
        email: 'other@himalayacc.example',
        password: 'other12345'
      }
    }
  );

  expect(memberLogin.status()).toBe(200);

  const memberData = await memberLogin.json();
  const memberToken = memberData.token;

  expect(memberToken).toBeTruthy();

  // -----------------------------
  // 2. Create a new booking
  // -----------------------------
  const bookingResponse = await request.post(
    'http://localhost:4000/api/bookings',
    {
      headers: {
        Authorization: `Bearer ${memberToken}`
      },
      data: {
        spaceSlug: 'main-hall',
        eventDate: '2026-12-27',
        startTime: '13:00',
        endTime: '14:00',
        attendees: 10,
        purpose: 'Deposit Rejection Test',
        notes: '',
        visibility: 'public',
        addons: []
      }
    }
  );

  console.log('Booking creation status:', bookingResponse.status());
  console.log('Booking creation response:', await bookingResponse.text());

  expect(bookingResponse.status()).toBe(201);

  const bookingData = await bookingResponse.json();

  const reference = bookingData.reference;

  console.log('Booking reference:', reference);

  expect(reference).toBeTruthy();

  // -----------------------------
  // 3. Login as staff
  // -----------------------------
  const staffLogin = await request.post(
    'http://localhost:4000/api/auth/login',
    {
      data: {
        email: 'staff@himalayacc.example',
        password: 'staff12345'
      }
    }
  );

  expect(staffLogin.status()).toBe(200);

  const staffData = await staffLogin.json();
  const staffToken = staffData.token;

  expect(staffToken).toBeTruthy();

  // -----------------------------
  // 4. Reject the booking
  // -----------------------------
  const rejectResponse = await request.post(
    `http://localhost:4000/api/staff/bookings/${reference}/reject`,
    {
      headers: {
        Authorization: `Bearer ${staffToken}`
      }
    }
  );

  console.log('Reject status:', rejectResponse.status());

  const rejectBody = await rejectResponse.text();
  console.log('Reject response:', rejectBody);

  expect(rejectResponse.status()).toBe(200);

  // -----------------------------
  // 5. TODO: Verify deposit status
  // -----------------------------
  const myBookingsResponse = await request.get(
  'http://localhost:4000/api/my/bookings',
  {
    headers: {
      Authorization: `Bearer ${memberToken}`
    }
  }
);

console.log('My bookings status:', myBookingsResponse.status());

expect(myBookingsResponse.status()).toBe(200);

const myBookingsData = await myBookingsResponse.json();

const rejectedBooking = myBookingsData.bookings.find(
  booking => booking.reference === reference
);

console.log('Rejected booking:', rejectedBooking);

expect(rejectedBooking).toBeTruthy();

// Booking should be rejected
expect(rejectedBooking.status).toBe('rejected');

// Deposit should NOT remain held
expect(rejectedBooking.deposit.status).toMatch(/refunded|released/);


});