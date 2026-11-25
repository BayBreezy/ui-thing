// Copies the authoring copy of each published skill (.agents/skills/<name>) to the
// installable copy (skills/<name>) used by `npx skills add`. Run with `bun run sync:skills`.
//
// The files are copied unchanged: SKILL.md must start with its YAML frontmatter, so nothing
// is prepended to it.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { join, resolve } from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SOURCE_ROOT = resolve(ROOT, ".agents/skills");
const TARGET_ROOT = resolve(ROOT, "skills");
const PUBLISHED_SKILLS = ["uithing"];

mkdirSync(TARGET_ROOT, { recursive: true });

for (const name of PUBLISHED_SKILLS) {
  const source = join(SOURCE_ROOT, name);
  const target = join(TARGET_ROOT, name);
  if (!existsSync(source)) {
    console.error(`Source skill not found: ${source}`);
    process.exit(1);
  }
  rmSync(target, { recursive: true, force: true });
  cpSync(source, target, { recursive: true });
  console.log(`Synced ${name}: .agents/skills/${name} -> skills/${name}`);
}
