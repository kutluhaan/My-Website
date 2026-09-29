import type { CoverKind } from './covers';

export type ProjectKind = 'ai' | 'backend' | 'cloud' | 'data' | 'research';
export type Tone = 'coral' | 'sun' | 'mint' | 'sky' | 'lilac' | 'pink';

export interface Metric {
  value: string;
  label: string;
}

export interface FlowStep {
  label: string;
  sub?: string;
  /** Text shown on the connector leading into this step */
  via?: string;
  accent?: boolean;
}

export interface Project {
  id: string;
  cover: CoverKind;
  tone: Tone;
  title: string;
  context: string;
  period: string;
  kinds: ProjectKind[];
  blurb: string;
  metrics?: Metric[];
  flow?: FlowStep[];
  bullets: string[];
  stack: string[];
  featured?: boolean;
}

export const kindLabels: Record<ProjectKind, string> = {
  ai: 'AI & ML',
  backend: 'Backend',
  cloud: 'Cloud & DevOps',
  data: 'Data',
  research: 'Research',
};

export const projects: Project[] = [
  {
    id: 'trading',
    cover: 'trading',
    tone: 'mint',
    title: 'Agentic Algorithmic Trading System on a Live Brokerage',
    context: 'Graduation project · team project, nearly all components built by me',
    period: 'Sep 2024 — Jun 2025',
    kinds: ['ai', 'backend', 'cloud'],
    featured: true,
    blurb:
      'An event-driven BIST30 trading system where ML models produce signals and a hand-built LLM agent gathers live news, reads those signals and places orders through the Deniz Yatırım Algolab API (DenizBank’s algorithmic-trading platform). Validated by backtest, then simulation, then small live volume with real capital.',
    metrics: [
      { value: '65.41%', label: 'simulated return (backtest)' },
      { value: '52.8%', label: 'directional accuracy, buy / sell decisions' },
      { value: '1.4', label: 'Sharpe ratio (backtest)' },
      { value: '−12%', label: 'max drawdown (backtest)' },
      { value: '< 1 s', label: 'signal to order' },
      { value: '6–8', label: 'containerized services' },
    ],
    flow: [
      { label: 'Prices + news', sub: '10 y BIST30 · Bloomberg, KAP, Yahoo' },
      { label: 'ML signals', sub: 'FinBERT · RSI/MACD · Keras NN', via: 'events' },
      {
        label: 'GPT-4o agent',
        sub: 'custom loop · limits, stop-loss, kill switch, HITL',
        via: 'events',
        accent: true,
      },
      { label: 'C# execution', sub: 'order placement', via: 'Kafka · gRPC' },
      { label: 'Algolab API', sub: 'Deniz Yatırım, live', via: 'HTTPS' },
    ],
    bullets: [
      'Led end-to-end design and implementation of an event-driven, agentic trading system for BIST30, building the ML, LLM agent, C# execution and infrastructure layers across 6–8 containerized services.',
      'Designed a hybrid decision engine: ML models generated buy / sell signals from market data, while a hand-built GPT-4o agent loop, written without any agent framework and using prompted JSON actions with schema validation, retries, step limits and a hold-by-default fallback, gathered live web data and news, interpreted the ML outputs and placed orders over multiple reasoning steps.',
      'Safeguarded autonomous LLM trading with layered risk controls: position and order-size limits, automatic stop-loss, a kill switch and human-in-the-loop approval for high-value or anomalous trades, while routine decisions ran autonomously.',
      'Built a C# execution service for order placement, portfolio and real-time market data retrieval, communicating with Python services over Kafka and gRPC with sub-second signal-to-order latency.',
      'Built a multi-source news ingestion pipeline (web scraping, news APIs, RSS) and fused FinBERT sentiment with technical indicators and oscillators (RSI, MACD) in TensorFlow / Keras feedforward networks that classified each step as buy, sell or hold. Trained on 10 years of daily history and run live on minute-level Algolab data aggregated into daily-equivalent rolling indicators. A custom backtesting engine reported the figures above.',
      'Validated strategies through backtesting and simulation before running them live with real capital at small volume. Orchestrated the services with Docker Compose on a self-hosted lab server and shipped through a GitHub Actions pipeline (lint, build and test, Docker image build and push, automated deployment) that took changes to production in under 5 minutes, with logging, metrics and a ReactJS monitoring dashboard on MongoDB.',
    ],
    stack: [
      'OpenAI GPT-4o',
      'Python',
      'C# / .NET',
      'FastAPI',
      'Apache Kafka',
      'gRPC',
      'FinBERT',
      'TensorFlow / Keras',
      'MongoDB',
      'ReactJS',
      'Docker Compose',
      'GitHub Actions',
      'Algolab API',
      'HITL',
      'Web scraping',
      'RSS',
      'HTTPS / REST',
    ],
  },
  {
    id: 'cloud',
    cover: 'cloud',
    tone: 'sky',
    title: 'Cloud-Native Distributed To-Do Platform',
    context: 'Cloud Computing course · team project, active in development, deployment, DevOps and testing',
    period: 'Feb 2025 — Jun 2025',
    kinds: ['cloud', 'backend'],
    featured: true,
    blurb:
      'The same FastAPI app run on AWS EC2 and on a Kubernetes cluster built from scratch on GCP virtual machines, with load tests guiding the scaling thresholds.',
    metrics: [
      { value: '2,000', label: 'concurrent users load-tested' },
      { value: '2 → 10', label: 'pods, autoscaled on requests per second' },
      { value: '< 1 s', label: 'response times under load' },
    ],
    flow: [
      { label: 'Locust', sub: '2,000 users' },
      { label: 'GCP Load Balancer', sub: 'L4', via: 'TCP' },
      { label: 'NGINX Ingress', sub: 'L7 routing', via: 'HTTP' },
      { label: 'FastAPI pods', sub: 'HPA 2 → 10 on RPS', via: 'k3s', accent: true },
      { label: 'Prometheus + Adapter', sub: 'custom metrics API', via: 'RPS' },
    ],
    bullets: [
      'Deployed a containerized FastAPI platform on AWS EC2 and on a self-managed k3s Kubernetes cluster (1 control plane, 3–4 workers) built from scratch on GCP virtual machines, taking an active role across development, deployment, DevOps and testing.',
      'Load-tested the system to 2,000 concurrent users with Locust and used the results to tune request-rate-based Horizontal Pod Autoscaling (2 → 10 pods on RPS via Prometheus Adapter), sustaining sub-second response times behind a GCP load balancer (L4) and NGINX Ingress (L7).',
      'Implemented low-level distributed communication with TCP sockets and RPC; containerized services with Docker for OS-level isolation.',
    ],
    stack: [
      'FastAPI',
      'AWS EC2',
      'GCP Compute Engine',
      'k3s',
      'NGINX Ingress',
      'Prometheus',
      'HPA',
      'Locust',
      'Docker',
      'TCP sockets',
      'RPC',
      'GCP Load Balancer',
      'Prometheus Adapter',
      'CI/CD',
    ],
  },
  {
    id: 'wellmarkt',
    cover: 'commerce',
    tone: 'sun',
    title: 'Wellmarkt: Event-Driven E-Commerce Platform',
    context: 'Software Engineering course · 5–6 person team, Jira and Scrum',
    period: 'Sep 2024 — Jan 2025',
    kinds: ['backend'],
    featured: true,
    blurb:
      'A full e-commerce platform on Java Spring Boot microservices with a ReactJS front end, role-based access, order tracking and stock management, decoupled through Kafka.',
    metrics: [
      { value: '4+', label: 'Spring Boot microservices' },
      { value: '20+', label: 'JWT-secured REST endpoints' },
      { value: '500 ms', label: 'latency' },
      { value: '5+', label: 'two-week Scrum sprints' },
    ],
    flow: [
      { label: 'ReactJS', sub: 'storefront' },
      { label: 'Spring Boot services', sub: '4+ · JWT · RBAC · PostgreSQL + MongoDB', via: 'REST' },
      { label: 'Apache Kafka', sub: 'order → stock update · payment events · notifications', via: 'events', accent: true },
    ],
    bullets: [
      'Co-developed an event-driven Java Spring Boot backend of 4+ microservices with a ReactJS front end and JWT-secured REST APIs, delivering a full e-commerce platform at 500 ms latency across 20+ endpoints.',
      'Used Kafka to decouple order, inventory, payment and notification flows, so order creation asynchronously triggered stock updates, payment events and email notifications.',
      'Implemented role-based access control for 4+ user roles, ratings and reviews, order tracking, stock management and product staging using PostgreSQL for transactional data and MongoDB for flexible catalog and review data; containerized all services with Docker.',
      'Delivered in 5+ two-week Scrum sprints within a 5+ person team using Jira.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'Spring Security',
      'JWT',
      'Apache Kafka',
      'ReactJS',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'REST',
      'Microservices',
      'Jira',
    ],
  },
  {
    id: 'banking',
    cover: 'banking',
    tone: 'sky',
    title: 'Banking System Database and Concurrency Control',
    context: 'Database Systems course',
    period: 'Sep 2023 — Jan 2024',
    kinds: ['backend', 'data'],
    blurb:
      'A banking database modelled, indexed and tested for data integrity under concurrent money transfers.',
    metrics: [{ value: 'FOR UPDATE', label: 'pessimistic row locking, deadlock-safe order' }],
    bullets: [
      'Designed a 3NF MySQL schema for a banking system (customers, accounts, cards, loans, transactions) with constraints, triggers and audit logging.',
      'Implemented ACID-compliant money transfers with pessimistic row-level locking (SELECT … FOR UPDATE on InnoDB) and deadlock-safe lock ordering, preventing lost updates and double-spending under high-volume concurrent transfer tests.',
      'Profiled query plans with EXPLAIN before and after indexing, replacing full table scans with index lookups on account and transaction queries through composite and covering indexes.',
    ],
    stack: ['MySQL', 'InnoDB', 'SQL', 'Stored procedures', 'Normalization', 'Indexing', 'ACID', 'Isolation levels', 'Python'],
  },
  {
    id: 'cpp',
    cover: 'dsa',
    tone: 'lilac',
    title: 'Generic Data Structures and Recursive Algorithms in C++',
    context: 'CS 201, 204, 300 and 301 course sequence',
    period: '2022 — 2024',
    kinds: ['backend', 'data'],
    blurb:
      'A template-based library written from scratch and benchmarked against theory.',
    metrics: [
      { value: '11+', label: 'data structures' },
      { value: '~10K', label: 'element benchmarks' },
    ],
    bullets: [
      'Built a template-based C++ library of 11+ data structures (linked lists, stacks, queues, BST, AVL and red-black trees, binary heap, hash tables with both separate chaining and open addressing, graphs) with manual memory management, deep copy and RAII.',
      'Implemented recursive and divide-and-conquer algorithms (tree traversals, merge sort, quicksort, backtracking) alongside graph algorithms (BFS, DFS, shortest paths) and dynamic programming.',
      'Benchmarked implementations across increasing input sizes (up to 10K elements), validating empirical runtimes against theoretical time and space complexity.',
    ],
    stack: ['C++', 'Templates', 'STL', 'AVL / Red-Black trees', 'Hashing', 'RAII', 'Big-O'],
  },
  {
    id: 'expense',
    cover: 'expense',
    tone: 'coral',
    title: 'Expense Tracker: Mobile App and Backend',
    context: 'Mobile Application Development course · backend and Android UI built by me',
    period: 'Sep 2023 — Jan 2024',
    kinds: ['backend'],
    blurb:
      'A Spring Boot and MongoDB backend with a native Android client for tracking spending by category and month.',
    metrics: [{ value: '10+', label: 'REST endpoints, JWT auth' }],
    bullets: [
      'Engineered a layered Spring Boot REST backend with MongoDB for an Android expense tracker, exposing 10+ endpoints for JWT-based authentication, expense and category CRUD, and monthly summaries.',
      'Used MongoDB aggregation pipelines to generate category-based and monthly spending reports.',
      'Built the native Android client in Java with input validation and spending-trend charts, integrated end to end with the API.',
    ],
    stack: ['Java', 'Spring Boot', 'MongoDB', 'JWT', 'Android'],
  },
  {
    id: 'sir',
    cover: 'sir',
    tone: 'mint',
    title: "SIR Epidemic Simulation on Istanbul’s Rail Network",
    context: 'Network Science course · solo project',
    period: 'Feb 2025 — Jun 2025',
    kinds: ['data', 'research'],
    blurb:
      'An agent-based SIR model across the entire rail system that finds the transfer hubs acting as super-spreaders.',
    metrics: [{ value: '64+', label: 'Monte Carlo simulations' }],
    bullets: [
      "Independently designed and built an agent-based SIR model simulating disease spread across Istanbul’s entire rail transit network (metro, tram, Marmaray and funiculars) in Python.",
      'Built an urban mobility graph from GeoJSON with NetworkX, using Dijkstra for agent routing, Louvain for community detection, and degree, betweenness, closeness and eigenvector / PageRank centrality to rank critical hubs.',
      'Ran 64+ Monte Carlo simulations, showing that high-betweenness transfer hubs act as super-spreaders and are the most effective targets for intervention.',
    ],
    stack: ['Python', 'NetworkX', 'GeoJSON', 'Agent-based modeling', 'Monte Carlo', 'Centrality'],
  },
  {
    id: 'turkey',
    cover: 'turkey',
    tone: 'sun',
    title: 'Analyzing Turkey: Socio-Economic Data Dashboard',
    context: 'Data Science course · led a 3–4 person team, hands-on in every stage',
    period: 'Feb 2023 — May 2023',
    kinds: ['data'],
    blurb:
      "An interactive dashboard on TÜİK data covering migration, economy, population, demographics, justice and elections.",
    metrics: [{ value: '40+', label: 'datasets cleaned and analysed' }],
    bullets: [
      'Led a 3–4 person data science team while contributing hands-on across every stage: collecting and cleaning 40+ datasets from the Turkish Statistical Institute (TÜİK).',
      'Performed EDA on migration, economy, population, demographics, justice and election data.',
      'Built an interactive Flask dashboard (Bootstrap, Matplotlib) to present the findings.',
    ],
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Flask', 'Bootstrap'],
  },
  {
    id: 'pure-attention',
    cover: 'attention',
    tone: 'pink',
    title: 'Undergraduate Research: Attention Detection in Mixed Reality',
    context: 'Sabancı PURE (Program for Undergraduate Research), certified',
    period: 'Feb 2023 — May 2023',
    kinds: ['research'],
    blurb:
      'Measuring reflex differences between physical and virtual stimuli to study attention in mixed-reality settings.',
    bullets: [
      'Built a Bluetooth-controlled addressable LED system (LilyPad Arduino, HC-06) to measure reflex differences between physical and virtual stimuli for attention detection in mixed reality.',
    ],
    stack: ['Arduino (LilyPad)', 'HC-06 Bluetooth', 'Adafruit LEDs', 'Mixed reality', 'Experiment design'],
  },
  {
    id: 'pure-bio',
    cover: 'bio',
    tone: 'lilac',
    title: 'Undergraduate Research: Biosensors',
    context: 'Sabancı PURE (Program for Undergraduate Research), certified',
    period: 'Oct 2022 — Dec 2022',
    kinds: ['research'],
    blurb: 'A semester-long literature and data project on biosensors.',
    bullets: [
      'Conducted a semester-long undergraduate research project on biosensors, reviewing the literature and collecting and analyzing experimental data.',
    ],
    stack: ['Biosensors', 'Literature review', 'Data collection & analysis'],
  },
];

