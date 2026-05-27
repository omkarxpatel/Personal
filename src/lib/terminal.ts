import {
  root,
  resolve,
  splitPath,
  normalizeSegments,
  segsToPath,
  whoamiOutput,
  findByName,
  type FSNode,
  type FSDir,
} from "./fs.ts";
import { renderTop } from "./github.ts";

export type CmdResult =
  | { kind: "html"; html: string }
  | { kind: "clear" }
  | { kind: "open"; href: string }
  | { kind: "async"; placeholder: string; promise: Promise<CmdResult> };

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function nodeAt(segs: string[]): FSNode | null {
  let node: FSNode = root;
  for (const s of segs) {
    if (node.type !== "dir") return null;
    const child = node.children.find((c) => c.name === s);
    if (!child) return null;
    node = child;
  }
  return node;
}

function lsFormat(dir: FSDir): string {
  const cols: string[] = dir.children.map((c) => {
    const cls =
      c.type === "dir"
        ? "t-path"
        : c.type === "external"
          ? "t-sigil"
          : "t-text";
    const suffix = c.type === "dir" ? "/" : c.type === "external" ? " ↗" : "";
    const size = "size" in c && c.size ? `<span class="t-muted">${esc(c.size)}</span>` : `<span class="t-muted">·</span>`;
    const args =
      c.type === "dir"
        ? `cd ${c.name}`
        : c.type === "external"
          ? `open ${c.name}`
          : `cat ${c.name}`;
    return `<div class="ls-row"><span class="t-muted ls-meta">${size}</span><a class="ls-name ${cls}" data-cmd="${esc(args)}">${esc(c.name)}${suffix}</a></div>`;
  });
  return `<div class="ls-grid">${cols.join("")}</div>`;
}

function treeFormat(dir: FSDir, prefix = ""): string {
  const lines: string[] = [];
  const entries = dir.children;
  entries.forEach((c, i) => {
    const last = i === entries.length - 1;
    const branch = last ? "└── " : "├── ";
    const cls =
      c.type === "dir"
        ? "t-path"
        : c.type === "external"
          ? "t-sigil"
          : "t-text";
    const suffix = c.type === "dir" ? "/" : c.type === "external" ? " ↗" : "";
    lines.push(
      `${prefix}${branch}<span class="${cls}">${esc(c.name)}${suffix}</span>`
    );
    if (c.type === "dir") {
      lines.push(treeFormat(c, prefix + (last ? "    " : "│   ")));
    }
  });
  return lines.filter(Boolean).join("\n");
}

export class Shell {
  cwdSegs: string[] = [];
  history: string[] = [];
  historyIdx = -1;

  pathString(): string {
    return segsToPath(this.cwdSegs);
  }

  run(input: string): CmdResult {
    const trimmed = input.trim();
    if (!trimmed) return { kind: "html", html: "" };
    if (this.history[this.history.length - 1] !== trimmed) {
      this.history.push(trimmed);
    }
    this.historyIdx = -1;

    const [cmd, ...args] = trimmed.split(/\s+/);
    const handler = commands[cmd];
    if (!handler) {
      return {
        kind: "html",
        html: `<span class="t-muted">${esc(cmd)}: command not found. type </span><a class="t-accent" data-cmd="help">help</a><span class="t-muted">.</span>`,
      };
    }
    return handler(args, this);
  }

  prevHistory(): string | null {
    if (this.history.length === 0) return null;
    if (this.historyIdx === -1) this.historyIdx = this.history.length;
    if (this.historyIdx > 0) this.historyIdx -= 1;
    return this.history[this.historyIdx] ?? null;
  }

  nextHistory(): string | null {
    if (this.history.length === 0) return null;
    if (this.historyIdx === -1) return "";
    this.historyIdx += 1;
    if (this.historyIdx >= this.history.length) {
      this.historyIdx = -1;
      return "";
    }
    return this.history[this.historyIdx] ?? null;
  }

