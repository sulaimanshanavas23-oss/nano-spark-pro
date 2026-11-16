export type ToolLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export type ToolLogoKey =
  | 'arduino'
  | 'vscode'
  | 'python'
  | 'tinkercad'
  | 'wokwi'
  | 'seeed'
  | 'blynk'
  | 'iot'
  | 'claude'
  | 'github'
  | 'scratch'

export interface Tool {
  id: string
  name: string
  tagline: string
  description: string
  logo: ToolLogoKey
  accent: string
  level: ToolLevel
  website: string
  whatStudentsLearn: string
  practicalApplications: string[]
  skills: string[]
}

export const TOOLS_PLATFORMS: Tool[] = [
  {
    id: 'arduino-ide',
    name: 'Arduino IDE',
    tagline: 'Embedded Development',
    description:
      'Write, compile and upload code to the microcontrollers that power real electronics projects.',
    logo: 'arduino',
    accent: '#00979D',
    level: 'Intermediate',
    website: 'https://www.arduino.cc/en/software',
    whatStudentsLearn:
      'C/C++ basics, pin control, reading sensors, serial communication and uploading firmware to Arduino-compatible boards.',
    practicalApplications: [
      'LED and traffic-signal builds',
      'Sensor-driven robots',
      'Home automation prototypes',
      'Wearable electronics',
    ],
    skills: ['Embedded C++', 'GPIO control', 'Sensor interfacing', 'Firmware upload'],
  },
  {
    id: 'vs-code',
    name: 'VS Code',
    tagline: 'Programming & Development',
    description:
      'The professional code editor used to write, debug and manage projects in almost any language.',
    logo: 'vscode',
    accent: '#007ACC',
    level: 'Advanced',
    website: 'https://code.visualstudio.com/',
    whatStudentsLearn:
      'Project structure, extensions, the integrated terminal, debugging and a complete Git workflow inside one editor.',
    practicalApplications: [
      'Python and AI projects',
      'Web development',
      'Arduino with PlatformIO',
      'Team projects with Git',
    ],
    skills: ['Code editing', 'Debugging', 'Extensions', 'Git integration', 'Terminal workflow'],
  },
  {
    id: 'python',
    name: 'Python',
    tagline: 'Data Analysis & AI Applications',
    description:
      'A versatile language for automation, data analysis and building AI-powered applications.',
    logo: 'python',
    accent: '#3776AB',
    level: 'Advanced',
    website: 'https://www.python.org/',
    whatStudentsLearn:
      'Python fundamentals, data handling with pandas, visualisation and introductory machine-learning workflows.',
    practicalApplications: [
      'Sensor data analysis',
      'AI and computer-vision demos',
      'Automation scripts',
      'Dashboards and reports',
    ],
    skills: ['Python syntax', 'Data structures', 'NumPy & pandas', 'AI/ML basics'],
  },
  {
    id: 'tinkercad',
    name: 'Tinkercad',
    tagline: '3D Design & Simulation',
    description:
      'A beginner-friendly browser workspace for 3D modelling, circuits and block-based coding.',
    logo: 'tinkercad',
    accent: '#1477D4',
    level: 'Beginner',
    website: 'https://www.tinkercad.com/',
    whatStudentsLearn:
      'Drag-and-drop 3D modelling, circuit simulation, breadboarding and safe experimentation with virtual parts.',
    practicalApplications: [
      '3D-printable enclosures',
      'Virtual circuits',
      'Arduino simulation',
      'Prototype design',
    ],
    skills: ['3D modelling', 'Circuit building', 'Breadboarding', 'Rapid prototyping'],
  },
  {
    id: 'wokwi',
    name: 'Wokwi',
    tagline: 'Online Simulation',
    description:
      'Simulate Arduino, ESP32 and embedded systems in the browser with virtual sensors and displays.',
    logo: 'wokwi',
    accent: '#111111',
    level: 'Intermediate',
    website: 'https://wokwi.com/',
    whatStudentsLearn:
      'Embedded code testing, ESP32 Wi-Fi projects, component wiring and debugging without physical hardware.',
    practicalApplications: [
      'ESP32 IoT prototypes',
      'Arduino code testing',
      'Sensor simulations',
      'Remote-friendly workshops',
    ],
    skills: ['Embedded simulation', 'ESP32', 'Sensor logic', 'Debugging'],
  },
  {
    id: 'seeed-studio',
    name: 'Seeed Studio',
    tagline: 'Hardware & IoT',
    description:
      'Development boards, Grove sensors and kits for building connected devices and IoT systems.',
    logo: 'seeed',
    accent: '#79B928',
    level: 'Intermediate',
    website: 'https://www.seeedstudio.com/',
    whatStudentsLearn:
      'Hardware selection, Grove module wiring, microcontrollers and building reliable IoT device prototypes.',
    practicalApplications: [
      'Smart environment monitors',
      'IoT sensor nodes',
      'Robotics builds',
      'Rapid hardware prototypes',
    ],
    skills: ['Hardware selection', 'Grove ecosystem', 'IoT devices', 'Wiring & assembly'],
  },
  {
    id: 'blynk',
    name: 'Blynk',
    tagline: 'IoT Dashboard',
    description:
      'Build mobile dashboards that control and monitor IoT devices from anywhere.',
    logo: 'blynk',
    accent: '#23C4B5',
    level: 'Intermediate',
    website: 'https://blynk.io/',
    whatStudentsLearn:
      'Connecting boards to the cloud, designing mobile dashboards and sending live sensor data over Wi-Fi.',
    practicalApplications: [
      'Remote home automation',
      'Live sensor dashboards',
      'Smart agriculture demos',
      'Alert systems',
    ],
    skills: ['Cloud connectivity', 'Dashboard design', 'Remote control', 'IoT data flow'],
  },
  {
    id: 'iot-platform',
    name: 'IoT Platform',
    tagline: 'Cloud Integration (MQTT, APIs)',
    description:
      'Connect devices to the cloud and move data through MQTT topics and APIs.',
    logo: 'iot',
    accent: '#2196F3',
    level: 'Advanced',
    website: 'https://www.thethingsnetwork.org/',
    whatStudentsLearn:
      'MQTT publish/subscribe, cloud device registration, data pipelines and API-based integration.',
    practicalApplications: [
      'Cloud-connected sensors',
      'Device monitoring',
      'Data logging',
      'Smart campus demos',
    ],
    skills: ['MQTT', 'APIs', 'Cloud integration', 'Data pipelines'],
  },
  {
    id: 'claude-ai',
    name: 'Claude AI',
    tagline: 'Idea Generation & Debugging',
    description:
      'An AI assistant for brainstorming ideas, explaining concepts and unblocking difficult bugs.',
    logo: 'claude',
    accent: '#D97757',
    level: 'Intermediate',
    website: 'https://claude.ai/',
    whatStudentsLearn:
      'Prompting for project ideas, understanding error messages, reviewing code and exploring design alternatives responsibly.',
    practicalApplications: [
      'Project brainstorming',
      'Code explanation',
      'Debug assistance',
      'Documentation drafts',
    ],
    skills: ['Prompting', 'AI-assisted debugging', 'Critical review', 'Research'],
  },
  {
    id: 'github',
    name: 'GitHub',
    tagline: 'Project Hosting & Collaboration',
    description:
      'Host code, track versions and collaborate on projects with the same workflow professionals use.',
    logo: 'github',
    accent: '#181717',
    level: 'Intermediate',
    website: 'https://github.com/',
    whatStudentsLearn:
      'Repositories, commits, branches, pull requests and working with a team on shared code.',
    practicalApplications: [
      'Portfolio projects',
      'Team collaboration',
      'Version history',
      'Publishing demos',
    ],
    skills: ['Git & GitHub', 'Version control', 'Branching', 'Collaboration'],
  },
]

