export const site = {
  name: "Omkar Patel",
  handle: "omkarxpatel",
  title: "cs @ northeastern · founding eng @ storiloom",
  location: "boston, ma · sf bay area",
  email: "omkarxpatel@gmail.com",
  github: "https://github.com/omkarxpatel",
  linkedin: "https://www.linkedin.com/in/omkarxpatel/",
  resume: "/Omkar_Patel_Resume.pdf",
};

export const about = `Freshman at Northeastern, studying CS with an AI concentration. 60+ college credits earned via De Anza dual enrollment during high school. Currently sole engineer on the Storiloom MVP. Returning to Rysun Labs as a Data Engineer Intern this summer.`;

export const work = [
  {
    slug: "storiloom",
    role: "Founding Engineer",
    company: "Storiloom",
    location: "remote",
    dates: "feb 2026 — present",
    bullets: [
      "Sole engineer turning an early-stage product concept into a production-ready full-stack web platform.",
      "Architecting backend systems — database design, API integrations, server-side logic — to support the core product.",
      "Working directly with the founder, shipping fast and shaping the technical direction of the platform.",
    ],
  },
  {
    slug: "rysun-labs",
    role: "Software Engineer Intern → Data Engineer Intern (returning)",
    company: "Rysun Labs",
    location: "milpitas, ca",
    dates: "jun 2024 — aug 2024 · returning summer 2026",
    bullets: [
      "Contributed to internal AI-powered tools and production web applications during a 10-week internship.",
      "Built a full-stack GenAI model comparison platform (Flask + React) — side-by-side evaluation of OpenAI, Gemini, and Llama for structured email generation.",
      "Returning summer 2026 as Data Engineer Intern.",
    ],
  },
  {
    slug: "lynbrook-job-shadow",
    role: "Lead Developer",
    company: "Lynbrook HS Job Shadow Program",
    location: "san jose, ca",
    dates: "feb 2023 — apr 2025",
    bullets: [
      "Built a web platform managing student participation in job-shadowing — applications, placements, and partner-org coordination.",
      "Promoted to Lead Developer for the 2024–25 session; platform served 560+ students across 115 companies.",
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
    tagline: "custom programming language with a python-backed transpiler",
    stack: ["Python", "lexer", "parser", "ast"],
    metrics: "v1 transpiler · interpreter + VM planned",
    blurb:
      "A small custom language built to learn how languages are designed end-to-end. `.rot` source is tokenized against a keyword table, parsed, and transformed into Python. Roadmap: replace `exec()` with a real interpreter, then a bytecode VM, then native codegen.",
    links: [
      { label: "github", href: "https://github.com/omkarxpatel/ROT" },
    ],
  },
  {
    name: "summary-bot",
    tagline: "ai catch-up for high-volume discord servers",
    stack: ["Python", "Discord.py", "OpenAI", "GCP", "Firebase"],
    metrics: "800+ guilds · 875k+ users",
    blurb:
      "A scalable Discord bot that summarizes long channel conversations in seconds. Built to handle bursty traffic across hundreds of large, active servers without dropping context.",
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
  languages: ["Java", "Python", "JavaScript", "SQL/MySQL", "HTML/CSS"],
  frameworks: ["React.js", "Node.js", "Flask", "Discord.py", "Pandas", "Tailwind"],
  ai: ["OpenAI GPT", "Anthropic Claude", "Google Gemini", "Meta Llama"],
  tools: ["Git", "Docker", "AWS", "Google Cloud Platform", "VS Code"],
};
