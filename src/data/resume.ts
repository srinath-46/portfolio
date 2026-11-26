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
  role: "Cybersecurity & Full Stack Developer",
  location: "Chennai, India",
  email: "l.srinath160706@gmail.com",
  linkedin: "https://www.linkedin.com/in/srinath-l-0460s",
  linkedinLabel: "linkedin.com/in/srinath-l-0460s",
  github: "https://github.com/srinath-46",
  githubLabel: "github.com/srinath-46",
  heroBio:
    "Building intelligent security systems, AI/ML models, and full-stack web applications—from real-time insider threat detection and 3D cargo optimisation to wearable distress monitoring.",
  aboutParagraphs: [
    "I am a Cybersecurity and Full Stack Developer with hands-on experience building intelligent, data-driven applications, security telemetry pipelines, and predictive models using Python, React, Next.js, FastAPI, Flask, and Kali Linux.",
    "Across internships and applied engineering builds—including AI-powered insider threat detection (SentinelIQ), wearable distress detection (AURA), logistics 3D cargo optimisation, and dynamic pricing systems—I combine cybersecurity principles with full-stack software engineering to ship secure, efficient, and user-centric systems. I speak English, Tamil, and Hindi.",
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
    value: "5+",
    label: "Full stack & security systems built",
  },
  {
    value: "5+",
    label: "Data visualisation dashboards shipped",
  },
  {
    value: "5",
    label: "Verified credentials & certifications",
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "sentineliq",
    title: "SentinelIQ",
    subtitle: "AI-Powered Insider Threat & Data Leak Detector",
    role: "Cybersecurity & ML Developer",
    bullets: [
      "Architected a real-time insider threat and sensitive data leakage detection platform tailored for enterprise environments.",
      "Integrated network and host telemetry ingestion across Zeek, Suricata, and Wazuh mapped against the MITRE ATT&CK framework.",
      "Implemented ML anomaly detection using Isolation Forest and XGBoost to identify abnormal user behaviour and data exfiltration.",
      "Integrated Microsoft Presidio and NLP pipelines to detect unauthorized transmission of sensitive PII and confidential records in real time.",
    ],
    tech: [
      "Cybersecurity",
      "Zeek",
      "Suricata",
      "Wazuh",
      "MITRE ATT&CK",
      "Presidio",
      "XGBoost",
      "Isolation Forest",
      "FastAPI",
      "Supabase",
      "PostgreSQL",
    ],
    codeUrl: "https://github.com/srinath-46",
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
      "Supabase",
    ],
    codeUrl: "https://github.com/srinath-46",
  },
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
    codeUrl: "https://github.com/srinath-46",
  },
  {
    id: "dynamic-pricing",
    title: "Dynamic Pricing Web App",
    subtitle: "Automated Demand Forecasting & Revenue Optimisation",
    role: "AI/ML Intern · Vulture Lines Tech Management Pvt Ltd",
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
  "Cybersecurity",
  "Zeek",
  "Suricata",
  "Wazuh",
  "MITRE ATT&CK",
  "Microsoft Presidio",
  "Kali Linux",
  "Python",
  "Java",
  "C/C++",
  "SQL",
  "JavaScript",
  "TypeScript",
  "HTML/CSS",
  "FastAPI",
  "React",
  "Next.js",
  "Flask",
  "Streamlit",
  "Machine Learning",
  "XGBoost",
  "Isolation Forest",
  "Scikit-learn",
  "SHAP",
  "Three.js",
  "PostgreSQL",
  "Supabase",
  "REST API",
  "Figma",
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
    title: "AI/ML Intern",
    organization: "Vulture Lines Tech Management Pvt Ltd",
    details: [
      "Built an end-to-end Dynamic Pricing web app using Flask and XGBoost, automating demand forecasting and reducing manual pricing effort by ~60%.",
      "Deployed 3 interactive business dashboards that let stakeholders explore revenue optimisation strategies in real time.",
    ],
  },
  {
    id: "digioptimized",
    category: "Experience",
    period: "Jul 2025 – Aug 2025",
    title: "Software Development Intern",
    organization: "Digioptimized",
    details: [
      "Contributed to frontend stability, responsive UI development, and performance across production workflows.",
      "Engineered and maintained internal driver dashboard routes (/driver/dashboard) with real-time operational state tracking.",
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
      "Undergraduate engineering degree focused on computer science, cybersecurity, AI/ML model development, and full stack systems.",
    ],
  },
  {
    id: "certifications",
    category: "Certifications",
    period: "Verified Credentials",
    title: "Cybersecurity, Cloud & AI/ML Certifications",
    organization: "NPTEL · Harvard CS50 · Kaggle · Simplilearn · freeCodeCamp",
    details: [
      "NPTEL: Cloud Computing (Elite Certification)",
      "Harvard CS50's Introduction to Artificial Intelligence with Python",
      "Simplilearn: Machine Learning Using Python",
      "freeCodeCamp: Machine Learning with Python",
      "Kaggle: Intro to Machine Learning",
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
    label: "Cybersecurity & Tools",
    items: [
      "Kali Linux",
      "Zeek",
      "Suricata",
      "Wazuh",
      "MITRE ATT&CK",
      "Microsoft Presidio",
      "Network Security",
      "Security Telemetry",
    ],
  },
  {
    label: "Languages",
    items: ["Python", "Java", "C/C++", "SQL", "JavaScript", "TypeScript", "HTML/CSS"],
  },
  {
    label: "AI/ML & Data",
    items: [
      "Machine Learning",
      "Model Training & Evaluation",
      "Predictive Modelling",
      "Anomaly Detection",
      "Data Preprocessing",
      "pandas",
      "Scikit-learn",
      "XGBoost",
      "Isolation Forest",
      "SHAP",
    ],
  },
  {
    label: "Frameworks & Backend",
    items: ["React", "Next.js", "FastAPI", "Flask", "Streamlit", "PostgreSQL", "Supabase", "Three.js", "REST API"],
  },
  {
    label: "Hardware & Platforms",
    items: ["Seeed XIAO nRF52840 Sense", "MAX30102", "TMP117", "BLE", "Figma", "Jupyter"],
  },
  {
    label: "Professional Attributes",
    items: ["Adaptability", "Leadership", "Inquisitiveness", "Problem Solving", "Persistence"],
  },
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    number: "01",
    title: "Security & Problem Solving First",
    description:
      "Start from the core operational vulnerability or bottleneck—whether insider threat vectors, manual pricing, or loan evaluation—and engineer measurable, verified solutions.",
  },
  {
    number: "02",
    title: "Inquisitiveness Across Layers",
    description:
      "Bridge hardware sensors, telemetry collectors, ML models, and responsive frontends so insights and alerts reach decision makers in real time.",
  },
  {
    number: "03",
    title: "Persistence & Clean Code",
    description:
      "Iterate on data preprocessing, feature engineering, and robust architectures until results are secure, explainable, and production-ready.",
  },
  {
    number: "04",
    title: "Adaptability & Leadership",
    description:
      "Move fluidly between security analysis, FastAPI backends, and stakeholder dashboards to eliminate friction and ship with high velocity.",
  },
];
