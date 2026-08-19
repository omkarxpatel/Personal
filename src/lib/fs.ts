import { site, about, education, work, projects, skills } from "../data/site.ts";

export type FSFile = {
  type: "file";
  name: string;
  size?: string;
  render: () => string;
};
export type FSExternal = {
  type: "external";
  name: string;
  href: string;
  size?: string;
};
export type FSDir = {
  type: "dir";
  name: string;
  children: FSNode[];
};
export type FSNode = FSFile | FSExternal | FSDir;

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const linkify = (label: string, href: string) =>
  `<a href="${esc(href)}" target="_blank" rel="noopener" data-link>${esc(label)}</a>`;

const tag = (text: string) =>
  `<span class="chip">${esc(text)}</span>`;

const muted = (text: string) =>
  `<span class="t-muted">${esc(text)}</span>`;

const accent = (text: string) =>
  `<span class="t-accent">${esc(text)}</span>`;

const heading = (text: string) =>
  `<span class="t-heading">${esc(text)}</span>`;

const warn = (text: string) =>
  `<span class="t-warn">${esc(text)}</span>`;

function formatWork(w: (typeof work)[number]): string {
  return `
<div class="block">
  <div class="row">${heading(w.company)} <span class="t-muted">— ${esc(w.role.toLowerCase())}</span></div>
  <div class="t-muted">${esc(w.location)} · ${esc(w.dates)}</div>
  <ul class="bullets">
    ${w.bullets.map((b) => `<li><span class="t-sigil">·</span> ${esc(b)}</li>`).join("")}
  </ul>
</div>`.trim();
}

function formatProject(p: (typeof projects)[number]): string {
  const links =
    p.links.length > 0
      ? `<div class="links">${p.links.map((l) => linkify(`${l.label} →`, l.href)).join("  ")}</div>`
      : "";
  return `
<div class="block">
  <div class="row">${heading(p.name)} <span class="t-muted">— ${esc(p.tagline)}</span></div>
  <div class="t-muted">${esc(p.metrics)}</div>
  <div class="chips">${p.stack.map(tag).join("")}</div>
  <p>${esc(p.blurb)}</p>
  ${links}
</div>`.trim();
}

function formatAbout(): string {
  return `<p>${esc(about).replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br>")}</p>`;
}

function formatEducation(): string {
  return education
    .map((e) =>
      `
<div class="block">
  <div class="row">${heading(e.school)} <span class="t-muted">— ${esc(e.degree.toLowerCase())}</span></div>
  <div class="t-muted">${esc(e.location)} · ${esc(e.dates)}</div>
  ${e.notes.length ? `<ul class="bullets">${e.notes.map((n) => `<li><span class="t-sigil">·</span> ${esc(n)}</li>`).join("")}</ul>` : ""}
</div>`.trim()
    )
    .join("\n");
}

function formatSkills(): string {
  const row = (label: string, items: readonly string[]) =>
    `<div class="kv"><dt class="t-muted">${esc(label)}</dt><dd>${items.map(tag).join("")}</dd></div>`;
  return `
<dl class="skills">
  ${row("languages", skills.languages)}
  ${row("web & backend", skills.web)}
  ${row("ai/llm", skills.ai)}
  ${row("systems & infra", skills.infra)}
</dl>`.trim();
}

function formatContact(): string {
  return `
<dl class="contact">
  <div class="kv"><dt class="t-muted">email</dt><dd>${linkify(site.email, `mailto:${site.email}`)}</dd></div>
  <div class="kv"><dt class="t-muted">github</dt><dd>${linkify(`github.com/${site.handle}`, site.github)}</dd></div>
  <div class="kv"><dt class="t-muted">linkedin</dt><dd>${linkify(`linkedin.com/in/${site.handle}`, site.linkedin)}</dd></div>
</dl>`.trim();
}

function formatWhoami(): string {
  return `
<div class="block">
  <div>${heading("omkar patel")}</div>
  <div class="t-muted">${esc(site.title)}</div>
  <div class="t-muted">${esc(site.location)}</div>
</div>`.trim();
}

export const root: FSDir = {
  type: "dir",
  name: "~",
  children: [
    { type: "file", name: "about.md", size: "1k", render: formatAbout },
    { type: "file", name: "education.md", size: "1k", render: formatEducation },
    {
      type: "dir",
      name: "work",
      children: work.map<FSFile>((w) => ({
        type: "file",
        name: w.slug,
        render: () => formatWork(w),
      })),
    },
    {
      type: "dir",
      name: "projects",
      children: projects.map<FSFile>((p) => ({
        type: "file",
        name: p.name,
        render: () => formatProject(p),
      })),
    },
    { type: "file", name: "skills.txt", size: "1k", render: formatSkills },
    { type: "file", name: "contact.md", size: "1k", render: formatContact },
    { type: "external", name: "resume.pdf", href: site.resume, size: "153k" },
  ],
};

export const whoamiOutput = formatWhoami;

// ---------- path resolution ----------

export function splitPath(p: string): string[] {
  return p.replace(/^\/+|\/+$/g, "").split("/").filter(Boolean);
}

export function normalizeSegments(segs: string[]): string[] {
  const out: string[] = [];
  for (const s of segs) {
    if (s === ".") continue;
    if (s === "..") out.pop();
    else out.push(s);
  }
  return out;
}

/**
 * Resolve a path string from a current path (absolute, "~"-rooted segments).
 * Returns the absolute path segments AND the resolved FSNode, or null.
 */
export function resolve(
  pathStr: string,
  cwdSegs: string[]
): { segs: string[]; node: FSNode } | null {
  if (!pathStr || pathStr === "~") {
    return { segs: [], node: root };
  }
  let segs: string[];
  if (pathStr.startsWith("~/") || pathStr === "~") {
    segs = splitPath(pathStr.slice(1));
  } else if (pathStr.startsWith("/")) {
    segs = splitPath(pathStr);
  } else {
    segs = [...cwdSegs, ...splitPath(pathStr)];
  }
  segs = normalizeSegments(segs);

  let node: FSNode = root;
  for (const seg of segs) {
    if (node.type !== "dir") return null;
    const child = node.children.find((c) => c.name === seg);
    if (!child) return null;
    node = child;
  }
  return { segs, node };
}

export function segsToPath(segs: string[]): string {
  return segs.length ? `~/${segs.join("/")}` : "~";
}

/** Find every node in the tree whose name matches exactly, returns absolute paths like "work/kinoraa". */
export function findByName(name: string): { path: string; node: FSNode }[] {
  const out: { path: string; node: FSNode }[] = [];
  function walk(dir: FSDir, segs: string[]) {
    for (const c of dir.children) {
      const next = [...segs, c.name];
      if (c.name === name) out.push({ path: next.join("/"), node: c });
      if (c.type === "dir") walk(c, next);
    }
  }
  walk(root, []);
  return out;
}
