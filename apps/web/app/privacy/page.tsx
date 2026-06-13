import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — PhantomXI",
  description: "PhantomXI privacy policy — how we collect, use, and protect your data under UK GDPR.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface-0 text-text-primary">
      <nav className="border-b border-surface-3 bg-surface-1 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="text-text-muted hover:text-text-primary transition-colors text-sm font-semibold">
            ← PhantomXI
          </Link>
          <span className="text-surface-3">/</span>
          <span className="text-sm font-bold">Privacy Policy</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black tracking-tight mb-3">Privacy Policy</h1>
        <p className="text-text-muted mb-12">
          Effective date: 13 June 2026. PhantomXI is committed to protecting your privacy under UK GDPR.
        </p>

        <LegalSection title="1. Who We Are">
          <p>
            PhantomXI (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the PhantomXI fantasy football app and website at phantomxi.com. We are the data controller for personal information collected through our services.
          </p>
          <p className="mt-3">Contact: <a href="mailto:privacy@phantomxi.com" className="text-primary-lit hover:underline">privacy@phantomxi.com</a></p>
        </LegalSection>

        <LegalSection title="2. Data We Collect">
          <p className="mb-3">We collect the following categories of personal data:</p>
          <ul className="list-none space-y-2">
            {[
              "Account information: email address, display name, avatar, country",
              "Game data: team picks, transfer history, league memberships, gameweek points",
              "Device data: push notification token, device type, operating system",
              "Analytics events: feature usage, screen views, interaction patterns (PostHog)",
              "Technical data: IP address, browser type, crash reports (Sentry)",
              "Payment data: Stripe customer ID and subscription status (we never store card numbers)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-text-muted">
                <span className="text-primary-lit mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title="3. Legal Basis for Processing">
          <ul className="list-none space-y-3 text-text-muted">
            <li><strong className="text-text-primary">Contract performance:</strong> Processing necessary to provide you the fantasy game service (account, team picks, scoring, leagues).</li>
            <li><strong className="text-text-primary">Legitimate interest:</strong> Analytics to improve the product; fraud prevention; service security.</li>
            <li><strong className="text-text-primary">Consent:</strong> Marketing emails; optional analytics cookies on the website (you can opt out).</li>
            <li><strong className="text-text-primary">Legal obligation:</strong> Compliance with UK tax, anti-money-laundering, and other legal requirements.</li>
          </ul>
        </LegalSection>

        <LegalSection title="4. How We Use Your Data">
          <ul className="list-none space-y-2 text-text-muted">
            {[
              "Operate and maintain your PhantomXI account",
              "Calculate and display gameweek points and league standings",
              "Send deadline reminders and score notifications (with your consent)",
              "Process subscription payments and tournament entry fees via Stripe",
              "Detect and prevent fraud, abuse, and terms violations",
              "Improve the app using aggregated, anonymised analytics",
              "Respond to support requests",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="text-primary-lit mt-1">▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection title="5. Third-Party Services">
          <div className="space-y-4 text-text-muted">
            {[
              { name: "Supabase", role: "Database, authentication, and real-time infrastructure. Hosted on AWS in EU (eu-west-2)." },
              { name: "Stripe", role: "Payment processing. PCI-DSS Level 1 compliant. Stripe's privacy policy governs payment data." },
              { name: "PostHog", role: "Product analytics. EU-hosted instance. Events are anonymised where possible." },
              { name: "Sentry", role: "Error monitoring. Crash reports include device metadata but are stripped of PII where possible." },
              { name: "Expo / EAS", role: "Push notification delivery via APNs (Apple) and FCM (Google)." },
              { name: "API-Football", role: "EPL player and fixture data. No user data is shared with this provider." },
            ].map((s) => (
              <div key={s.name} className="flex gap-3">
                <span className="font-bold text-text-primary min-w-[120px]">{s.name}</span>
                <span>{s.role}</span>
              </div>
            ))}
          </div>
        </LegalSection>

        <LegalSection title="6. Data Retention">
          <ul className="list-none space-y-2 text-text-muted">
            <li><span className="text-text-primary font-semibold">Account data:</span> Retained until you request deletion, plus 30 days for backup purge.</li>
            <li><span className="text-text-primary font-semibold">Anonymised analytics:</span> Up to 2 years.</li>
            <li><span className="text-text-primary font-semibold">Payment records:</span> 7 years for VAT/tax compliance.</li>
            <li><span className="text-text-primary font-semibold">Push tokens:</span> Deleted when you log out or disable notifications.</li>
          </ul>
        </LegalSection>

        <LegalSection title="7. Your Rights (UK GDPR)">
          <p className="text-text-muted mb-3">You have the right to:</p>
          <ul className="list-none space-y-2 text-text-muted">
            {[
              "Access — request a copy of the data we hold about you",
              "Rectification — correct inaccurate personal data",
              "Erasure — request deletion of your account and personal data",
              "Restriction — limit how we process your data in certain circumstances",
              "Portability — receive your data in a machine-readable format",
              "Object — opt out of legitimate-interest processing",
            ].map((r) => (
              <li key={r} className="flex items-start gap-3">
                <span className="text-primary-lit mt-1">▸</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-text-muted">
            To exercise any right, email <a href="mailto:privacy@phantomxi.com" className="text-primary-lit hover:underline">privacy@phantomxi.com</a> or use{" "}
            <strong className="text-text-primary">Settings → Privacy Request</strong> in the app. We will respond within 30 days. You may also lodge a complaint with the{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-primary-lit hover:underline">
              ICO (Information Commissioner&apos;s Office)
            </a>.
          </p>
        </LegalSection>

        <LegalSection title="8. Cookies (Web)">
          <p className="text-text-muted">
            Our website uses <strong className="text-text-primary">functional cookies</strong> (session management — essential, no consent required) and <strong className="text-text-primary">analytics cookies</strong> (PostHog — requires consent). We do not use advertising cookies. You can manage cookie preferences via the consent banner or your browser settings.
          </p>
        </LegalSection>

        <LegalSection title="9. Children">
          <p className="text-text-muted">
            PhantomXI is not directed at children under 13. If we become aware that a user is under 13, their account will be deleted. If prize leagues are enabled, users must be 18+ in their jurisdiction. Please email <a href="mailto:privacy@phantomxi.com" className="text-primary-lit hover:underline">privacy@phantomxi.com</a> if you believe a child has registered.
          </p>
        </LegalSection>

        <LegalSection title="10. Security">
          <p className="text-text-muted">
            All data is transmitted over HTTPS. Passwords are hashed using bcrypt via Supabase Auth. Sensitive tokens are stored in encrypted secure storage on mobile. Row-level security is enforced in our database so users can only access their own data. We conduct regular security reviews and have a responsible disclosure policy.
          </p>
        </LegalSection>

        <LegalSection title="11. Changes to This Policy">
          <p className="text-text-muted">
            We may update this policy. Material changes will be communicated via in-app notification and email at least 14 days before taking effect. Continued use after that date constitutes acceptance of the updated policy.
          </p>
        </LegalSection>

        <div className="mt-12 pt-6 border-t border-surface-3 text-text-muted text-sm">
          <p>Contact: <a href="mailto:privacy@phantomxi.com" className="text-primary-lit hover:underline">privacy@phantomxi.com</a></p>
          <p className="mt-1">PhantomXI is registered with the ICO as a data controller.</p>
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