export const otherProjects = [
  {
    title: 'Rain Prediction ML',
    when: 'Feb 2024',
    text: 'Compared Linear Regression, KNN, Decision Tree, Logistic Regression and SVM on Australian Bureau of Meteorology data, scored with Accuracy, Jaccard and F1.',
  },
  {
    title: 'Digital Air Hockey on FPGA',
    when: 'Fall 2023 · CS 303',
    text: 'A game written in Verilog and run on a Xilinx FPGA.',
  },
  {
    title: 'NASA JWST Image Analysis',
    when: 'Mar 2023',
    text: 'Hardness-ratio computation from FITS files with Astropy, NumPy and SciPy.',
  },
  {
    title: 'Zombie Escape Game',
    when: 'Feb 2022',
    text: 'A 2D game built from scratch in C# and Unity.',
  },
];

export const openSource = {
  cover: "opensource" as const,
  title: 'Upstream contributions to SAGE (opaca-llm-ui)',
  body: "While building a Slack-to-SAGE integration at Semper Tech, I moved the missing pieces upstream into GT-ARC’s open-source SAGE chat UI: full-stack changes across the Python backend and Vue frontend, with multiple merged pull requests.",
  areas: [
    'Self-hosted model support',
    'Backend session management',
    'UI / UX improvements',
  ],
  repos: [
    { name: 'GT-ARC/opaca-llm-ui', href: 'https://github.com/GT-ARC/opaca-llm-ui', note: 'SAGE chat UI · where my pull requests landed' },
    { name: 'GT-ARC/opaca-python-sdk', href: 'https://github.com/GT-ARC/opaca-python-sdk', note: 'Agent SDK · used to build our agents' },
    { name: 'GT-ARC/opaca-core', href: 'https://github.com/GT-ARC/opaca-core', note: 'Runtime platform · what it all runs on' },
  ],
  paper: {
    label: 'SAGE paper on arXiv (2601.09750)',
    href: 'https://arxiv.org/abs/2601.09750',
  },
};
