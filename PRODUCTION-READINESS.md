# RAZZARDI STORE — Production readiness and integration checklist

## Verified project facts
- Brand: RAZZARDI STORE; visual direction: dark purple; primary brand color: `#6558F5`.
- Intended supplier: VIP Reseller.
- Intended payment gateway: Midtrans Snap.
- Database: PostgreSQL with Prisma.
- The previously supplied `https://razzardi-store-topup.vercel.app` was identified as a storefront, not verified API documentation.
- No supplier API contract, credentials, successful supplier test, or production payment test has been verified in this project context.

## Safe defaults
- `LIVE_CHECKOUT_ENABLED=false`
- `SUPPLIER_ENABLED=false`
- Product records are not public unless `isActive=true`; do not activate products until their SKU and price are confirmed from the supplier.
- Never put supplier keys or Midtrans Server Key in browser code or `NEXT_PUBLIC_*` variables.
- A payment notification is not proof of supplier fulfillment. This foundation intentionally does not dispatch supplier orders.

## Required before integration
1. Obtain VIP Reseller's official API documentation from the supplier account/support. Required contract: base URL, authentication/signature, catalog endpoint, SKU mapping, create-order request/response, status endpoint, error codes, idempotency support, rate limits, IP allowlist, and callback/webhook rules.
2. Obtain authorized VIP Reseller API credentials. Store them only in deployment secrets.
3. Configure a Midtrans sandbox account and server key. Register the notification URL `https://YOUR_DOMAIN/api/payments/midtrans/notification` in Midtrans dashboard.
4. Run sandbox tests for pending, settlement, capture, deny, expire, cancel, duplicate notifications, invalid signatures, amount mismatch, late notifications, and network timeouts.
5. Implement supplier fulfillment as a durable worker/outbox with unique dispatch key, bounded retries, reconciliation, and manual review for ambiguous supplier outcomes. Never blindly retry an order if supplier acceptance is uncertain.
6. Add admin authentication with MFA, role-based authorization, audit trails, rate limiting, backups, monitoring, alerting, and operational refund procedures before public launch.
7. Perform end-to-end tests and obtain business/operator approval before changing either feature flag.

## Environment variables
See `.env.example`. Production secrets must be injected through the hosting provider's secret manager. Do not commit `.env`.

## Local setup
1. Copy `.env.example` to `.env` and set a strong `POSTGRES_PASSWORD`.
2. `docker compose up -d postgres`
3. Set `DATABASE_URL` to the local PostgreSQL URL.
4. `npm install`
5. `npx prisma generate`
6. `npx prisma migrate dev --name init`
7. `npm run dev`
8. `GET /api/health` checks application/database availability; `GET /api/catalog` lists only activated, supplier-verified products.

## Current implementation boundary
This repository is a safe foundation, not a claim of production readiness. Supplier catalog sync, supplier order submission/status reconciliation, admin identity/RBAC, customer checkout orchestration, refunds, and end-to-end tests remain unimplemented until the official provider contracts and authorized credentials are available. The application must remain in closed mode until those gates pass.
