/** Single source of truth for the public site's copy. */

export const profile = {
  name: 'Kutluhan Aygüzel',
  headline: 'Software Engineer — AI',
  location: 'Istanbul, Türkiye',
  email: 'kutluhan@sabanciuniv.edu',
  phone: '+90 553 520 3137',
  phoneHref: '+905535203137',
  github: 'https://github.com/kutluhaan',
  linkedin: 'https://www.linkedin.com/in/kutluhanayguzel/',
  updated: 'September 2026',
  statement:
    'I build production agentic AI systems, and the backend and infrastructure they run on.',
  status: 'AI Engineer at Semper Tech',
  availability: 'Open to roles in Türkiye, Europe and remote',
  pitch:
    'Software engineer building production agentic systems (98% tool-calling and 97% RAG retrieval accuracy in production) with hands-on depth in backend and infrastructure: FastAPI, Kafka, gRPC, Kubernetes, AWS and GCP. Fintech experience from an agentic trading system integrated with a live brokerage API.',
  pitch2:
    'Previously an AI/ML intern at GT-ARC Berlin, the research institute behind the OPACA multi-agent framework, and now an upstream contributor to its open-source SAGE repository.',
  pitchTr:
    "Production seviyesinde agentic AI sistemleri geliştiren; backend ve altyapı tarafında da derinliği olan, canlı bir aracı kurum API’sine bağlı agentic işlem sistemi kurmuş bir Yapay Zekâ Mühendisi.",
  marquee: [
    'BEKO',
    'Bürotime',
    'GT-ARC Berlin',
    'TU Berlin DAI-Labor',
    'Sabancı University',
    'Deniz Yatırım Algolab',
    'NVIDIA DLI',
    'IBM',
    'DeepLearning.AI',
    'kAi NVIDIA Student Club',
  ],
  strengths: [
    {
      icon: 'chart',
      title: 'Measured agentic AI in production',
      body: 'Evaluation infrastructure and concrete accuracy numbers, not demos: a 300+ scenario test set, LLM-as-a-Judge and human review.',
    },
    {
      icon: 'layers',
      title: 'Model and system, together',
      body: 'The LLM layer plus the backend services, event streams and infrastructure it needs to survive real traffic.',
    },
    {
      icon: 'candles',
      title: 'A real market connection',
      body: 'An agentic trading system wired to a live brokerage API, with layered risk controls, not a paper simulation.',
    },
  ],
  languages: [
    { name: 'Turkish', level: 'Native' },
    { name: 'English', level: 'Professional working proficiency' },
    { name: 'German', level: 'Beginner (A1–A2)' },
  ],
  regions: ['Türkiye', 'Germany / Europe', 'Remote'],
} as const;

/** Headline numbers shown right under the hero. */
export const heroMetrics = [
  {
    value: 98,
    suffix: '%',
    label: 'Tool-calling accuracy',
    note: 'Helped reach · BEKO production agent, 300+ scenario eval set',
  },
  {
    value: 97,
    suffix: '%',
    label: 'Agentic RAG retrieval accuracy',
    note: 'Helped reach · validated by LLM-as-a-Judge and human review',
  },
  {
    value: 10,
    suffix: 'k+',
    label: 'Concurrent users under 2 s',
    note: 'Locust load test I led on the BEKO system',
  },
  {
    value: 60,
    suffix: '%',
    label: 'Fewer hallucinations',
    note: 'Contributed to · context engineering, before / after evaluation',
  },
] as const;
