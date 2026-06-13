import Link from "next/link";

const APP_STORE_URL = "https://apps.apple.com/app/phantomxi/id6740335765";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.phantomxi.app";

const stats = [
  { value: "2.1M+", label: "Managers" },
  { value: "38", label: "Gameweeks" },
  { value: "60s", label: "Live Updates" },
];

const features = [
  {
    icon: "⚽",
    title: "Squad Builder",
    desc: "Draft your perfect 15-man squad under a £100m budget. Pick from 500+ EPL players across all 20 clubs.",
    color: "from-violet-600/20 to-violet-600/5",
    border: "border-violet-500/30",
  },
  {
    icon: "⚡",
    title: "Live Points",
    desc: "Watch your points climb in real-time during every match. Scores update every 60 seconds.",
    color: "from-amber-500/20 to-amber-500/5",
    border: "border-amber-500/30",
  },
  {
    icon: "🏆",
    title: "Private Leagues",
    desc: "Create leagues for up to 50 friends, set up head-to-head brackets, and compete for the season title.",
    color: "from-green-600/20 to-green-600/5",
    border: "border-green-500/30",
  },
  {
    icon: "🤖",
    title: "AI Suggestions",
    desc: "Powered by Claude AI, get personalised transfer recommendations based on form, fixtures, and budget.",
    color: "from-sky-600/20 to-sky-600/5",
    border: "border-sky-500/30",
  },
];

const liveScores = [
  "Arsenal 2–1 Chelsea",
  "Man City 3–0 Liverpool",
  "Spurs 1–1 Man Utd",
  "Newcastle 2–0 Brighton",
  "Aston Villa 1–2 West Ham",
  "Everton 0–1 Brentford",
  "Wolves 2–2 Crystal Palace",
  "Fulham 1–0 Bournemouth",
];

const reviews = [
  {
    name: "Jamie K.",
    country: "🇬🇧 Manchester",
    rating: 5,
    text: "Finally an FPL alternative that doesn't feel like a beta product. The live points are genuinely real-time — insane.",
  },
  {
    name: "Priya S.",
    country: "🇮🇳 Mumbai",
    rating: 5,
    text: "The AI transfer suggestions are scarily good. It recommended Palmer before his hat-trick. Won my league that week.",
  },
  {
    name: "Carlos M.",
    country: "🇪🇸 Madrid",
    rating: 5,
    text: "Dark mode, slick UI, fast loads. Every fantasy app should look like this.",
  },
  {
    name: "Tom B.",
    country: "🇦🇺 Sydney",
    rating: 5,
    text: "H2H leagues with 38 matchups is exactly what I needed. My office league has never been more competitive.",
  },
  {
    name: "Ama O.",
    country: "🇬🇭 Accra",
    rating: 5,
    text: "The pitch view with animated player cards is stunning. Makes checking your squad actually fun.",
  },
  {
    name: "Wei L.",
    country: "🇨🇳 Shanghai",
    rating: 5,
    text: "I've tried every EPL fantasy app. PhantomXI has the best data — injury updates come through before any other app.",
  },
];

const steps = [
  {
    num: "01",
    title: "Create your free account",
    desc: "Sign up in 30 seconds with email or Google. Your squad and stats are synced across all devices instantly.",
  },
  {
    num: "02",
    title: "Pick your 15-man squad",
    desc: "Browse all EPL players, check form and fixtures, and build your ultimate squad under a £100m budget.",
  },
  {
    num: "03",
    title: "Compete live and win",
    desc: "Watch live points stack up every matchday. Climb your leagues and prove your footballing genius.",
  },
];

const freeFeatures = [
  "Full squad builder",
  "1 classic league (20 members)",
  "Live gameweek points",
  "Standard player stats",
  "Basic player comparison (2 players)",
];

