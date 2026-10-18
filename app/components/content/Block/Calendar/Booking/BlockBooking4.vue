<template>
  <!--
    Booking confirmation
    Features: Success header with a check mark, appointment details, add to calendar links with a downloadable calendar file, copy details button, reschedule and cancel links and a what to bring list
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl text-center">
      <span
        class="mx-auto grid size-14 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
        ><Icon name="lucide:check" class="size-7"
      /></span>
      <h1 class="mt-4 text-3xl font-bold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground mt-2">
        We sent the details to <span class="text-foreground font-medium">{{ booking.email }}</span
        >. Your reference is
        <span class="text-foreground font-mono font-medium">{{ booking.reference }}</span
        >.
      </p>
    </div>

    <UiCard class="mx-auto mt-8 w-full max-w-xl gap-0 py-0">
      <dl class="divide-y text-sm">
        <div v-for="row in rows" :key="row.label" class="flex items-start gap-4 px-6 py-4">
          <dt class="text-muted-foreground flex w-28 shrink-0 items-center gap-2">
            <Icon :name="row.icon" class="size-4" />{{ row.label }}
          </dt>
          <dd class="flex-1 font-medium">{{ row.value }}</dd>
        </div>
      </dl>
      <div class="flex flex-wrap gap-2 border-t px-6 py-4">
        <UiButton variant="outline" size="sm" @click="openGoogle"
          ><Icon name="logos:google-calendar" class="size-4" />Google</UiButton
        >
        <UiButton variant="outline" size="sm" @click="download"
          ><Icon name="lucide:download" class="size-4" />Calendar file</UiButton
        >
        <UiButton variant="outline" size="sm" @click="copyDetails"
          ><Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />{{
            copied ? "Copied" : "Copy details"
          }}</UiButton
        >
      </div>
    </UiCard>

    <div class="mx-auto mt-6 grid max-w-xl gap-6 sm:grid-cols-2">
      <section>
        <h2 class="text-sm font-semibold">What to bring</h2>
        <ul class="text-muted-foreground mt-2 space-y-1.5 text-sm">
          <li v-for="item in bring" :key="item" class="flex items-start gap-2">
            <Icon name="lucide:circle-check" class="mt-0.5 size-4 shrink-0" />{{ item }}
          </li>
        </ul>
      </section>
      <section>
        <h2 class="text-sm font-semibold">Need to change something?</h2>
        <p class="text-muted-foreground mt-2 text-sm">Changes are free up to 24 hours before.</p>
        <div class="mt-3 flex gap-2">
          <UiButton
            variant="outline"
            size="sm"
            @click="useSonner.info('Open the reschedule page here')"
            >Reschedule</UiButton
          >
          <UiButton variant="ghost" size="sm" @click="useSonner.info('Open the cancel page here')"
            >Cancel</UiButton
          >
        </div>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Booking = {
    reference: string;
    email: string;
    service: string;
    staff: string;
    place: string;
    /** Start as `YYYY-MM-DDTHH:mm`, in the place's local time. */
    start: string;
    minutes: number;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      booking?: Booking;
      bring?: string[];
    }>(),
    {
      title: "You are all booked",
      booking: () => ({
        reference: "BK-48213",
        email: "alex@example.com",
        service: "Haircut and style",
        staff: "Maya Patel",
        place: "21 Linden Street, Brooklyn",
        start: "2026-10-19T10:30",
        minutes: 45,
      }),
      bring: () => ["Photos of styles you like", "Arrive five minutes early", "A form of payment"],
    }
  );

  const parse = (value: string) => new Date(`${value}:00Z`);
  const end = computed(
    () => new Date(parse(props.booking.start).getTime() + props.booking.minutes * 60_000)
  );
  const stamp = (date: Date) => date.toISOString().replace(/[-:]/g, "").slice(0, 15);

  const rows = computed(() => {
    const start = parse(props.booking.start);
    const time = (date: Date) =>
      date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" });
    return [
      { label: "Service", icon: "lucide:scissors", value: props.booking.service },
      {
        label: "When",
        icon: "lucide:calendar",
        value: `${start.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", timeZone: "UTC" })}, ${time(start)} to ${time(end.value)}`,
      },
      { label: "With", icon: "lucide:user", value: props.booking.staff },
      { label: "Where", icon: "lucide:map-pin", value: props.booking.place },
    ];
  });

  const googleLink = computed(
    () =>
      `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(props.booking.service)}&dates=${stamp(parse(props.booking.start))}/${stamp(end.value)}&location=${encodeURIComponent(props.booking.place)}`
  );

  const { copy, copied } = useClipboard({ copiedDuring: 2000 });

  function openGoogle() {
    window.open(googleLink.value, "_blank", "noopener");
  }

  function copyDetails() {
    copy(rows.value.map((row) => `${row.label}: ${row.value}`).join("\n"));
  }

  function download() {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `UID:${props.booking.reference}@example.com`,
      `DTSTART:${stamp(parse(props.booking.start))}`,
      `DTEND:${stamp(end.value)}`,
      `SUMMARY:${props.booking.service}`,
      `LOCATION:${props.booking.place}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];
    const url = URL.createObjectURL(new Blob([lines.join("\r\n")], { type: "text/calendar" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${props.booking.reference}.ics`;
    link.click();
    URL.revokeObjectURL(url);
  }
</script>
