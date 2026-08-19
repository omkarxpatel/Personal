import type { APIRoute } from "astro";
import { site as profile, about, education, work, projects, skills } from "../data/site.ts";

/**
 * /llms.txt — plain-text mirror of the site for LLMs and other machine readers.
 * The site itself renders as an interactive terminal, which is hostile to scrapers;
 * this is the same content in a form a model can ingest directly.
 * Generated from src/data/site.ts, so it cannot drift from the resume.
 */
export const GET: APIRoute = ({ site: origin }) => {
  const base = (origin?.origin ?? "https://omkarpatel.xyz").replace(/\/$/, "");
  const L: string[] = [];

  L.push(`# ${profile.name}`);
  L.push("");
  L.push(`> ${profile.title} — ${profile.location}.`);
  L.push("");
  L.push(
    `Plain-text version of ${base}, which renders as an interactive terminal in the browser. ` +
      `Generated from the same source as the site and the resume PDF.`
  );

  L.push("", "## Contact", "");
  L.push(`- Email: ${profile.email}`);
  L.push(`- GitHub: ${profile.github}`);
  L.push(`- LinkedIn: ${profile.linkedin}`);
  L.push(`- Resume (PDF): ${base}${profile.resume}`);

  L.push("", "## About", "", about);

  L.push("", "## Education", "");
  for (const e of education) {
    L.push(`### ${e.school} — ${e.degree}`);
    L.push(`${e.location} · ${e.dates}`);
    for (const n of e.notes) L.push(`- ${n}`);
    L.push("");
  }

  L.push("## Experience", "");
  for (const w of work) {
    L.push(`### ${w.role} — ${w.company}`);
    L.push(`${w.location} · ${w.dates}`);
    for (const b of w.bullets) L.push(`- ${b}`);
    L.push("");
  }

  L.push("## Projects", "");
  for (const p of projects) {
    L.push(`### ${p.name} — ${p.tagline}`);
    L.push(`Stack: ${p.stack.join(", ")}`);
    L.push(`Highlights: ${p.metrics}`);
    L.push(p.blurb);
    if (p.links.length) {
      L.push(`Links: ${p.links.map((l) => `${l.label} — ${l.href}`).join(" · ")}`);
    }
    L.push("");
  }

  L.push("## Skills", "");
  L.push(`- Languages: ${skills.languages.join(", ")}`);
  L.push(`- Frameworks & databases: ${skills.web.join(", ")}`);
  L.push(`- AI/ML: ${skills.ai.join(", ")}`);
  L.push(`- Developer tools: ${skills.infra.join(", ")}`);
  L.push("");

  return new Response(L.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