  /** complete a token against children of cwd (or path target dir) */
  complete(token: string): string[] {
    let baseSegs = this.cwdSegs;
    let prefix = token;
    if (token.includes("/")) {
      const parts = token.split("/");
      prefix = parts.pop() ?? "";
      const baseStr = parts.join("/");
      const r = resolve(baseStr, this.cwdSegs);
      if (!r || r.node.type !== "dir") return [];
      baseSegs = r.segs;
    }
    const dir = nodeAt(baseSegs);
    if (!dir || dir.type !== "dir") return [];
    return dir.children
      .filter((c) => c.name.startsWith(prefix))
      .map((c) => c.name);
  }
}

const commands: Record<string, (args: string[], shell: Shell) => CmdResult> = {
  help: () => ({
    kind: "html",
    html: `
<div class="block">
  <div>commands</div>
  ${[
    ["ls [path]", "list directory contents"],
    ["cd <path>", "change directory (cd .., cd ~, cd work)"],
    ["pwd", "print current path"],
    ["cat <file>", "print file content"],
    ["open <file>", "open external file (e.g. resume.pdf)"],
    ["tree", "print full file tree"],
    ["whoami", "who is this"],
    ["top", "current github activity"],
    ["clear", "clear the screen"],
    ["help", "this list"],
  ]
    .map(
      ([c, d]) =>
        `<div class="kv"><dt><a class="t-accent" data-cmd="${esc(c.split(" ")[0])}">${esc(c)}</a></dt><dd class="t-muted">${esc(d)}</dd></div>`
    )
    .join("")}
  <div class="t-muted t-tip">tip: <span class="t-text">Tab</span> completes filenames · <span class="t-text">↑/↓</span> walks history · click any blue text to run it.</div>
</div>`.trim(),
  }),

  ls: (args, shell) => {
    const target = args[0] ?? "";
    const r = resolve(target || ".", shell.cwdSegs);
    if (!r) return notFound(target);
    if (r.node.type === "dir") {
      return { kind: "html", html: lsFormat(r.node) };
    }
    return {
      kind: "html",
      html: `<div>${esc(r.node.name)}</div>`,
    };
  },

  cd: (args, shell) => {
    const target = args[0] ?? "~";
    if (target === "~" || target === "") {
      shell.cwdSegs = [];
      const dir = root;
      return { kind: "html", html: lsFormat(dir) };
    }
    const r = resolve(target, shell.cwdSegs);
    if (!r) return notFound(target, "cd");
    if (r.node.type !== "dir") {
      // Suggest cat/open if the target is actually a file
      const verb = r.node.type === "external" ? "open" : "cat";
      return {
        kind: "html",
        html:
          `<span class="t-warn">cd: not a directory: ${esc(target)}</span>` +
          `<div class="t-muted t-suggest">try <a class="t-accent" data-cmd="${esc(verb)} ${esc(target)}">${esc(verb)} ${esc(target)}</a></div>`,
      };
    }
    shell.cwdSegs = r.segs;
    return { kind: "html", html: lsFormat(r.node) };
  },

  pwd: (_args, shell) => ({
    kind: "html",
    html: `<span>${esc(shell.pathString())}</span>`,
  }),

  cat: (args, shell) => {
    if (!args[0])
      return {
        kind: "html",
        html: `<span class="t-warn">cat: missing file operand</span>`,
      };
    const r = resolve(args[0], shell.cwdSegs);
    if (!r) return notFound(args[0], "cat");
    if (r.node.type === "dir")
      return {
        kind: "html",
        html:
          `<span class="t-warn">cat: ${esc(args[0])}: is a directory</span>` +
          `<div class="t-muted t-suggest">try <a class="t-accent" data-cmd="ls ${esc(args[0])}">ls ${esc(args[0])}</a></div>`,
      };
    if (r.node.type === "external")
      return {
        kind: "html",
        html: `<span class="t-muted">${esc(r.node.name)} is external. run </span><a class="t-accent" data-cmd="open ${esc(r.node.name)}">open ${esc(r.node.name)}</a><span class="t-muted"> to view it.</span>`,
      };
    return { kind: "html", html: r.node.render() };
  },

  open: (args, shell) => {
    if (!args[0])
      return {
        kind: "html",
        html: `<span class="t-warn">open: missing operand</span>`,
      };
    const r = resolve(args[0], shell.cwdSegs);
    if (!r) return notFound(args[0], "open");
    if (r.node.type !== "external")
      return {
        kind: "html",
        html:
          `<span class="t-warn">open: ${esc(args[0])}: not an external file</span>` +
          `<div class="t-muted t-suggest">try <a class="t-accent" data-cmd="cat ${esc(args[0])}">cat ${esc(args[0])}</a></div>`,
      };
    return { kind: "open", href: r.node.href };
  },

  clear: () => ({ kind: "clear" }),

  tree: (_args, _shell) => ({
    kind: "html",
    html: `<pre class="tree">~\n${treeFormat(root)}</pre>`,
  }),

  whoami: () => ({ kind: "html", html: whoamiOutput() }),

  echo: (args) => ({ kind: "html", html: esc(args.join(" ")) }),

  history: (_args, shell) => ({
    kind: "html",
    html:
      shell.history.length === 0
        ? `<span class="t-muted">(empty)</span>`
        : `<ol class="hist">${shell.history.map((h) => `<li><a class="t-accent" data-cmd="${esc(h)}">${esc(h)}</a></li>`).join("")}</ol>`,
  }),

  date: () => ({
    kind: "html",
    html: `<span>${new Date().toString()}</span>`,
  }),

  sudo: (args) => {
    if (args.join(" ") === "hire-me") {
      return {
        kind: "html",
        html: `<span class="t-success">request accepted.</span> <a class="t-accent" data-cmd="cat contact.md">cat contact.md</a>`,
      };
    }
    return {
      kind: "html",
      html: `<span class="t-muted">sudo: permission denied. nice try.</span>`,
    };
  },

  vim: () => ({
    kind: "html",
    html: `<span class="t-muted">:q! (you can leave any time)</span>`,
  }),

  exit: () => ({
    kind: "html",
    html: `<span class="t-muted">no exit. you live here now.</span>`,
  }),

  top: () => ({
    kind: "html",
    html: renderTop(),
  }),
};

