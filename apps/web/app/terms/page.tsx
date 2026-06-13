import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — PhantomXI",
  description: "PhantomXI Terms of Service — the rules for using the PhantomXI fantasy football platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-surface-0 text-text-primary">
      <nav className="border-b border-surface-3 bg-surface-1 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="text-text-muted hover:text-text-primary transition-colors text-sm font-semibold">
            ← PhantomXI
          </Link>
          <span className="text-surface-3">/</span>
          <span className="text-sm font-bold">Terms of Service</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black tracking-tight mb-3">Terms of Service</h1>
        <p className="text-text-muted mb-12">
          Effective date: 13 June 2026. By creating an account you agree to these terms.
        </p>

        <LegalSection title="1. Eligibility">
          <p>
            You must be at least <strong className="text-text-primary">13 years old</strong> to use PhantomXI. If prize leagues are enabled in your region, you must be at least 18 years old (or the legal gambling age in your jurisdiction, whichever is higher). By creating an account you confirm that you meet these requirements.
          </p>
        </LegalSection>

        <LegalSection title="2. Account">
          <p>
            One account per person. Sharing or selling accounts is prohibited. You are responsible for keeping your login credentials secure. PhantomXI is not liable for losses resulting from unauthorised access to your account. You may close your account at any time via Settings → Delete Account.
          </p>
        </LegalSection>

        <LegalSection title="3. Fantasy Game Rules">
          <p>
            PhantomXI&apos;s scoring rules (as published at{" "}
            <Link href="/rules" className="text-primary-lit hover:underline">phantomxi.com/rules</Link>) are final. We reserve the right to correct points errors, adjust data, or reverse scoring decisions up to <strong className="text-text-primary">7 days</strong> after a gameweek closes, in the event of data provider errors or technical failures. We are not liable for inaccuracies in third-party sports data.
          </p>
        </LegalSection>

        <LegalSection title="4. User Content &amp; Conduct">
          <p className="mb-3">
            Team names, usernames, and league names must not be offensive, infringing, defamatory, or misleading. PhantomXI reserves the right to change any content that violates these standards without notice. You agree not to:
          </p>
          <ul className="list-none space-y-2 text-text-muted">
            {[
              "Use automated scripts, bots, or scrapers on the platform",
              "Attempt to reverse-engineer, decompile, or exploit the service",
              "Sell, transfer, or commercially exploit your account or in-game advantages",
              "Harass, abuse, or threaten other users",
              "Create multiple accounts to gain unfair advantages in leagues",
            ].map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span className="text-danger mt-1">✕</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title="5. Payments &amp; Refunds">
          <p className="mb-3">
            <strong className="text-text-primary">Phantom Pro subscriptions</strong> are billed monthly or annually via Stripe. Subscriptions auto-renew until cancelled. Cancellations take effect at the end of the current billing period. Refunds are available within <strong className="text-text-primary">48 hours</strong> of initial purchase; after that, subscriptions are non-refundable.
          </p>
          <p>
            <strong className="text-text-primary">Tournament entry fees</strong> are non-refundable once the relevant gameweek has started. If a tournament is cancelled by PhantomXI before it starts, full refunds will be issued.
          </p>
        </LegalSection>

        <LegalSection title="6. Prize Leagues">
          <p>
            Prize league terms are subject to separate Competition Rules published at the time of each competition. PhantomXI is not liable for prize distribution errors caused by third-party payment providers. Prize leagues may be subject to local gambling regulations — it is your responsibility to ensure participation is legal in your jurisdiction. PhantomXI reserves the right to disqualify participants found cheating or using prohibited methods.
          </p>
        </LegalSection>

        <LegalSection title="7. Intellectual Property">
          <p>
            The PhantomXI name, logo, app design, and platform are the intellectual property of PhantomXI. You may not reproduce, distribute, or create derivative works without written permission. Premier League club names, badges, and player imagery belong to their respective rights holders. PhantomXI is an independent product and is <strong className="text-text-primary">not affiliated with or endorsed by the Premier League</strong>.
          </p>
        </LegalSection>

        <LegalSection title="8. Availability &amp; Limitation of Liability">
          <p className="mb-3">
            PhantomXI is provided &ldquo;as is&rdquo; without warranty of any kind. We aim for high availability but do not guarantee uninterrupted service. Planned maintenance will be communicated in advance where possible.
          </p>
          <p>
            To the fullest extent permitted by law, PhantomXI is not liable for: (a) loss of points due to service downtime; (b) inaccurate stats from third-party providers; (c) missed deadlines resulting from user device or network failures; or (d) any indirect, consequential, or punitive damages. Our total liability in any circumstances is capped at the amount you paid us in the 12 months preceding the claim.
          </p>
        </LegalSection>

        <LegalSection title="9. Termination">
          <p>
            PhantomXI may suspend or permanently terminate accounts that violate these terms, engage in fraudulent activity, or threaten the integrity of the platform. Where possible we will warn you first. You may appeal a suspension by contacting <a href="mailto:hello@phantomxi.com" className="text-primary-lit hover:underline">hello@phantomxi.com</a>.
          </p>
        </LegalSection>

        <LegalSection title="10. Changes to These Terms">
          <p>
            We may update these terms. Material changes will be communicated via in-app notification and email at least <strong className="text-text-primary">14 days</strong> before they take effect. Continued use of the platform after that date constitutes acceptance.
          </p>
        </LegalSection>

        <LegalSection title="11. Governing Law">
          <p>
            These terms are governed by the laws of <strong className="text-text-primary">England and Wales</strong>. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales, except where mandatory consumer protection laws in your country provide additional rights.
          </p>
        </LegalSection>

        <div className="mt-12 pt-6 border-t border-surface-3 text-text-muted text-sm">
          <p>Questions? Email us at <a href="mailto:hello@phantomxi.com" className="text-primary-lit hover:underline">hello@phantomxi.com</a></p>
        </div>
      </div>
    </div>
  );
}

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="text-lg font-black mb-4 pb-3 border-b border-surface-3">{title}</h2>
      <div className="text-text-muted leading-relaxed">{children}</div>
    </div>
  );
}
