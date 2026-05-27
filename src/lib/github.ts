// Client-side render. Repo data is embedded at build time via Astro frontmatter
// and read from a <script type="application/json"> tag at runtime.

export interface Repo {
  name: string;
  language: string | null;
  pushed_at: string;
  html_url: string;
  stargazers_count: number;
  commits7d: number;
}

const GH_USER = "omkarxpatel";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function getEmbeddedRepos(): Repo[] {
  const el = document.getElementById("gh-data");
  if (!el || !el.textContent) return [];
  try {
    return JSON.parse(el.textContent) as Repo[];
  } catch {
    return [];
  }
}

function relativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const sec = Math.floor((Date.now() - then) / 1000);
  if (sec < 60) return "just now";
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day}d ago`;
  const mo = Math.floor(day / 30);
  if (mo < 12) return `${mo}mo ago`;
  return `${Math.floor(mo / 12)}y ago`;
}

function bar(pct: number, width = 14): string {
  const full = Math.max(0, Math.min(width, Math.round((pct / 100) * width)));
  const empty = width - full;
  return `<span class="t-success">${"█".repeat(full)}</span><span class="t-dim">${"░".repeat(empty)}</span>`;
}

function pad(s: string, n: number): string {
  if (s.length >= n) return s.slice(0, n - 1) + "…";
  return s + " ".repeat(n - s.length);
}

function padLeft(s: string, n: number): string {
  if (s.length >= n) return s;
  return " ".repeat(n - s.length) + s;
}

export function renderTop(): string {
  const repos = getEmbeddedRepos();
  if (repos.length === 0) {
    return `<span class="t-warn">top: no github data available (build was rate-limited)</span><div class="t-muted t-suggest">set GITHUB_TOKEN locally and rebuild.</div>`;
  }

  const totalCommits = repos.reduce((acc, r) => acc + r.commits7d, 0);
  const totalStars = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
  const reposActive7d = repos.filter((r) => r.commits7d > 0).length;

  const headerLines = [
    `<span class="t-muted">user      </span> <span class="t-user">${esc(GH_USER)}</span>      <span class="t-muted">active repos 7d  </span> <span class="t-text">${reposActive7d}</span>`,
    `<span class="t-muted">commits 7d</span> <span class="t-text">${totalCommits}</span>          <span class="t-muted">total stars      </span> <span class="t-text">${totalStars}</span>`,
  ].join("\n");

  if (totalCommits === 0) {
    return `<pre class="top">${headerLines}\n\n<span class="t-muted">no commits in the last 7 days. recent repos sorted by last push:</span>\n\n${recentList(repos)}\n\n<span class="t-muted">data embedded at build time</span></pre>`;
  }

  const ranked = repos
    .map((r) => ({ ...r, pct: (r.commits7d / totalCommits) * 100 }))
    .filter((r) => r.commits7d > 0)
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 8);

  const headerRow = `<span class="t-muted">${pad("SHARE", 8)}${pad("COMMITS", 9)}${pad("REPO", 24)}${pad("LANG", 14)}PUSHED</span>`;

  const rows = ranked
    .map((r) => {
      const share = padLeft(r.pct.toFixed(1) + "%", 6) + "  ";
      const commits = padLeft(String(r.commits7d), 4) + "     ";
      const namePadded = pad(r.name, 24);
      const nameHtml = `<a href="${esc(r.html_url)}" target="_blank" rel="noopener" data-link class="t-text">${esc(namePadded)}</a>`;
      const lang = pad(r.language ?? "—", 14);
      const langHtml = `<span class="t-path">${esc(lang)}</span>`;
      const time = pad(relativeTime(r.pushed_at), 12);
      return `${share}${commits}${nameHtml}${langHtml}<span class="t-muted">${esc(time)}</span> ${bar(r.pct)}`;
    })
    .join("\n");

  return `<pre class="top">${headerLines}\n\n${headerRow}\n${rows}\n\n<span class="t-muted">share = commits to repo / total commits across all repos in last 7 days</span></pre>`;
}

function recentList(repos: Repo[]): string {
  return repos
    .slice(0, 6)
    .map((r) => {
      const namePadded = pad(r.name, 24);
      const nameHtml = `<a href="${esc(r.html_url)}" target="_blank" rel="noopener" data-link class="t-text">${esc(namePadded)}</a>`;
      const lang = pad(r.language ?? "—", 14);
      const langHtml = `<span class="t-path">${esc(lang)}</span>`;
      const time = relativeTime(r.pushed_at);
      return `  ${nameHtml}${langHtml}<span class="t-muted">${esc(time)}</span>`;
    })
    .join("\n");
}
