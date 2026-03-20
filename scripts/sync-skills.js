import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import process from "node:process";

const ROOT = process.cwd();
const SOURCE_ROOT = resolve(ROOT, ".agents/skills");
const TARGET_ROOT = resolve(ROOT, "skills");
const PUBLISHED_SKILLS = ["uithing"];

function ensureDir(path) {
  mkdirSync(path, { recursive: true });
}

function syncSkill(skillName) {
  const sourcePath = join(SOURCE_ROOT, skillName);
  const targetPath = join(TARGET_ROOT, skillName);

  if (!existsSync(sourcePath)) {
    throw new Error(`Source skill not found: ${sourcePath}`);
  }

  rmSync(targetPath, { recursive: true, force: true });
  cpSync(sourcePath, targetPath, { recursive: true });

  const skillFilePath = join(targetPath, "SKILL.md");

  if (existsSync(skillFilePath)) {
    const skillFile = readFileSync(skillFilePath, "utf8");
    const generatedNotice =
      "> [!NOTE]\n> This installable copy is generated from `/.agents/skills/uithing`. Run `npm run sync:skills` after updating the source skill.\n\n";

    if (!skillFile.includes("This installable copy is generated")) {
      writeFileSync(skillFilePath, `${generatedNotice}${skillFile}`);
    }
  }
}

function main() {
  ensureDir(TARGET_ROOT);

  for (const skillName of PUBLISHED_SKILLS) {
    syncSkill(skillName);
  }

  const readmePath = join(TARGET_ROOT, "README.md");
  ensureDir(dirname(readmePath));
  writeFileSync(
    readmePath,
    `# UI Thing Skills

This repo exposes installable agent skills from the top-level \`skills/\` directory.

## Install

Install the \`uithing\` skill from this repo with:

\`\`\`bash
npx skills add https://github.com/BayBreezy/ui-thing --skill uithing
\`\`\`

## Workflow

- Author the source skill in \`.agents/skills/uithing\`
- Run \`npm run sync:skills\` to refresh the published copy in \`skills/uithing\`

## Included Skills

- \`uithing\`: UI Thing CLI usage, component authoring, docs/generator workflows, MCP usage, and React/shadcn-to-UI-Thing conversion.
`
  );
}

main();
