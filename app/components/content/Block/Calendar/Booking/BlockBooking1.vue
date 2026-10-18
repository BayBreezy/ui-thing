<template>
  <!--
    Date and time slot picker
    Features: Host details, a month calendar where weekends, past days and fully booked days are disabled, a list of time slots for the chosen day with booked slots removed, a confirm step on the selected slot and a time zone note
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto w-full max-w-4xl gap-0 py-0">
      <div class="grid md:grid-cols-[14rem_1fr_13rem]">
        <div class="border-b p-6 md:border-r md:border-b-0">
          <UiAvatar
            :src="`https://i.pravatar.cc/80?img=${host.avatar}`"
            :fallback="host.name.slice(0, 1)"
            class="size-12"
          />
          <p class="text-muted-foreground mt-3 text-sm">{{ host.name }}</p>
          <h1 class="text-xl font-bold tracking-tight">{{ host.title }}</h1>
          <ul class="text-muted-foreground mt-4 space-y-2 text-sm">
            <li class="flex items-center gap-2">
              <Icon name="lucide:clock" class="size-4" />{{ host.minutes }} minutes
            </li>
            <li class="flex items-center gap-2">
              <Icon name="lucide:video" class="size-4" />{{ host.where }}
            </li>
            <li class="flex items-center gap-2">
              <Icon name="lucide:globe" class="size-4" />{{ host.zone }}
            </li>
          </ul>
        </div>

        <div class="border-b p-6 md:border-r md:border-b-0">
          <div class="mb-3 flex items-center justify-between">
            <h2 class="font-semibold" aria-live="polite">{{ monthLabel }}</h2>
            <div class="flex gap-1">
              <UiButton
                variant="ghost"
                size="icon-sm"
                aria-label="Previous month"
                :disabled="view <= todayMonth"
                @click="shift(-1)"
                ><Icon name="lucide:chevron-left" class="size-4"
              /></UiButton>
              <UiButton variant="ghost" size="icon-sm" aria-label="Next month" @click="shift(1)"
                ><Icon name="lucide:chevron-right" class="size-4"
              /></UiButton>
            </div>
          </div>
          <div
            class="text-muted-foreground grid grid-cols-7 text-center text-xs"
            aria-hidden="true"
          >
            <span v-for="(name, i) in weekdays" :key="i" class="py-1">{{ name }}</span>
          </div>
          <div class="grid grid-cols-7 gap-y-1" role="group" :aria-label="monthLabel">
            <template v-for="cell in cells" :key="cell.iso">
              <span v-if="!cell.inMonth" />
              <button
                v-else
                type="button"
                class="focus-visible:ring-ring/50 mx-auto grid size-10 place-items-center rounded-full text-sm outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-35"
                :class="
                  picked === cell.iso
                    ? 'bg-primary text-primary-foreground font-semibold'
                    : cell.open
                      ? 'bg-primary/10 text-primary hover:bg-primary/20 font-semibold'
                      : ''
                "
                :disabled="!cell.open"
                :aria-pressed="picked === cell.iso"
                :aria-label="longDate(cell.iso)"
                @click="pick(cell.iso)"
              >
                {{ Number(cell.iso.slice(8)) }}
              </button>
            </template>
          </div>
        </div>

        <div class="p-6" aria-live="polite">
          <template v-if="picked">
            <h2 class="text-sm font-semibold">{{ longDate(picked) }}</h2>
            <ul class="mt-3 max-h-72 space-y-2 overflow-y-auto pr-1" aria-label="Available times">
              <li v-for="slot in freeSlots" :key="slot" class="flex gap-2">
                <UiButton
                  :variant="slot === chosen ? 'secondary' : 'outline'"
                  class="flex-1"
                  :aria-pressed="slot === chosen"
                  @click="chosen = slot"
                  >{{ clock(slot) }}</UiButton
                >
                <UiButton v-if="slot === chosen" @click="confirm">Confirm</UiButton>
              </li>
              <li v-if="!freeSlots.length" class="text-muted-foreground text-sm">
                No times left on this day.
              </li>
            </ul>
          </template>
          <p v-else class="text-muted-foreground text-sm">Pick a day to see the open times.</p>
          <p
            v-if="booked"
            class="text-primary mt-4 flex items-center gap-1.5 text-sm font-medium"
            role="status"
          >
            <Icon name="lucide:circle-check" class="size-4" />Booked for {{ booked }}
          </p>
        </div>
      </div>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Host = {
    name: string;
    avatar: number;
    title: string;
    minutes: number;
    where: string;
    zone: string;
  };

  const props = withDefaults(
    defineProps<{
      today?: string;
      host?: Host;
      /** Times offered on every open day, as `HH:mm`. */
      times?: string[];
      /** Slots that are already taken, keyed by ISO date. */
      taken?: Record<string, string[]>;
    }>(),
    {
      today: "2026-10-18",
      host: () => ({
        name: "Maya Patel",
        avatar: 32,
        title: "Intro call",
        minutes: 30,
        where: "Video call link after booking",
        zone: "Eastern Time (US and Canada)",
      }),
      times: () => [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "13:00",
        "13:30",
        "14:00",
        "15:30",
        "16:00",
      ],
      taken: () => ({
        "2026-10-19": ["09:30", "10:00", "13:00"],
        "2026-10-20": [
          "09:00",
          "09:30",
          "10:00",
          "10:30",
          "11:00",
          "13:00",
          "13:30",
          "14:00",
          "15:30",
          "16:00",
        ],
        "2026-10-22": ["11:00", "14:00"],
      }),
    }
  );

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const fmt = (date: Date) => date.toISOString().slice(0, 10);
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };
  const longDate = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });

  const todayMonth = computed(() => props.today.slice(0, 7));
  const view = ref(props.today.slice(0, 7));
  const free = (iso: string) => props.times.filter((time) => !props.taken[iso]?.includes(time));
  const isOpen = (iso: string) => {
    const weekday = parse(iso).getUTCDay();
    return iso > props.today && weekday !== 0 && weekday !== 6 && free(iso).length > 0;
  };

  const cells = computed(() => {
    const first = parse(`${view.value}-01`);
    const length = new Date(
      Date.UTC(first.getUTCFullYear(), first.getUTCMonth() + 1, 0)
    ).getUTCDate();
    const blanks = Array.from({ length: first.getUTCDay() }, (_, index) => ({
      iso: `blank-${index}`,
      inMonth: false,
      open: false,
    }));
    const days = Array.from({ length }, (_, index) => {
      const iso = `${view.value}-${String(index + 1).padStart(2, "0")}`;
      return { iso, inMonth: true, open: isOpen(iso) };
    });
    return [...blanks, ...days];
  });

  const nextOpen = () => {
    for (let offset = 1; offset < 60; offset++) {
      const date = parse(props.today);
      date.setUTCDate(date.getUTCDate() + offset);
      if (isOpen(fmt(date))) return fmt(date);
    }
    return "";
  };

  const picked = ref(nextOpen());
  const chosen = ref("");
  const booked = ref("");

  const freeSlots = computed(() => (picked.value ? free(picked.value) : []));
  const monthLabel = computed(() =>
    parse(`${view.value}-01`).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    })
  );

  function pick(iso: string) {
    picked.value = iso;
    chosen.value = "";
    booked.value = "";
  }

  function shift(step: number) {
    const date = parse(`${view.value}-01`);
    date.setUTCMonth(date.getUTCMonth() + step);
    view.value = fmt(date).slice(0, 7);
  }

  function confirm() {
    booked.value = `${longDate(picked.value)} at ${clock(chosen.value)}`;
    useSonner.success("Meeting booked", { description: booked.value });
    chosen.value = "";
  }
</script>
