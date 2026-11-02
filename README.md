# RAZZARDI STORE

Dark-purple game top-up platform foundation for Indonesia. Stack: Next.js 15, TypeScript, PostgreSQL, Prisma, and Midtrans Snap integration boundary. VIP Reseller is intentionally fail-closed until its official API contract and credentials are verified.

## Current routes
- `GET /api/health` — application and database health.
- `GET /api/catalog` — active, supplier-verified products only.
- `GET /api/orders/:orderNumber` — limited public order status.
- `POST /api/payments/midtrans/notification` — Midtrans signature-verified notification handler with event deduplication.

## Setup
1. Copy `.env.example` to `.env`; configure PostgreSQL and secrets locally.
2. `docker compose up -d postgres`
3. `npm install`
4. `npx prisma generate`
5. `npx prisma migrate dev --name init`
6. `npm run dev`

Read `docs/PRODUCTION-READINESS.md` before configuring a live environment. Checkout and supplier integration are disabled by default. Do not enable real transactions until the supplier API, Midtrans sandbox tests, durable fulfillment worker, admin security, and operational controls have passed review.
