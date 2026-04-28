import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommunityAIGallery from "@/components/CommunityAIGallery";
import { SOCIAL } from "@/data/social";
import { EMAILS, mailto } from "@/data/contact-emails";

export const metadata = {
  title: "Community — Sneakz & Beatz",
  description:
    "The Sneakz & Beatz Discord — chat with the producers, get updates on drops, vote in the $10K Rap Challenge, claim member-only bonuses (free beats, kit previews, early access).",
};

const CHANNELS = [
  {
    icon: "🎤",
    name: "#rap-challenge",
    body: "Submission previews, voting threads (one vote per member, self-votes blocked by bot), winner reveal.",
  },
  {
    icon: "🥁",
    name: "#beat-feedback",
    body: "Drop your unreleased beats. Real notes from PHRHX + the producer roster, no clout-chasing.",
  },
  {
    icon: "👟",
    name: "#sneaker-drops",
    body: "Restock alerts, raffle drops, GR releases. Plug your bot wins. Sneakers culture lives here.",
  },
  {
    icon: "🎮",
    name: "#gaming",
    body: "Game-night invites, controller-clutch moments, what we&rsquo;re currently locked into.",
  },
  {
    icon: "🍜",
    name: "#anime-and-manga",
    body: "Currently-watching threads, manga drops, Vinland Saga lore arguments allowed.",
  },
  {
    icon: "💼",
    name: "#hustle-talk",
    body: "Indie label questions, distro tips, contract red flags, how-to-get-paid threads.",
  },
  {
    icon: "🔔",
    name: "#announcements",
    body: "PHRHX Show episodes, new beat drops, challenge windows opening, early-bird discount codes.",
  },
];

const PERKS = [
  {
    h: "1 free beat for joining",
    body: "Verify in #rules and a member-only download link drops in your DMs. Limited-time beat that rotates monthly.",
  },
  {
    h: "Vote in the $10K Rap Challenge",
    body: "Public-vote round happens here, weighted at 30% of the final score. One vote per member. The bot blocks self-votes — submissions are tied to your verified email, so you can't ballot-stuff yours.",
  },
  {
    h: "Beat-feedback Friday",
    body: "Every Friday, drop one unreleased beat in #beat-feedback. Top 3 of the week get pinned and shouted out in the next PHRHX Show.",
  },
  {
    h: "Early-bird bundle codes",
    body: "Discord-only promo codes drop before any other channel. Past examples: 20% off the Standard Bundle, free upgrade to Pro Tools tier.",
  },
  {
    h: "Direct line to PHRHX",
    body: "Voice-note office hours twice a month — drop a question in #ask-phrhx and get answers in audio. Producer questions, business questions, beat critique, all fair game.",
  },
  {
    h: "Anime exclusive box raffle",
    body: "Quarterly raffle from the anime archive — manga, vinyl OSTs, figurines we sourced. Free to enter once you've been in the server 30+ days.",
  },
];

const RULES = [
  "Be a real person. No spam, no NFT shilling, no \"check out my mixtape\" drops in unrelated channels.",
  "No racism, sexism, homophobia, transphobia. Instant ban, no warnings.",
  "No self-voting in challenge threads. Caught once, your submission gets disqualified.",
  "Disagreements are fine. Personal attacks aren't. Argue the bar, not the person.",
  "Doxxing, leaking DMs, or sharing screenshots without consent = ban.",
  "Don't ping @everyone or @here unless you're staff.",
];

