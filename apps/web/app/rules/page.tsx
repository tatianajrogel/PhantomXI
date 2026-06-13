import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rules & Scoring — PhantomXI",
  description: "Learn how scoring works in PhantomXI: points, chips, transfers, and leagues explained.",
};

const pointsTable = [
  { action: "Playing up to 60 minutes", pos: "All", pts: "+1" },
  { action: "Playing 60 minutes or more", pos: "All", pts: "+2" },
  { action: "Goal scored", pos: "GKP / DEF", pts: "+6" },
  { action: "Goal scored", pos: "MID", pts: "+5" },
  { action: "Goal scored", pos: "FWD", pts: "+4" },
  { action: "Assist", pos: "All", pts: "+3" },
  { action: "Clean sheet", pos: "GKP / DEF", pts: "+4" },
  { action: "Clean sheet", pos: "MID", pts: "+1" },
  { action: "Penalty saved", pos: "GKP", pts: "+5" },
  { action: "Save (per 3 saves)", pos: "GKP", pts: "+1" },
  { action: "Bonus points", pos: "All", pts: "+1 to +3" },
  { action: "Yellow card", pos: "All", pts: "−1" },
  { action: "Red card", pos: "All", pts: "−3" },
  { action: "Own goal", pos: "All", pts: "−2" },
  { action: "Penalty missed", pos: "All", pts: "−2" },
  { action: "Every 2 goals conceded", pos: "GKP / DEF", pts: "−1" },
];

