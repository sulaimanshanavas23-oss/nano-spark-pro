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

/** Deep thunder strike: bright crack + rolling low rumble + distant echo. */
export function playThunder(): void {
  const ac = getCtx()
  if (!ac) return
  const t = ac.currentTime

  // 1) Crisp initial crack
  const crack = ac.createBufferSource()
  crack.buffer = noiseBuffer(ac, 0.16)
  const crackFilter = ac.createBiquadFilter()
  crackFilter.type = 'bandpass'
  crackFilter.frequency.value = 1600
  crackFilter.Q.value = 0.5
  const crackGain = ac.createGain()
  crackGain.gain.setValueAtTime(0.55, t)
  crackGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.15)
  crack.connect(crackFilter)
  crackFilter.connect(crackGain)
  crackGain.connect(ac.destination)
  crack.start(t)
  crack.stop(t + 0.16)

  // 2) Rolling low rumble
  const rumble = ac.createBufferSource()
  rumble.buffer = noiseBuffer(ac, 2.4)
  const lp = ac.createBiquadFilter()
  lp.type = 'lowpass'
  lp.frequency.setValueAtTime(340, t)
  lp.frequency.exponentialRampToValueAtTime(90, t + 2.2)
  const rumbleGain = ac.createGain()
  rumbleGain.gain.setValueAtTime(0.0001, t)
  rumbleGain.gain.exponentialRampToValueAtTime(0.85, t + 0.12)
  rumbleGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.3)
  rumble.connect(lp)
  lp.connect(rumbleGain)
  rumbleGain.connect(ac.destination)
  rumble.start(t)
  rumble.stop(t + 2.4)

  // 3) Distant echo of the rumble
  const echo = ac.createBufferSource()
  echo.buffer = noiseBuffer(ac, 1.6)
  const echoLp = ac.createBiquadFilter()
  echoLp.type = 'lowpass'
  echoLp.frequency.value = 150
  const echoGain = ac.createGain()
  echoGain.gain.setValueAtTime(0.0001, t + 0.9)
  echoGain.gain.exponentialRampToValueAtTime(0.28, t + 1.1)
  echoGain.gain.exponentialRampToValueAtTime(0.0001, t + 2.0)
  echo.connect(echoLp)
  echoLp.connect(echoGain)
  echoGain.connect(ac.destination)
  echo.start(t + 0.9)
  echo.stop(t + 2.0)
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