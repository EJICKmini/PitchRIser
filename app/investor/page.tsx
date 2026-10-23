'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createBrowserClient } from '@supabase/ssr'
import { ArrowLeft, ArrowRight, ArrowUpRight, Bookmark, Check, ChevronLeft, ChevronRight, CirclePlay, Sparkles } from 'lucide-react'
import PitchArtwork from '../components/PitchArtwork'

interface Startup {
  id: string
  name: string
  description: string
  industry: string
  video_url: string
  ai_scores?: { score_out_of_100: number; risk_level: string; market_potential: string }[]
}

const sampleStartups: Startup[] = [
  {
    id: 'sample-tideframe',
    name: 'Tideframe',
    description: 'Neighborhood flood signals, before the water rises. A fictional concept for exploring coastal resilience.',
    industry: 'Climate resilience',
    video_url: '',
  },
  {
    id: 'sample-emberline',
    name: 'Emberline',
    description: 'Thermal storage that shifts clean power into the hours people need it most. A fictional clean-energy concept.',
    industry: 'Clean energy',
    video_url: '',
  },
  {
    id: 'sample-nearwell',
    name: 'Nearwell',
    description: 'Preventive care designed to meet people closer to home. A fictional community-health concept.',
    industry: 'Community health',
    video_url: '',
  },
]

const artMoods = ['ocean', 'energy', 'health'] as const

function PitchMedia({ startup, mood }: { startup: Startup; mood: (typeof artMoods)[number] }) {
  const [videoFailed, setVideoFailed] = useState(false)

  useEffect(() => {
    setVideoFailed(false)
  }, [startup.id, startup.video_url])

  if (startup.video_url && !videoFailed) {
    return (
      <video
        className="pitch-media-video"
        src={startup.video_url}
        autoPlay
        muted
        loop
        playsInline
        controls
        onError={() => setVideoFailed(true)}
        aria-label={`${startup.name} pitch video`}
      />
    )
  }

  return <PitchArtwork mood={mood} label={`Original animated concept artwork for ${startup.industry}`} />
}

export default function InvestorDashboard() {
  const [startups, setStartups] = useState<Startup[]>(sampleStartups)
  const [current, setCurrent] = useState(0)
  const [isPreview, setIsPreview] = useState(true)
  const [loading, setLoading] = useState(true)
  const [saved, setSaved] = useState<string[]>([])

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    const useSampleFeed = () => {
      setStartups(sampleStartups)
      setIsPreview(true)
      setCurrent(0)
      setLoading(false)
    }

    if (!url || !key) {
      useSampleFeed()
      return
    }

    let supabase: ReturnType<typeof createBrowserClient>
    try {
      supabase = createBrowserClient(url, key)
    } catch {
      useSampleFeed()
      return
    }
    let active = true

    async function loadFeed() {
      try {
        const { data, error } = await supabase
          .from('startups')
          .select('*, ai_scores(*)')
          .order('created_at', { ascending: false })

        if (!active) return

        if (!error && data?.length) {
          setStartups(data as Startup[])
          setIsPreview(false)
          setCurrent(0)
        } else {
          useSampleFeed()
        }
      } catch {
        if (active) useSampleFeed()
      }

      if (active) setLoading(false)
    }

    void loadFeed()
    return () => { active = false }
  }, [])

  const startup = startups[current] ?? sampleStartups[0]
  const score = startup.ai_scores?.[0]
  const mood = artMoods[current % artMoods.length]
  const isSaved = saved.includes(startup.id)

  function move(direction: number) {
    setCurrent((index) => (index + direction + startups.length) % startups.length)
  }

  function toggleSaved() {
    setSaved((currentSaved) => currentSaved.includes(startup.id)
      ? currentSaved.filter((id) => id !== startup.id)
      : [...currentSaved, startup.id])
  }

  return (
    <main className="page-shell investor-page">
      <header className="site-nav investor-nav">
        <Link href="/" className="brand" aria-label="Pitchriser home">
          <span className="brand-mark" aria-hidden="true">P</span>
          <span>pitchriser</span>
        </Link>
        <div className="nav-links">
          <Link href="/founder" className="nav-cta">For founders <ArrowUpRight size={15} /></Link>
        </div>
      </header>

      <section className="investor-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-spark"><Sparkles size={14} /></span> THE PITCH FEED</p>
          <h1>Good ideas,<br /><span>closer up.</span></h1>
        </div>
        <div className="investor-heading-aside">
          <p>Meet early-stage teams through a focused pitch, the problem they&apos;re solving, and the details worth a closer look.</p>
          <div className="feed-status"><span className={loading ? 'status-dot status-dot-loading' : 'status-dot'} />{loading ? 'Finding the latest pitches' : isPreview ? 'Previewing sample ideas' : 'Founder pitches'}</div>
        </div>
      </section>

      <section className="pitch-viewer" aria-label="Startup pitch viewer">
        <div className="pitch-viewer-media">
          <PitchMedia startup={startup} mood={mood} />
          <div className="media-topline">
            <span className="video-indicator"><span /> {isPreview ? 'CONCEPT PREVIEW' : 'FOUNDER PITCH'}</span>
            <span className="feed-count">{String(current + 1).padStart(2, '0')} <i>/</i> {String(startups.length).padStart(2, '0')}</span>
          </div>
          {!startup.video_url && <div className="media-bottom-label"><CirclePlay size={16} /> Original motion artwork</div>}
          <div className="media-edge" aria-hidden="true" />
        </div>

        <div className="pitch-viewer-detail">
          <div className="detail-kicker-row">
            <span className="industry-chip"><span />{startup.industry || 'Early stage'}</span>
            <span className="detail-sequence">PITCH {String(current + 1).padStart(2, '0')}</span>
          </div>

          <div className="startup-copy">
            {isPreview && <span className="sample-tag sample-tag-dark">FICTIONAL DEMO CONCEPT</span>}
            <h2>{startup.name}</h2>
            <p>{startup.description || 'A founder pitch is on its way.'}</p>
          </div>

          {score && (
            <div className="score-panel" aria-label="AI summary">
              <div className="score-number"><strong>{score.score_out_of_100}</strong><span>AI signal</span></div>
              <div className="score-detail"><span>Risk view</span><strong>{score.risk_level}</strong></div>
              <div className="score-detail"><span>Market</span><strong>{score.market_potential}</strong></div>
            </div>
          )}

          <div className="pitch-card-bottom">
            <button type="button" onClick={toggleSaved} className={`button button-save${isSaved ? ' is-saved' : ''}`} aria-pressed={isSaved}>
              {isSaved ? <Check size={16} /> : <Bookmark size={16} />}
              {isSaved ? 'Saved to your list' : 'Save this idea'}
            </button>
            <div className="feed-controls" aria-label="Browse pitches">
              <button type="button" onClick={() => move(-1)} aria-label="Previous pitch"><ChevronLeft size={18} /></button>
              <button type="button" onClick={() => move(1)} aria-label="Next pitch"><ChevronRight size={18} /></button>
            </div>
          </div>

          <div className="founder-nudge">
            <span>Have a pitch of your own?</span>
            <Link href="/founder">Share it with us <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      <footer className="investor-footer">
        <Link href="/" className="back-link"><ArrowLeft size={14} /> Back to Pitchriser</Link>
        {isPreview && <p>Sample names and concepts are fictional. Real founder submissions appear here when available.</p>}
        {!isPreview && <p>Founder names and media are shown as submitted.</p>}
      </footer>
    </main>
  )
}
