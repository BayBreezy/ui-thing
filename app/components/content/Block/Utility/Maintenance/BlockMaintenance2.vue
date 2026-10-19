<template>
  <!--
    Scheduled downtime notice
    Features: Maintenance window with start, end and duration, time until it starts, affected services with impact badges, notify me switch, copy details button
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-2xl">
      <UiCardHeader>
        <div class="flex flex-wrap items-center gap-2">
          <UiBadge variant="soft" color="warning" shape="pill">Scheduled maintenance</UiBadge>
          <span class="text-muted-foreground text-sm">{{ until }}</span>
        </div>
        <UiCardTitle class="mt-2 text-2xl">{{ title }}</UiCardTitle>
        <UiCardDescription>{{ description }}</UiCardDescription>
      </UiCardHeader>

      <UiCardContent class="space-y-6">
        <dl class="grid gap-3 sm:grid-cols-3">
          <div v-for="item in windowFacts" :key="item.label" class="rounded-lg border p-3">
            <dt class="text-muted-foreground text-xs tracking-wide uppercase">{{ item.label }}</dt>
            <dd class="mt-1 text-sm font-semibold">{{ item.value }}</dd>
          </div>
        </dl>

        <div>
          <h3 class="text-sm font-medium">Affected services</h3>
          <ul class="mt-3 divide-y rounded-lg border">
            <li
              v-for="service in services"
              :key="service.name"
              class="flex items-center justify-between gap-3 p-3 text-sm"
            >
              <span class="font-medium">{{ service.name }}</span>
              <UiBadge
                variant="soft"
                size="sm"
                :color="service.impact === 'Full outage' ? 'red' : 'yellow'"
                >{{ service.impact }}</UiBadge
              >
            </li>
          </ul>
        </div>

        <div class="flex items-center justify-between gap-4 rounded-lg border p-3">
          <div>
            <UiLabel for="downtime-notify" class="text-sm font-medium"
              >Remind me 1 hour before</UiLabel
            >
            <p class="text-muted-foreground text-xs">
              We will send an email to your account address.
            </p>
          </div>
          <UiSwitch id="downtime-notify" v-model="notify" />
        </div>
        <p v-if="notify" class="text-sm" role="status">
          <Icon name="lucide:bell-ring" class="text-primary mr-1 inline size-4" />
          Reminder on. We will email you at {{ remindAt }}.
        </p>
      </UiCardContent>

      <UiCardFooter class="gap-2">
        <UiButton variant="outline" @click="copy(summary)">
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />
          {{ copied ? "Copied" : "Copy details" }}
        </UiButton>
        <UiButton variant="ghost">View status page</UiButton>
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Service = { name: string; impact: "Full outage" | "Degraded" };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      start?: string;
      end?: string;
      now?: string;
      services?: Service[];
    }>(),
    {
      title: "Database upgrade",
      description:
        "We are moving to a faster database cluster. Expect a short outage while we switch over.",
      start: "2026-10-20T02:00:00Z",
      end: "2026-10-20T04:30:00Z",
      now: "2026-10-18T09:00:00Z",
      services: () => [
        { name: "Web app", impact: "Full outage" },
        { name: "Public API", impact: "Full outage" },
        { name: "Webhooks", impact: "Degraded" },
        { name: "Email notifications", impact: "Degraded" },
      ],
    }
  );

  const notify = ref(false);
  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  const format = (value: string | number) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(new Date(value)) + " UTC";

  const minutes = computed(() =>
    Math.round((Date.parse(props.end) - Date.parse(props.start)) / 60000)
  );
  const duration = computed(() => {
    const h = Math.floor(minutes.value / 60);
    const m = minutes.value % 60;
    return [h ? `${h} ${h === 1 ? "hour" : "hours"}` : "", m ? `${m} min` : ""]
      .filter(Boolean)
      .join(" ");
  });

  const windowFacts = computed(() => [
    { label: "Starts", value: format(props.start) },
    { label: "Ends", value: format(props.end) },
    { label: "Duration", value: duration.value },
  ]);

  const until = computed(() => {
    const total = Math.round((Date.parse(props.start) - Date.parse(props.now)) / 60000);
    if (total <= 0) return "In progress";
    const d = Math.floor(total / 1440);
    const h = Math.floor((total % 1440) / 60);
    return `Starts in ${d ? `${d} ${d === 1 ? "day" : "days"} ` : ""}${h} ${h === 1 ? "hour" : "hours"}`;
  });

  const remindAt = computed(() => format(Date.parse(props.start) - 60 * 60000));

  const summary = computed(
    () =>
      `${props.title}: ${format(props.start)} to ${format(props.end)} (${duration.value}). Affected: ${props.services.map((s) => s.name).join(", ")}.`
  );
</script>
