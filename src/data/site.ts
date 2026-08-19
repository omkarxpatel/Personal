export const site = {
  name: "Omkar Patel",
  handle: "omkarxpatel",
  title: "cs @ northeastern · ai eng intern @ rysun labs · founding eng @ kinoraa",
  location: "boston, ma · sf bay area · open to relocate",
  email: "omkarxpatel@gmail.com",
  github: "https://github.com/omkarxpatel",
  linkedin: "https://www.linkedin.com/in/omkarxpatel/",
  resume: "/Omkar_Patel_Resume.pdf",
};

export const about = `CS at Northeastern, class of 2028. 60+ college credits earned via De Anza dual enrollment during high school. Currently an AI Engineer Intern at Rysun Labs, building crawl-to-retrieval pipelines that make product catalogs legible to LLMs, and the founding engineer at Kinoraa, where I built the WhatsApp-based family-story platform end-to-end.`;

export const education = [
  {
    school: "Northeastern University",
    degree: "Computer Science, B.S.",
    location: "boston, ma",
    dates: "aug 2025 — apr 2028",
    notes: [
      "Relevant coursework: Data Structures & Algorithms, Discrete Mathematics, Logic & Computation, Probability & Statistics, Mathematical Foundations of AI, Object-Oriented Programming, x86 Assembly & Architecture.",
    ],
  },
  {
    school: "De Anza College",
    degree: "Dual Enrollment",
    location: "san jose, ca",
    dates: "aug 2021 — jul 2025",
    notes: [
      "Earned 60+ college credits over 4 years of dual enrollment, attending full-time as a high school senior.",
    ],
  },
] as const;

export const work = [
  {
    slug: "rysun-labs-2026",
    role: "AI Engineer Intern",
    company: "Rysun Labs",
    location: "milpitas, ca",
    dates: "may 2026 — present",
    bullets: [
      "Built a multi-tenant pipeline that crawls e-commerce storefronts (tested up to 46K products) and generates LLM-facing deliverables from enriched product data, raising parsing accuracy from 16% to 84%.",
      "Shipped a drop-in hybrid search API on Elasticsearch, fusing vector + keyword retrieval with RRF, then LLM re-ranking; +4.1% NDCG@5 over a BM25-only baseline on natural-language queries.",
      "Targeted AI-referred traffic through two paths, LLM-facing deliverables and hybrid retrieval, with UTM tagging across 7 formats to measure the lift from each.",
    ],
  },
  {
    slug: "kinoraa",
    role: "Founding Engineer",
    company: "Kinoraa",
    location: "milpitas, ca",
    dates: "feb 2026 — present",
    bullets: [
      "Sole engineer on a zero-install platform that gathers relatives' stories into one private timeline and surfaces the connections between them; 450+ families logged 6,000+ stories in the first three months.",
      "Developed end-to-end: a signature-verified WhatsApp webhook driving a conversational state machine (invite, join, capture, share, reply, consent), passwordless QR sign-in with single-use webview links, and the memory-capture flow from text/voice/photo/video intake to delivery across role-based family circles.",
    ],
  },
  {
    slug: "rysun-labs-2024",
    role: "Software Engineer Intern",
    company: "Rysun Labs",
    location: "milpitas, ca",
    dates: "jun 2024 — aug 2024",
    bullets: [
      "Designed and shipped an internal full-stack GenAI comparison platform (Flask + React) that runs one prompt across OpenAI GPT, Google Gemini, and Meta Llama in parallel and renders the outputs side-by-side for email and code generation.",
    ],
  },
  {
    slug: "lynbrook-job-shadow",
    role: "Lead Developer",
    company: "Lynbrook HS Job Shadow Program",
    location: "san jose, ca",
    dates: "feb 2023 — apr 2025",
    bullets: [
      "Built the platform behind the program's job-shadow day, matching 560+ students to 115 companies.",
      "Promoted to Lead Developer, leading 5 student developers to ship and maintain three annual releases.",
    ],
  },
] as const;

