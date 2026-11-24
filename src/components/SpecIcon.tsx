import {
  FiBookOpen,
  FiCode,
  FiCpu,
  FiLayers,
  FiNavigation,
  FiRadio,
  FiSettings,
  FiSmartphone,
  FiTool,
  FiUser,
  FiWifi,
  FiZap,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { SpecIconKey } from '../lib/products'

const ICONS: Record<SpecIconKey, IconType> = {
  cpu: FiCpu,
  motor: FiSettings,
  wifi: FiWifi,
  phone: FiSmartphone,
  code: FiCode,
  tool: FiTool,
  book: FiBookOpen,
  user: FiUser,
  sensor: FiRadio,
  navigation: FiNavigation,
  chip: FiLayers,
  circuit: FiZap,
}

export function SpecIcon({ icon, size = 20 }: { icon: SpecIconKey; size?: number }) {
  const Icon = ICONS[icon] ?? FiCpu
  return <Icon size={size} />
}
