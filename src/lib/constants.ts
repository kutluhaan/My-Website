export const siteConfig = {
  name: 'Kutluhan Aygüzel',
  title: 'AI Engineer & Systems Architect',
  tagline: 'Architecting intelligent systems that scale',
  contact: {
    phone: '+90 553 520 3137',
    email: 'kutluhan@sabanciuniv.edu',
    website: 'https://kutluhaan.github.io/ItsKutluhan.github.io/',
    linkedin: 'https://www.linkedin.com/in/kutluhanayguzel/',
  },
  cvPdfPath: '/cv.pdf', // Place exported PDF in public/cv.pdf
};

export const experience = [
  {
    id: '1',
    role: 'AI Engineer',
    company: 'Semper Tech',
    location: 'Istanbul, Turkey',
    period: '06/2025 – Present',
    description:
      'Architecting a scalable Agentic AI ecosystem for Arçelik\'s Homewhiz IoT platform with multi-reasoning capabilities for 3,000+ concurrent users through a microservice architecture.',
    impact: '90% retrieval accuracy | 15%→6% hallucination reduction | 20% latency reduction',
  },
  {
    id: '2',
    role: 'Senior Tutor',
    company: 'Pi-Course',
    location: 'Ankara, Turkey',
    period: '02/2025 – 08/2025',
    description:
      'Delivered 120+ hours of intensive 1-on-1 mentorships, breaking down computer science fundamentals including Algorithms, Data Structures, and C++.',
    impact: '6+ personalized learning roadmaps | Python & Data Science hands-on practice',
  },
  {
    id: '3',
    role: 'Part-time AI Engineer',
    company: 'Semper Tech',
    location: 'Istanbul, Turkey',
    period: '02/2025 – 06/2025',
    description:
      'Architected a role-based multi-agent ecosystem orchestrated by a central supervisor agent using LangGraph.',
    impact: '62% average task completion reduction | 100% AI explainability via citations',
  },
  {
    id: '4',
    role: 'AI/ML Engineer Intern',
    company: 'GT-ARC Gemeinnützige GmbH',
    location: 'Berlin, Germany',
    period: '07/2024 – 09/2024',
    description:
      'Orchestrated a text-to-video pipeline with SadTalker achieving 512×512 resolution. Built autonomous AI Tutor system with GPT integration.',
    impact: '2.8s generation latency | 35% reasoning enhancement | 32% engagement increase',
  },
  {
    id: '5',
    role: 'Learning Assistant',
    company: 'Sabancı University CS 201',
    location: 'Istanbul, Turkey',
    period: '02/2023 – 06/2023',
    description: 'Mentored 25+ students in C++ fundamentals: Pointers, Memory Management, Recursion.',
    impact: '70% of students scored 90+ on recitation quizzes',
  },
];

export const techStack = {
  core: [
    'Distributed Systems',
    'Microservices',
    'LangGraph',
    'Agentic AI',
    'RAG Systems',
  ],
  frontend: [
    'Next.js',
    'React',
    'Vue.js',
    'Flutter',
    'Performance Optimization',
  ],
  cloud: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'CI/CD', 'Python'],
};

export const projects = [
  {
    id: '1',
    name: 'AI/ML Trading Bot',
    description:
      'Algorithmic trading bot for BIST30 with 65.41% simulated profit, FinBERT sentiment analysis.',
    tech: ['Python', 'React', 'Flask', 'MySQL', 'Docker', 'NLP'],
    github: null,
    live: null,
  },
  {
    id: '2',
    name: 'Cloud To-Do App',
    description:
      'GCP-distributed app with 1000-user load, TCP/UDP sockets, Kubernetes autoscaling.',
    tech: ['GCP', 'Docker', 'Kubernetes', 'RPC', 'Load Balancing'],
    github: null,
    live: null,
  },
  {
    id: '3',
    name: 'SIR Epidemic Simulation',
    description:
      'Network science simulation of Istanbul railway topology for viral spread analysis.',
    tech: ['Python', 'NetworkX', 'Monte Carlo', 'Graph Theory'],
    github: null,
    live: 'https://shorturl.at/fwBMv',
  },
  {
    id: '4',
    name: 'Wellmarkt E-Commerce',
    description:
      'Microservice e-commerce with Spring Boot, MongoDB, 200ms latency, 85% test coverage.',
    tech: ['Java', 'Spring Boot', 'MongoDB', 'JUnit', 'CI/CD'],
    github: null,
    live: null,
  },
  {
    id: '5',
    name: 'Bug Severity Prediction',
    description:
      'BERT/RoBERTa multi-class NLP for software vulnerability severity from bug reports.',
    tech: ['Python', 'BERT', 'RoBERTa', 'TF-IDF', 'NLP'],
    github: null,
    live: null,
  },
];

export const education = {
  institution: 'Sabancı University',
  location: 'Istanbul, Turkey',
  period: '2020 – 2025',
  degree: 'B.S. Computer Science and Engineering',
  cgpa: '2.68',
};

export const certificates = [
  'NVIDIA Deep Learning Institute – Fundamentals of Deep Learning',
  'NVIDIA – Building Conversational AI Applications',
  'NVIDIA – Accelerating CUDA C/C++',
  'NVIDIA – Transformer-Based NLP Applications',
  'IBM – Databases and SQL for Data Science',
  'IBM – Machine Learning With Python',
  'DeepLearning.AI – Neural Networks and Deep Learning',
];
