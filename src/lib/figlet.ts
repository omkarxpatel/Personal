import { FIGLET_FONT, FIGLET_HEIGHT } from "../data/figlet-font.ts";

const SPACE = FIGLET_FONT[" "];

export function figletRender(input: string): string {
  if (!input) return "";
  const chars = [...input].map((c) => FIGLET_FONT[c] ?? FIGLET_FONT[c.toLowerCase()] ?? SPACE);
  const lines: string[] = [];
  for (let row = 0; row < FIGLET_HEIGHT; row += 1) {
    let line = "";
    for (const glyph of chars) {
      line += glyph[row] ?? "";
    }
    lines.push(line.trimEnd());
  }
  // strip leading + trailing all-blank rows (visual trim)
  while (lines.length > 1 && lines[0].trim() === "") lines.shift();
  while (lines.length > 1 && lines[lines.length - 1].trim() === "") lines.pop();
  return lines.join("\n");
}
