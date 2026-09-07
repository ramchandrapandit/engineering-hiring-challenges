# Rubric — QA Engineer

100 points. Two reviewers score independently, then compare. This is the actual sheet.

| Category | Points |
|---|---|
| 1. It runs — from a clean clone, and in CI | 20 |
| 2. Defect discovery and reporting | 30 |
| 3. Test strategy, judgement and tooling | 15 |
| 4. Security & data-integrity findings | 15 |
| 5. Documentation & commits | 10 |
| 6. Video walkthrough | 10 |

---

## 1. It runs — 20 points

Your automated suite, from a clean clone, following your README — and on a push.

| | |
|---|---|
| **20** | Clone, install, one documented command, and the suite runs against the app. Results are legible. Failures are the bugs you found, and your README says how many to expect. A CI workflow runs the same suite on push, with the report as an artefact. |
| **16** | All of the above locally, but no CI workflow, or one that has never been seen to pass. |
| **12** | Runs, but needed a step your README did not mention. |
| **8** | Runs after we work out the data state or the app-startup order. |
| **4** | Runs partially, or is heavily flaky across two runs. |
| **0** | We could not run it. |

Test it from a clean clone. It takes twenty minutes and it is the largest single category.
The CI workflow is a short file — the app needs Node 24 and nothing else — and a suite the
team does not run on every push stops being a regression suite within a month.

## 2. Defect discovery and reporting — 30 points

**Discovery — 15.** Scored on coverage across the defect classes, weighted by severity. We
know exactly what is in the build and where. Finding the serious ones matters far more than
finding a lot.

| | |
|---|---|
| **13–15** | Found the majority of the serious defects, including at least one that requires concurrency or reading a payload rather than a page. |
| **9–12** | Found most of the visible defects and at least one that is not visible in the interface. |
| **5–8** | Found the surface defects only. Nothing from the API or the concurrency layer. |
| **0–4** | Shallow, or largely duplicates and §7 behaviour. |

**Report quality — 12.** Judged on the two or three reports we pick at random.

| | Points |
|---|---|
| Steps a developer reproduces first read, from a known state | 4 |
| Expected result cited to a `SPEC.md` section, not to your opinion | 2 |
| Real evidence — payload, number, screenshot, log line | 2 |
| Severity and priority as two judgements, with reasoning | 2 |
| Impact stated in the client's language, not only the mechanism | 1 |
| Acceptance criteria for the fix, on at least one report | 1 |

**Ranking — 3.** Is the most serious thing at the top? Would a lead reading only the first
three findings know the worst of it?

**Deductions:** each defect reported that is documented behaviour in `SPEC.md` §7 costs
**−2** (maximum −6). Duplicate reports of one underlying defect cost **−1** each.

## 3. Test strategy, judgement and tooling — 15 points

| | Points |
|---|---|
| A plan with **scope, and explicit out-of-scope with reasons** | 3 |
| Risk ranking that reflects consequence to the organisation, with the reasoning shown | 3 |
| Suite structured by value — the required API, concurrency and one UI test, not everything through the UI | 4 |
| Every regression test has been verified to fail against the shipped build | 2 |
| Coverage gaps named honestly in the summary | 1 |
| A tooling recommendation that takes a position on code-first versus an AI-driven platform, with a reason a client would accept | 2 |

A submission that says "I did not test X, here is why, and here is the residual risk"
outscores one that quietly did not test X.

## 4. Security & data-integrity findings — 15 points

The classes that would hurt a real member. Scored on whether you found them, and on whether
your report conveys the impact to somebody non-technical.

| Class | Points |
|---|---|
| Broken authorisation — one member reading another's records | 4 |
| Personal data leaving the server that should not have | 3 |
| A forgeable or non-expiring credential | 3 |
| Member-supplied content rendered unescaped | 2 |
| Money or aggregate arithmetic that is wrong | 2 |
| Input validation that lets impossible data into the database | 1 |

**Bonus +3** for a working concurrency proof: a test that demonstrates the same resource
being handed to more than one caller, with the evidence.

## 5. Documentation & commits — 10 points

| | Points |
|---|---|
| `TEST-SUMMARY.md` with a ranked findings table and a **go/no-go recommendation with conditions** | 4 |
| `TEST-PLAN.md` that is a plan, not a list of clicks | 2 |
| README a stranger runs the suite from | 2 |
| Commit history: multiple coherent commits, human messages | 1 |
| `AI-USAGE.md` present and specific | 1 |

## 6. Video walkthrough — 10 points

| | Points |
|---|---|
| 2–3 minutes, link opens without an account | 2 |
| One finding reproduced live on screen | 3 |
| The suite shown running, including a test failing against the unfixed bug | 3 |
| Coverage strategy and what you would do next | 2 |

---

## Bonus — up to +8, only when the must-haves are complete

| | |
|---|---|
| One flow authored on an AI QA platform, with a verdict on whether the self-healing held | +3 |
| A visual check on one page, with what it caught and what was noise | +2 |
| Accessibility checks automated, with the manual keyboard findings written up | +2 |
| A defect-prevention note — what you would change about how the team works | +2 |
| Cross-browser run with the differences noted | +1 |
| A load or performance observation with an actual number | +1 |
| A test-data strategy beyond depending on the seed | +1 |

---

## Worked examples

**A 93.** Suite runs first command. Eleven findings, ranked, the top three being an
authorisation break, a member-identity leak in the public calendar payload, and a race that
gives one room to ten simultaneous requests, with the proof. Each report cites a spec
section. The summary says "no-go for Friday unless the three critical items are fixed;
self-service cancellation should be disabled regardless" and explains what that costs the client. Eighteen automated tests, six failing,
each one labelled with the bug it covers. A CI workflow that has been green. The tooling
note says code-first here, an AI platform when the team is five and nobody owns the suite,
and prices both. The video reproduces the race in forty seconds.

**A 71.** Suite runs after we install a browser their README did not mention, and only on
their laptop — no CI workflow. Nine findings,
two of them the same underlying defect, and one is documented §7 behaviour. Reports are
solid, with steps and evidence, but expected results are asserted rather than cited. The
suite is all UI, no API, so it is slow and slightly flaky. The summary lists findings
without a recommendation. Good tester, and the interview is about depth.

**A 44.** Twenty-two Playwright tests, all green against an app we know is broken, because
they assert that pages load. Six findings, all cosmetic. Nothing from the API layer. The
report titles are "Issue 1", "Issue 2". No summary. The instinct to automate is there and
the judgement about what to automate is not, which is the whole job.
