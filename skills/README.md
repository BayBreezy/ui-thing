# UI Thing Skills

This repo exposes installable agent skills from the top-level `skills/` directory.

## Install

Install the `uithing` skill from this repo with:

```bash
npx skills add https://github.com/BayBreezy/ui-thing --skill uithing
```

## Workflow

- Author the source skill in `.agents/skills/uithing`
- Run `npm run sync:skills` to refresh the published copy in `skills/uithing`

## Included Skills

- `uithing`: UI Thing CLI usage, component authoring, docs/generator workflows, MCP usage, and React/shadcn-to-UI-Thing conversion.