// alias
commands.htop = commands.top;

// aliases
commands.dir = commands.ls;
commands.print = commands.cat;
commands.cls = commands.clear;
commands["?"] = commands.help;

function notFound(target: string, intendedCmd: "cd" | "cat" | "open" = "cat"): CmdResult {
  // Suggest by exact filename match anywhere in the tree
  const justName = target.split("/").pop() ?? target;
  const matches = findByName(justName);
  let suggestion = "";
  if (matches.length === 1) {
    const m = matches[0];
    const expected = intendedCmd === "cd" ? "dir" : intendedCmd === "open" ? "external" : "file";
    const cmdForNode =
      m.node.type === "dir" ? "cd" : m.node.type === "external" ? "open" : "cat";
    // If the user typed `cd <file>`, suggest the appropriate verb instead.
    const verb = m.node.type === "dir" ? "cd" : cmdForNode;
    suggestion = `<div class="t-muted t-suggest">did you mean <a class="t-accent" data-cmd="${esc(verb)} ${esc(m.path)}">${esc(verb)} ${esc(m.path)}</a>?</div>`;
  } else if (matches.length > 1) {
    const links = matches
      .map((m) => {
        const verb = m.node.type === "dir" ? "cd" : m.node.type === "external" ? "open" : "cat";
        return `<a class="t-accent" data-cmd="${esc(verb)} ${esc(m.path)}">${esc(m.path)}</a>`;
      })
      .join(", ");
    suggestion = `<div class="t-muted t-suggest">matches found: ${links}</div>`;
  }
  return {
    kind: "html",
    html: `<span class="t-warn">no such file or directory: ${esc(target)}</span>${suggestion}`,
  };
}

// Expose for tab completion suggestions
export function commandNames(): string[] {
  return Object.keys(commands).filter((k) => !["dir", "print", "cls", "?"].includes(k));
}

export function isCommand(name: string): boolean {
  return name in commands;
}
