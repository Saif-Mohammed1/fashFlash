# FashFlash

FashFlash is a full-stack e-commerce starter built with Next.js (App Router). It includes authentication, product management, shopping cart and checkout flows, an admin dashboard, file uploads (Cloudinary / Uploadthing), Stripe integration, and several utility features (email, cron jobs, reports). The project aims to be a production-oriented foundation for building an online store or marketplace.

## Key features

- Next.js 14 (App Router) with server & client components
- Authentication via NextAuth with JWT/session support
- MongoDB (Mongoose) data models and API routes
- Admin dashboard and role-based route protection
- Product CRUD with image uploads (Cloudinary / Uploadthing)
- Stripe integration for payments
- Cart, Favorites, Orders, Refunds and Reporting flows
- Email notifications (nodemailer) and scheduled tasks (node-cron)
- UI built with React + MUI, Tailwind CSS and styled-components
- Toast notifications (react-toastify) and alerts (sweetalert2)

## Tech stack

- Framework: Next.js 14 (App Router)
- Language: JavaScript (React)
- Database: MongoDB (mongoose)
- Auth: next-auth
- Uploads: Cloudinary, Uploadthing
- Payments: Stripe
- UI: MUI, Tailwind CSS, styled-components
- Other: bcryptjs, jsonwebtoken, nodemailer, node-cron, react-toastify

## Quick start

Prerequisites:

- Node.js v18+ and npm
- MongoDB (Atlas URI or local)
- Cloudinary account (optional for image upload)
- Stripe account (for payments)

1. Clone the repo

```bash
git clone <your-repo-url>
cd fashflash
```

2. Install

```bash
npm install
```

3. Create an `.env.local` file in the project root and add required environment variables (example below).

4. Run development server

```bash
npm run dev
# app runs at http://localhost:3000
```

5. Build for production

```bash
npm run build
npm start
```

## Recommended environment variables

Create `.env.local` with at least the following variables (names are conventional — confirm with your code):

```
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
JWT_SECRET=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USER=
EMAIL_PASS=
UPLOADTHING_SECRET=
```

Notes:

- If you use Uploadthing, follow their docs to add client and server keys.
- For production, set `NEXTAUTH_URL` to your production domain and keep secrets secure.

## Folder highlights

- `app/` - Next.js App Router pages and layout (client + server components)
- `src/server/` - server controllers, DB connection and models
- `component/` - reusable UI components (navBar, product items, admin dashboard components)
- `assets/` - static assets and seeded product images
- `lib/` - actions and shared utilities
- `middleware.js` - route protection and auth middleware (role checks, protected routes)

## Admin and protected routes

The app uses role-based checks (see `src/middleware.js`) to protect admin dashboards and certain user routes (cart, account, favorite). To create an admin user, either seed your database or set a user's role to `admin` in the DB.

## Deployment

- Vercel is the easiest platform for Next.js — set environment variables in your project settings.
- If self-hosting, build with `npm run build` and run the production server with `npm start` behind a process manager.

## Suggestions & next steps

- Add a `LICENSE` file (MIT/Apache/etc.) and update repo metadata.
- Create a `README.dev.md` or `CONTRIBUTING.md` with contribution guidelines and local seeding instructions.
- Add automated CI (GitHub Actions) running lint and build on PRs.

## Badges (suggested)

- Build: GitHub Actions (on main)
- License: (if added)
- npm version / dependencies: (if published)

## Contributing

If you'd like to contribute, open an issue or submit a PR. For larger changes, open a discussion first to align on design and scope.

## Where to look first (developer pointers)

- `app/` — top-level routes and layouts
- `src/server/db/` — DB connection
- `src/server/models/` — mongoose models
- `src/server/controller/` — API controllers
- `component/` — UI building blocks

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

This project is licensed under the MIT License — see the `LICENSE` file in the project root for details.

---
