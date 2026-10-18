<template>
  <!--
    System events feed
    Features: Monospace event lines with a severity icon, a timestamp, a service name, expandable details with a key and value list, a severity filter with counts and a pause live updates switch
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">System events</h1>
        <div class="flex items-center gap-2">
          <UiSwitch id="live" v-model="live" />
          <UiLabel for="live" class="text-sm font-normal">Live</UiLabel>
        </div>
      </div>

      <UiToggleGroup
        :model-value="level"
        type="single"
        variant="outline"
        size="sm"
        class="mt-4 flex-wrap justify-start"
        aria-label="Severity"
        @update:model-value="(value) => (level = (value as string) || 'all')"
      >
        <UiToggleGroupItem v-for="item in levels" :key="item" :value="item" class="capitalize"
          >{{ item
          }}<span class="text-muted-foreground ml-1.5 text-xs">{{
            count(item)
          }}</span></UiToggleGroupItem
        >
      </UiToggleGroup>

      <ul class="mt-4 divide-y rounded-xl border font-mono text-sm" aria-live="off">
        <li v-for="event in visible" :key="event.id">
          <button
            type="button"
            class="hover:bg-accent/50 focus-visible:bg-accent/50 flex w-full items-start gap-3 px-4 py-2.5 text-left outline-none"
            :aria-expanded="open.has(event.id)"
            @click="toggle(event.id)"
          >
            <Icon
              :name="icons[event.level].name"
              class="mt-0.5 size-4 shrink-0"
              :class="icons[event.level].tone"
            />
            <span class="text-muted-foreground shrink-0">{{ event.time }}</span>
            <span class="bg-muted shrink-0 rounded px-1.5 text-xs leading-5">{{
              event.service
            }}</span>
            <span class="min-w-0 flex-1 break-words">{{ event.message }}</span>
            <Icon
              name="lucide:chevron-down"
              class="text-muted-foreground mt-0.5 size-4 shrink-0 transition-transform"
              :class="open.has(event.id) ? 'rotate-180' : ''"
            />
          </button>
          <dl
            v-if="open.has(event.id)"
            class="bg-muted/40 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 px-4 py-3 text-xs"
          >
            <template v-for="(value, key) in event.details" :key="key">
              <dt class="text-muted-foreground">{{ key }}</dt>
              <dd class="break-all">{{ value }}</dd>
            </template>
          </dl>
        </li>
        <li v-if="!visible.length" class="text-muted-foreground px-4 py-10 text-center font-sans">
          No events at this level.
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Level = "info" | "success" | "warning" | "error";
  type Event = {
    id: string;
    level: Level;
    time: string;
    service: string;
    message: string;
    details: Record<string, string>;
  };

  const props = withDefaults(
    defineProps<{
      events?: Event[];
    }>(),
    {
      events: () => [
        {
          id: "s1",
          level: "error",
          time: "10:18:42",
          service: "billing",
          message: "Webhook delivery failed after 3 retries",
          details: {
            endpoint: "https://example.com/hooks/billing",
            status: "503",
            attempt: "3 of 3",
          },
        },
        {
          id: "s2",
          level: "warning",
          time: "10:16:05",
          service: "api",
          message: "Latency above 800 ms on /v1/reports",
          details: { p95: "812 ms", region: "us-east-1", threshold: "800 ms" },
        },
        {
          id: "s3",
          level: "success",
          time: "10:12:31",
          service: "deploy",
          message: "Release 2.4.0 rolled out to production",
          details: { duration: "2m 14s", commit: "a3f9c21", instances: "6" },
        },
        {
          id: "s4",
          level: "info",
          time: "10:09:50",
          service: "auth",
          message: "Signing key rotated",
          details: { keyId: "k_2026_10", expires: "2027-01-18" },
        },
        {
          id: "s5",
          level: "info",
          time: "10:02:11",
          service: "jobs",
          message: "Nightly export queued",
          details: { rows: "48,210", queue: "exports" },
        },
        {
          id: "s6",
          level: "warning",
          time: "09:58:20",
          service: "storage",
          message: "Bucket at 82 percent of its quota",
          details: { used: "820 GB", quota: "1 TB" },
        },
      ],
    }
  );

  const levels = ["all", "info", "success", "warning", "error"];
  const icons: Record<Level, { name: string; tone: string }> = {
    info: { name: "lucide:info", tone: "text-blue-500" },
    success: { name: "lucide:circle-check", tone: "text-green-500" },
    warning: { name: "lucide:triangle-alert", tone: "text-amber-500" },
    error: { name: "lucide:circle-x", tone: "text-red-500" },
  };

  const live = ref(true);
  const level = ref("all");
  const open = ref(new Set<string>(["s1"]));

  const count = (value: string) =>
    value === "all"
      ? props.events.length
      : props.events.filter((event) => event.level === value).length;
  const visible = computed(() =>
    props.events.filter((event) => level.value === "all" || event.level === level.value)
  );

  function toggle(id: string) {
    const next = new Set(open.value);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    open.value = next;
  }
</script>
