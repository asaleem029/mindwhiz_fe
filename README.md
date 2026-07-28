# MindWhiz — Frontend

A Next.js 16 e-commerce module with role-based access control, built as a focused
technical exercise. Pairs with the [MindWhiz API](https://github.com/asaleem029/mindwhiz-be).

> **Scope:** authentication is mocked and product data falls back to fixtures when
> the API is unavailable. Built to demonstrate frontend architecture, API integration
> and RBAC patterns — not intended as a production app.

![Product listing](docs/listing.png)

![Product detail](docs/detail.png)

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS · Context API

## Features

- **Product listing** — responsive grid, 3 columns on desktop
- **Product detail modal** — full product information, opens in place
- **Mock authentication** — role detection for Admin and Customer
- **Add product** — Admin-only form, protected route
- **RBAC** — admin-only controls hidden from customers at both UI and route level

## API contract

The frontend expects a backend on `http://localhost:5000`, configurable via
`NEXT_PUBLIC_API_URL`.

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/products` | List all products |
| `GET` | `/products/:id` | Product details |
| `POST` | `/login` | Authenticate user |
| `POST` | `/products` | Add product (Admin only) |

If the API is unreachable, the listing falls back to local fixtures so the UI
stays testable in isolation.

## Running locally

**Prerequisites:** Node.js 18+

```bash
npm install
cp .env.example .env.local   # or create it manually
npm run dev
```

`.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Open [http://localhost:3000](http://localhost:3000).

**Demo credentials**

| Role | Email | Password |
|---|---|---|
| Admin | `admin@mindwhiz.com` | `admin` |
| Customer | `customer@mindwhiz.com` | `customer` |

## Implementation notes

**Auth state** lives in a React Context (`contexts/AuthContext.tsx`) and persists to
`localStorage`, so a page refresh doesn't drop the session. Role is read from the
mock login response and drives both conditional rendering and route guards — the
Add Product page redirects non-admins rather than only hiding the button, since
hiding UI alone isn't access control.

**API calls** are centralised in `utils/api.ts` rather than scattered through
components, which keeps the fallback-to-fixtures logic in one place.

## Project structure

```
/pages
  index.tsx           # Product listing
  login.tsx           # Login
  add-product.tsx     # Add product (Admin only)
/components
  ProductCard.tsx
  ProductModal.tsx
/contexts
  AuthContext.tsx     # Auth state and role
/utils
  api.ts              # API client and fixture fallback
/styles
  globals.css
```

## Build

```bash
npm run build
npm start
```
