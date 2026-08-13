/**
 * Lightweight Web Audio sound engine — no audio files needed.
 * Synthesizes professional tap/click sounds and a thunder strike.
 */

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  try {
    if (!ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function noiseBuffer(ac: AudioContext, seconds: number): AudioBuffer {
  const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * seconds), ac.sampleRate)
  const data = buf.getChannelData(0)
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1
  return buf
}

/** Soft professional tap/click for buttons, links and toggles. */
export function playClick(): void {
  const ac = getCtx()
  if (!ac) return
  const t = ac.currentTime

  const src = ac.createBufferSource()
  src.buffer = noiseBuffer(ac, 0.06)
  const filter = ac.createBiquadFilter()
  filter.type = 'highpass'
  filter.frequency.value = 1100
  const gain = ac.createGain()
  gain.gain.setValueAtTime(0.14, t)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.055)
  src.connect(filter)
  filter.connect(gain)
  gain.connect(ac.destination)
  src.start(t)
  src.stop(t + 0.06)
}

/** Unlock audio on the first user gesture (browser autoplay policies). */
export function initSounds(): void {
  const unlock = () => getCtx()
  window.addEventListener('pointerdown', unlock, { once: true })
  window.addEventListener('keydown', unlock, { once: true })
}

/** Global tap/click sound for any interactive element. */
export function bindClickSounds(): void {
  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null
    if (target?.closest?.('a, button, [role="button"], select, input[type="checkbox"], input[type="radio"]')) {
      playClick()
    }
  }
  document.addEventListener('click', onClick)
}