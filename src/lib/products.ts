export type SpecIconKey =
  | 'cpu'
  | 'motor'
  | 'wifi'
  | 'phone'
  | 'code'
  | 'tool'
  | 'book'
  | 'user'
  | 'sensor'
  | 'navigation'
  | 'chip'
  | 'circuit'

export interface ProductSpec {
  label: string
  icon: SpecIconKey
}

export interface StemProduct {
  slug: string
  name: string
  fullName: string
  tagline: string
  description: string
  image: string
  imageAlt: string
  specs: ProductSpec[]
  highlights: string[]
}

export const STEM_PRODUCTS: StemProduct[] = [
  {
    slug: 'wifi-controlled-car',
    name: 'WiFi Controlled Car',
    fullName: 'WiFi Controlled Car – STEM Project Kit',
    tagline: 'Smart robotics you can control from your phone',
    description:
      'Build and control your own smart robotic vehicle using WiFi technology. Explore embedded systems, wireless communication, motor control, and hands-on robotics.',
    image: '/images/wifi%20car.jpeg',
    imageAlt: 'Nano Spark WiFi Controlled Car STEM Project Kit',
    specs: [
      { label: 'ESP32 Microcontroller', icon: 'cpu' },
      { label: 'DC Motors with Motor Driver', icon: 'motor' },
      { label: 'WiFi-Based Wireless Control', icon: 'wifi' },
      { label: 'Mobile Interface Control', icon: 'phone' },
      { label: 'Open-Source Code', icon: 'code' },
      { label: 'DIY Hardware Kit with Guide', icon: 'tool' },
      { label: 'Easy Programming and Hands-on Learning', icon: 'book' },
    ],
    highlights: [
      'Build a complete WiFi-controlled robotic vehicle from scratch.',
      'Learn how ESP32, motor drivers, and wireless commands work together.',
      'Control movement live from a mobile interface.',
      'Take home a working project with guided code and hardware.',
    ],
  },
  {
    slug: 'human-follower-robot',
    name: 'Human Follower Robot',
    fullName: 'Human Follower Robot – STEM Project Kit',
    tagline: 'Intelligent robotics that detects and follows',
    description:
      'Explore intelligent robotics through a human-following robot that detects and follows a person using sensor-based detection and autonomous movement.',
    image: '/images/human%20follower%20bot.jpeg',
    imageAlt: 'Nano Spark Human Follower Robot STEM Project Kit',
    specs: [
      { label: 'Person Detection', icon: 'user' },
      { label: 'Ultrasonic Sensors', icon: 'sensor' },
      { label: 'Autonomous Movement', icon: 'navigation' },
      { label: 'Intelligent Following Mechanism', icon: 'chip' },
      { label: 'Hands-on Robotics Learning', icon: 'tool' },
      { label: 'Embedded Electronics', icon: 'circuit' },
      { label: 'STEM-Based Practical Learning', icon: 'book' },
    ],
    highlights: [
      'Discover how sensors help a robot understand the world around it.',
      'Program autonomous movement and intelligent following behaviour.',
      'Work with ultrasonic sensing and embedded electronics.',
      'Finish with a working robot that follows a person in real time.',
    ],
  },
]

export function getProductBySlug(slug: string | undefined): StemProduct | undefined {
  return STEM_PRODUCTS.find((product) => product.slug === slug)
}
