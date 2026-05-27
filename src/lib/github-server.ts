// Server-side only. Imported from Astro frontmatter; never bundled to the client.

interface RepoApi {
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  pushed_at: string;
  html_url: string;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
}

interface CommitApi {
  sha: string;
  commit: { author: { date: string } };
}

// Only what the client renderer actually uses — keeps the embedded JSON tiny.
export interface Repo {
  name: string;
  language: string | null;
  pushed_at: string;
  html_url: string;
  stargazers_count: number;
  /** Distinct commits in the past 7 days (from /users/{u}/events PushEvents). */
  commits7d: number;
}

const GH_USER = "omkarxpatel";

let memo: { ts: number; repos: Repo[] } | null = null;
const MEMO_TTL = 15 * 60 * 1000;

function getToken(): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const viteEnv = (import.meta as any).env ?? {};
  return process.env.GITHUB_TOKEN || viteEnv.GITHUB_TOKEN;
}

async function gh<T>(url: string, token?: string): Promise<T | null> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "omkarpatel-portfolio",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      let body = "";
      try { body = await res.text(); } catch {}
      // eslint-disable-next-line no-console
      console.warn(`[github] ${url} → ${res.status} ${res.statusText}\n  ${body.slice(0, 200)}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(`[github] ${url} fetch failed:`, (e as Error).message);
    return null;
  }
}

async function commitCountFor(
  fullName: string,
  sinceIso: string,
  token?: string
): Promise<number> {
  // Filter by author to count only commits authored by the user.
  const url = `https://api.github.com/repos/${fullName}/commits?author=${GH_USER}&since=${encodeURIComponent(sinceIso)}&per_page=100`;
  const commits = await gh<CommitApi[]>(url, token);
  if (!commits) return 0;
  return commits.length;
}

export async function getRepos(): Promise<Repo[]> {
  if (memo && Date.now() - memo.ts < MEMO_TTL) return memo.repos;

  const token = getToken();
  if (token) {
    // eslint-disable-next-line no-console
    console.log(`[github] authenticated request (token: ${token.slice(0, 7)}…)`);
  } else {
    // eslint-disable-next-line no-console
    console.log("[github] no GITHUB_TOKEN found — using anonymous (rate-limited) requests");
  }

  const data = await gh<RepoApi[]>(
    `https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=30`,
    token
  );
  if (!data) {
    memo = { ts: Date.now(), repos: [] };
    return [];
  }

  const filtered = data.filter(
    (r) =>
      !r.fork &&
      !r.archived &&
      r.name.toLowerCase() !== GH_USER.toLowerCase()
  );

  // Only spend API calls on repos whose last push is within 7 days; older ones can't have commits in window.
  const cutoffMs = Date.now() - 7 * 24 * 3.6e6;
  const sinceIso = new Date(cutoffMs).toISOString();
  const counts = await Promise.all(
    filtered.map((r) =>
      new Date(r.pushed_at).getTime() >= cutoffMs
        ? commitCountFor(r.full_name, sinceIso, token)
        : Promise.resolve(0)
    )
  );

  const repos: Repo[] = filtered.map((r, i) => ({
    name: r.name,
    language: r.language,
    pushed_at: r.pushed_at,
    html_url: r.html_url,
    stargazers_count: r.stargazers_count,
    commits7d: counts[i],
  }));

  // eslint-disable-next-line no-console
  console.log(
    `[github] commits last 7d:`,
    repos
      .filter((r) => r.commits7d > 0)
      .map((r) => `${r.name}=${r.commits7d}`)
      .join(", ") || "(none)"
  );

  memo = { ts: Date.now(), repos };
  return repos;
}
