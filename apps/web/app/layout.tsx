import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhantomXI — Premier League Fantasy Football",
  description:
    "Create your dream EPL squad, track live scores, and compete in private leagues. The best free fantasy football app for Premier League fans.",
  openGraph: {
    title: "PhantomXI — Premier League Fantasy Football",
    description: "Draft your dream squad. Dominate your league. Win with real EPL data.",
    images: ["/og-image.png"],
    type: "website",
    siteName: "PhantomXI",
  },
  twitter: {
    card: "summary_large_image",
    title: "PhantomXI — Premier League Fantasy Football",
    description: "Draft your dream squad. Dominate your league.",
  },
  keywords: [
    "fantasy football",
    "premier league fantasy",
    "EPL fantasy",
    "FPL alternative",
    "fantasy premier league app",
    "football fantasy app",
  ],
  metadataBase: new URL("https://phantomxi.com"),
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
      </head>
      <body className="bg-surface-0 text-text-primary antialiased">{children}</body>
    </html>
  );
}
