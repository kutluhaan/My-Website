export interface SkillGroup {
  id: string;
  title: string;
  /** Rendered larger; the strongest, most current areas */
  core?: boolean;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'ai',
    title: 'AI & LLM systems',
    core: true,
    items: [
      'Agentic AI',
      'LangGraph',
      'OPACA',
      'SAGE',
      'RAG',
      'Tool calling',
      'Multi-agent orchestration',
      'LLM-as-a-Judge',
      'HITL',
      'vLLM',
      'Guardrails',
      'FinBERT',
      'Speech (STT / TTS)',
      'Speaker identification',
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    core: true,
    items: [
      'FastAPI',
      'Flask',
      'Spring Boot',
      'REST',
      'gRPC',
      'Kafka',
      'Microservices',
      'TCP sockets',
      'RPC',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud & DevOps',
    core: true,
    items: [
      'Docker',
      'Docker Compose',
      'Kubernetes (RPS-based HPA)',
      'k3s',
      'AWS (EC2)',
      'GCP (Compute Engine)',
      'NGINX Ingress',
      'Prometheus',
      'Grafana',
      'Loki',
      'Keycloak',
      'CI/CD',
      'Load testing',
    ],
  },
  {
    id: 'languages',
    title: 'Languages',
    items: ['Python', 'C / C++', 'C# (.NET)', 'Java', 'SQL', 'JavaScript', 'Verilog', 'Dart'],
  },
  {
    id: 'data-stores',
    title: 'Data stores',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Qdrant',
      'Indexing',
      'Transactions',
      'Concurrency control',
    ],
  },
  {
    id: 'ml',
    title: 'ML & data',
    items: ['Deep Learning', 'NLP', 'Time-series', 'TensorFlow', 'Pandas', 'NumPy', 'NetworkX', 'EDA', 'CUDA'],
  },
  {
    id: 'frontend',
    title: 'Frontend & mobile',
    items: ['React', 'Vue.js', 'Android (Java)', 'Flutter'],
  },
  {
    id: 'process',
    title: 'Process & tooling',
    items: [
      'Agile / Scrum',
      'Jira',
      'Claude',
      'Cursor',
      'GitHub Copilot',
      'Gemini',
    ],
  },
];

export const skillsNote =
  'AI coding assistants are part of my workflow; every output is reviewed and tested before it ships.';
