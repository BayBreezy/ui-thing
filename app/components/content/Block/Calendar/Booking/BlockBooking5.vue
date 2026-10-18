<template>
  <!--
    Reschedule or cancel a booking
    Features: Current booking summary, tabs for reschedule and cancel, a day and time picker with confirm, a cancellation policy that depends on how close the appointment is, a reason select and a confirmation dialog before cancelling
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-2xl font-bold tracking-tight">Manage your booking</h1>

      <UiCard class="mt-6 gap-0 py-0">
        <div class="flex items-start gap-4 p-5" aria-live="polite">
          <span class="bg-muted grid size-12 shrink-0 place-items-center rounded-lg"
            ><Icon name="lucide:calendar-clock" class="size-5"
          /></span>
          <div class="min-w-0 flex-1">
            <p class="font-semibold">{{ booking.service }}</p>
            <p class="text-muted-foreground text-sm">
              <template v-if="status !== 'cancelled'"
                >{{ longDate(current.date) }}, {{ clock(current.time) }}</template
              >
              <template v-else>This appointment was cancelled.</template>
            </p>
            <p class="text-muted-foreground text-sm">With {{ booking.staff }}</p>
          </div>
          <UiBadge
            variant="soft"
            shape="pill"
            :color="status === 'cancelled' ? 'red' : status === 'rescheduled' ? 'amber' : 'green'"
            >{{
              status === "cancelled"
                ? "Cancelled"
                : status === "rescheduled"
                  ? "Rescheduled"
                  : "Confirmed"
            }}</UiBadge
          >
        </div>
      </UiCard>

      <div
        v-if="status === 'cancelled'"
        class="mt-6 rounded-xl border border-dashed p-8 text-center"
      >
        <p class="font-medium">Your booking is cancelled.</p>
        <p class="text-muted-foreground mt-1 text-sm">
          We sent a confirmation to {{ booking.email }}.
        </p>
        <UiButton variant="outline" class="mt-4" @click="rebook">Book again</UiButton>
      </div>

      <UiTabs v-else v-model="tab" class="mt-6">
        <UiTabsList class="grid w-full grid-cols-2">
          <UiTabsTrigger value="reschedule">Reschedule</UiTabsTrigger>
          <UiTabsTrigger value="cancel">Cancel</UiTabsTrigger>
        </UiTabsList>

        <UiTabsContent value="reschedule" class="space-y-5">
          <div>
            <p class="mb-2 text-sm font-medium">Pick a new day</p>
            <div class="flex flex-wrap gap-2" role="group" aria-label="Days">
              <UiButton
                v-for="day in days"
                :key="day"
                size="sm"
                :variant="day === newDate ? 'default' : 'outline'"
                :aria-pressed="day === newDate"
                @click="chooseDay(day)"
                >{{ shortDate(day) }}</UiButton
              >
            </div>
          </div>
          <div v-if="newDate">
            <p class="mb-2 text-sm font-medium">Pick a new time</p>
            <div class="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Times">
              <UiButton
                v-for="time in slots[newDate] ?? []"
                :key="time"
                size="sm"
                :variant="time === newTime ? 'default' : 'outline'"
                :aria-pressed="time === newTime"
                @click="newTime = time"
                >{{ clock(time) }}</UiButton
              >
            </div>
          </div>
          <UiButton :disabled="!newTime" @click="reschedule">Confirm new time</UiButton>
        </UiTabsContent>

        <UiTabsContent value="cancel" class="space-y-5">
          <UiAlert
            :icon="late ? 'lucide:triangle-alert' : 'lucide:info'"
            :title="late ? 'Late cancellation' : 'Free cancellation'"
            :description="
              late
                ? `This appointment starts in under ${booking.freeHours} hours, so a ${booking.fee} fee may apply.`
                : `You can cancel without a fee until ${booking.freeHours} hours before the appointment.`
            "
          />
          <div class="space-y-2">
            <UiLabel for="cancel-reason">Reason</UiLabel>
            <UiSelect v-model="reason">
              <UiSelectTrigger id="cancel-reason"
                ><UiSelectValue placeholder="Choose a reason"
              /></UiSelectTrigger>
              <UiSelectContent>
                <UiSelectItem v-for="item in reasons" :key="item" :value="item">{{
                  item
                }}</UiSelectItem>
              </UiSelectContent>
            </UiSelect>
          </div>
          <div class="space-y-2">
            <UiLabel for="cancel-note">Note (optional)</UiLabel>
            <UiTextarea id="cancel-note" v-model="note" :rows="3" />
          </div>
          <UiAlertDialog v-model:open="confirmOpen">
            <UiAlertDialogTrigger as-child>
              <UiButton variant="destructive" :disabled="!reason">Cancel booking</UiButton>
            </UiAlertDialogTrigger>
            <UiAlertDialogContent>
              <UiAlertDialogHeader>
                <UiAlertDialogTitle>Cancel this booking?</UiAlertDialogTitle>
                <UiAlertDialogDescription>
                  Your {{ booking.service }} on {{ longDate(current.date) }} will be released for
                  someone else.
                </UiAlertDialogDescription>
              </UiAlertDialogHeader>
              <UiAlertDialogFooter>
                <UiAlertDialogCancel>Keep booking</UiAlertDialogCancel>
                <UiAlertDialogAction
                  class="bg-destructive hover:bg-destructive/90 text-white"
                  @click="cancel"
                  >Yes, cancel</UiAlertDialogAction
                >
              </UiAlertDialogFooter>
            </UiAlertDialogContent>
          </UiAlertDialog>
        </UiTabsContent>
      </UiTabs>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Booking = {
    service: string;
    staff: string;
    email: string;
    date: string;
    time: string;
    freeHours: number;
    fee: string;
  };

  const props = withDefaults(
    defineProps<{
      /** The current moment as `YYYY-MM-DDTHH:mm`. Pass the real time in your own app. */
      now?: string;
      booking?: Booking;
      /** Open times keyed by ISO date. */
      slots?: Record<string, string[]>;
    }>(),
    {
      now: "2026-10-18T10:20",
      booking: () => ({
        service: "Haircut and style",
        staff: "Maya Patel",
        email: "alex@example.com",
        date: "2026-10-19",
        time: "10:30",
        freeHours: 24,
        fee: "$20",
      }),
      slots: () => ({
        "2026-10-20": ["09:00", "10:30", "13:00", "15:30"],
        "2026-10-21": ["11:00", "14:00", "16:00"],
        "2026-10-22": ["09:30", "10:30", "13:30", "14:30", "16:30"],
        "2026-10-23": ["10:00", "12:00"],
      }),
    }
  );

  const reasons = [
    "Schedule conflict",
    "Found another provider",
    "No longer needed",
    "Illness",
    "Other",
  ];

  const tab = ref("reschedule");
  const status = ref<"confirmed" | "rescheduled" | "cancelled">("confirmed");
  const current = ref({ date: props.booking.date, time: props.booking.time });
  const newDate = ref("");
  const newTime = ref("");
  const reason = ref("");
  const note = ref("");
  const confirmOpen = ref(false);

  const days = computed(() => Object.keys(props.slots));
  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
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
  const shortDate = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });

  const hoursAway = computed(
    () =>
      (new Date(`${current.value.date}T${current.value.time}:00Z`).getTime() -
        new Date(`${props.now}:00Z`).getTime()) /
      3_600_000
  );
  const late = computed(() => hoursAway.value < props.booking.freeHours);

  function chooseDay(day: string) {
    newDate.value = day;
    newTime.value = "";
  }

  function reschedule() {
    current.value = { date: newDate.value, time: newTime.value };
    status.value = "rescheduled";
    newDate.value = "";
    newTime.value = "";
    useSonner.success("Booking rescheduled", {
      description: `${longDate(current.value.date)} at ${clock(current.value.time)}`,
    });
  }

  function cancel() {
    status.value = "cancelled";
    confirmOpen.value = false;
    useSonner.success("Booking cancelled");
  }

  function rebook() {
    status.value = "confirmed";
    current.value = { date: props.booking.date, time: props.booking.time };
    reason.value = "";
    note.value = "";
    tab.value = "reschedule";
  }
</script>
