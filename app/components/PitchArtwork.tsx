type PitchMood = 'ocean' | 'energy' | 'health'

const moodLabels: Record<PitchMood, string> = {
  ocean: 'An abstract animated scene inspired by ocean currents and coastal mapping',
  energy: 'An abstract animated scene inspired by clean energy and light',
  health: 'An abstract animated scene inspired by care and cellular forms',
}

export default function PitchArtwork({
  mood,
  label,
}: {
  mood: PitchMood
  label?: string
}) {
  return (
    <div
      className={`pitch-art pitch-art--${mood}`}
      role="img"
      aria-label={label ?? moodLabels[mood]}
    >
      <span className="art-grain" aria-hidden="true" />
      <span className="art-grid" aria-hidden="true" />
      <span className="art-halo art-halo-one" aria-hidden="true" />
      <span className="art-halo art-halo-two" aria-hidden="true" />
      <span className="art-orbit art-orbit-one" aria-hidden="true" />
      <span className="art-orbit art-orbit-two" aria-hidden="true" />
      <span className="art-core" aria-hidden="true" />
      <span className="art-satellite art-satellite-one" aria-hidden="true" />
      <span className="art-satellite art-satellite-two" aria-hidden="true" />
      <span className="art-satellite art-satellite-three" aria-hidden="true" />
      <svg className="art-contours" viewBox="0 0 720 520" fill="none" aria-hidden="true">
        <path d="M-20 350C83 314 124 420 220 390C321 359 351 265 450 288C549 310 588 393 742 326" />
        <path d="M-31 382C71 348 128 448 228 418C332 387 365 296 461 319C558 341 601 420 752 358" />
        <path d="M-37 417C60 384 133 481 238 449C347 415 378 332 474 354C569 375 618 452 759 391" />
      </svg>
      <span className="art-label" aria-hidden="true"><span /> PITCHRiser / MOTION STUDY</span>
    </div>
  )
}
