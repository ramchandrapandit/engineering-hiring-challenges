# QA Engineer — the short version

**If we sent you here, this file is your brief and it overrides the rest of the folder.**
[`REQUIREMENTS.md`](REQUIREMENTS.md) asks for five full deliverables and five to eight hours.
This asks for less. Where the two disagree, this one wins, and nothing here counts against
you for being smaller.

| | |
|---|---|
| **Clock** | 48 hours from the email that sent you this link |
| **Expected work** | About four hours. Please do not spend more. |
| **The app** | [`app/`](app/) — one command to run, no build step |
| **The spec** | [`app/SPEC.md`](app/SPEC.md) — the source of truth for what is a defect |

## Read these three, then start

| File | Why |
|---|---|
| [`SETUP.md` → Step 0](SETUP.md#step-0--get-your-machine-ready-10-minutes-do-it-first) | Node 24, Docker, Git. Ten minutes. |
| [`app/README.md`](app/README.md) | How to run it, the accounts, and the seeded totals you can check by hand. |
| [`app/SPEC.md`](app/SPEC.md) | What counts as a defect. **§7 lists behaviour that looks wrong and is deliberate** — reporting those costs marks. |

## The scenario

A small studio hands you version 2.3.1 of **Sabhaghar Booking**, the hall and facility
booking system for a cultural centre. It goes live on Friday and wedding season starts the
week after. Nobody has tested it. Tell us what we are walking into, and leave something
behind that stops it happening again.

There are defects in it on purpose. How many, and where, is not stated.

---

## What to hand in

Five things. All of them small.

### 1. Five bug reports, ranked worst-first

One file each, or one table — your call. At least one of them should be a defect that is
**not visible in the interface**.

Each needs enough for a developer to fix it without asking you a question:

- a title they can triage without opening the file
- **severity and priority as two separate judgements**, one sentence of reasoning
- numbered steps from a known state (`npm run reset`), naming the account and the data used
- **expected, with a section number from `SPEC.md`** — cite the spec, not your opinion
- actual, with the evidence: a response body, a screenshot, a number
- **impact in the client's language.** Not "IDOR on `/api/bookings/:reference`" but "any
  member who signs in can read every other member's home address by changing a reference"

[`templates/bug-report-template.md`](templates/bug-report-template.md) shows the shape. Use
it or don't.

**Five good ones beat twenty-five thin ones.** Duplicates cost points, and so does reporting
something from §7.

### 2. Five automated tests

- **three API tests**
- **one concurrency test** — two members requesting the same slot at the same moment
- **one UI flow**

**Playwright, Cypress or Selenium**, in **TypeScript, JavaScript or Python**. All of them
are in daily use here and the choice is not graded — use whichever you are quickest in, and
say in your README why you picked it.

At least one test should be **red against the app as shipped**, labelled with the bug it
covers. A suite that has never been red proves nothing.

### 3. A CI workflow

Twenty lines. Runs those five tests on push. **You must have seen it go green.** A suite
that only runs on your laptop is one nobody runs by March.

### 4. A one-page summary

`TEST-SUMMARY.md`. What you covered, what you deliberately did not and why, and then the
only question that matters:

> **Would you let this go live on Friday?** If yes, on what conditions. If no, what has to
> change first.

Give an answer. "It depends" is not one.

### 5. A 2–3 minute video

Screen and voice. Walk us through what you found and show one test running. Rough is fine —
we are not marking the production.

---

## What to skip

Explicitly not wanted, and not scored:

- the full two-page test plan (D1)
- the write-up on what you would standardise this team on
- load testing, performance testing, a cross-browser matrix
- an AI tooling trial
- more than five bugs, or more than five tests

Doing any of it does not earn extra credit. Time spent there is time not spent on the five
above.

---

## Where the marks actually are

Not "how many bugs did you find". Three things:

1. **Judgement.** A member's home address exposed to any signed-in user is not the same
   class of problem as a misaligned button. A report that lists them next to each other
   tells us you cannot tell the difference.
2. **Rigour.** Can a developer reproduce your bug from your report, first read, without
   asking you a question?
3. **Leverage.** Does the suite protect the codebase, or does it assert that a page has a
   title?

### Where we would spend the four hours

- **The API payloads, not just the screens.** Several defects are only visible in a response
  body. That is the largest hint in this file.
- **Two people at once.** One member booking a room while another books the same slot.
  `SPEC.md` §5 calls this the single most important rule in the document. One test here is
  worth more than five UI tests.
- **The numbers.** [`app/README.md`](app/README.md) lists the seeded totals — hours, fees,
  deposits. Work them out from `src/seed/bookings.csv` yourself before you trust what the
  screens tell you.
- **Who can see what.** A member must never be able to read another member's booking or
  personal details, and a private event must not leak the member's name in any field.

---

## Submitting

Follow [`../../SUBMISSION.md`](../../SUBMISSION.md), with the reduced list above in place of
the five deliverables it describes.

## Two things worth saying out loud

**You may use AI tools.** We do. One rule: you have to be able to explain every line you
submit, and we will ask.

**If 48 hours does not fit around your week, say so and we will move it.** That has never
counted against anybody. Neither does asking a question — reply to the email that sent you
here.
