import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://phantomxi.com"),
  title: {
    default: "PhantomXI — Premier League Fantasy Football",
    template: "%s | PhantomXI",
  },
  description:
    "Build your dream EPL squad, track live scores every 60 seconds, and crush your friends in private leagues. The best free fantasy football app for Premier League fans.",
  keywords: [
    "fantasy football",
    "premier league fantasy",
    "EPL fantasy",
    "FPL alternative",
    "fantasy premier league app",
    "football fantasy app",
    "free fantasy football",
    "premier league game",
    "EPL draft game",
  ],
  authors: [{ name: "PhantomXI" }],
  creator: "PhantomXI",
  publisher: "PhantomXI",
  category: "Sports",
  openGraph: {
    title: "PhantomXI — Premier League Fantasy Football",
    description:
      "Draft your dream squad. Dominate your league. Win with real EPL data. Free to play.",
    url: "https://phantomxi.com",
    siteName: "PhantomXI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PhantomXI — Premier League Fantasy Football",
      },
    ],
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    site: "@phantomxi",
    creator: "@phantomxi",
    title: "PhantomXI — Premier League Fantasy Football",
    description:
      "Draft your dream squad. Dominate your league. Free to play, impossible to put down.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://phantomxi.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#7C3AED" />
      </head>
      <body className="bg-surface-0 text-text-primary antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
