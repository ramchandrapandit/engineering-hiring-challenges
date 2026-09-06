# Requirements — QA Engineer

Five deliverables. **D1 to D4 are the must-haves.** Do them properly before anything below.

Everything goes in your own repository, in a `qa/` folder or at the root — your call, just
say where in your README.

---

## D1 — Test plan (`TEST-PLAN.md`)

Written **before** you go deep, and it is fine — good, even — to revise it afterwards and
say what changed.

- **Scope.** What you are testing and, more importantly, **what you are not**, with a
  reason. "I did not test the CSV export in Excel because I do not have it, so the
  byte-order-mark finding is unverified there" is a strong sentence.
- **Risk assessment.** Where do you expect the damage to be, and why? For a building the
  community books and pays for, rank by consequence to the organisation and its members,
  not by how easy the area is to test. Say what informed the ranking.
- **Approach.** Which of exploratory, functional, API, security, concurrency, accessibility,
  compatibility, data-integrity testing you used, and where.
- **Test charters or cases.** Either style is fine. Session-based charters
  ("Explore the cancellation flow with concurrent staff sessions, to discover state
  inconsistencies") are as acceptable as a numbered case table — we want to see structure,
  not a particular template.
- **Environment.** How you ran it, browsers and versions, the OS, and the data state —
  whether each run started from `npm run reset`.
- **Entry and exit criteria.** What would make you say "this is ready for Friday", and what
  would make you say no.

## D2 — Bug reports (`bugs/`)

One file per defect, or one table if you prefer — but each defect gets the full treatment.
Use [`templates/bug-report-template.md`](templates/bug-report-template.md).

Each report needs:

- a **title** a developer can triage without opening the file
- **severity** and **priority**, as two separate judgements, with a sentence of reasoning
- **steps to reproduce** — numbered, exact, from a known state (`npm run reset`), including
  the account used, the data used, and the exact request if it is an API defect
- **expected** result, **with a citation to `SPEC.md`** — section number
- **actual** result, with the evidence: a response body, a screenshot, a log line, a number
- **impact in the client's language.** Not "IDOR on `/api/bookings/:reference`" but "any
  member who signs in can read every other member's home address and phone number, and the
  purpose of the events they marked private, by changing a reference in the URL"
- **environment**
- **suggested fix or area**, if you have one. Optional, and appreciated.
- **acceptance criteria for the fix — on at least one report.** Two or three lines a
  developer can build against and you can verify afterwards: what must be true when this is
  done, including the case that fails today. Agreeing that wording before the work starts is
  half of what this job is; writing it once here shows you can.

**How many?** **Six to ten well-written reports is a complete submission.** We are not
counting — we are looking at whether the serious ones are in there and whether they are
ranked correctly. Ten sharp reports beat thirty thin ones, and thirty thin ones score worse
than ten, because duplicates and §7 behaviour both cost points.

If you are unsure whether something is a defect, **report it as a question** with your
reasoning. That is a real category and we score it positively — it is what you would do on
the job.

## D3 — Automated regression suite

The deliverable that outlives you. **Playwright, Cypress or Selenium**, in TypeScript,
JavaScript or Python — all three frameworks are in daily use here and the choice is not
graded. Use the one you are quickest in, and say in your README why you chose it.

**Requirements:**

- Runs from a documented command, from a clean clone: `npm test` or equivalent
- Runs against the app started per [`app/README.md`](app/README.md) — say whether it expects
  the app already running, or starts it itself
- Resets or accounts for its own data state. A suite that only passes on a fresh database
  and does not say so is a flaky suite
- Deterministic. No `waitForTimeout(3000)` as a synchronisation strategy
- Readable. A developer who has never seen it should be able to add a case
- **Fast enough to run on every push.** State the wall-clock runtime in your README. If it
  is over five minutes, say what you would parallelise or move down to the API layer
- **Locators that survive a redesign.** Roles, labels and test ids rather than a chain of
  `nth-child`. A suite that breaks when a developer moves a `<div>` gets switched off within
  a month, and then it protects nothing
- **It runs in CI.** A workflow in `.github/workflows/` that installs, starts the app and
  runs the suite on every push, with the report kept as an artefact. The app needs Node 24
  and nothing else, so this is a short file. A suite that only runs on your laptop is a
  suite the team stops running

**Required coverage — three things.** Anything beyond them is a bonus:

| Layer | What is required |
|---|---|
| **API** | The fastest, most valuable layer here. A handful of tests covering the defects you found — authorisation, validation, privacy in payloads, totals arithmetic. |
| **Concurrency** | **One** test that fires simultaneous requests and asserts what the spec requires. Worth more than any five UI tests. |
| **UI end-to-end** | **One** flow. Requesting a booking is the obvious choice. One is genuinely enough. |

Accessibility automation, cross-browser runs and load testing are all in the should-have
list. A manual keyboard pass noted in your test plan is worth more than an axe run you did
not read.

**Every regression test must have failed at least once.** Before you submit, check that each
test for a defect you found **fails against the app as shipped**. A test that passes whether
or not the bug is present is worse than no test, because it creates false confidence. Mark
them clearly:

```js
// Fails against 2.3.1 — see bugs/BUG-004-private-event-identifies-member.md
test('a private event exposes no member identity in the public calendar payload', async () => { … });
```

We will run your suite and expect a specific number of failures. Tell us that number in your
README, and tell us which failures are the bugs you found. **A suite that is fully green
against a knowingly broken application is a contradiction, and we read it as one.**

## D4 — Test summary (`TEST-SUMMARY.md`)

The document you would actually send to the technical lead. Use
[`templates/test-summary-template.md`](templates/test-summary-template.md).

- What you tested, in how long, and how
- **The findings table**, ranked by severity, one line each
- **A go / no-go recommendation for Friday, with conditions.** Take a position. "Ship, but
  only after the three critical items, and with self-service cancellation disabled" is a
  real answer.
  "Here are some bugs" is not.
- Coverage gaps and residual risk — what you did not test and what could still bite
- What you would automate next, and what you would ask the developers to change to make the
  application more testable
- **A tooling recommendation — half a page.** You are the first QA hire on a team with no
  automation. Say what you would standardise on and why: which framework, run where, owned
  by whom. Then answer the question directly — **is a code-first suite right here, or does
  an AI-driven platform** (Mabl, Testim, Katalon, Tricentis Tosca, Applitools and the like,
  with their self-healing locators, natural-language authoring and visual comparison)
  **earn its licence on a project this size?** Either answer is right if the reasoning is.
  Say what it would cost, what it would save, and what you would still write by hand. We are
  looking for a position you would defend to a client, not a survey of the market.

This is the document a client-facing lead reads. It is scored as writing as well as
analysis.

## D5 — The video

2–3 minutes. See [`../../docs/06-video-walkthrough.md`](../../docs/06-video-walkthrough.md)
— it has a QA-specific structure. Reproduce one finding live, and show your suite running,
including a test failing against the unfixed bug.

---

## Should-have — if the must-haves are genuinely done

- **Accessibility checks** — `@axe-core/playwright` on the two main pages, plus the manual
  keyboard findings written up. Cheap, and it usually finds something real.
- **A visual check on one page.** Playwright's `toHaveScreenshot`, or an AI comparison tool
  such as Applitools on its free tier. Rendering defects are the ones assertions miss, and
  this app has some. Say what it caught and what it flagged that was noise.
- **One flow built on an AI QA platform** — Mabl, Testim, Katalon or similar, all of which
  have a trial. Author the same booking flow there, run it, and write two paragraphs: what
  it did better than your code, what it did worse, and whether the self-healing held up when
  you changed a selector. This is the best use of your remaining time, because it is the
  judgement the tooling recommendation rests on.
- **A performance or load observation** — k6 or autocannon against the availability endpoint,
  with a number, not a feeling.
- **A cross-browser run** on Chromium, WebKit and Firefox, with the differences noted.
- **A test-data strategy** — factories, fixtures, or a documented approach to the state
  problem, rather than depending on the seed.
- **A defect-prevention note.** One page: given what you found, what would you change about
  how this team works? A pull-request checklist, a schema validation library, a lint rule.
  This is the thinking that separates a tester from a QA engineer.

## Not in scope

- Testing anything outside the provided app. Do not scan or attack any other host.
- Load testing to the point of a denial of service. Note the risk and move on.
- Fixing the bugs. If a fix is one obvious line, mention it in the report — but the
  deliverable is the finding and the test, not a patch.
