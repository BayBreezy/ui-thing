import { useStorage } from "@vueuse/core";

export function useChangelogViewed() {
  const lastViewedDate = useStorage("ui-things-changelog-last-viewed", "");
  const { data: entries } = useChangelogEntries();

  const latestDate = computed(() => entries.value[0]?.date ?? "");

  const hasUnread = computed(() => {
    if (!latestDate.value) return false;
    if (!lastViewedDate.value) return true;
    return latestDate.value > lastViewedDate.value;
  });

  function markAsViewed() {
    if (latestDate.value) {
      lastViewedDate.value = latestDate.value;
    }
  }

  return { hasUnread, markAsViewed };
}
