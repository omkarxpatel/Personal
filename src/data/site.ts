export const site = {
  name: "Omkar Patel",
  handle: "omkarxpatel",
  title: "cs @ northeastern · ai eng intern @ rysun labs · fullstack eng @ storiloom",
  location: "boston, ma · sf bay area",
  email: "omkarxpatel@gmail.com",
  github: "https://github.com/omkarxpatel",
  linkedin: "https://www.linkedin.com/in/omkarxpatel/",
  resume: "/Omkar_Patel_Resume.pdf",
};

export const about = `CS major (AI concentration) at Northeastern, class of 2028. 60+ college credits earned via De Anza dual enrollment during high school. Currently an AI Engineer Intern at Rysun Labs, building catalog-to-AI-discoverability pipelines, and a Fullstack Engineer at Storiloom, where I built the WhatsApp-based family-story platform end-to-end.`;

export const education = [
  {
    school: "Northeastern University",
    degree: "Computer Science (Concentration in AI), B.S.",
    location: "boston, ma",
    dates: "aug 2025 — apr 2028",
    notes: [],
  },
  {
    school: "De Anza College",
    degree: "Dual Enrollment",
    location: "san jose, ca",
    dates: "aug 2021 — jul 2025",
    notes: [
      "60+ college credits over 4 years of dual enrollment, including senior year of high school as a full-time college student via Middle College.",
    ],
  },
] as const;

export const work = [
  {
    slug: "rysun-labs-2026",
    role: "AI Engineer Intern",
    company: "Rysun Labs",
    location: "milpitas, ca",
    dates: "may 2026 — aug 2026",
    bullets: [
      "Modeled a 40–90% lift in LLM citation rate from catalog enrichment and 70% recovery of zero-result searches from semantic retrieval, projecting up to 5x growth in AI-referred traffic.",
      "Delivered a multi-tenant 5-stage crawl-to-delivery pipeline that emits structured catalog files built for frontier LLMs to ingest directly, raising model confidence in client product data (tested on catalogs up to 46K products).",
      "Packaged the semantic search layer (embedding retrieval + LLM re-ranking) as a drop-in component for client storefronts, benchmarked against classical search with a 192-query eval harness.",
    ],
  },
  {
    slug: "storiloom",
    role: "Fullstack Engineer",
    company: "Storiloom",
    location: "hybrid",
    dates: "feb 2026 — present",
    bullets: [
      "Launched a zero-install platform that gathers relatives' stories into one private timeline and surfaces the connections between them — onboarding 450+ families and preserving 6,000+ stories in the first three months.",
      "Developed end-to-end: a secure WhatsApp webhook driving a conversational state machine, passwordless magic-link auth for webview pages, and the full memory-capture flow — text/voice/photo/video intake, transcription and polish, and delivery to family members.",
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
      "Enabled 560+ students to job-shadow at 115 companies by building the platform that matched students to partner organizations for the program's annual job-shadow day.",
      "Promoted to Lead Developer, leading 5 student developers to build all four role-based portals — students, recruiters, host employees, and program staff — each with its own permissions and workflows.",
    ],
  },
] as const;

export const projects = [
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
    name: "rot",
    tagline: "custom programming language with two execution engines",
    stack: ["Python", "Next.js", "Pyodide", "framer-motion"],
    metrics: "15K+ LOC · 819 unit tests · live playground",
    blurb:
      "A custom language with a tree-walking AST interpreter and a 38-opcode stack-based bytecode VM, built as a teaching tool for how interpreters work under the hood. Supports error handling, f-strings, 41 built-ins, and rustc-style error messages — runnable in an animated playground with live stack visualization.",
    links: [
      { label: "playground", href: "https://rot-theta.vercel.app/" },
      { label: "github", href: "https://github.com/omkarxpatel/ROT" },
    ],
  },
  {
    name: "summary-bot",
    tagline: "ai catch-up for high-volume discord servers",
    stack: ["Python", "Discord.py", "OpenAI", "Google TTS", "GCP", "Firebase"],
    metrics: "1,500+ servers · 875k+ users · ~20M words analyzed",
    blurb:
      "A scalable Discord bot that summarizes long channel conversations in seconds. Deployed across 1,500+ servers over 3 years, handling bursty traffic across large, active communities without dropping context.",
    links: [],
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
  languages: ["Python", "Java", "JavaScript", "TypeScript", "SQL"],
  web: ["React", "Next.js", "Node.js", "Flask", "REST APIs", "PostgreSQL", "Firebase"],
  ai: ["OpenAI", "Anthropic", "Gemini", "Llama", "RAG", "LLM Evals", "Embeddings", "MCP", "Vector Search"],
  infra: ["Docker", "GCP", "Git", "GitHub Actions", "CI/CD", "Playwright", "Vitest"],
};
