import type { ChangelogEntry } from "@/utils/changelog";

export function useChangelogEntries() {
  return useAsyncData<ChangelogEntry[]>(
    "changelog-entries",
    () => queryCollection("changelog").order("date", "DESC").all() as Promise<ChangelogEntry[]>,
    { default: () => [] }
  );
}
