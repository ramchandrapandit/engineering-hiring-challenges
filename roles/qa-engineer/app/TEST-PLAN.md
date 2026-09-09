# Test Plan — Sabhaghar Booking

## 1. Objective

The objective of this test effort is to assess the functional correctness, security,
data integrity, and reliability of Sabhaghar Booking v2.3.1 against the requirements
defined in `app/SPEC.md`.

The primary focus is on identifying high-risk defects that could affect:

- Booking availability and double-booking
- Authentication and authorization
- Member privacy and data exposure
- Booking validation
- Pricing, deposits, and financial calculations
- Dates and time-slot rules
- Staff booking workflows
- Search, filtering, pagination, and export
- User-supplied content rendering
- Accessibility and responsive behaviour

Each reported defect will include reproducible steps, expected behaviour from the
specification, actual behaviour, impact, severity, priority, and evidence.

---

## 2. Scope

### In Scope

#### Authentication and Authorization
- Member login
- Staff access
- Invalid credentials
- Required authentication for booking
- Member access to their own bookings
- Prevention of access to another member's booking
- Staff-only operations

#### Spaces
- Bookable spaces
- Non-bookable/closed spaces
- Capacity
- Hourly rates
- Deposits
- Space availability

#### Booking Creation
- Valid future bookings
- Past dates
- Start/end times
- 30-minute minimum duration
- 12-hour maximum duration
- Building operating hours
- Hour/half-hour time increments
- Attendee limits
- Space capacity
- Blackout dates
- Overlapping bookings
- Touching bookings
- Concurrent booking requests

#### Booking Financials
- Hourly hire fee
- Add-ons
- Quantity validation
- Total calculation
- Deposit handling
- Deposit status after approval/rejection/cancellation

#### Booking Lifecycle
- Pending bookings
- Staff approval
- Staff rejection
- Member cancellation
- Repeated cancellation
- Booking status transitions

#### Public Calendar and Privacy
- Public calendar behaviour
- Private event visibility
- Member information exposure
- Event information exposure
- API payloads containing private information

#### Staff Console
- Booking search
- Search by member name/email/reference
- Status filtering
- Space filtering
- Date filtering
- Sorting
- Pagination
- Approval/rejection
- Audit information
- CSV export

#### Data Handling
- API responses
- Validation error responses
- Authorization boundaries
- Pagination limits
- CSV formatting and encoding

#### UI / Non-functional
- Responsive behaviour at 375px
- Accessibility-related checks
- Rendering of member-supplied text
- Basic console/performance observations

---

## 3. Out of Scope

The following are deliberately excluded from this test effort because of the
time constraint and the challenge instructions:

- Load/performance testing
- Large-scale stress testing
- Full cross-browser compatibility matrix
- Browser/device compatibility beyond the required responsive check
- Production infrastructure testing
- Payment processing, since deposits are recorded rather than charged
- Security penetration testing beyond authorization/privacy checks relevant to
  the specification
- Full accessibility certification
- AI testing-platform trials

The objective is to prioritise high-risk functional and data-integrity failures
rather than maximise the number of tests.

---

## 4. Test Strategy

Testing will use a risk-based approach.

### Priority 1 — Critical Business and Security Risks

The following receive the highest priority:

1. Double booking/concurrency
2. Member data/privacy exposure
3. Authentication and authorization
4. Booking creation and availability
5. Financial calculations and deposit handling

A defect in these areas could result in financial loss, privacy violations,
incorrect reservations, or loss of trust.

### Priority 2 — Core Functional Rules

- Date and time validation
- Capacity validation
- Booking duration
- Blackout dates
- Booking lifecycle
- Search/filter/pagination
- Staff operations

### Priority 3 — Supporting Experience

- Responsive layout
- Accessibility checks
- Rendering of user-supplied content
- Minor UI behaviour

---

## 5. Test Levels and Techniques

### Manual Functional Testing

Used to validate complete user workflows and visually observable behaviour.

Examples:

- Login
- Booking
- Cancellation
- Staff approval/rejection
- Public calendar
- Responsive UI

### API Testing

Used where important behaviour is easier or more reliably validated at the
server boundary.

Examples:

- Booking validation
- Authentication
- Privacy/data exposure
- Deposit status
- Booking conflicts

