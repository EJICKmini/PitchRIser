import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import PitchArtwork from './components/PitchArtwork'

export default function Home() {
  return (
    <main className="page-shell landing-page">
      <header className="site-nav">
        <Link href="/" className="brand" aria-label="Pitchriser home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>pitchriser</span>
        </Link>
        <nav className="nav-links" aria-label="Main navigation">
          <Link href="/investor">For investors</Link>
          <Link href="/founder">For founders</Link>
          <Link href="/investor" className="nav-cta">Explore pitches <ArrowUpRight size={15} /></Link>
        </nav>
      </header>

      <section className="landing-hero">
        <div className="landing-copy">
          <p className="eyebrow"><span className="eyebrow-spark"><Sparkles size={14} /></span> A clearer view of what&apos;s next</p>
          <h1>Get closer to the ideas <span>shaping tomorrow.</span></h1>
          <p className="hero-description">
            Explore early-stage pitches in one focused place. Founders share the story; investors find the signal.
          </p>
          <div className="hero-actions">
            <Link href="/investor" className="button button-primary">Explore pitches <ArrowRight size={17} /></Link>
            <Link href="/founder" className="button button-secondary">I&apos;m building something</Link>
          </div>
          <div className="hero-proof">
            <span className="proof-line" />
            <span>Made for curious investors and ambitious founders</span>
          </div>
        </div>

        <div className="hero-showcase" aria-label="Illustrative startup pitch preview">
          <div className="showcase-orbit showcase-orbit-one" aria-hidden="true" />
          <div className="showcase-orbit showcase-orbit-two" aria-hidden="true" />
          <div className="showcase-card">
            <div className="showcase-art">
              <PitchArtwork mood="ocean" label="Original animated artwork inspired by coastal data and ocean currents" />
              <div className="showcase-topline">
                <span className="video-indicator"><span /> CONCEPT PREVIEW</span>
                <span>01 <i>/</i> 03</span>
              </div>
              <div className="showcase-play" aria-hidden="true"><span /></div>
              <div className="showcase-caption">
                <span className="sample-tag">FICTIONAL DEMO CONCEPT</span>
                <h2>Tideframe</h2>
                <p>Neighborhood flood signals, before the water rises.</p>
              </div>
            </div>
            <div className="showcase-footer">
              <span><span className="footer-dot" /> Climate resilience</span>
              <span>Illustrative artwork</span>
            </div>
          </div>
          <div className="floating-note"><span className="note-icon">↗</span><span><strong>One good idea</strong><br />can change a lot.</span></div>
        </div>
      </section>

      <section className="landing-bottom" aria-label="How Pitchriser works">
        <div className="bottom-intro">
          <span className="bottom-index">01 — 03</span>
          <p>Less noise.<br /><strong>More perspective.</strong></p>
        </div>
        <div className="bottom-feature">
          <span className="feature-number">01</span>
          <div><strong>Watch the pitch</strong><p>Get the founder&apos;s idea in their own words.</p></div>
        </div>
        <div className="bottom-feature">
          <span className="feature-number">02</span>
          <div><strong>See the context</strong><p>Scan the basics without digging through decks.</p></div>
        </div>
        <div className="bottom-feature">
          <span className="feature-number">03</span>
          <div><strong>Take the next step</strong><p>Find a promising team and start a conversation.</p></div>
        </div>
      </section>
      <footer className="landing-footer"><span>Pitchriser</span><span>Every big thing starts as an idea.</span></footer>
    </main>
  )
}
