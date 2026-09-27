# Morrow Cafe

A mobile-first campaign landing page for Morrow Cafe in Sector 104, Noida. The page promotes **Rs 150 off a next visit**, explains how to claim it, and returns a mock claim code from a Next.js Route Handler.

**Live demo:** https://your-deployed-url.vercel.app

## Stack and reasoning

| Technology | Use and reasoning |
| --- | --- |
| Next.js 14 App Router | Server-rendered landing page, file-based routes, and an API Route Handler in one application. |
| TypeScript and React 18 | Typed route payloads and interactive form state. Client code is limited to the claim flow, success card, and scroll-reveal observer. |
| Tailwind CSS 3 | Responsive layout, cafe palette, typography, focus states, and motion utilities without a separate component framework. |
| `next/image` and `next/font` | Responsive optimized hero image, reserved image dimensions, and locally served Inter font with `display: swap`. |
| `lucide-react` | Small outline icons for the three steps in “How it works.” |

The API is a mock implemented with an App Router Route Handler. There is no database: claim details and generated claim codes are not persisted. This keeps the sample self-contained while making the client/server boundary and form flow demonstrable.

## Run locally

Requirements: Node.js 18.17 or newer and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Next.js will use another port if 3000 is already occupied.

Useful checks:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm start
```
## Time spent

Approximately 3.5 hours, split roughly as:
- Setup, landing page structure, and styling: 1 hrs
- Claim form, validation, and mock API: 1 hr
- Success state, animations, and responsive pass: 1 hr
- Accessibility fixes, Lighthouse audit, and documentation: 30 min

## Claim API

Send a JSON `POST` request to `/api/claim`:

```json
{
  "name": "Nilesh Srivastava",
  "phone": "9876543210"
}
```

The handler waits a random 800-1500ms, validates a non-empty name and a 10-digit phone string, then returns a random `MORROW-XXXX` code. Success returns HTTP 200; malformed JSON and invalid fields return HTTP 400; unexpected handler errors return HTTP 500. The browser form applies the stricter Indian mobile rule (10 digits starting 6-9). The mock API itself validates the 10-digit length only.

## Key technical decisions

- Keep `app/page.tsx` server-rendered. Form state, fetch handling, clipboard access, and Intersection Observer behavior live in small client components.
- Use a single discriminated form status (`idle`, `loading`, `success`, `error`) to make the submit lifecycle explicit. API/network errors preserve entered values for retry.
- Generate the code with `crypto.randomInt` from uppercase letters and digits. Since there is no persistence, the code is not reserved or guaranteed unique across requests.
- Prioritize the above-the-fold hero image with accurate responsive `sizes`; its aspect-ratio container reserves space while it loads.
- Use Intersection Observer for one-time section reveals and skip observation/transitions for reduced-motion users.
- Validate and announce form errors inline, maintain visible keyboard focus, and check the visual palette against contrast requirements.

## Lighthouse findings

Measured on **September 27, 2026** with Lighthouse 12.8.2 and Microsoft Edge against the local production build at `http://localhost:3004/` (desktop preset). Scores are from one local run and may vary by machine and browser version.

| Category | Score |
| --- | ---: |
| Performance | 97 |
| Accessibility | 96 |
| Best Practices | 100 |
| SEO | 100 |

| Metric | Result |
| --- | ---: |
| First Contentful Paint | 1.7 s |
| Largest Contentful Paint | 2.4 s |
| Cumulative Layout Shift | 0 |
| Total Blocking Time | 20 ms |
| Speed Index | 1.7 s |

The report flagged the muted hero helper text at 3.73:1 contrast and the brand link's explicit accessible name not including all its visible text. It also estimated up to 900ms savings from render-blocking CSS, about 20 KiB from unused JavaScript, and about 12 KiB from image delivery. These are audit opportunities, not measured production-user guarantees; the contrast and accessible-name findings remain follow-up items.

To repeat the audit against a local production build:

```bash
npm run build
npx next start -p 3004
npx --yes lighthouse http://localhost:3004 --chrome-path "<path-to-chrome-or-edge>" --chrome-flags "--headless --no-sandbox --disable-gpu" --output json --output-path lighthouse-report.json
```

## Cut for time

- No database, durable claim record, or unique-code reservation.
- No phone ownership verification by SMS/OTP and no message delivery integration.
- Opening hours, review score/count, and the “500+ coffees claimed” signal are static presentation content.
- No campaign administration, analytics pipeline, or automated integration-test suite.
- No edge rate limiting, bot detection, or abuse monitoring.

## Production improvements

1. Persist claims in a database with a unique constraint for `(campaign_id, normalized_phone)`. Create the claim and code atomically, and make retries idempotent so concurrent submissions cannot consume the offer twice.
2. Add distributed rate limits at the edge/API layer, keyed by IP and normalized phone. Use a shared store such as Redis/token buckets rather than process-local memory; add bot controls and abuse telemetry where appropriate.
3. Verify phone ownership with OTP before issuing a redeemable code, and deliver the claim receipt through an approved channel.
4. Move campaign copy, opening hours, eligibility, redemption windows, and remaining inventory into validated configuration or a campaign service.
5. Address Lighthouse's specific contrast and accessible-name findings, then rerun audits on representative mobile and desktop hardware and on the deployed origin.
6. Add API and browser tests for malformed input, duplicate claims, rate-limit responses, retries, keyboard use, and reduced-motion behavior.

## Product thinking

### 1. What is above the fold on mobile, and why?

At a 375px-wide mobile viewport, the first screen presents the Morrow Cafe identity and location/status, the cafe image, the **Rs 150 OFF** offer, one-line value proposition, and the primary claim action. This answers “where am I, what is the offer, and what do I do next?” before asking the visitor to scroll. The form, process explanation, and terms remain below the fold so the initial view stays focused on conversion.

### 2. Beyond the happy path

- **Duplicate claims:** normalize the phone number and enforce one claim per campaign/phone with a database unique constraint inside a transaction. Use an idempotency key for retries and return the existing claim or a clear conflict response rather than minting another code.
- **Rate limiting and automated abuse:** enforce distributed limits by IP and normalized phone at the edge/API gateway, backed by shared state (for example Redis). Add progressive bot checks, monitoring, and explicit retry guidance; avoid in-memory limits that reset across instances.