export default function CommunityPage() {
  const inviteUrl = SOCIAL.discord.enabled && SOCIAL.discord.url
    ? SOCIAL.discord.url
    : null;

  return (
    <>
      <Header />

      <main className="community-page">
        {/* HERO */}
        <section className="community-hero">
          <div className="container">
            <span className="community-eyebrow">⚡ The Sneakz & Beatz Discord</span>
            <h1 className="community-headline">
              Where the <span className="accent">culture</span> talks back.
            </h1>
            <p className="community-sub">
              Real chat, real feedback, real bonuses. Producers, rappers, sneaker heads,
              gamers, anime lifers — same server, four pillars, one community. Voting for
              the <strong>$10K Rap Challenge</strong> happens here too — fair vote, no
              self-voting, one ballot per member.
            </p>

            <div className="community-cta-row">
              {inviteUrl ? (
                <a
                  href={inviteUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-primary btn-arrow community-cta"
                >
                  Join The Discord
                </a>
              ) : (
                <span className="community-cta-pending">
                  ⏳ Discord invite drops on launch — get on the{" "}
                  <Link href="/rap-challenge">waitlist</Link> to be first in.
                </span>
              )}
              <Link href="/rap-challenge" className="btn btn-ghost btn-arrow">
                See The Rap Challenge
              </Link>
            </div>
            <p className="community-trust">
              Free forever · Email verification on join · Real human mods · No bots in DMs
            </p>
          </div>
        </section>

        {/* CHANNELS */}
        <section className="container community-block">
          <h2 className="community-h2">What&rsquo;s inside</h2>
          <div className="community-channels">
            {CHANNELS.map((c) => (
              <article key={c.name} className="community-channel">
                <span className="community-channel-icon">{c.icon}</span>
                <h3 className="community-channel-h">{c.name}</h3>
                <p className="community-channel-body">{c.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PERKS */}
        <section className="container community-block">
          <h2 className="community-h2">Why members actually stay</h2>
          <div className="community-perks">
            {PERKS.map((p, i) => (
              <article key={i} className="community-perk">
                <span className="community-perk-num">0{i + 1}</span>
                <h3 className="community-perk-h">{p.h}</h3>
                <p className="community-perk-body">{p.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* VOTING EXPLAINER */}
        <section className="container community-block community-voting">
          <h2 className="community-h2">How voting works (Rap Challenge)</h2>
          <ol className="community-voting-list">
            <li>
              <strong>Submission window closes.</strong> All entries get reviewed by Sponsor +
              the guest judging panel.
            </li>
            <li>
              <strong>Top 25 finalists posted in #rap-challenge-vote.</strong> Each finalist
              gets a forum post with their recording, artist name, and beat used.
            </li>
            <li>
              <strong>Vote with one reaction</strong> on your favorite finalist&rsquo;s post.
              The bot:
              <ul>
                <li>Verifies you joined the server before the vote opened (no last-minute alt accounts)</li>
                <li>Blocks any vote where the voter&rsquo;s verified email matches the submitter&rsquo;s entry email (no self-voting)</li>
                <li>Counts only one reaction per member across the whole vote (you have to pick one favorite)</li>
              </ul>
            </li>
            <li>
              <strong>Voting closes after 7 days.</strong> Bot exports the public-vote tally.
              Final score: 70% judges + 30% community.
            </li>
            <li>
              <strong>Winners announced live</strong> on The PHRHX Show. Vote tallies posted
              publicly to keep us honest.
            </li>
          </ol>
        </section>

        {/* HOUSE RULES */}
        <section className="container community-block">
          <h2 className="community-h2">House rules</h2>
          <ul className="community-rules">
            {RULES.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
          <p className="community-rules-foot">
            Full mod log is public in <code>#mod-log</code>. Disagreements with a mod call go
            to <a href={mailto(EMAILS.info, "Discord — appeal a mod call")}>{EMAILS.info}</a>{" "}
            and PHRHX reviews personally within 48hr.
          </p>
        </section>

        {/* COMMUNITY AI GALLERY — drop-zone-driven reel */}
        <CommunityAIGallery variant="full" />

        {/* FINAL CTA */}
        <section className="container community-block community-final">
          <h2 className="community-h2 community-final-h">Ready to talk to the rest of us?</h2>
          {inviteUrl ? (
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener"
              className="btn btn-primary btn-arrow"
            >
              Join The Discord
            </a>
          ) : (
            <Link href="/rap-challenge" className="btn btn-primary btn-arrow">
              Get On The Waitlist (Discord goes live with launch)
            </Link>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
