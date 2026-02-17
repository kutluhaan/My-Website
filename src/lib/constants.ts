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

import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI/ML Trading Bot',
    description: 'Algorithmic trading bot for BIST30 with 65.41% simulated profit, FinBERT sentiment analysis.',
    longDescription: 'Developed an algorithmic trading system for BIST30 stocks using machine learning and sentiment analysis. Integrated FinBERT for real-time news sentiment analysis to inform trading decisions. Achieved 65.41% simulated profit through backtesting with historical data.',
    technologies: [
      { name: 'Python', category: 'backend' },
      { name: 'React', category: 'frontend' },
      { name: 'Flask', category: 'backend' },
      { name: 'MySQL', category: 'database' },
      { name: 'Docker', category: 'devops' },
      { name: 'NLP', category: 'other' },
    ],
    category: 'web-application',
    featured: true,
    startDate: '2024-01-01',
    endDate: '2024-06-01',
    liveUrl: undefined,
    repoUrl: undefined,
    metrics: {
      performance: '65.41% simulated profit',
      impact: 'Real-time sentiment analysis integration',
    },
  },
  {
    id: '2',
    title: 'Cloud To-Do App',
    description: 'GCP-distributed app with 1000-user load, TCP/UDP sockets, Kubernetes autoscaling.',
    longDescription: 'Built a distributed to-do application on Google Cloud Platform designed to handle 1000+ concurrent users. Implemented TCP/UDP socket communication for real-time updates and Kubernetes autoscaling for dynamic resource management.',
    technologies: [
      { name: 'GCP', category: 'devops' },
      { name: 'Docker', category: 'devops' },
      { name: 'Kubernetes', category: 'devops' },
      { name: 'RPC', category: 'backend' },
      { name: 'Load Balancing', category: 'devops' },
    ],
    category: 'web-application',
    featured: true,
    startDate: '2023-09-01',
    endDate: '2024-01-01',
    liveUrl: undefined,
    repoUrl: undefined,
    metrics: {
      users: 1000,
      performance: 'Kubernetes autoscaling',
      impact: 'Real-time synchronization across distributed nodes',
    },
  },
  {
    id: '3',
    title: 'SIR Epidemic Simulation',
    description: 'Network science simulation of Istanbul railway topology for viral spread analysis.',
    longDescription: 'Created a network science simulation using the SIR (Susceptible-Infected-Recovered) model to analyze viral spread patterns across Istanbul\'s railway network. Applied graph theory and Monte Carlo methods for probabilistic modeling.',
    technologies: [
      { name: 'Python', category: 'backend' },
      { name: 'NetworkX', category: 'other' },
      { name: 'Monte Carlo', category: 'other' },
      { name: 'Graph Theory', category: 'other' },
    ],
    category: 'tool',
    featured: false,
    startDate: '2023-03-01',
    endDate: '2023-06-01',
    liveUrl: 'https://shorturl.at/fwBMv',
    repoUrl: undefined,
    metrics: {
      impact: 'Network topology analysis for epidemic modeling',
    },
  },
  {
    id: '4',
    title: 'Wellmarkt E-Commerce',
    description: 'Microservice e-commerce with Spring Boot, MongoDB, 200ms latency, 85% test coverage.',
    longDescription: 'Architected a microservices-based e-commerce platform using Spring Boot and MongoDB. Achieved sub-200ms response times through optimized database queries and caching strategies. Maintained 85% test coverage with comprehensive unit and integration tests.',
    technologies: [
      { name: 'Java', category: 'backend' },
      { name: 'Spring Boot', category: 'backend' },
      { name: 'MongoDB', category: 'database' },
      { name: 'JUnit', category: 'other' },
      { name: 'CI/CD', category: 'devops' },
    ],
    category: 'web-application',
    featured: true,
    startDate: '2023-06-01',
    endDate: '2023-12-01',
    liveUrl: undefined,
    repoUrl: undefined,
    metrics: {
      performance: '200ms average latency',
      impact: 'Microservices architecture with 85% test coverage',
    },
  },
  {
    id: '5',
    title: 'Bug Severity Prediction',
    description: 'BERT/RoBERTa multi-class NLP for software vulnerability severity from bug reports.',
    longDescription: 'Developed a machine learning system to predict bug severity levels from textual bug reports. Implemented BERT and RoBERTa transformer models with TF-IDF feature extraction for multi-class classification of software vulnerabilities.',
    technologies: [
      { name: 'Python', category: 'backend' },
      { name: 'BERT', category: 'other' },
      { name: 'RoBERTa', category: 'other' },
      { name: 'TF-IDF', category: 'other' },
      { name: 'NLP', category: 'other' },
    ],
    category: 'tool',
    featured: false,
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    liveUrl: undefined,
    repoUrl: undefined,
    metrics: {
      impact: 'Automated severity classification for bug triage',
    },
  },
  {
    id: '6',
    title: 'AI Tutor System',
    description: 'Autonomous AI tutoring system with GPT integration for personalized learning.',
    longDescription: 'Built an autonomous AI tutor system during internship at GT-ARC. Integrated GPT models for natural language understanding and generation. Achieved 35% improvement in reasoning capabilities and 32% increase in student engagement through adaptive learning paths.',
    technologies: [
      { name: 'Python', category: 'backend' },
      { name: 'GPT', category: 'other' },
      { name: 'NLP', category: 'other' },
    ],
    category: 'web-application',
    featured: true,
    startDate: '2024-07-01',
    endDate: '2024-09-01',
    liveUrl: undefined,
    repoUrl: undefined,
    metrics: {
      impact: '35% reasoning enhancement, 32% engagement increase',
    },
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
