This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Docker / Containerized setup

This repository includes a multi-stage `Dockerfile` and `docker-compose` files for both development and production usage.

Quick commands:

Build the production image:

```bash
docker build -t portfolio:latest .
```

Run locally (production mode):

```bash
docker run --rm -p 3000:3000 --name portfolio_prod portfolio:latest
```

Or use the provided production compose file:

```bash
docker compose -f docker-compose.prod.yaml up --build -d
```

For development with hot reload (uses volume mounts):

```bash
docker compose -f docker-compose.dev.yaml up --build
```

Notes:

- The image uses a multi-stage build optimized to run the Next.js standalone output. It expects `next build` to produce a standalone `server.js` in `.next/standalone`.
- If you use a different package manager (yarn/pnpm), the Dockerfile will pick it up automatically based on lockfiles.
- If you plan to deploy behind a reverse proxy, the container listens on `PORT` (default 3000).
