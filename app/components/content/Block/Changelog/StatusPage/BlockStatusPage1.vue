<template>
  <!--
    Status page uptime overview
    Features: An overall status banner that follows the worst service, a row for each service with a 90 day bar chart, an uptime percentage, the current status, a text summary for screen readers and a legend
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex items-center gap-3 rounded-xl border p-5" :class="banner.tone" role="status">
        <Icon :name="banner.icon" class="size-6 shrink-0" />
        <div>
          <h1 class="text-lg font-semibold">{{ banner.title }}</h1>
          <p class="text-sm opacity-90">Updated {{ updated }}</p>
        </div>
      </div>

      <ul class="mt-8 space-y-6">
        <li v-for="service in services" :key="service.name">
          <div class="flex items-center justify-between gap-3">
            <p class="font-medium">{{ service.name }}</p>
            <p class="flex items-center gap-2 text-sm">
              <span class="text-muted-foreground tabular-nums">{{ uptime(service) }}% uptime</span>
              <UiBadge variant="soft" shape="pill" :color="meta[service.status].badge">{{
                meta[service.status].label
              }}</UiBadge>
            </p>
          </div>
          <div class="mt-2 flex h-9 gap-[2px]" role="img" :aria-label="summary(service)">
            <span
              v-for="(day, index) in service.days"
              :key="index"
              class="flex-1 rounded-[2px]"
              :class="meta[day].bar"
              :title="`${dayLabel(index)}: ${meta[day].label}`"
            />
          </div>
          <div class="text-muted-foreground mt-1 flex justify-between text-xs" aria-hidden="true">
            <span>90 days ago</span><span>Today</span>
          </div>
        </li>
      </ul>

      <ul class="mt-8 flex flex-wrap gap-4 text-xs" aria-label="Legend">
        <li v-for="(item, key) in meta" :key="key" class="flex items-center gap-1.5">
          <span class="size-3 rounded-[2px]" :class="item.bar" />{{ item.label }}
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "up" | "degraded" | "down";
  type Service = { name: string; status: Status; days: Status[] };

  const props = withDefaults(
    defineProps<{
      /** The current moment as `YYYY-MM-DDTHH:mm`. */
      now?: string;
      services?: Service[];
    }>(),
    {
      now: "2026-10-18T10:20",
      services: () => {
        const build = (marks: Record<number, Status>): Status[] =>
          Array.from({ length: 90 }, (_, index) => marks[index] ?? "up");
        return [
          {
            name: "API",
            status: "up",
            days: build({ 12: "degraded", 47: "down", 48: "degraded", 71: "degraded" }),
          },
          {
            name: "Dashboard",
            status: "degraded",
            days: build({ 30: "degraded", 63: "degraded", 89: "degraded" }),
          },
          { name: "Webhooks", status: "up", days: build({ 8: "down", 55: "degraded" }) },
          { name: "Email delivery", status: "up", days: build({}) },
        ];
      },
    }
  );

  const meta: Record<Status, { label: string; bar: string; badge: string }> = {
    up: { label: "Operational", bar: "bg-green-500", badge: "green" },
    degraded: { label: "Degraded", bar: "bg-amber-400", badge: "amber" },
    down: { label: "Outage", bar: "bg-red-500", badge: "red" },
  };

  const worst = computed<Status>(() =>
    props.services.some((service) => service.status === "down")
      ? "down"
      : props.services.some((service) => service.status === "degraded")
        ? "degraded"
        : "up"
  );

  const banner = computed(() => {
    const tones = {
      up: {
        title: "All systems operational",
        icon: "lucide:circle-check",
        tone: "border-green-200 bg-green-50 text-green-900 dark:border-green-500/30 dark:bg-green-500/10 dark:text-green-200",
      },
      degraded: {
        title: "Some systems are degraded",
        icon: "lucide:triangle-alert",
        tone: "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200",
      },
      down: {
        title: "We are experiencing an outage",
        icon: "lucide:circle-x",
        tone: "border-red-200 bg-red-50 text-red-900 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-200",
      },
    };
    return tones[worst.value];
  });

  const uptime = (service: Service) => {
    const score = service.days.reduce(
      (sum, day) => sum + (day === "up" ? 1 : day === "degraded" ? 0.995 : 0),
      0
    );
    return ((score / service.days.length) * 100).toFixed(2);
  };

  const summary = (service: Service) => {
    const bad = service.days.filter((day) => day !== "up").length;
    return `${service.name}: ${bad === 0 ? "no incidents" : `${bad} ${bad === 1 ? "day" : "days"} with issues`} in the last 90 days.`;
  };

  const dayLabel = (index: number) => {
    const date = new Date(`${props.now.slice(0, 10)}T00:00:00Z`);
    date.setUTCDate(date.getUTCDate() - (89 - index));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
  };

  const updated = computed(
    () =>
      new Date(`${props.now}:00Z`).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        timeZone: "UTC",
      }) + " UTC"
  );
</script>