const chips = [
  { name: "Wildcard", desc: "Make unlimited free transfers for one gameweek. Transfers stick permanently. Available twice per season (once per half)." },
  { name: "Free Hit", desc: "Make unlimited transfers for one gameweek only. Your squad reverts to its previous state after the gameweek ends." },
  { name: "Bench Boost", desc: "All four bench players' points are counted for one gameweek. Use it when your bench has strong fixtures." },
  { name: "Triple Captain", desc: "Your captain's points are tripled (instead of doubled) for one gameweek. Deploy when your captain has a blank gameweek double." },
];

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-surface-0 text-text-primary">
      <nav className="border-b border-surface-3 bg-surface-1 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-4">
          <Link href="/" className="text-text-muted hover:text-text-primary transition-colors text-sm font-semibold">
            ← PhantomXI
          </Link>
          <span className="text-surface-3">/</span>
          <span className="text-sm font-bold">Rules &amp; Scoring</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black tracking-tight mb-3">Rules &amp; Scoring</h1>
        <p className="text-text-muted mb-12">
          Everything you need to know to master PhantomXI. Last updated June 2026.
        </p>

        {/* Squad rules */}
        <Section title="1. Your Squad">
          <p className="text-text-muted leading-relaxed mb-4">
            At the start of each season, you pick a squad of <strong className="text-text-primary">15 players</strong> with a budget of <strong className="text-text-primary">£100 million</strong>. Your squad must include:
          </p>
          <ul className="list-none space-y-2 text-text-muted">
            {[
              "2 Goalkeepers (GKP)",
              "5 Defenders (DEF)",
              "5 Midfielders (MID)",
              "3 Forwards (FWD)",
            ].map((r) => (
              <li key={r} className="flex items-center gap-3">
                <span className="text-primary-lit">▸</span> {r}
              </li>
            ))}
          </ul>
          <p className="text-text-muted mt-4 leading-relaxed">
            No more than 3 players from the same Premier League club. You choose 11 starters each gameweek in a valid formation (at least 1 GKP, 3 DEF, 2 MID, 1 FWD). The remaining 4 are substitutes.
          </p>
        </Section>

        {/* Scoring */}
        <Section title="2. Points Scoring">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-3">
                  <th className="text-left py-3 pr-4 font-black text-text-muted uppercase text-xs tracking-wide">Action</th>
                  <th className="text-left py-3 pr-4 font-black text-text-muted uppercase text-xs tracking-wide">Position</th>
                  <th className="text-right py-3 font-black text-text-muted uppercase text-xs tracking-wide">Points</th>
                </tr>
              </thead>
              <tbody>
                {pointsTable.map((row, i) => (
                  <tr key={i} className="border-b border-surface-3/50 hover:bg-surface-1/50 transition-colors">
                    <td className="py-3 pr-4">{row.action}</td>
                    <td className="py-3 pr-4 text-text-muted text-xs">{row.pos}</td>
                    <td className={`py-3 text-right font-black ${row.pts.startsWith("+") ? "text-pitch" : "text-danger"}`}>
                      {row.pts}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Captain */}
        <Section title="3. Captain &amp; Vice-Captain">
          <p className="text-text-muted leading-relaxed">
            Designate one player as <strong className="text-text-primary">Captain</strong> — they score <strong className="text-text-primary">double points</strong>. If your captain plays 0 minutes, the Vice-Captain automatically takes the captain role and scores double. Both must be named before the gameweek deadline.
          </p>
        </Section>

        {/* Transfers */}
        <Section title="4. Transfers">
          <p className="text-text-muted leading-relaxed mb-4">
            You receive <strong className="text-text-primary">1 free transfer</strong> each gameweek. Additional transfers cost <strong className="text-danger">−4 points</strong> each. Unused free transfers carry over (maximum 2 banked at once). The sell price of a player may differ from their purchase price based on market movements.
          </p>
          <p className="text-text-muted leading-relaxed">
            <strong className="text-text-primary">Deadline:</strong> Squads lock at each gameweek&apos;s deadline (typically Saturday 11:00 UK time for most gameweeks). No changes can be made after the deadline.
          </p>
        </Section>

        {/* Chips */}
        <Section title="5. Chips">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {chips.map((c) => (
              <div key={c.name} className="bg-surface-1 border border-surface-3 rounded-2xl p-5">
                <div className="text-sm font-black text-gold mb-2">{c.name}</div>
                <p className="text-text-muted text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-text-muted text-sm mt-4">Only one chip can be active per gameweek. The Triple Captain and Bench Boost chips can each be used once per season.</p>
        </Section>

        {/* Auto-subs */}
        <Section title="6. Automatic Substitutions">
          <p className="text-text-muted leading-relaxed">
            If a starting player plays 0 minutes, they are replaced by the highest-priority substitute who: (a) played in that gameweek, and (b) keeps the formation valid. Substitution priority is the order you set your bench (sub 1 → sub 4).
          </p>
        </Section>

        {/* Leagues */}
        <Section title="7. Leagues">
          <p className="text-text-muted leading-relaxed mb-4">
            <strong className="text-text-primary">Classic Leagues:</strong> Cumulative points all season. Join up to 50 managers with a unique invite code. Final rank is determined by total points at the end of Gameweek 38.
          </p>
          <p className="text-text-muted leading-relaxed">
            <strong className="text-text-primary">Head-to-Head Leagues:</strong> Each gameweek you face a different opponent. Win = 3pts, Draw = 1pt, Loss = 0pts. Final ranking uses H2H points, then total gameweek points as tiebreaker.
          </p>
        </Section>

        {/* Bonus */}
        <Section title="8. Bonus Points System (BPS)">
          <p className="text-text-muted leading-relaxed">
            After each match, the top 3 performers by BPS (Bonus Points System score — calculated from shots, key passes, tackles, and more) receive 3, 2, and 1 bonus points respectively. BPS scores are provisional during the match and finalised after data verification. Ties are resolved by position seniority (GKP &gt; DEF &gt; MID &gt; FWD).
          </p>
        </Section>

        <div className="mt-12 pt-8 border-t border-surface-3 text-center">
          <p className="text-text-muted text-sm mb-4">Questions? We&apos;re happy to help.</p>
          <a
            href="mailto:hello@phantomxi.com"
            className="inline-flex items-center gap-2 bg-primary-lit hover:bg-primary transition-colors text-white font-bold px-6 py-3 rounded-xl text-sm"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-black mb-5 pb-3 border-b border-surface-3">{title}</h2>
      {children}
    </div>
  );
}
