export type ChangelogCategory = "feature" | "update" | "docs" | "dx" | "announcement";

export interface ChangelogLink {
  label: string;
  href: string;
}

export interface ChangelogEntry {
  slug: string;
  date: string;
  title: string;
  category: ChangelogCategory;
  tags: string[];
  summary: string;
  body: string;
  breaking: boolean;
  links: ChangelogLink[];
}

export interface ChangelogCategoryMeta {
  label: string;
  badge: "success" | "info" | "outline" | "secondary" | "warning";
  icon: string;
}

export const CHANGELOG_CATEGORIES: Record<ChangelogCategory, ChangelogCategoryMeta> = {
  feature: { label: "Feature", badge: "success", icon: "lucide:sparkles" },
  update: { label: "Update", badge: "info", icon: "lucide:refresh-cw" },
  docs: { label: "Docs", badge: "outline", icon: "lucide:book-open" },
  dx: { label: "Developer Experience", badge: "secondary", icon: "lucide:terminal" },
  announcement: { label: "Announcement", badge: "warning", icon: "lucide:megaphone" },
};

export function formatChangelogDate(date: string): string {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
