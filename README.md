# PhantomXI ⚽

**PhantomXI** is a Premier League fantasy football app. Build your squad, make transfers, track gameweek points, and compete with friends in private and public leagues.

The project is a monorepo with two apps:

| App | Path | Stack | Purpose |
| --- | --- | --- | --- |
| **Mobile** | [`/`](.) (root) | Expo / React Native, [expo-router](https://docs.expo.dev/router/introduction) | The cross-platform app (iOS, Android, Web) |
| **Web** | [`apps/web/`](apps/web/) | Next.js 15 (App Router) | Marketing landing page + legal pages |

Both apps are backed by [Supabase](https://supabase.com) (Postgres, Auth) and deploy to [Vercel](https://vercel.com).

## Features

- **Squad management** — pick your starting XI and bench within budget
- **Transfers** — browse players and swap them in and out across gameweeks
- **Leagues** — join or create leagues and climb the standings
- **Profile** — manage your account and team
- **Auth** — Supabase-backed sign in / sign up

The bottom tab navigation (see [`app/(tabs)/_layout.tsx`](app/(tabs)/_layout.tsx)) covers Home, Squad, Transfers, Leagues, and Profile.

## Project structure

```
.
├── app/                 # Mobile app — expo-router file-based routes
│   ├── (tabs)/          # Tab screens: home, squad, players, leagues, profile
│   ├── lib/             # supabase client + auth context
│   ├── _layout.tsx      # Root layout
│   └── index.tsx        # Entry route
├── components/          # Shared UI components
├── constants/           # Theme + static data
├── database/            # Postgres schema dump (database.sql)
├── assets/              # Images, fonts, icons
└── apps/
    └── web/             # Next.js marketing + legal site
        └── app/
            ├── page.tsx        # Landing page
            ├── privacy/        # Privacy Policy
            ├── terms/          # Terms of Service
            └── rules/          # Rules & Scoring
```

## Getting started

### Mobile app

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the dev server:

   ```bash
   npx expo start
   ```

   From the output you can open the app in:
   - an [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - an [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - a [development build](https://docs.expo.dev/develop/development-builds/introduction/)
   - [Expo Go](https://expo.dev/go)

   Platform shortcuts are also available:

   ```bash
   npm run ios       # iOS simulator
   npm run android   # Android emulator
   npm run web       # Web (Metro)
   ```

### Web app

```bash
cd apps/web
npm install
npm run dev          # http://localhost:3000
```

## Configuration

The web app reads its configuration from environment variables. Copy the example file and fill in your own values:

```bash
cp apps/web/.env.example apps/web/.env.local
```

Key variables include the Supabase project URL and keys, and the App Store / Play Store URLs surfaced on the landing page. See [`apps/web/.env.example`](apps/web/.env.example) for the full list.

The mobile app's Supabase client lives in [`app/lib/supabase.ts`](app/lib/supabase.ts).

## Scripts

### Mobile (root `package.json`)

| Script | Description |
| --- | --- |
| `npm start` | Start Expo dev server |
| `npm run ios` / `android` / `web` | Start on a specific platform |
| `npm run lint` | Run ESLint via Expo |
| `npm run build` | Export the static web build |

### Web (`apps/web/package.json`)

| Script | Description |
| --- | --- |
| `npm run dev` | Next.js dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint the web app |

## Deployment

Both apps deploy to **Vercel**. The mobile app exports a static web build (`npm run build`) and the web app is a standard Next.js project.

## Tech stack

- **React Native 0.81** + **React 19** + **Expo SDK 54**
- **expo-router** (typed, file-based routing)
- **Next.js 15** + **Tailwind CSS** (web)
- **Supabase** (Postgres + Auth)
- **TypeScript**
- **Vercel** (hosting + analytics)
