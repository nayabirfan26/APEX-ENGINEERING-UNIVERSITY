import {
  EngineeringDivision,
  ResearchLab,
  AdmissionDeadline,
  FeeStructure,
  EventItem,
  NewsItem,
  Testimonial,
  FaqItem
} from '../types';

export const UNIVERSITY_DIVISIONS: EngineeringDivision[] = [
  {
    id: 'cs-ai',
    name: 'School of Computer Science & Artificial Intelligence',
    code: 'SCSAI',
    tagline: 'Engineering the next era of intelligent computation, neural architectures, and hyper-scale systems.',
    description: 'The School of CS & AI leads global research in deep learning, distributed computing, cyber security, and human-computer interaction. Our curriculum combines rigorous theoretical foundation with hands-on building of resilient scalable applications.',
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Cpu',
    accentColor: 'indigo',
    hodName: 'Dr. Evelyn Vance',
    hodTitle: 'Chairperson & Turing Chair Professor in Deep Neural Systems',
    hodQuote: 'We don’t just teach computer science — we train innovators to shape how human society interacts with autonomous intelligence.',
    stats: {
      studentsCount: 1450,
      facultyCount: 68,
      labCount: 5,
      employmentRate: '99.2%'
    },
    degrees: [
      {
        title: 'B.S. in Computer Science & AI',
        level: 'Undergraduate',
        duration: '4 Years',
        credits: 136,
        description: 'Comprehensive program covering Algorithms, Systems Architecture, Machine Learning, Deep Neural Networks, and Cloud Systems.'
      },
      {
        title: 'B.S. in Software & Cybersecurity Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        credits: 134,
        description: 'Specialized focus on secure software development, cryptographic protocols, penetration testing, and enterprise safety.'
      },
      {
        title: 'M.S. in Autonomous Systems & Generative AI',
        level: 'Postgraduate',
        duration: '2 Years',
        credits: 36,
        description: 'Advanced research-driven degree emphasizing large-scale AI models, robotics vision, and reinforcement learning.'
      },
      {
        title: 'Ph.D. in Computer Science & Machine Learning',
        level: 'PhD',
        duration: '4-5 Years',
        credits: 54,
        description: 'Full research fellowship working alongside top AI researchers on novel architectures and quantum algorithmics.'
      }
    ],
    coreLabs: [
      'Neural Computing & Vision Facility',
      'Cyber Security & Threat Defense Hub',
      'Distributed Systems & Cloud Research Lab'
    ],
    careerPaths: [
      'AI Research Scientist',
      'Principal Systems Architect',
      'Cybersecurity Principal Officer',
      'Machine Learning Engineer',
      'Quant Systems Specialist'
    ],
    notableProjects: [
      {
        title: 'NeuroVision-Autonomous Drone Guidance',
        studentNames: 'Aria Chen & Marcus Thorne (Class of 2025)',
        description: 'Real-time obstacle avoidance neural model running natively on 5W edge microcontrollers.',
        award: '1st Place National Robotics Expo 2025',
        tags: ['Edge AI', 'Computer Vision', 'Embedded Robotics']
      },
      {
        title: 'SentinelShield Zero-Trust Mesh',
        studentNames: 'David K. & Team',
        description: 'De-centralized identity verification layer for industrial IoT devices.',
        award: 'Global Cyber Summit Innovation Winner',
        tags: ['Security', 'Cryptography', 'Distributed Systems']
      }
    ],
    keyFaculty: [
      {
        name: 'Dr. Evelyn Vance',
        role: 'Professor & HOD',
        specialization: 'Deep Reinforcement Learning & Foundation Models',
        email: 'e.vance@apex.edu',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
      },
      {
        name: 'Prof. Tariq Al-Mansoor',
        role: 'Professor of Cybersecurity',
        specialization: 'Post-Quantum Cryptography & Network Resilience',
        email: 't.mansoor@apex.edu',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'eqe',
    name: 'School of Electrical & Quantum Engineering',
    code: 'SEQE',
    tagline: 'Pioneering semiconductor microchips, renewable power grids, and quantum information processing.',
    description: 'Electrical & Quantum Engineering at AEU sits at the nexus of physical photonics, VLSI microchip design, smart power distribution, and superconducting quantum bits.',
    heroImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Zap',
    accentColor: 'blue',
    hodName: 'Prof. Henrik Lindqvist',
    hodTitle: 'Executive Director of Microelectronics & Cleanroom Facilities',
    hodQuote: 'From sub-nanometer chips to gigawatt sustainable smart grids, our engineers power the physical digital backbone.',
    stats: {
      studentsCount: 1120,
      facultyCount: 52,
      labCount: 4,
      employmentRate: '98.5%'
    },
    degrees: [
      {
        title: 'B.S. in Electrical & Microelectronics Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        credits: 138,
        description: 'Focus on semiconductor physics, VLSI layout, analog/digital circuits, and signal processing.'
      },
      {
        title: 'M.S. in Quantum Hardware & Photonics',
        level: 'Postgraduate',
        duration: '2 Years',
        credits: 36,
        description: 'Specialized training in cryogenic measurement, optical communication, and quantum circuit design.'
      }
    ],
    coreLabs: [
      'Cleanroom Microfabrication Facility (Class 100)',
      'Quantum Integrated Circuits Lab',
      'Smart Energy & Renewable Grid Center'
    ],
    careerPaths: [
      'Silicon ASIC Engineer',
      'Quantum Hardware Developer',
      'Power Grid Systems Lead',
      'RF & Photonics Specialist'
    ],
    notableProjects: [
      {
        title: 'Sub-mW Silicon Photonics Transceiver',
        studentNames: 'Li Wei & Sarah Jenkins',
        description: 'Ultra-low power optical interconnect enabling 400Gbps server-to-server speed in data centers.',
        award: 'IEEE Student Design Award',
        tags: ['Photonics', 'VLSI', 'Semiconductors']
      }
    ],
    keyFaculty: [
      {
        name: 'Prof. Henrik Lindqvist',
        role: 'Professor & HOD',
        specialization: 'Quantum Cryogenic Chips & Semiconductor Fabrication',
        email: 'h.lindqvist@apex.edu',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'mme',
    name: 'School of Mechanical & Mechatronics Engineering',
    code: 'SMME',
    tagline: 'Designing smart kinetic machinery, autonomous robotics, hyper-sonic thermodynamics, and advanced manufacturing.',
    description: 'SMME integrates mechanical mechanics with real-time electronic feedback, autonomous robotics, additive metal manufacturing, and computational fluid dynamics.',
    heroImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Cog',
    accentColor: 'amber',
    hodName: 'Dr. Maya Patel',
    hodTitle: 'Director of Autonomous Dynamics & Robotics Center',
    hodQuote: 'We merge physical materials with digital control loops to create machines that adapt, learn, and excel.',
    stats: {
      studentsCount: 1280,
      facultyCount: 58,
      labCount: 4,
      employmentRate: '97.8%'
    },
    degrees: [
      {
        title: 'B.S. in Mechanical Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        credits: 136,
        description: 'Core mechanics, thermodynamics, finite element analysis, CAD modeling, and manufacturing processes.'
      },
      {
        title: 'B.S. in Robotics & Mechatronics System Design',
        level: 'Undergraduate',
        duration: '4 Years',
        credits: 136,
        description: 'Integrates mechanical design, micro-actuators, embedded programming, and industrial automation.'
      },
      {
        title: 'M.S. in Advanced Manufacturing & Additive Metal 3D',
        level: 'Postgraduate',
        duration: '2 Years',
        credits: 32,
        description: 'Focus on aerospace-grade alloy fabrication, laser sintering, and generative mechanical design.'
      }
    ],
    coreLabs: [
      'Advanced Robotics & Autonomous Vehicles Testbed',
      'Additive Metal Manufacturing & Laser Sintering Lab',
      'Wind Tunnel & Thermal Dynamics Center'
    ],
    careerPaths: [
      'Robotics Systems Engineer',
      'Automotive Powertrain Lead',
      'Thermal Systems Engineer',
      'Industrial Automation Architect'
    ],
    notableProjects: [
      {
        title: 'AeroFlex Quadruped Search & Rescue Robot',
        studentNames: 'Alex Rivera & Mechanical Team',
        description: 'All-terrain legged robot featuring titanium 3D-printed limbs and active compliant suspension.',
        award: 'International Mechatronics Grand Prix Finalist',
        tags: ['Robotics', 'Kinematics', 'Mechatronics']
      }
    ],
    keyFaculty: [
      {
        name: 'Dr. Maya Patel',
        role: 'Professor & HOD',
        specialization: 'Biomimetic Robotics & Compliant Mechanisms',
        email: 'm.patel@apex.edu',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'cesi',
    name: 'School of Civil, Environmental & Sustainable Infrastructure',
    code: 'SCESI',
    tagline: 'Building smart resilient megastructures, net-zero cities, and sustainable hydrological systems.',
    description: 'Addressing the global challenge of climate change, urbanization, and structural longevity through smart sensing, recycled nano-concretes, and green building technologies.',
    heroImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Building',
    accentColor: 'emerald',
    hodName: 'Prof. Robert Thorne',
    hodTitle: 'Professor of Structural Engineering & Resilient Infrastructure',
    hodQuote: 'Civil engineering is the foundation of human civilization. We build structures that endure extreme climate shifts while leaving zero carbon footprint.',
    stats: {
      studentsCount: 950,
      facultyCount: 44,
      labCount: 3,
      employmentRate: '97.1%'
    },
    degrees: [
      {
        title: 'B.S. in Civil & Smart Infrastructure Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        credits: 135,
        description: 'Structural design, geotechnical analysis, transportation systems, and digital twin modeling.'
      },
      {
        title: 'M.S. in Sustainable Urban Systems & Net-Zero Design',
        level: 'Postgraduate',
        duration: '2 Years',
        credits: 34,
        description: 'Focus on circular economy materials, energy-efficient building envelopes, and urban hydrology.'
      }
    ],
    coreLabs: [
      'Multi-Axis Earthquake & Seismic Shake Table Lab',
      'Sustainable Concrete & Geopolymer Research Center',
      'Smart Transportation & Urban Traffic Simulator'
    ],
    careerPaths: [
      'Structural Consultant Engineer',
      'Smart City Infrastructure Lead',
      'Geotechnical Specialist',
      'Environmental Impact Auditor'
    ],
    notableProjects: [
      {
        title: 'GeoPoly-Clean Carbon Negative Concrete',
        studentNames: 'Samantha Miller & Green Infrastructure Lab',
        description: 'Industrial slag-based cement alternative offering 4x higher tensile strength with 85% reduced CO2.',
        award: 'Global Green Construction Grant',
        tags: ['Materials Science', 'Net-Zero', 'Civil Engineering']
      }
    ],
    keyFaculty: [
      {
        name: 'Prof. Robert Thorne',
        role: 'Professor & HOD',
        specialization: 'Seismic Isolation & Ultra-High Performance Concretes',
        email: 'r.thorne@apex.edu',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'aae',
    name: 'School of Aerospace & Avionics Engineering',
    code: 'SAAE',
    tagline: 'Reaching beyond boundaries in space propulsion, hypersonic aerodynamics, and autonomous satellite constellations.',
    description: 'SAAE prepares engineers to lead humanity into next-generation air travel and orbital exploration, with access to supersonic wind tunnels and real-time flight telemetry stations.',
    heroImage: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Rocket',
    accentColor: 'rose',
    hodName: 'Dr. Marcus Vance',
    hodTitle: 'Former NASA Specialist & Chair of Astronautical Engineering',
    hodQuote: 'Space is no longer a distant frontier — it is an active engineering playground for satellite swarms and deep-space missions.',
    stats: {
      studentsCount: 820,
      facultyCount: 38,
      labCount: 3,
      employmentRate: '98.8%'
    },
    degrees: [
      {
        title: 'B.S. in Aerospace Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        credits: 138,
        description: 'Aerodynamics, rocket propulsion, composite flight structures, orbital mechanics, and avionics.'
      },
      {
        title: 'M.S. in CubeSat Systems & Deep Space Exploration',
        level: 'Postgraduate',
        duration: '2 Years',
        credits: 36,
        description: 'Design and launch of miniature satellites with orbital deployment payloads.'
      }
    ],
    coreLabs: [
      'Supersonic Aerodynamics Wind Tunnel (Mach 3.5)',
      'Rocket Engine Test Rig & Combustion Chamber',
      'CubeSat Cleanroom & Mission Control'
    ],
    careerPaths: [
      'Propulsion Research Engineer',
      'Satellite Mission Operator',
      'Flight Dynamics Analyst',
      'Aerospace Composite Lead'
    ],
    notableProjects: [
      {
        title: 'ApexSat-1 Orbital CubeSat',
        studentNames: 'Aerospace Student Team',
        description: 'Student-designed 3U CubeSat successfully deployed into low-Earth orbit for atmospheric telemetry.',
        award: 'Launched via Commercial Space Mission 2025',
        tags: ['Space', 'CubeSat', 'Avionics']
      }
    ],
    keyFaculty: [
      {
        name: 'Dr. Marcus Vance',
        role: 'Professor & HOD',
        specialization: 'Electric Propulsion & Hypersonic Aerodynamics',
        email: 'm.vance@apex.edu',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80'
      }
    ]
  },
  {
    id: 'bme',
    name: 'School of Bio-Medical Engineering & Bio-Tech',
    code: 'SBME',
    tagline: 'Harmonizing biology with precision electronics, neural prosthetics, tissue engineering, and diagnostic devices.',
    description: 'SBME bridges medical science and advanced engineering to invent life-saving artificial organs, micro-fluidic diagnostic chips, and brain-computer interface technologies.',
    heroImage: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80',
    iconName: 'Activity',
    accentColor: 'purple',
    hodName: 'Dr. Sophia Al-Khoury',
    hodTitle: 'Professor of Neural Prosthetics & Tissue Regeneration',
    hodQuote: 'Engineering has entered the human body. Our breakthroughs in neural interfaces and tissue scaffolds give millions a second chance at life.',
    stats: {
      studentsCount: 780,
      facultyCount: 36,
      labCount: 3,
      employmentRate: '98.0%'
    },
    degrees: [
      {
        title: 'B.S. in Biomedical Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        credits: 135,
        description: 'Bio-mechanics, medical imaging systems, bio-compatible sensors, and tissue engineering.'
      },
      {
        title: 'M.S. in Neural Engineering & BCI',
        level: 'Postgraduate',
        duration: '2 Years',
        credits: 34,
        description: 'Focus on brain-computer interfaces, electromyographic signal processing, and prosthetic limbs.'
      }
    ],
    coreLabs: [
      'Neural Interface & Bio-Robotics Laboratory',
      'Tissue Engineering & Bioprinting Center',
      'Medical Imaging & Diagnostics Lab'
    ],
    careerPaths: [
      'Medical Device R&D Specialist',
      'Neural Interface Researcher',
      'Biocompatible Materials Engineer',
      'Clinical Systems Director'
    ],
    notableProjects: [
      {
        title: 'NeuroHand - Haptic Prosthetic Arm',
        studentNames: 'Elena Rostova & Biomedical Team',
        description: 'Myoelectric prosthetic hand providing sensory touch feedback directly to residual nerve fibers.',
        award: 'Biomedical Innovation Gold Medal',
        tags: ['Prosthetics', 'Bio-Signal', 'Sensors']
      }
    ],
    keyFaculty: [
      {
        name: 'Dr. Sophia Al-Khoury',
        role: 'Professor & HOD',
        specialization: 'Neural Decoding & Bio-Printer Scaffolding',
        email: 's.khoury@apex.edu',
        image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80'
      }
    ]
  }
];

export const RESEARCH_LABS: ResearchLab[] = [
  {
    id: 'lab-neural-ai',
    name: 'Neural Computing & Vision Facility (NCVF)',
    divisionId: 'cs-ai',
    divisionName: 'School of CS & AI',
    category: 'AI & Robotics',
    summary: 'High-performance supercomputing cluster equipped with 128x NVIDIA H100 GPUs for training multi-modal generative neural models and autonomous vision systems.',
    fullOverview: 'The Neural Computing & Vision Facility (NCVF) is one of the premier academic supercomputing hubs in the region. Dedicated to ultra-large scale transformer architectures, real-time autonomous flight vision, and energy-efficient neural chips, NCVF partners with leading AI research institutions worldwide.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    director: 'Dr. Evelyn Vance',
    equipmentList: [
      'NVIDIA HGX H100 Supercomputing Nodes (128 GPUs)',
      '100Gbps InfiniBand Ultra-Low Latency Backbone',
      'Optical Motion Capture Testbed for Swarm Drones (24 Vicon Cameras)',
      'Neuromorphic Chip Emulation Board'
    ],
    activeGrants: '$12.5 Million',
    fundingBody: 'National Science & Tech Council',
    featuredPublication: {
      title: 'Zero-Shot Spatial Navigation via Compressed Edge Vision Models',
      journal: 'Nature Machine Intelligence',
      year: 2025
    },
    metrics: {
      researchersCount: 42,
      patentsFiled: 18,
      annualFunding: '$4.2M/yr'
    }
  },
  {
    id: 'lab-cleanroom-quantum',
    name: 'Quantum Cleanroom & Microfabrication Lab (Class 100)',
    divisionId: 'eqe',
    divisionName: 'School of Electrical & Quantum Eng',
    category: 'Quantum Tech',
    summary: 'State-of-the-art cleanroom environment for photolithography, electron-beam etching, and superconducting qubit circuit prototyping.',
    fullOverview: 'Providing a dust-free ISO Class 5 environment, this facility enables faculty and graduate students to fabricate custom silicon microchips, nanophotonics sensors, and superconducting quantum bits at 5nm resolution.',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80',
    director: 'Prof. Henrik Lindqvist',
    equipmentList: [
      'Electron Beam Lithography System (10nm Feature Size)',
      'Dilution Refrigerator Cryostat (10 milliKelvin Operational Temp)',
      'Inductively Coupled Plasma Reactive Ion Etcher (ICP-RIE)',
      'Atomic Layer Deposition (ALD) Chamber'
    ],
    activeGrants: '$18.2 Million',
    fundingBody: 'Department of Defense & Semiconductor Alliance',
    featuredPublication: {
      title: 'Coherence Time Extension in 16-Qubit Superconducting Processors',
      journal: 'Physical Review Letters',
      year: 2026
    },
    metrics: {
      researchersCount: 35,
      patentsFiled: 27,
      annualFunding: '$5.8M/yr'
    }
  },
  {
    id: 'lab-robotics-autonomy',
    name: 'Autonomous Robotics & Dynamics Testbed',
    divisionId: 'mme',
    divisionName: 'School of Mechanical & Mechatronics Eng',
    category: 'AI & Robotics',
    summary: 'Specialized 5,000 sq ft physical arena for testing bipedal humanoid robots, autonomous off-road vehicles, and cooperative manipulator arms.',
    fullOverview: 'The Robotics & Dynamics Testbed provides hardware-in-the-loop simulation, high-torque actuator stress analyzers, and obstacle courses simulating planetary terrain and disaster zones.',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=80',
    director: 'Dr. Maya Patel',
    equipmentList: [
      'Dynamic Force Torque Test Benches (Up to 10kN)',
      '3D Metal Additive Sintering Machine (Titanium & Inconel)',
      'Obstacle Arena with Variable Terrain Friction Slopes',
      'High-Speed Thermal Imaging Sensor Array'
    ],
    activeGrants: '$8.7 Million',
    fundingBody: 'Industrial Autonomy Consortium',
    featuredPublication: {
      title: 'Agile Legged Locomotion on Unstable Granular Surfaces',
      journal: 'IEEE Transactions on Robotics',
      year: 2025
    },
    metrics: {
      researchersCount: 28,
      patentsFiled: 14,
      annualFunding: '$2.9M/yr'
    }
  },
  {
    id: 'lab-hypersonic-wind',
    name: 'Supersonic Aerodynamics Wind Tunnel Facility',
    divisionId: 'aae',
    divisionName: 'School of Aerospace & Avionics Eng',
    category: 'Aerospace',
    summary: 'Mach 3.5 continuous closed-loop wind tunnel engineered for supersonic boundary layer research and rocket nose cone thermal testing.',
    fullOverview: 'One of the few academic wind tunnels capable of simulating hypersonic conditions, featuring Laser Doppler Velocimetry (LDV) and Schlieren flow visualization optics.',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?auto=format&fit=crop&w=1000&q=80',
    director: 'Dr. Marcus Vance',
    equipmentList: [
      'Mach 0.5 to Mach 3.5 Variable Nozzle Wind Tunnel',
      'High-Speed Schlieren Imaging Camera (1,000,000 FPS)',
      'Laser Doppler Velocimetry Flow Profiler',
      'Combustion Diagnostic Spectroscopy Unit'
    ],
    activeGrants: '$14.0 Million',
    fundingBody: 'National Aeronautics & Space Agency',
    featuredPublication: {
      title: 'Shockwave Boundary Layer Control in Hypersonic Air Intakes',
      journal: 'Journal of Fluid Mechanics',
      year: 2025
    },
    metrics: {
      researchersCount: 24,
      patentsFiled: 11,
      annualFunding: '$3.5M/yr'
    }
  },
  {
    id: 'lab-neural-bci',
    name: 'Neural Interface & Bio-Robotics Laboratory',
    divisionId: 'bme',
    divisionName: 'School of Bio-Medical Eng',
    category: 'Biomedical',
    summary: 'Clinical research facility for high-density EEG, invasive micro-electrode recording, and robotic prosthetic calibration.',
    fullOverview: 'The Neural Interface Lab works at the intersection of neuroscience and robotics. Researchers engineer closed-loop neural decoders that allow paralyzed individuals to control prosthetic limbs with their thoughts.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80',
    director: 'Dr. Sophia Al-Khoury',
    equipmentList: [
      '256-Channel Wireless High-Density EEG Suite',
      '3D Bioprinting System for Cellular Scaffolding',
      'Micro-Fluidic Biosensor Fabrication Rig',
      'Electromyographic Signal Conditioning Rig'
    ],
    activeGrants: '$9.4 Million',
    fundingBody: 'National Health Institutes',
    featuredPublication: {
      title: 'Bi-Directional Neural Feedback in Upper-Limb Amputees',
      journal: 'Science Translational Medicine',
      year: 2026
    },
    metrics: {
      researchersCount: 30,
      patentsFiled: 16,
      annualFunding: '$3.1M/yr'
    }
  },
  {
    id: 'lab-seismic-concrete',
    name: 'Multi-Axis Seismic Shake Table & Green Concrete Lab',
    divisionId: 'cesi',
    divisionName: 'School of Civil & Environmental Eng',
    category: 'Renewables & Energy',
    summary: '6-Degrees of Freedom 10-Ton Shake Table capable of reproducing historic scale-9 earthquakes for testing high-rise building joints.',
    fullOverview: 'This facility combines heavy structural load testing with material synthesis. Engineers test full-scale reinforced concrete joints made from zero-carbon alkali-activated polymers.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    director: 'Prof. Robert Thorne',
    equipmentList: [
      '6-DOF Hydraulic Shake Table (10,000 kg Payload Capacity)',
      '2,000 kN Servo-Hydraulic Compression Testing Frame',
      'Scanning Electron Microscope (SEM) for Geopolymer Microstructure',
      'Digital Twin Acoustic Emission Crack Detectors'
    ],
    activeGrants: '$7.8 Million',
    fundingBody: 'International Resilient Infrastructure Board',
    featuredPublication: {
      title: 'Seismic Performance of Ultra-High Ductility Geopolymer Frame Joints',
      journal: 'ASCE Journal of Structural Engineering',
      year: 2025
    },
    metrics: {
      researchersCount: 22,
      patentsFiled: 9,
      annualFunding: '$2.4M/yr'
    }
  }
];

export const ADMISSION_DEADLINES: AdmissionDeadline[] = [
  {
    id: 'fall-ug-early',
    term: 'Fall 2026 - Early Decision',
    level: 'Undergraduate',
    applicationOpens: 'Sept 1, 2025',
    deadlineDate: 'Nov 15, 2025',
    decisionDate: 'Dec 20, 2025',
    status: 'Closed'
  },
  {
    id: 'fall-ug-regular',
    term: 'Fall 2026 - Regular Decision',
    level: 'Undergraduate',
    applicationOpens: 'Oct 1, 2025',
    deadlineDate: 'Aug 15, 2026',
    decisionDate: '2 Weeks Post-Submission',
    status: 'Open'
  },
  {
    id: 'fall-pg',
    term: 'Fall 2026 - Master & PhD Research',
    level: 'Postgraduate',
    applicationOpens: 'Sept 15, 2025',
    deadlineDate: 'Aug 30, 2026',
    decisionDate: 'Rolling Basis',
    status: 'Open'
  },
  {
    id: 'spring-ug',
    term: 'Spring 2027 - General Intake',
    level: 'Undergraduate',
    applicationOpens: 'June 1, 2026',
    deadlineDate: 'Nov 30, 2026',
    decisionDate: 'Dec 15, 2026',
    status: 'Upcoming'
  }
];

export const FEE_STRUCTURES: Record<string, FeeStructure> = {
  Undergraduate: {
    degreeLevel: 'Undergraduate',
    tuitionPerCredit: 450,
    creditsPerYear: 34,
    labFeePerSemester: 850,
    admissionFeeOneTime: 600,
    hostelFeePerYear: 4200
  },
  Postgraduate: {
    degreeLevel: 'Postgraduate',
    tuitionPerCredit: 620,
    creditsPerYear: 18,
    labFeePerSemester: 1100,
    admissionFeeOneTime: 750,
    hostelFeePerYear: 4800
  },
  PhD: {
    degreeLevel: 'PhD',
    tuitionPerCredit: 0, // Fully funded
    creditsPerYear: 12,
    labFeePerSemester: 0,
    admissionFeeOneTime: 0,
    hostelFeePerYear: 0
  }
};

export const UPCOMING_EVENTS: EventItem[] = [
  {
    id: 'event-open-day',
    title: 'Apex Annual Open Campus & Innovation Expo 2026',
    date: 'August 12, 2026',
    time: '09:00 AM - 05:00 PM EST',
    location: 'Central Campus Quadrangle & Research Park',
    category: 'Open Day',
    summary: 'Tour our Class 100 Cleanroom, Mach 3.5 Wind Tunnel, experience live humanoid robot demos, and meet Dean & Faculty Chairs.',
    speaker: 'Dr. Evelyn Vance & Keynote Guests',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'event-ai-symposium',
    title: 'International Quantum & AI Frontier Symposium',
    date: 'September 24, 2026',
    time: '10:00 AM - 04:00 PM EST',
    location: 'Turing Grand Auditorium',
    category: 'Symposium',
    summary: 'Global leaders from MIT, CERN, and NVIDIA discuss post-quantum cryptography and autonomous generative physical models.',
    speaker: 'Prof. Henrik Lindqvist & Turing Award Laureates',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'event-hackathon',
    title: 'ApexHack 2026: 48-Hour Green Energy & Hardware Challenge',
    date: 'October 18-20, 2026',
    time: '48 Hours Non-Stop',
    location: 'Robotics & Hardware Testbed',
    category: 'Hackathon',
    summary: '$50,000 in seed prizes for student teams building real physical prototypes in clean energy and wearable bio-sensors.',
    speaker: 'Apex Venture Fund & Industry Judges',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80'
  }
];

export const LATEST_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Apex CS & AI Lab Secures $12.5M Grant for Next-Gen Autonomous Flight Safety',
    date: 'July 18, 2026',
    category: 'Research Breakthrough',
    summary: 'The National Science Foundation awards AEU a major grant to establish the National Center for Certified Safe Neural Drones.',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-2',
    title: 'Biomedical Engineering Team Unveils Mind-Controlled Tactile Prosthetic Arm',
    date: 'July 10, 2026',
    category: 'Student Achievement',
    summary: 'Senior design students present a non-invasive myoelectric prosthetic capable of feeling textures and heat.',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'news-3',
    title: 'Apex Engineering Achieves #1 Ranking in Graduate Industry Employment',
    date: 'June 28, 2026',
    category: 'Campus News',
    summary: 'Over 98.6% of the Class of 2025 secured positions at global tech leaders or top research PhD programs within 3 months of graduation.',
    readTime: '2 min read',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Elena Rostova',
    degree: 'B.S. in Computer Science & AI',
    year: 'Class of 2024',
    currentRole: 'Senior AI Engineer',
    company: 'DeepMind',
    quote: 'The hands-on access to NCVF supercomputing clusters during my sophomore year gave me an extraordinary edge. I wasn’t just reading paper theory — I was training real neural models on 128 GPUs.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'test-2',
    name: 'Ketan Verma',
    degree: 'B.S. in Mechanical & Mechatronics',
    year: 'Class of 2023',
    currentRole: 'Robotics Lead Engineer',
    company: 'Tesla Autopilot Team',
    quote: 'Apex Engineering is a place where ideas turn into physical metal fast. The faculty encouraged us to test our quadrupeds in real wind tunnels and shake tables.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 'test-3',
    name: 'Dr. Sarah Al-Mansoori',
    degree: 'Ph.D. in Quantum Hardware',
    year: 'Class of 2025',
    currentRole: 'Quantum Device Researcher',
    company: 'IBM Quantum Research',
    quote: 'Working inside the Class 100 Cleanroom with 10mK cryogenic refrigerators prepared me directly for industry leading quantum labs.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80'
  }
];

export const FAQS: FaqItem[] = [
  {
    category: 'Admissions',
    question: 'What are the minimum academic eligibility requirements for Undergraduate Admissions?',
    answer: 'Undergraduate applicants require a High School Diploma or equivalent with a minimum cumulative GPA of 3.0 / 4.0 (or 70% in High School STEM subjects including Physics, Chemistry, and Mathematics). SAT/ACT scores are optional but recommended for Merit Scholarship consideration.'
  },
  {
    category: 'Scholarships',
    question: 'How does the Apex Merit Scholarship program work?',
    answer: 'Merit scholarships are evaluated automatically upon application submission. High school students with a GPA of 3.8+ or SAT score of 1450+ qualify for 75% to 100% full tuition coverage. A GPA of 3.5+ qualifies for 50% tuition coverage.'
  },
  {
    category: 'General',
    question: 'Can undergraduate students participate in high-level university research labs?',
    answer: 'Yes! Apex Engineering University operates the "Undergraduate Research Fellowship" (URF) program, granting over 300 undergrads direct paid positions inside our 12 Research Labs alongside PhD advisors.'
  },
  {
    category: 'Admissions',
    question: 'What is the application deadline for Fall 2026 intake?',
    answer: 'Regular Decision applications for Fall 2026 remain open until August 30, 2026. However, early submission is strongly encouraged for campus housing placement and merit scholarship allocation.'
  },
  {
    category: 'Housing',
    question: 'Are university dormitories available for international and out-of-city students?',
    answer: 'Yes, Apex Student Housing offers air-conditioned single, double, and suite-style rooms with 24/7 gigabit Wi-Fi, dining halls, recreation hubs, and shuttle transport across all engineering facilities.'
  }
];
