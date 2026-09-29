import type { CoverKind } from './covers';

export interface Stat {
  value: string;
  label: string;
}

export interface ExperienceTab {
  id: string;
  cover: CoverKind;
  stats: Stat[];
  label: string;
  kicker: string;
  summary: string;
  bullets: string[];
  stack: string[];
  /** Optional numbered mini case study */
  story?: {
    title: string;
    steps: { label: string; text: string }[];
    result: string;
  };
  /** Optional linear pipeline diagram */
  pipeline?: { label: string; sub?: string }[];
}

export interface Experience {
  id: string;
  role: string;
  org: string;
  place: string;
  period: string;
  blurb: string;
  /** Scenic vignette for where it happened */
  scene: CoverKind;
  /** Illustration of the work (entries without tabs) */
  cover?: CoverKind;
  stats?: Stat[];
  tabs?: ExperienceTab[];
  bullets?: string[];
  stack?: string[];
  more?: string[];
}

export const experience: Experience[] = [
  {
    id: 'semper',
    role: 'AI Engineer',
    org: 'Semper Tech',
    place: 'Istanbul, Türkiye',
    period: 'Sep 2025 — Present',
    scene: 'istanbul',
    blurb:
      'Four-person team shipping agentic AI systems for customers including BEKO (Arçelik) and Bürotime. I also take on Scrum Master responsibilities for the team.',
    tabs: [
      {
        id: 'beko',
        cover: 'beko',
        stats: [
          { value: '6+', label: 'agent tools in production' },
          { value: '98%', label: 'tool-calling accuracy' },
          { value: '97%', label: 'RAG retrieval accuracy' },
          { value: '10k+', label: 'concurrent users under 2 s' },
        ],
        label: 'BEKO',
        kicker: 'Agentic AI and RAG in production',
        summary:
          'A production agent for BEKO with 6+ tools, running on self-hosted models. I focused on the tool-routing research and testing, the RAG pipeline and the load test.',
        bullets: [
          'Co-developed and shipped a production agentic AI system with 6+ agent tools, running on a self-hosted GPT-OSS-120B served with vLLM on NVIDIA A100s, with Llama Guard safety filtering, Docker containers and FastAPI REST microservices.',
          'Built the production agentic RAG pipeline: document parsing, multilingual-e5 embeddings, query transformation (rewriting, HyDE, multi-query, sub-question decomposition), Qdrant vector retrieval and BGE cross-encoder reranking.',
          'Helped the system reach 98% tool-calling accuracy and 97% agentic RAG retrieval accuracy on a 300+ scenario evaluation set, validated via LLM-as-a-Judge and human review.',
          'Contributed to observability dashboards (Grafana, Loki, custom real-time monitoring) tracking tool-calling accuracy, latency, token usage and cost, and errors.',
          'Led load testing with Locust, validating sub-2-second response times at 10k+ concurrent users.',
          'Contributed to a 60% reduction in hallucinations (before / after evaluation) through context engineering: semantic chunking, reranked and trimmed context, and prompts enforcing source-grounded answers with citations.',
          'Worked within the team that evaluated Qwen and GPT-OSS-120B and deployed GPT-OSS-120B on NVIDIA A100s via vLLM for tool calling, RAG answers and multi-step requests, with Llama Guard as a safety layer for model inputs and outputs.',
        ],
        stack: [
          'Python',
          'FastAPI',
          'Docker',
          'GPT-OSS-120B',
          'vLLM',
          'NVIDIA A100',
          'Llama Guard',
          'Qdrant',
          'multilingual-e5',
          'BGE reranker',
          'HyDE',
          'Grafana',
          'Loki',
          'Locust',
          'LLM-as-a-Judge',
        ],
        story: {
          title: 'Rebuilding the request-routing layer',
          steps: [
            {
              label: 'Original design',
              text: 'A fine-tuned BERT intent classifier fed deterministic code that extracted parameters and invoked tools.',
            },
            {
              label: 'Evidence',
              text: 't-SNE embedding plots and confusion-matrix analysis showed semantically overlapping intents the classifier could not separate.',
            },
            {
              label: 'Change',
              text: 'Replaced it with LLM-driven routing and parameter extraction using native tool calling.',
            },
            {
              label: 'Trade-off',
              text: 'Higher token usage with negligible added latency, an accepted trade-off.',
            },
          ],
          result: '+15 pp tool-selection accuracy across 6+ tools',
        },
      },
      {
        id: 'burotime',
        cover: 'burotime',
        stats: [
          { value: '5+', label: 'LangGraph agents' },
          { value: '97%', label: 'correct agent selection' },
          { value: '98%', label: 'correct tool calling' },
          { value: '~12 s', label: 'on complex parallel requests' },
        ],
        label: 'Bürotime',
        kicker: 'Multi-agent orchestration',
        summary:
          'A multi-agent platform on a self-hosted Qwen3.6-35B. I contributed to the agents, state management, human-in-the-loop flows and the orchestration benchmarks.',
        bullets: [
          'Ran orchestration benchmarks for the multi-agent platform comparing single-agent sequential, multi-agent sequential and concurrent patterns. The team adopted concurrent orchestration, reaching 97% correct agent selection, 98% correct tool calling and ~12 s responses on complex multi-step requests that could be parallelized.',
          'Developed 5+ task-specific LangGraph agents within the team, running on a self-hosted Qwen3.6-35B, implementing state management and human-in-the-loop (HITL) flows in which an uncertain agent calls a dedicated ask-human tool that pauses the graph via a WebSocket interrupt until the user responds, validated with dedicated test scenarios.',
        ],
        stack: [
          'LangGraph',
          'Python',
          'Qwen3.6-35B',
          'WebSocket',
          'HITL',
          'Multi-agent orchestration',
          'Evaluation',
        ],
        pipeline: [
          { label: 'Request' },
          { label: 'Orchestrator', sub: 'concurrent pattern' },
          { label: 'Agents ×5+', sub: 'LangGraph' },
          { label: 'Ask-human tool', sub: 'WebSocket interrupt' },
          { label: 'Response', sub: '~12 s on complex tasks' },
        ],
      },
      {
        id: 'sage',
        cover: 'sage',
        stats: [
          { value: '20+', label: 'containerized agent tools' },
          { value: '90%+', label: 'correct tool selection' },
          { value: '100+', label: 'query test set' },
          { value: '< 4 s', label: 'voice reply, end to end' },
        ],
        label: 'OPACA / SAGE',
        kicker: 'Self-hosted agent platform, voice and Slack',
        summary:
          'A self-hosted LLM agent platform on OPACA and SAGE (the open-source, tool-augmented LLM framework from GT-ARC and TU Berlin DAI-Labor), plus a bilingual voice assistant on top. Ongoing.',
        bullets: [
          'Deployed a self-hosted LLM agent platform on OPACA and SAGE, serving Qwen3.6-35B on an NVIDIA A100 to autonomously select and invoke 20+ containerized agent tools.',
          'Built typed domain agents with the OPACA Python SDK (FastAPI, Pydantic), exposing statistical actions as auto-generated JSON-Schema tools, and reduced confusion between similar tools by rewriting tool descriptions and refining the system prompt.',
          "Benchmarked SAGE’s task-solving strategies (Simple, Tool-LLM, Orchestration) on a curated 100+ query test set, evaluated through automated expected-tool matching, LLM-as-a-Judge and human review, and selected the three-role Tool-LLM pipeline (generator, evaluator, output) for the best speed-accuracy balance, reaching 90%+ correct tool selection across 20+ tools.",
          'Engineered a bilingual (Turkish / English) voice assistant (Whisper STT → LLM agent → Coqui XTTS) with SpeechBrain ECAPA-TDNN speaker identification (from consented voice samples) for personalized responses, delivering end-to-end voice responses in under 4 seconds.',
          'Offloaded the speech models to edge hardware via Docker Compose to free GPU memory on the shared A100, keeping the LLM service within its memory budget.',
          "Built and shipped a Slack integration for SAGE using the Slack Events API with a custom FastAPI service and Socket Mode, letting the team query the agent platform via DMs, channel mentions and threads, with streamed intermediate progress updates to stay within Slack’s 3-second response window. It is now in daily use by the team.",
          "Contributed full-stack upstream changes (Python backend, Vue frontend) to SAGE, GT-ARC’s open-source opaca-llm-ui, with multiple merged pull requests adding self-hosted model support and backend session management and improving the UI, driven by building the Slack integration.",
        ],
        stack: [
          'OPACA',
          'SAGE',
          'opaca-python-sdk',
          'FastAPI',
          'Pydantic',
          'Qwen3.6-35B',
          'Whisper',
          'Coqui XTTS',
          'SpeechBrain',
          'Docker Compose',
          'Keycloak',
          'Slack API',
          'Vue.js',
        ],
        pipeline: [
          { label: 'Speech', sub: 'kiosk, TR / EN' },
          { label: 'Whisper STT', sub: 'edge, Docker Compose' },
          { label: 'SAGE agent', sub: 'Qwen3.6-35B · 20+ tools' },
          { label: 'Coqui XTTS', sub: 'edge' },
          { label: 'Voice reply', sub: '< 4 s end to end' },
        ],
      },
    ],
    more: [
      'Took on Scrum Master responsibilities for a 4-person team, running two-week sprints, sprint planning, reviews and retrospectives (PSM I certification planned).',
      'Leveraged AI coding assistants (Claude, Cursor, GitHub Copilot, Gemini) with rigorous code review and testing to accelerate delivery while maintaining production quality.',
    ],
  },
  {
    id: 'gtarc',
    role: 'AI/ML Engineer Intern',
    org: 'GT-ARC Gemeinnützige GmbH',
    place: 'Berlin, Germany',
    period: 'Jul 2024 — Sep 2024',
    scene: 'berlin',
    cover: 'video',
    stats: [
      { value: '−53%', label: 'generation latency, 5.3 s → 2.5 s' },
      { value: '+35%', label: 'response coherence (human rated)' },
      { value: '7.29', label: 'SyncNet confidence' },
    ],
    blurb:
      'Research institute affiliated with TU Berlin DAI-Labor, where OPACA and SAGE are developed.',
    bullets: [
      'Engineered a text-to-video generation pipeline (open-source TTS + SadTalker, 512×512) and cut generation latency by 53% (5.3 s → 2.5 s) through pipeline-level optimizations such as parallelized stages and caching, while reaching a 7.29 SyncNet confidence score.',
      'Integrated GPT-3.5 into an interactive educational web UI, building an autonomous AI Tutor with adaptive Q&A that improved response coherence by 35%, as rated through human evaluation.',
      'Developed and shipped a Vue.js quiz application into the production website, with dynamic question rendering, real-time scoring and a responsive UI.',
    ],
    stack: [
      'Python',
      'SadTalker',
      'Open-source TTS',
      'GPT-3.5',
      'Human evaluation',
      'Vue.js',
      'Inference optimization',
      'Parallelization',
      'Caching',
    ],
  },
  {
    id: 'la',
    role: 'Course Learning Assistant, CS 201',
    org: 'Sabancı University',
    place: 'Istanbul, Türkiye',
    period: 'Feb 2023 — Jun 2023',
    scene: 'campus',
    blurb: 'Introduction to Computing.',
    bullets: [
      'Supported students in C++ assignments as an assistant tutor for the introductory programming course, strengthening communication and mentoring skills.',
    ],
  },
];
