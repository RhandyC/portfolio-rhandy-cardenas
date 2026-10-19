export const siteConfig = {
  name: "Rhandy Cardenas",
  title: "Industrial PhD Researcher · AI & Autonomous Driving",
  description: "Industrial PhD researcher specializing in autonomous-driving decision-making, planning under uncertainty, and safe autonomous systems at Renault Group and UTC/Heudiasyc.",
  accentColor: "#3b82f6",
  cv: {
    url: "/documents/Rhandy-Cardenas-CV.pdf",
    filename: "Rhandy-Cardenas-CV.pdf",
    notificationEndpoint: "https://formsubmit.co/ajax/rhandy.cardenas-curo@hds.utc.fr",
  },
  presentationVideos: [
  {
    "youtubeId": "O8JKeqDw87I",
    "title": "Research at Renault",
    "organization": "Renault Group",
    "description": "An introduction to my industrial research in autonomous driving."
  },
  {
    "youtubeId": "IoX6sEZbNwQ",
    "title": "Research at Heudiasyc",
    "organization": "Heudiasyc · UTC",
    "description": "An introduction to my research in control and robotics."
  }
],
  social: {
    email: "rhandy.cardenas-curo@hds.utc.fr",
    linkedin: "https://linkedin.com/in/rhandy-cardenas",
    github: "https://github.com/RhandyC",
  },
  aboutMe: "Industrial PhD researcher in Control and Robotics at Renault Group and UTC/Heudiasyc, specializing in AI for autonomous-driving decision-making, planning under uncertainty, and safe autonomous systems under Operational Design Domain (ODD) constraints. I develop, integrate, and validate algorithms in Python, C++, and ROS 2, from simulation to SIL/VIL and prototype-vehicle testing. My work draws on machine learning, deep learning, and reinforcement learning. Originally from Peru, I am based in Compiègne, France. My PhD defense is scheduled for December 2026.",
  skills: [
  "Python",
  "C++",
  "ROS 2",
  "MDP / POMDP",
  "POMCP / Monte Carlo Tree Search",
  "Dynamic Programming",
  "Deep RL: DQN, Policy Gradients, Actor-Critic",
  "Machine Learning & Deep Learning",
  "PyTorch",
  "Keras",
  "scikit-learn",
  "IPG CarMaker",
  "CARLA",
  "Gazebo",
  "MATLAB/Simulink",
  "Git",
  "Linux",
  "Visual Studio",
  "LabVIEW",
  "Catia V5",
  "SolidWorks",
  "STM32",
  "Arduino"
],
  publications: [
    {
      title: "Context-Aware and Reliable Long-Term Decision-Making for Safe Intelligent Vehicles: A Survey",
      authors: "R. P. Cardenas, L. Adouane, C. Zinoune and M. A. Benloucif",
      venue: "in IEEE Transactions on Intelligent Vehicles, doi: 10.1109/TIV.2024.3524881",
      link: "https://doi.org/10.1109/TIV.2024.3524881",
      thumbnail: "/images/publications/survey-odd-safety-transparent.png",
      thumbnailAlt: "Three key aspects of ODD-based vehicle safety: formalizing the ODD, identifying critical dimensions, and deciding and acting to prevent an ODD exit.",
      figureLabel: "Fig. 19 · ODD-based vehicle safety",
      keywords: ["Survey", "Decision-Making", "ODD", "Safety"],
    },
    {
      title: "ODD-based long-term decision-making for intelligent vehicles",
      authors: "R. P. Cardenas Curo, L. Adouane, C. Zinoune and M. A. Benloucif",
      venue: "Proc. IEEE Intell. Vehicles Symp. (IV), Cluj-Napoca, Romania, 22–25 June 2025",
      link: "https://ieeexplore.ieee.org/document/11097482/",
      videoUrl: "https://www.youtube.com/watch?v=Q73BhVw109k",
      thumbnail: "https://i.ytimg.com/vi/Q73BhVw109k/mqdefault.jpg",
      thumbnailAlt: "Video accompanying ODD-based long-term decision-making for intelligent vehicles.",
      figureLabel: "Research video · IEEE IV 2025",
      keywords: ["ODD", "Decision-making", "Markov Decision Process"],
    },
    {
      title: "Assessing the decisional capability for an ODD-compliant automatic lane change system via Sense–Think–Act paradigm",
      authors: "R. P. Cardenas Curo, L. Adouane, C. Zinoune and M. A. Benloucif",
      venue: "Proc. 12th IFAC Symp. Intell. Autonomous Vehicles (IAV), Phoenix, AZ, USA, 7–9 May 2025",
      link: "https://www.sciencedirect.com/science/article/pii/S2405896325003672",
      thumbnail: "/images/publications/ifac-visibility-transparent.png",
      thumbnailAlt: "Lane-change areas of interest under good and degraded visibility, showing the vehicle's perception envelope.",
      figureLabel: "Fig. 3 · Visibility & lane changes",
      keywords: ["ODD", "Capability Assessment", "Skill Graph"],
    },
  ],
  academicProjects: [
{"name": "Quadruped Robot for Underground Mine Exploration", "description": "Technical Supervisor · National University of Engineering, Peru · Feb–Dec 2025. Developed and supervised ROS 2 and Gazebo simulation workflows for autonomous underground mine exploration. Mentored student teams on integration, route planning, and decision-making.", "link": "", "skills": ["ROS 2", "Gazebo", "Route Planning", "Technical Supervision"]},
{"name": "IEEE VAMS 2025 · Organizing Committee", "images": [{ "src": "/images/projects/vams-2025-shuttles.png", "alt": "VAMS participants gathered beside two autonomous shuttles during demonstrations in Paris.", "caption": "IEEE VAMS 2025 · Autonomous shuttle demonstrations, Paris", "width": 1600, "height": 1199 }], "description": "CNAM, Paris · August 2025. Organizing committee member for the 2nd IEEE International Symposium on Verification of Autonomous Mobile Systems. Developed the registration website and coordinated speaker and attendee activities during autonomous shuttle demonstrations.", "link": "https://vams2025.fr/", "skills": ["Autonomous Systems", "Web Development", "Event Organization"]},
    {
      name: "UTAC Challenge 2024",
      images: [
        { src: "/images/projects/utac-challenge-2024.png", alt: "The UTC team celebrating with its trophies at the UTAC Challenge 2024.", caption: "UTC team · UTAC Challenge 2024", width: 1280, height: 960 },
      ],
      description:
        "Mentored the UTC student team during the UTAC Challenge 2024, the first European competition in a real-world environment dedicated to autonomous and connected mobility. Supervised the development of the 'UTonome On Demand' (UTOD) system using CARLA and MATLAB for simulation. Results: 2nd place (Open Category) and Best School Award.",
      link: "https://www.utc.fr/breves-actualites/lutc-remporte-deux-prix-dont-celui-de-la-meilleure-ecole-a-lutac-challenge-2024/",
      skills: ["CARLA", "MATLAB", "Autonomous Driving", "Mentoring"],
    },
    {
      name: "National IUT Robotics Competition · Cachan",
      images: [
        { src: "/images/projects/iut-cachan-robot.jpg", alt: "The autonomous tennis robot with its mechanical arm and a tennis ball at the Festival de Robotique de Cachan.", caption: "Autonomous tennis robot · IUT competition, Cachan", width: 1600, height: 1200 },
      ],
      description:
        "Designed and developed an autonomous robotic platform capable of simulating a tennis match at IUT Nice Côte d’Azur (Oct 2018–Apr 2019). Contributed to mechanical design, embedded electronics, and software development.",
      link: "",
      skills: ["SolidWorks", "3D Printing", "Electronics", "Robotics"],
    },
    {
      name: "Fuzzy System for CARLA",
      images: [
        { src: "/images/projects/fuzzy-system-carla.png", alt: "Overview of the CARLA fuzzy decision-making system, with perception, environment inputs, maneuver outputs, and an HMI module.", caption: "Fuzzy decision-making framework · CARLA & Python", width: 2222, height: 1230 },
      ],
      description:
        "Tactical driving of vehicles using a fuzzy logic system for decision-making in the CARLA autonomous driving simulator. Open-source implementation.",
      link: "https://github.com/RhandyC/FuzzySystemCarla",
      skills: ["Python", "Fuzzy Logic", "CARLA", "Decision-Making"],
    },
  ],
  engagement: {
    title: "Roundtable at UTC",
    date: "21 April 2026",
    location: "Université de Technologie de Compiègne",
    description: "Participation in a discussion on international talent and research in France with fellow doctoral researchers, during Philippe Baptiste’s visit to UTC.",
    image: "/images/engagement/utc-roundtable-philippe-baptiste.png",
    imageAlt: "A group photograph at UTC during Philippe Baptiste’s visit, following the roundtable on international talent and research.",
    postUrl: "https://www.linkedin.com/feed/update/urn:li:ugcPost:7452396192048746496/",
    sourceUrl: "https://www.enseignementsup-recherche.gouv.fr/fr/lancement-de-la-strategie-choose-france-higher-education-101347",
  },
  experience: [
  {
    "company": "Université de Technologie de Compiègne",
    "title": "Teaching Assistant – Python Programming",
    "dateRange": "Sep 2026 – Present",
    "bullets": [
      "Supervise and assess Python programming laboratories for engineering students, covering core programming concepts, object-oriented programming, scientific computing, and databases."
    ]
  },
  {
    "company": "Renault Group / Heudiasyc UTC",
    "title": "Industrial PhD Research Engineer – ADAS/AD",
    "dateRange": "Jul 2023 – Jul 2026",
    "bullets": [
      "Analyzed tactical decision-making approaches to guide the behavior planning architecture.",
      "Designed a behavior planning framework that dynamically maps vehicle capabilities to enable fail-operational behavior and graceful degradation under ODD transitions.",
      "Modeled sequential decisions with MDPs and POMDPs, using Value Iteration and Monte Carlo planning (POMCP) to reason under uncertainty.",
      "Built a modular planning system in C++ and Python on ROS 2 for real-time integration into an industrial software architecture.",
      "Validated through SIL, VIL, and prototype-vehicle experiments on controlled tracks.",
      "Benchmarked against baseline planning models to assess tactical safety and operational continuity under capability limitations and ODD changes."
    ]
  },
  {
    "company": "Université de Technologie de Compiègne",
    "title": "Teaching Assistant – Control Systems",
    "dateRange": "Oct 2023 – Feb 2024",
    "bullets": [
      "Supervised master-level laboratories in system modeling and feedback control.",
      "Guided hands-on experiments using MATLAB/Simulink for system analysis and implementation."
    ]
  },
  {
    "company": "Renault Group, Aubevoye",
    "title": "R&AE Intern – HMI Decision System",
    "dateRange": "Feb 2022 – Aug 2022",
    "bullets": [
      "Developed a ROS-based interactive system for selecting tactical maneuvers in highway driving scenarios.",
      "Designed maneuver feasibility and safety validation logic.",
      "Studied user interaction with maneuver-based autonomous driving in simulation."
    ]
  },
  {
    "company": "NW Technology",
    "title": "R&D Intern – Assistant Engineer",
    "dateRange": "Sep 2020 – Feb 2021",
    "bullets": [
      "Designed a flexible polymer shell for aerodynamic pressure sensors using 3D printing.",
      "Developed a Python HMI for GCODE post-processing."
    ]
  },
  {
    "company": "UTC Innovation Center",
    "title": "Fablab Monitor",
    "dateRange": "Oct 2019 – Jan 2020",
    "bullets": [
      "Supported engineering students in CAD modeling and rapid prototyping.",
      "Assisted with 3D printers, laser cutting, and digital manufacturing equipment."
    ]
  },
  {
    "company": "I21 Innovation, Cagnes-sur-Mer",
    "title": "R&D Intern – Graduate Technical Internship",
    "dateRange": "Apr 2019 – Jun 2019",
    "bullets": [
      "Developed energy management and energy harvesting solutions for low-power connected embedded systems.",
      "Programmed ATmega328P and STM32 microcontrollers in C++ for sensing, transmission, and system optimization."
    ]
  }
],
  education: [
    {
      school: "Université de Technologie de Compiègne × Renault",
      degree: "PhD in Control and Robotics (CIFRE)",
      dateRange: "2023 – 2026",
      achievements: [
        "Industrial research partnership with Renault Group",
        "Focus: Decision-making for intelligent vehicles",
        "PhD defense scheduled for December 2026",
        "Published in IEEE Transactions on Intelligent Vehicles",
      ],
    },
    {
      school: "Université de Technologie de Compiègne",
      degree: "MEng Mechanical Engineering, Mechatronics",
      dateRange: "2019 – 2023",
      achievements: [
        "Specialization in robotics and control systems",
        "Final project at Renault on autonomous vehicles",
      ],
    },
    {
      school: "IUT Nice Côte d'Azur",
      degree: "DUT Electrical Engineering & Industrial Computing",
      dateRange: "2017 – 2019",
      achievements: [
        "Foundation in electronics and embedded systems",
        "Internship at I21 Innovation",
      ],
    },
  {"school": "National University of Engineering, Peru", "degree": "Studies in Mechatronics Engineering", "dateRange": "2015 – 2017", "achievements": ["Engineering studies prior to continuing my education in France."]},
  ],
  languages: [
    { name: "Spanish", level: "Native", flag: "🇵🇪" },
    { name: "French", level: "C1", flag: "🇫🇷" },
    { name: "English", level: "C1", flag: "🇬🇧" },
    { name: "Italian", level: "A2", flag: "🇮🇹" },
    { name: "German", level: "A2", flag: "🇩🇪" },
  ],
  certifications: [
  {
    "name": "Deep Reinforcement Learning Nanodegree",
    "issuer": "Udacity",
    "date": "2026",
    "description": "DQN, policy gradients, actor-critic algorithms, continuous control, and multi-agent reinforcement learning."
  },
  {
    "name": "Self-Driving Car Engineer Nanodegree",
    "issuer": "Udacity",
    "date": "2026",
    "description": "Deep learning, computer vision, object detection, sensor fusion, localization, motion planning, and vehicle control."
  },
  {
    "name": "Machine Learning Specialization",
    "issuer": "DeepLearning.AI & Stanford Online",
    "date": "2023",
    "description": "Supervised and unsupervised learning, neural networks, regression, classification, decision trees, and model evaluation."
  }
],
};
