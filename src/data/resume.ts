export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period?: string;
  bullets: string[];
  tech: string[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface RecordItem {
  id: string;
  category: "Experience" | "Education" | "Certifications";
  period: string;
  title: string;
  organization: string;
  details: string[];
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface PrincipleItem {
  number: string;
  title: string;
  description: string;
}

export const PROFILE = {
  name: "Srinath L",
  role: "AI/ML & Full Stack Developer",
  location: "Chennai, India",
  email: "l.srinath160706@gmail.com",
  linkedin: "https://www.linkedin.com/in/srinath-l-0460s",
  linkedinLabel: "linkedin.com/in/srinath-l-0460s",
  heroBio:
    "Building intelligent applications with Python, Machine Learning, React, and Flask—from 3D cargo optimisation and wearable distress detection to real-time pricing systems.",
  aboutParagraphs: [
    "I am an AI/ML and Full Stack Developer with hands-on experience building intelligent, data-driven web applications using Python, Machine Learning, React, JavaScript, and Flask. My work spans predictive modelling, data preprocessing, REST API integration, and responsive interfaces.",
    "Across internships and applied builds—including cargo space optimisation, sensor-based sensory distress detection, dynamic pricing, and loan eligibility prediction—I focus on combining AI/ML capabilities with full stack engineering to ship scalable, efficient, and user-focused applications. I speak English, Tamil, and Hindi.",
  ],
};

export const HERO_STATS = [
  {
    value: "~60%",
    label: "Manual pricing effort reduced",
    source: "Dynamic Pricing Web App · Vulture Lines",
  },
  {
    value: "~40%",
    label: "Manual loan evaluation reduced",
    source: "Loan Eligibility Predictor · One Yes Infotech",
  },
  {
    value: "~25%",
    label: "Average cargo space utilisation gain",
    source: "SmartStack · 3D Cargo Optimisation",
  },
];

export const WORK_STATS = [
  {
    value: "3",
    label: "Interactive business dashboards deployed",
  },
  {
    value: "5+",
    label: "Data visualisation components shipped",
  },
  {
    value: "4",
    label: "AI/ML certifications completed",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "smartstack",
    title: "SmartStack",
    subtitle: "AI-Powered Cargo Space Optimisation",
    role: "Fullstack Developer & AI/ML Model Trainer",
    bullets: [
      "Built an interactive smart logistics frontend with real-time 3D cargo stacking visualisation.",
      "Enabled warehouse teams to preview load arrangements clearly before physical loading.",
      "Trained and optimised AI/ML cargo placement models, improving average space utilisation by ~25%.",
      "Added reusable layout-sharing and visual guidance features to reduce repeated planning and loading errors.",
    ],
    tech: ["React", "Three.js", "Python", "Scikit-learn", "Flask", "REST API"],
  },
  {
    id: "aura",
    title: "AURA",
    subtitle: "AI-Powered Sensory Distress Detection Wearable",
    role: "ML Trainer & IoT Developer",
    bullets: [
      "Developed and trained machine learning models to identify sensory distress patterns using physiological and behavioural data.",
      "Predicted potential distress episodes early to support timely caregiver intervention.",
      "Integrated MAX30102 and TMP117 IoT sensors with the Seeed XIAO nRF52840 Sense wearable.",
      "Streamed physiological signals and temperature over BLE for real-time data collection and caregiver alerts.",
    ],
    tech: [
      "Python",
      "Machine Learning",
      "XGBoost",
      "Seeed XIAO nRF52840 Sense",
      "MAX30102",
      "TMP117",
      "BLE",
    ],
  },
  {
    id: "dynamic-pricing",
    title: "Dynamic Pricing Web App",
    subtitle: "Automated Demand Forecasting & Revenue Optimisation",
    role: "Ai/Ml Intern · Vulture Lines Tech Management Pvt Ltd",
    period: "Dec 2025 – Jan 2026",
    bullets: [
      "Built an end-to-end Dynamic Pricing web app using Flask and XGBoost.",
      "Automated demand forecasting and reduced manual pricing effort by ~60%.",
      "Deployed 3 interactive business dashboards for stakeholders to explore revenue optimisation strategies in real time.",
      "Shortened stakeholder decision cycles noticeably through live pricing simulations.",
    ],
    tech: ["Flask", "XGBoost", "Python", "Data Visualisation"],
  },
  {
    id: "loan-predictor",
    title: "Loan Eligibility Predictor",
    subtitle: "Automated Financial Assessment & Visual Review",
    role: "Python & Data Science Intern · One Yes Infotech Solutions",
    period: "May 2025 – Jun 2025",
    bullets: [
      "Developed a Loan Eligibility Predictor in Python and Streamlit.",
      "Automated the full financial assessment workflow, reducing manual evaluation effort by ~40%.",
      "Built 5+ data visualisation components making loan decisions easier to understand and review.",
      "Delivered a clean, PEP 8-compliant codebase built for readability and maintenance.",
    ],
    tech: ["Python", "Streamlit", "Data Visualisation", "PEP 8"],
  },
];

export const STACK_ITEMS: string[] = [
  "Python",
  "Java",
  "C/C++",
  "SQL",
  "JavaScript",
  "HTML/CSS",
  "Machine Learning",
  "Model Training & Evaluation",
  "Predictive Modelling",
  "Data Preprocessing",
  "Data Visualisation",
  "pandas",
  "Scikit-learn",
  "XGBoost",
  "SHAP",
  "Flask",
  "React",
  "Streamlit",
  "Three.js",
  "REST API",
  "Figma",
  "Kali Linux",
  "Jupyter",
  "Seeed XIAO nRF52840 Sense",
  "MAX30102",
  "TMP117",
  "BLE",
];

export const RECORD_TIMELINE: RecordItem[] = [
  {
    id: "vulture-lines",
    category: "Experience",
    period: "Dec 2025 – Jan 2026",
    title: "Ai/Ml Intern",
    organization: "Vulture Lines Tech Management Pvt Ltd",
    details: [
      "Built an end-to-end Dynamic Pricing web app using Flask and XGBoost, automating demand forecasting and reducing manual pricing effort by ~60%.",
      "Deployed 3 interactive business dashboards that let stakeholders explore revenue optimisation strategies in real time.",
    ],
  },
  {
    id: "one-yes",
    category: "Experience",
    period: "May 2025 – Jun 2025",
    title: "Python & Data Science Intern",
    organization: "One Yes Infotech Solutions",
    details: [
      "Developed a Loan Eligibility Predictor in Python and Streamlit, automating the full financial assessment workflow and reducing manual evaluation effort by ~40%.",
      "Built 5+ data visualisation components and delivered a clean, PEP 8-compliant codebase.",
    ],
  },
  {
    id: "be-cse",
    category: "Education",
    period: "Aug 2023 – May 2027",
    title: "B.E. Computer Science & Engineering",
    organization: "Agni College of Technology",
    details: [
      "Undergraduate engineering degree focused on computer science, AI/ML model development, and full stack software systems.",
    ],
  },
  {
    id: "certifications",
    category: "Certifications",
    period: "Verified Credentials",
    title: "AI & Machine Learning Certifications",
    organization: "Harvard CS50 · Kaggle · Simplelearn · Free",
    details: [
      "Harvard CS50's Introduction to Artificial Intelligence with Python",
      "Kaggle: Intro to Machine Learning",
      "Simplelearn: Machine Learning Using Python",
      "Free: Machine Learning with Python",
    ],
  },
  {
    id: "hsc",
    category: "Education",
    period: "Jun 2022 – May 2023",
    title: "HSC (Class XII)",
    organization: "Erwin Matric Hr. Sec. School",
    details: ["Higher Secondary Certificate completion."],
  },
  {
    id: "sslc",
    category: "Education",
    period: "Jun 2020 – May 2021",
    title: "SSLC (Class X)",
    organization: "Erwin Matric Hr. Sec. School",
    details: ["Secondary School Leaving Certificate completion."],
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    label: "Languages",
    items: ["Python", "Java", "C/C++", "SQL", "JavaScript", "HTML/CSS"],
  },
  {
    label: "AI/ML & Data",
    items: [
      "Machine Learning",
      "Model Training & Evaluation",
      "Predictive Modelling",
      "Data Preprocessing",
      "Data Visualisation",
      "pandas",
      "Scikit-learn",
      "XGBoost",
      "SHAP",
    ],
  },
  {
    label: "Frameworks & Libraries",
    items: ["Flask", "React", "Streamlit", "Three.js", "REST API"],
  },
  {
    label: "Tools & Platforms",
    items: ["Figma", "Kali Linux", "Jupyter", "Seeed XIAO nRF52840 Sense", "BLE"],
  },
  {
    label: "Soft Skills",
    items: ["Adaptability", "Leadership", "Inquisitiveness", "Problem Solving", "Persistence"],
  },
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    number: "01",
    title: "Problem Solving First",
    description:
      "Start from the operational bottleneck—whether manual pricing, loan evaluation, or cargo loading—and measure every model against real effort reduced.",
  },
  {
    number: "02",
    title: "Inquisitiveness Across Layers",
    description:
      "Bridge hardware sensors, ML training pipelines, and responsive frontends so intelligence reaches the people actually making decisions.",
  },
  {
    number: "03",
    title: "Persistence & Clean Code",
    description:
      "Iterate on preprocessing, evaluation, and PEP 8-compliant architecture until results are explainable, visual, and ready to review.",
  },
  {
    number: "04",
    title: "Adaptability & Leadership",
    description:
      "Move fluidly between Flask APIs, React 3D views, and stakeholder dashboards to shorten decision cycles and ship as a team.",
  },
];
