import { ARTICLE_HTML } from "./article";
import { CHANGELOG_HTML } from "./changelog";
import { CHAT_HTML } from "./chat";
import { DOCS_HTML } from "./docs";
import { NOTES_HTML } from "./notes";

export const FIXTURES = {
  docs: DOCS_HTML,
  chat: CHAT_HTML,
  article: ARTICLE_HTML,
  changelog: CHANGELOG_HTML,
  notes: NOTES_HTML,
} as const;

export type FixtureName = keyof typeof FIXTURES;

export const CONTENT_OPTIONS = [
  { value: "docs", label: "Docs" },
  { value: "chat", label: "Chat" },
  { value: "article", label: "Article" },
  { value: "changelog", label: "Changelog" },
  { value: "notes", label: "Notes" },
] as const satisfies readonly { value: FixtureName; label: string }[];

export const AVAILABLE_CONTENT_OPTIONS: readonly { value: FixtureName; label: string }[] =
  CONTENT_OPTIONS;
