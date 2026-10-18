<template>
  <!--
    Time zone aware slot picker
    Features: Time zone select, slots converted live and grouped by local date so a late slot can land on the next day, a 12 or 24 hour switch and the host time shown beside the chosen slot
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl">
      <h1 class="text-2xl font-bold tracking-tight">Pick a time</h1>
      <p class="text-muted-foreground mt-1 text-sm">
        {{ hostName }} is in {{ hostZoneLabel }}. Times are shown in your time zone.
      </p>

      <div class="mt-6 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div class="space-y-2">
          <UiLabel for="zone-select">Your time zone</UiLabel>
          <UiSelect v-model="zone">
            <UiSelectTrigger id="zone-select"><UiSelectValue /></UiSelectTrigger>
            <UiSelectContent>
              <UiSelectItem v-for="item in zones" :key="item.id" :value="item.id">{{
                item.label
              }}</UiSelectItem>
            </UiSelectContent>
          </UiSelect>
        </div>
        <UiToggleGroup
          :model-value="hour24 ? '24' : '12'"
          type="single"
          variant="outline"
          aria-label="Clock format"
          @update:model-value="(value) => value && (hour24 = value === '24')"
        >
          <UiToggleGroupItem value="12">12h</UiToggleGroupItem>
          <UiToggleGroupItem value="24">24h</UiToggleGroupItem>
        </UiToggleGroup>
      </div>

      <div class="mt-6 space-y-6" aria-live="polite">
        <section v-for="group in groups" :key="group.date">
          <h2 class="text-sm font-semibold">{{ group.label }}</h2>
          <div
            class="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4"
            role="group"
            :aria-label="group.label"
          >
            <UiButton
              v-for="slot in group.slots"
              :key="slot.iso"
              size="sm"
              :variant="chosen === slot.iso ? 'default' : 'outline'"
              :aria-pressed="chosen === slot.iso"
              @click="chosen = slot.iso"
              >{{ slot.time }}</UiButton
            >
          </div>
        </section>
      </div>

      <div v-if="chosenSlot" class="mt-6 rounded-xl border p-4 text-sm" role="status">
        <p class="font-medium">{{ chosenSlot.local }}</p>
        <p class="text-muted-foreground mt-0.5">{{ chosenSlot.host }} for {{ hostName }}</p>
        <UiButton class="mt-3" size="sm" @click="useSonner.success(`Booked ${chosenSlot.local}`)"
          >Confirm</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Zone = { id: string; label: string };

  const props = withDefaults(
    defineProps<{
      hostName?: string;
      hostZone?: string;
      hostZoneLabel?: string;
      /** Slots as UTC instants, for example `2026-10-19T13:00:00Z`. */
      slots?: string[];
      zones?: Zone[];
    }>(),
    {
      hostName: "Maya",
      hostZone: "America/New_York",
      hostZoneLabel: "New York",
      slots: () => [
        "2026-10-19T13:00:00Z",
        "2026-10-19T14:30:00Z",
        "2026-10-19T16:00:00Z",
        "2026-10-19T18:00:00Z",
        "2026-10-19T20:00:00Z",
        "2026-10-20T13:00:00Z",
        "2026-10-20T15:00:00Z",
        "2026-10-20T17:30:00Z",
      ],
      zones: () => [
        { id: "America/Los_Angeles", label: "Los Angeles (Pacific)" },
        { id: "America/New_York", label: "New York (Eastern)" },
        { id: "Europe/London", label: "London (GMT/BST)" },
        { id: "Europe/Berlin", label: "Berlin (Central European)" },
        { id: "Asia/Dubai", label: "Dubai (Gulf)" },
        { id: "Asia/Singapore", label: "Singapore" },
        { id: "Australia/Sydney", label: "Sydney (Eastern Australia)" },
      ],
    }
  );

  const zone = ref(props.hostZone);
  const hour24 = ref(false);
  const chosen = ref("");

  const time = (iso: string, timeZone: string) =>
    new Date(iso).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: !hour24.value,
      timeZone,
    });
  const day = (iso: string, timeZone: string, style: "short" | "long" = "long") =>
    new Date(iso).toLocaleDateString("en-US", {
      weekday: style,
      month: style === "long" ? "long" : "short",
      day: "numeric",
      timeZone,
    });

  const groups = computed(() => {
    const byDay = new Map<
      string,
      { date: string; label: string; slots: { iso: string; time: string }[] }
    >();
    for (const iso of props.slots) {
      const label = day(iso, zone.value);
      const group = byDay.get(label) ?? { date: label, label, slots: [] };
      group.slots.push({ iso, time: time(iso, zone.value) });
      byDay.set(label, group);
    }
    return [...byDay.values()];
  });

  const chosenSlot = computed(() =>
    chosen.value
      ? {
          local: `${day(chosen.value, zone.value, "short")}, ${time(chosen.value, zone.value)}`,
          host: `${day(chosen.value, props.hostZone, "short")}, ${time(chosen.value, props.hostZone)}`,
        }
      : null
  );
</script>