### Concurrency Testing

Two authenticated members will attempt to create the same booking at the same
time.

Expected result:

- Exactly one request succeeds
- The other request receives the appropriate conflict response

### Exploratory Testing

Exploratory testing will be used around areas where defects may not be covered
by straightforward happy-path tests, particularly:

- Boundary values
- Authorization
- Privacy
- Date/time rules
- Booking conflicts
- Staff workflows

### Automation

JavaScript + Playwright will be used for regression protection.

The target automation suite is:

- 6 API tests
- 1 concurrency test
- 1 UI flow
- 1 intentionally failing defect regression test

---

## 6. Test Environment

### Application

Sabhaghar Booking v2.3.1

### Application URL

`http://localhost:4000/`

### Automation

- JavaScript
- Playwright
- Playwright Test

### Development Environment

- VS Code
- Node.js
- Git
- GitHub

### CI

GitHub Actions will execute the automated test suite on repository changes.

---

## 7. Test Data

Testing will use the seeded accounts and data supplied by the application.

Important test-data categories include:

- Member accounts
- Staff account
- Bookable spaces
- Closed/non-bookable space
- Future dates
- Past dates
- Blackout dates
- Valid and invalid time ranges
- Boundary attendee counts
- Over-capacity attendee counts
- Bookings with public/private visibility
- Overlapping and touching bookings
- Same-slot concurrent booking requests
- Add-ons and quantities

Test data created during execution will use unique future dates/times where
possible to avoid interference between tests.

---

## 8. Entry Criteria

Testing can begin when:

- The application starts successfully.
- The supplied accounts are available.
- Seed data is accessible.
- The application can be reached locally.
- Playwright can execute against the application/API.

---

## 9. Exit Criteria

Testing will be considered complete when:

- High-risk requirements have been tested.
- Core booking workflows have been exercised.
- Critical authorization/privacy rules have been checked.
- Concurrency behaviour has been tested.
- Identified defects have reproducible evidence.
- The automated regression suite covers the highest-risk rules.
- CI execution has been configured.
- A final test summary and release recommendation have been produced.

---

## 10. Defect Classification

### Severity

Severity represents the impact of the defect.

- **Critical** — major security, privacy, data-integrity, or business failure
- **High** — significant functional or financial/business impact
- **Medium** — meaningful functional issue with a workaround
- **Low** — minor usability or cosmetic issue

### Priority

Priority represents how urgently the defect should be fixed.

- **P1** — fix before release
- **P2** — fix as soon as practical
- **P3** — can be scheduled later

Severity and priority will be assessed independently.

---

## 11. Defect Reporting Standard

Every confirmed defect will contain:

- Bug ID
- Title
- Severity
- Priority
- Area
- Requirement/specification reference
- Environment
- Preconditions
- Steps to reproduce
- Expected result
- Actual result
- Impact
- Evidence
- Regression test
- Acceptance criteria

The specification will be cited as the authority for expected behaviour rather
than relying on personal assumptions.

---

## 12. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Double booking | Critical | Concurrent API test |
| Private data exposure | Critical | UI + API authorization/privacy checks |
| Incorrect booking validation | High | Boundary and negative testing |
| Incorrect deposit handling | High | Lifecycle/API validation |
| Financial calculation errors | High | Pricing and add-on boundary checks |
| Defects only visible through API | High | API-level testing |
| Tests passing only locally | High | GitHub Actions CI |
| Test data collisions | Medium | Use unique future dates/times |
| Limited execution time | Medium | Risk-based prioritisation |

---

## 13. Deliverables

The testing effort will produce:

1. `TEST-PLAN.md`
2. Eight prioritised bug reports
3. Automated Playwright test suite
4. GitHub Actions CI workflow
5. `TEST-SUMMARY.md`
6. 2–3 minute demonstration video

---

## 14. Release Decision

The final recommendation will be based on:

- Critical/high-severity defects
- Security/privacy risks
- Booking integrity
- Financial correctness
- Automated regression coverage
- CI execution

A **Go** recommendation will require acceptable risk and no unresolved
release-blocking defects.

A **No-Go** recommendation will be made when critical business, privacy,
authorization, financial, or booking-integrity defects remain unresolved.