export const projects = [
  {
    name: "wizgto",
    tagline: "poker gto study tool built on a local cfr solver",
    stack: ["TypeScript", "Rust", "CFR Solver", "Chrome Extension"],
    metrics: "~84.4% of rated matches won on chipzen",
    blurb:
      "A study tool on a local Rust solver that plays hands out to converge on an unexploitable strategy. Tracks your gameplay to analyze playstyle and leaks, then builds an exploitative model to practice against. Its autonomous bot ships to Chipzen, a bot-vs-bot arena, winning ~84.4% of rated matches under no-egress 256 MB and 2s-per-decision limits.",
    links: [
      { label: "github", href: "https://github.com/omkarxpatel/wizgto" },
    ],
  },
  {
    name: "rot",
    tagline: "custom programming language with two execution engines",
    stack: ["Python", "Pytest", "Next.js", "Pyodide", "framer-motion"],
    metrics: "15K+ LOC · 819 unit tests · live playground",
    blurb:
      "A language built end-to-end, from lexing through recursive-descent and Pratt parsing into a source-positioned AST, with no parser libraries or exec(). Two execution engines stay in sync: a tree-walking interpreter as the reference and a 38-opcode stack VM compiled from the same AST. The browser animates tokenizing, parsing, and evaluation line by line as the program runs.",
    links: [
      { label: "playground", href: "https://rot-theta.vercel.app/" },
      { label: "github", href: "https://github.com/omkarxpatel/ROT" },
    ],
  },
  {
    name: "summary-bot",
    tagline: "ai catch-up for high-volume discord servers",
    stack: ["Python", "Discord.py", "OpenAI", "Google TTS", "GCP", "Firebase"],
    metrics: "1,800+ servers · 875k+ users · ~20M words analyzed",
    blurb:
      "A scalable Discord bot that summarizes long channel conversations in seconds. Deployed across 1,800+ servers over 3 years, handling bursty traffic across large, active communities without dropping context.",
    links: [],
  },
  {
    name: "electron",
    tagline: "macOS audio EQ + visualizer + spotify control, in one window",
    stack: ["TypeScript", "Electron", "Web Audio API", "Spotify Web API", "BlackHole"],
    metrics: "native macOS · in active dev",
    blurb:
      "A local macOS desktop app combining a system-wide audio equalizer, a real-time audio visualizer, and a Spotify control surface. Runs entirely on-device — no servers, no telemetry, bring your own Spotify Client ID.",
    links: [
      { label: "github", href: "https://github.com/omkarxpatel/Electron" },
    ],
  },
  {
    name: "prompt-enhancer",
    tagline: "a claude code hook that rewrites rough prompts before claude sees them",
    stack: ["Python", "Claude Code hooks", "claude -p"],
    metrics: "no api key required",
    blurb:
      "A `UserPromptSubmit` hook that expands rough one-liners into structured prompts (goal / scope / constraints / acceptance) using `claude -p` headless mode. Reuses your existing Claude Code auth — no separate key.",
    links: [
      { label: "github", href: "https://github.com/omkarxpatel/prompt-enhancer" },
    ],
  },
  {
    name: "spotify-playlist-generator",
    tagline: "python cli for spotify recs + auto-playlist building",
    stack: ["Python", "Spotify Web API", "CLI"],
    metrics: "top-starred personal repo",
    blurb:
      "A CLI tool that plays songs, fetches recommendations based on a seed track, and auto-generates new playlists derived from an existing one — all from the terminal.",
    links: [
      { label: "github", href: "https://github.com/omkarxpatel/Spotify-Playlist-Generator" },
    ],
  },
  {
    name: "supportive-soul",
    tagline: "discord bot for on-demand mental-health support",
    stack: ["Python", "Discord.py", "OpenAI", "Firebase", "Heroku"],
    metrics: "2nd place · united hacks 2023 (mental health)",
    blurb:
      "On-demand resources, private AI chat support, and configurable moderation — with real-time self-harm detection that automates flagging, outreach, and admin logging for safer communities.",
    links: [
      { label: "github", href: "https://github.com/omkarxpatel/Supportive-Soul" },
    ],
  },
] as const;

export const skills = {
  languages: ["Python", "Java", "C++", "Rust", "TypeScript", "JavaScript", "SQL"],
  web: ["React", "Next.js", "Node.js", "Flask", "REST APIs", "PostgreSQL", "Elasticsearch", "Firebase"],
  ai: ["NLP", "RAG", "Hybrid & Vector Search", "Re-ranking", "Embeddings", "LLM Evals", "MCP", "PyTorch", "NumPy"],
  infra: ["Docker", "GCP", "Git", "GitHub Actions", "CI/CD", "Pytest", "Vitest", "Playwright"],
};
