# Pre-submission checklist — QA Engineer

Do this before you record the video, so the video shows the finished version.

## The suite

- [ ] Fresh clone, `npm install`, my documented command — the suite runs
- [ ] My README says whether the app must already be running, and on which port
- [ ] I ran `npm run reset` in `app/` and then my suite, twice, and got the same result
- [ ] **Every regression test I wrote for a defect has been seen to FAIL against 2.3.1**
- [ ] Each failing test names the bug report it covers, in a comment or the test name
- [ ] My README states **how many tests fail and why** — a green suite against a broken app
      is a contradiction and I have not shipped one
- [ ] No `waitForTimeout` used as a synchronisation strategy
- [ ] Test names describe behaviour, not endpoints
- [ ] Locators are roles, labels or test ids — nothing that breaks when a `<div>` moves
- [ ] **The CI workflow has actually run and I have seen it pass** — a workflow file nobody
      has run is not a pipeline
- [ ] My README states the wall-clock runtime of the suite

## Coverage

- [ ] There is at least one **API** test
- [ ] There is at least one **authorisation** test using two different accounts
- [ ] There is at least one **concurrency** test firing simultaneous requests
- [ ] There is at least one **end-to-end UI** flow
- [ ] *(Optional)* an accessibility check, or a manual keyboard pass written into the plan
- [ ] I checked the hours, fees and deposit totals **by hand** against `app/README.md`

## The findings

- [ ] Every report has numbered steps from a known state, naming the account and the data
- [ ] Every expected result cites a **`SPEC.md` section number**
- [ ] Every report has real evidence — a payload, a number, a screenshot, a log line
- [ ] Severity and priority are two separate judgements, each with a reason
- [ ] Impact is written so a board member would understand the consequence
- [ ] Findings are **ranked**, most serious first
- [ ] **I re-read `SPEC.md` §7** and none of my reports is documented behaviour
- [ ] No two reports describe the same underlying defect
- [ ] Anything I was unsure about is filed as a question, with my reasoning
- [ ] At least one report carries **acceptance criteria for the fix** a developer could build
      against

## The write-up

- [ ] `TEST-PLAN.md` — scope, **out of scope with reasons**, risk ranking, approach, environment
- [ ] `TEST-SUMMARY.md` — ranked table, coverage gaps, **and a go/no-go recommendation with
      conditions**. I took a position.
- [ ] I said what I did not test and what the residual risk is
- [ ] `TEST-SUMMARY.md` ends with the **tooling recommendation** — code-first or an
      AI-driven platform, chosen, priced and defended
- [ ] `AI-USAGE.md` exists and is honest and specific
- [ ] More than one commit, human messages, nothing called `final`

## Delivery

- [ ] Video is 2–3 minutes, reproduces one finding live, and shows a test failing
- [ ] Video link opens in a private browser window
- [ ] Repo is public, or private with `@sandesPathak` invited
- [ ] Zip named `FirstName_LastName.zip`, excludes `node_modules`, includes `.git`
- [ ] Email subject: `QA Challenge — FirstName LastName`
