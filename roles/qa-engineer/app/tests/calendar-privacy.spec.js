import { test, expect } from '@playwright/test';

test('public calendar should not expose private booking details', async ({ request }) => {
  const response = await request.get(
    'http://localhost:4000/api/calendar'
  );

  expect(response.status()).toBe(200);

  const data = await response.json();

  console.log('Response keys:', Object.keys(data));

  const events = data.events;

  expect(Array.isArray(events)).toBeTruthy();

  const privateEvents = events.filter(
    event => event.visibility === 'private'
  );

  console.log('Private events exposed:', privateEvents);

  // Public calendar must not expose private events.
  expect(privateEvents.length).toBe(0);
});