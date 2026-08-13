import {
  FiActivity,
  FiBox,
  FiCode,
  FiCpu,
  FiGrid,
  FiHardDrive,
  FiRadio,
  FiSettings,
  FiTerminal,
  FiTrendingUp,
  FiWifi,
  FiZap,
} from 'react-icons/fi'

/**
 * Auto-floating chips of the technology stacks Nano Spark uses, in the same
 * floating style as the feedback marquee.
 */

const STACKS = [
  { icon: <FiCpu size={18} />, label: 'Arduino' },
  { icon: <FiRadio size={18} />, label: 'ESP32' },
  { icon: <FiBox size={18} />, label: 'Raspberry Pi' },
  { icon: <FiCode size={18} />, label: 'Python' },
  { icon: <FiTerminal size={18} />, label: 'C / C++' },
  { icon: <FiSettings size={18} />, label: 'Robotics' },
  { icon: <FiHardDrive size={18} />, label: 'Embedded Systems' },
  { icon: <FiWifi size={18} />, label: 'IoT' },
  { icon: <FiActivity size={18} />, label: 'Sensors' },
  { icon: <FiGrid size={18} />, label: 'Scratch & Block Coding' },
  { icon: <FiTrendingUp size={18} />, label: 'AI & Machine Learning' },
  { icon: <FiZap size={18} />, label: 'PCB & Electronics' },
]

export default function TechStackMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-nsGray-light to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-nsGray-light to-transparent" />

      <div className="animate-marquee flex w-max items-center gap-3 py-2">
        {[...STACKS, ...STACKS].map((s, i) => (
          <div
            key={`${s.label}-${i}`}
            className="flex min-w-max items-center gap-2.5 rounded-full border border-nsBlack/10 bg-nsWhite px-5 py-2.5 shadow-soft"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-nsYellow text-nsBlack">
              {s.icon}
            </span>
            <span className="font-heading text-sm font-extrabold text-nsBlack">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}