export const TOOLBOX_TOOLS: Tool[] = [
  {
    id: 'scratch',
    name: 'Scratch',
    tagline: 'Beginner block-based programming',
    description:
      'Snap colour-coded blocks together to build games, stories and animations while learning how code thinks.',
    logo: 'scratch',
    accent: '#F9A02A',
    level: 'Beginner',
    website: 'https://scratch.mit.edu/',
    whatStudentsLearn:
      'Sequencing, loops, conditionals, events and variables through visual block programming — no syntax to memorise.',
    practicalApplications: [
      'Interactive stories and games',
      'Animated characters',
      'Simple simulations',
      'First coding workshop projects',
    ],
    skills: ['Computational thinking', 'Sequencing', 'Loops', 'Conditionals', 'Creative design'],
  },
  {
    id: 'tinkercad-circuits',
    name: 'Tinkercad Circuits',
    tagline: 'Beginner electronics & circuit simulation',
    description:
      'Build and test real circuits in the browser with LEDs, resistors, buttons, sensors and Arduino boards.',
    logo: 'tinkercad',
    accent: '#1477D4',
    level: 'Beginner',
    website: 'https://www.tinkercad.com/circuits',
    whatStudentsLearn:
      'Circuit fundamentals, component connections, breadboard layout, voltage and current basics, and reading diagrams.',
    practicalApplications: [
      'Virtual LED circuits',
      'Button and sensor experiments',
      'Arduino simulation',
      'Safe circuit troubleshooting',
    ],
    skills: ['Circuit analysis', 'Component identification', 'Breadboarding', 'Voltage/current basics'],
  },
  {
    id: 'wokwi',
    name: 'Wokwi',
    tagline: 'Arduino, ESP32 & embedded-system simulation',
    description:
      'A professional browser simulator for Arduino and ESP32 projects, complete with virtual sensors and displays.',
    logo: 'wokwi',
    accent: '#111111',
    level: 'Intermediate',
    website: 'https://wokwi.com/',
    whatStudentsLearn:
      'Microcontroller programming, sensor integration, wireless communication and IoT prototyping inside a simulator.',
    practicalApplications: [
      'ESP32 Wi-Fi projects',
      'Sensor-reading systems',
      'Motor-control logic',
      'Connected-device prototypes',
    ],
    skills: ['Arduino programming', 'Sensor integration', 'Wireless communication', 'IoT fundamentals'],
  },
  {
    id: 'tinkercad-3d',
    name: 'Tinkercad 3D Design',
    tagline: 'Basic CAD and prototyping',
    description:
      'Turn ideas into printable 3D models with simple drag-and-drop CAD tools built for first-time designers.',
    logo: 'tinkercad',
    accent: '#5B6EE1',
    level: 'Intermediate',
    website: 'https://www.tinkercad.com/3d-design',
    whatStudentsLearn:
      '3D modelling fundamentals, shape transformation, hole creation, measurement and preparing models for 3D printing.',
    practicalApplications: [
      'Custom project enclosures',
      'Robotics parts',
      'Product prototypes',
      '3D-print-ready models',
    ],
    skills: ['3D modelling', 'CAD basics', 'Solid geometry', '3D printing preparation'],
  },
  {
    id: 'arduino-ide',
    name: 'Arduino IDE',
    tagline: 'Microcontroller programming',
    description:
      'The gateway from simulation to real hardware — write code and watch physical components respond.',
    logo: 'arduino',
    accent: '#00979D',
    level: 'Intermediate',
    website: 'https://www.arduino.cc/en/software',
    whatStudentsLearn:
      'C/C++ for microcontrollers, GPIO control, sensor integration, serial debugging and uploading firmware.',
    practicalApplications: [
      'Robots and rovers',
      'Home automation',
      'Wearable technology',
      'IoT device prototypes',
    ],
    skills: ['Embedded C++', 'GPIO programming', 'Sensor interfacing', 'Firmware development'],
  },
  {
    id: 'vs-code',
    name: 'VS Code',
    tagline: 'Advanced programming and development',
    description:
      'A professional-grade editor that brings code, terminal, debugging and Git into one clean workspace.',
    logo: 'vscode',
    accent: '#007ACC',
    level: 'Advanced',
    website: 'https://code.visualstudio.com/',
    whatStudentsLearn:
      'Advanced code editing, debugging, extensions, the integrated terminal and version control across multiple languages.',
    practicalApplications: [
      'Full-stack development',
      'Backend services',
      'AI and ML projects',
      'Professional developer workflow',
    ],
    skills: ['Code editing', 'Debugging', 'Extensions', 'Git integration', 'Terminal workflow'],
  },
  {
    id: 'python',
    name: 'Python',
    tagline: 'Advanced programming and AI projects',
    description:
      'The language behind modern AI, data science and automation — from first script to trained model.',
    logo: 'python',
    accent: '#3776AB',
    level: 'Advanced',
    website: 'https://www.python.org/',
    whatStudentsLearn:
      'Python programming, data structures, AI/ML libraries, automation and scripting with pandas, NumPy and scikit-learn.',
    practicalApplications: [
      'Data analysis',
      'Machine-learning models',
      'Task automation',
      'AI-powered applications',
    ],
    skills: ['Python programming', 'Data structures', 'AI/ML libraries', 'Automation', 'Scripting'],
  },
]
