# House of Weaves

Shoppable ethnographic gallery for Moroccan and Amazigh rugs.

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Hardcoded data** for rugs (placeholder), motifs, regions, techniques, essays
- **Supabase** — ready to connect for essays/stories (add credentials to `.env.local`)
- **Shopify Storefront API** — ready to connect for rug inventory (add credentials to `.env.local`)

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx              Homepage
  gallery/              Gallery + individual rug pages
  motifs/               Motifs index + individual motif pages
  regions/              Regions index + individual region pages
  journal/              Journal index + individual essay pages
  about/                About / Methodology
  inquire/              Inquiry form + trade programme
  care/                 Care & Shipping
  returns/              Returns policy
  payments/             Payments information
  privacy/              Privacy policy
  terms/                Terms of use

components/
  layout/Nav.tsx        Navigation (fixed, responsive)
  layout/Footer.tsx     Footer with all links
  gallery/RugCard.tsx   Shared rug card component

data/
  rugs.ts               Placeholder rug data (4 sample rugs)
  motifs.ts             Motif definitions (5 motifs)
  regions.ts            Region definitions (5 regions)
  techniques.ts         Technique definitions (3 techniques)
  essays.ts             Essay content (2 essays)

types/
  index.ts              TypeScript types for all entities
```

## Content

All content is hardcoded in `data/` files for now. When ready:

- **Essays**: connect Supabase, replace `data/essays.ts` with DB queries
- **Rugs**: connect Shopify Storefront API, replace `data/rugs.ts` with API queries

## Design System

MoMA-register: stark white (`#f9f9f7`), near-black (`#080808`), zero decorative elements.

Typography:
- Display: Cormorant Garamond (300, 400)
- Body: EB Garamond (400, 500, italic)
- UI: Helvetica Neue

Fonts loaded from Google Fonts in `globals.css`.

## Adding Content

**New rug**: add an entry to `data/rugs.ts` following the `Rug` type in `types/index.ts`.

**New motif**: add an entry to `data/motifs.ts` following the `Motif` type.

**New region**: add an entry to `data/regions.ts` following the `Region` type.

**New essay**: add an entry to `data/essays.ts` following the `Essay` type.

## Deploy

Push to GitHub → Vercel auto-deploys. Add environment variables in Vercel dashboard.