const proFeatures = [
  "Everything in Free",
  "Unlimited private leagues",
  "AI transfer suggestions",
  "Advanced stats (xG, xA, ICT index)",
  "Extended player comparison (5 players)",
  "Real-time injury alerts",
  "Ad-free experience",
  "Pro badge on profile",
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PhantomXI",
  operatingSystem: "iOS, Android",
  applicationCategory: "SportsApplication",
  offers: [
    {
      "@type": "Offer",
      price: "0",
      priceCurrency: "GBP",
      name: "Free",
    },
    {
      "@type": "Offer",
      price: "3.99",
      priceCurrency: "GBP",
      name: "Phantom Pro",
      billingIncrement: "P1M",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    reviewCount: "2100000",
    bestRating: "5",
    worstRating: "1",
  },
  description:
    "Build your dream EPL squad, track live scores every 60 seconds, and crush your friends in private leagues.",
  url: "https://phantomxi.com",
};

export default function Home() {
  const tickerContent = [...liveScores, ...liveScores];

  return (
    <div className="min-h-screen bg-surface-0 text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-surface-3 bg-surface-0/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-text-muted">
            <Link href="#features" className="hover:text-text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-text-primary transition-colors">How it works</Link>
            <Link href="#pro" className="hover:text-text-primary transition-colors">Pricing</Link>
            <Link href="/rules" className="hover:text-text-primary transition-colors">Rules</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href={APP_STORE_URL}
              className="hidden sm:flex items-center gap-2 bg-primary-lit hover:bg-primary transition-colors px-4 py-2 rounded-full text-sm font-bold text-white"
            >
              Download Free
            </Link>
          </div>
        </div>
      </nav>

      {/* ─── Section 1: Hero ─── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #5B21B6 0%, #1E1B4B 40%, #0F172A 70%, #09090B 100%)",
          }}
        />
        {/* Animated orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #7C3AED, transparent)" }} />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #F59E0B, transparent)" }} />

        <div className="relative max-w-6xl mx-auto px-4 py-20 w-full">
          <div className="max-w-3xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-violet-900/40 border border-violet-500/50 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold-light text-xs font-black tracking-widest uppercase">
                EPL Fantasy · 2025/26 Season
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              Pick the unseen.{" "}
              <span
                className="inline-block"
                style={{
                  background: "linear-gradient(90deg, #F59E0B, #FCD34D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Win the unseeable.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text-muted max-w-xl leading-relaxed mb-10">
              Draft your dream Premier League squad, dominate your league, and win
              with real-time data. Free to play. Impossible to put down.
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <AppStoreBadge href={APP_STORE_URL} store="apple" />
              <AppStoreBadge href={PLAY_STORE_URL} store="google" />
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex-1 min-w-[100px] bg-surface-1/60 border border-surface-3 backdrop-blur rounded-2xl py-4 px-5 text-center"
                >
                  <div className="text-2xl font-black text-gold">{s.value}</div>
                  <div className="text-xs text-text-muted mt-1 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Floating score cards decoration */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-4 pointer-events-none">
            <FloatingCard
              className="animate-float"
              label="Cole Palmer"
              badge="MID · £11.2m"
              value="14 pts"
              valueColor="text-gold"
            />
            <FloatingCard
              className="animate-float-delay"
              label="Bukayo Saka"
              badge="MID · £10.1m"
              value="Goal ⚽"
              valueColor="text-green-400"
            />
            <FloatingCard
              className="animate-float"
              label="Erling Haaland"
              badge="FWD · £14.5m"
              value="Hat-trick 🎩"
              valueColor="text-gold"
            />
          </div>
        </div>
      </section>

      {/* ─── Section 2: Live Action Proof ─── */}
      <section className="border-y border-surface-3 bg-surface-1 py-6 overflow-hidden">
        <p className="text-center text-xs font-black text-text-muted tracking-widest uppercase mb-4">
          Live Scores · Gameweek 38
        </p>
        <div className="overflow-hidden">
          <div className="animate-marquee whitespace-nowrap">
            {tickerContent.map((score, i) => (
              <span key={i} className="inline-flex items-center gap-3 mx-8">
                <span className="w-2 h-2 rounded-full bg-pitch inline-block" />
                <span className="text-text-primary font-semibold text-sm">{score}</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 3: Feature Highlights ─── */}
      <section id="features" className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Built to{" "}
            <span className="text-primary-lit">dominate</span>
          </h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">
            Everything you need to win your league — and nothing you don't.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className={`relative rounded-3xl border ${f.border} bg-gradient-to-br ${f.color} p-8 overflow-hidden`}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-black mb-2">{f.title}</h3>
              <p className="text-text-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section 4: Social Proof ─── */}
      <section className="bg-surface-1 border-y border-surface-3 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="text-3xl mb-2">⭐⭐⭐⭐⭐</div>
            <h2 className="text-3xl sm:text-4xl font-black mb-2">
              Loved by managers worldwide
            </h2>
            <p className="text-text-muted">Join 2.1 million managers already playing</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-surface-2 border border-surface-3 rounded-2xl p-6"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <span key={i} className="text-gold text-sm">★</span>
                  ))}
                </div>
                <p className="text-text-primary text-sm leading-relaxed mb-4">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/40 border border-primary-lit/50 flex items-center justify-center text-xs font-black">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{r.name}</div>
                    <div className="text-xs text-text-muted">{r.country}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section 5: How It Works ─── */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Three steps to glory
          </h2>
          <p className="text-text-muted text-lg">Start playing in under 3 minutes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="relative">
              <div className="text-6xl font-black text-primary/30 mb-4">{s.num}</div>
              <h3 className="text-xl font-black mb-3">{s.title}</h3>
              <p className="text-text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Section 6: Pro Upsell ─── */}
      <section id="pro" className="bg-surface-1 border-y border-surface-3 py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Unlock your{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #F59E0B, #FCD34D)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                phantom edge
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* Free */}
            <div className="bg-surface-2 border border-surface-3 rounded-3xl p-8">
              <div className="text-text-muted text-sm font-black uppercase tracking-widest mb-4">Free</div>
              <div className="text-4xl font-black mb-6">£0</div>
              <ul className="space-y-3">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="text-pitch">✓</span>
                    <span className="text-text-muted">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={APP_STORE_URL}
                className="mt-8 block text-center bg-surface-3 hover:bg-surface-2 border border-surface-3 transition-colors rounded-xl py-3 font-bold text-sm"
              >
                Get Started Free
              </Link>
            </div>
            {/* Pro */}
            <div className="relative bg-surface-2 border border-gold rounded-3xl p-8 glow-gold">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gold text-black text-xs font-black px-4 py-1 rounded-full uppercase tracking-wide">
                  ★ Phantom Pro
                </span>
              </div>
              <div className="text-gold text-sm font-black uppercase tracking-widest mb-4 mt-2">Pro</div>
              <div className="text-4xl font-black mb-1">
                £3.99<span className="text-base text-text-muted font-semibold">/mo</span>
              </div>
              <div className="text-xs text-text-muted mb-6">or £24.99/year — save 48%</div>
              <ul className="space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="text-gold">★</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={APP_STORE_URL}
                className="mt-8 block text-center font-bold text-sm rounded-xl py-3 text-black transition-opacity hover:opacity-90"
                style={{ background: "linear-gradient(90deg, #F59E0B, #FCD34D)" }}
              >
                Get Phantom Pro
              </Link>
              <p className="text-center text-xs text-text-muted mt-3">No commitment. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section 7: App Store Download ─── */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: "linear-gradient(135deg, #5B21B6 0%, #1E1B4B 60%, #09090B 100%)" }}
        />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Download PhantomXI — Free
          </h2>
          <p className="text-text-muted text-lg mb-10">
            Available on iOS and Android. Sync across all your devices instantly.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <AppStoreBadge href={APP_STORE_URL} store="apple" large />
            <AppStoreBadge href={PLAY_STORE_URL} store="google" large />
          </div>
          <p className="text-xs text-text-muted">
            Free to download · In-app purchases available · Rated 4+ on App Store
          </p>
        </div>
      </section>

      {/* ─── Section 8: Footer ─── */}
      <footer className="border-t border-surface-3 bg-surface-1">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <Logo />
              <p className="text-text-muted text-sm mt-2 max-w-xs leading-relaxed">
                Pick the unseen. Win the unseeable.
              </p>
            </div>
            <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-text-muted">
              <Link href="/rules" className="hover:text-text-primary transition-colors">Rules &amp; Scoring</Link>
              <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
              <a
                href="mailto:hello@phantomxi.com"
                className="hover:text-text-primary transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>
          <div className="mt-10 pt-6 border-t border-surface-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-muted">
            <span>© 2026 PhantomXI. Not affiliated with the Premier League.</span>
            <div className="flex items-center gap-4">
              <a href="https://twitter.com/phantomxi" className="hover:text-text-primary transition-colors">Twitter/X</a>
              <a href="https://instagram.com/phantomxi" className="hover:text-text-primary transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── Sub-components ── */

