<template>
  <!--
    Component status list
    Features: Components grouped by area with a status for each one, groups that collapse to hide their parts, an only show issues switch, a count of operational components, colored status icons with text and a last checked time
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 class="text-2xl font-bold tracking-tight">System status</h1>
          <p class="text-muted-foreground text-sm" aria-live="polite">
            {{ ok }} of {{ total }} components operational
          </p>
        </div>
        <div class="flex items-center gap-2">
          <UiSwitch id="issues-only" v-model="issuesOnly" />
          <UiLabel for="issues-only" class="text-sm font-normal">Only show issues</UiLabel>
        </div>
      </div>

      <div class="mt-6 space-y-4" aria-live="polite">
        <UiCard v-for="group in visible" :key="group.name" class="gap-0 py-0">
          <button
            type="button"
            class="hover:bg-accent/40 focus-visible:bg-accent/40 flex w-full items-center gap-3 px-5 py-4 text-left outline-none"
            :aria-expanded="!closed.has(group.name)"
            @click="toggle(group.name)"
          >
            <Icon
              name="lucide:chevron-right"
              class="text-muted-foreground size-4 transition-transform"
              :class="closed.has(group.name) ? '' : 'rotate-90'"
            />
            <span class="flex-1 font-medium">{{ group.name }}</span>
            <span class="flex items-center gap-1.5 text-sm" :class="meta[group.status].text">
              <Icon :name="meta[group.status].icon" class="size-4" />{{ meta[group.status].label }}
            </span>
          </button>
          <ul v-if="!closed.has(group.name)" class="divide-y border-t">
            <li
              v-for="part in group.parts"
              :key="part.name"
              class="flex items-center gap-3 px-5 py-3 pl-12 text-sm"
            >
              <span class="flex-1">{{ part.name }}</span>
              <span v-if="part.note" class="text-muted-foreground hidden text-xs sm:block">{{
                part.note
              }}</span>
              <span class="flex items-center gap-1.5" :class="meta[part.status].text">
                <Icon :name="meta[part.status].icon" class="size-4" />{{ meta[part.status].label }}
              </span>
            </li>
          </ul>
        </UiCard>
        <p
          v-if="!visible.length"
          class="text-muted-foreground rounded-xl border border-dashed py-12 text-center text-sm"
        >
          <Icon name="lucide:circle-check" class="mx-auto mb-2 size-6 text-green-500" />
          Everything is working. There are no issues to show.
        </p>
      </div>
      <p class="text-muted-foreground mt-4 text-xs">Last checked {{ checked }}</p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "up" | "degraded" | "down" | "maintenance";
  type Part = { name: string; status: Status; note?: string };
  type Group = { name: string; parts: Part[] };

  const props = withDefaults(
    defineProps<{
      checked?: string;
      groups?: Group[];
    }>(),
    {
      checked: "10:19 AM UTC, 1 minute ago",
      groups: () => [
        {
          name: "API",
          parts: [
            { name: "REST API", status: "up" },
            { name: "Webhooks", status: "degraded", note: "Delivery delays of about 2 minutes" },
            { name: "Authentication", status: "up" },
          ],
        },
        {
          name: "Dashboard",
          parts: [
            { name: "Web app", status: "up" },
            { name: "Reports", status: "up" },
            { name: "Exports", status: "maintenance", note: "Back at 12:00 UTC" },
          ],
        },
        {
          name: "Infrastructure",
          parts: [
            { name: "Database", status: "up" },
            { name: "File storage", status: "up" },
            { name: "Email delivery", status: "up" },
          ],
        },
      ],
    }
  );

  const meta: Record<Status, { label: string; icon: string; text: string }> = {
    up: {
      label: "Operational",
      icon: "lucide:circle-check",
      text: "text-green-600 dark:text-green-400",
    },
    degraded: {
      label: "Degraded",
      icon: "lucide:triangle-alert",
      text: "text-amber-600 dark:text-amber-400",
    },
    down: { label: "Outage", icon: "lucide:circle-x", text: "text-red-600 dark:text-red-400" },
    maintenance: {
      label: "Maintenance",
      icon: "lucide:wrench",
      text: "text-blue-600 dark:text-blue-400",
    },
  };
  const rank: Status[] = ["up", "maintenance", "degraded", "down"];

  const issuesOnly = ref(false);
  const closed = ref(new Set<string>());

  const all = computed(() =>
    props.groups.map((group) => ({
      ...group,
      status: group.parts.reduce<Status>(
        (worst, part) => (rank.indexOf(part.status) > rank.indexOf(worst) ? part.status : worst),
        "up"
      ),
    }))
  );
  const visible = computed(() =>
    all.value
      .map((group) => ({
        ...group,
        parts: issuesOnly.value ? group.parts.filter((part) => part.status !== "up") : group.parts,
      }))
      .filter((group) => group.parts.length)
  );
  const total = computed(() => props.groups.reduce((sum, group) => sum + group.parts.length, 0));
  const ok = computed(() =>
    props.groups.reduce(
      (sum, group) => sum + group.parts.filter((part) => part.status === "up").length,
      0
    )
  );

  function toggle(name: string) {
    const next = new Set(closed.value);
    if (next.has(name)) next.delete(name);
    else next.add(name);
    closed.value = next;
  }
</script>