function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      {/* Ghost mark */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="64" height="64" rx="14" fill="url(#logo-bg)" />
        <defs>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
        </defs>
        {/* Ghost body */}
        <path
          d="M32 11C22 11 16 19.5 16 27.5V52L20.5 47.5L25 52L29.5 47.5L34 52L38.5 47.5L43 52L48 52V27.5C48 19.5 42 11 32 11Z"
          fill="white"
          opacity="0.95"
        />
        {/* Eyes */}
        <circle cx="26" cy="30" r="3.5" fill="#5B21B6" />
        <circle cx="38" cy="30" r="3.5" fill="#5B21B6" />
        {/* Gold XI */}
        <text
          x="32"
          y="45"
          textAnchor="middle"
          fontFamily="Arial Black, Arial, sans-serif"
          fontWeight="900"
          fontSize="10"
          fill="#F59E0B"
          letterSpacing="-0.5"
        >
          XI
        </text>
      </svg>
      {/* Wordmark */}
      <span className="text-xl font-black tracking-tight leading-none">
        <span className="text-text-primary">Phantom</span>
        <span
          style={{
            background: "linear-gradient(90deg, #7C3AED, #F59E0B)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          XI
        </span>
      </span>
    </span>
  );
}

function AppStoreBadge({
  href,
  store,
  large,
}: {
  href: string;
  store: "apple" | "google";
  large?: boolean;
}) {
  const isApple = store === "apple";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-3 bg-white text-black font-bold rounded-2xl transition-opacity hover:opacity-90 ${
        large ? "px-7 py-4 text-base" : "px-5 py-3 text-sm"
      }`}
    >
      <span className={large ? "text-3xl" : "text-2xl"}>{isApple ? "🍎" : "🤖"}</span>
      <span>
        <div className="text-[10px] font-medium opacity-70 leading-none mb-0.5">
          {isApple ? "Download on the" : "Get it on"}
        </div>
        <div className="font-black leading-none">
          {isApple ? "App Store" : "Google Play"}
        </div>
      </span>
    </a>
  );
}

function FloatingCard({
  label,
  badge,
  value,
  valueColor,
  className,
}: {
  label: string;
  badge: string;
  value: string;
  valueColor: string;
  className?: string;
}) {
  return (
    <div
      className={`w-52 bg-surface-1/90 backdrop-blur border border-surface-3 rounded-2xl p-4 ${className}`}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-black">{label}</span>
        <span className={`text-sm font-black ${valueColor}`}>{value}</span>
      </div>
      <span className="text-xs text-text-muted">{badge}</span>
    </div>
  );
}
