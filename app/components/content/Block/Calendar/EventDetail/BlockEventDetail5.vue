<template>
  <!--
    Create event dialog
    Features: Dialog with title, date, all day switch, start and end time, place, color swatches and guest chips added with Enter, a repeat select, inline validation including end after start and a list that shows the new event
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-center justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Calendar</h1>
        <UiDialog v-model:open="open">
          <UiDialogTrigger as-child>
            <UiButton><Icon name="lucide:plus" class="size-4" />New event</UiButton>
          </UiDialogTrigger>
          <UiDialogContent class="sm:max-w-lg">
            <UiDialogHeader>
              <UiDialogTitle>New event</UiDialogTitle>
              <UiDialogDescription
                >Add the details. Guests get an invitation by email.</UiDialogDescription
              >
            </UiDialogHeader>
            <form class="grid gap-4" novalidate @submit.prevent="save">
              <div class="grid gap-1.5">
                <UiLabel for="event-title">Title</UiLabel>
                <UiInput
                  id="event-title"
                  v-model="form.title"
                  placeholder="Team lunch"
                  :aria-invalid="!!errors.title"
                />
                <p v-if="errors.title" class="text-destructive text-sm">{{ errors.title }}</p>
              </div>
              <div class="grid gap-1.5">
                <UiLabel for="event-date">Date</UiLabel>
                <UiInput id="event-date" v-model="form.date" type="date" />
              </div>
              <div class="flex items-center gap-2">
                <UiSwitch id="event-allday" v-model="form.allDay" />
                <UiLabel for="event-allday" class="font-normal">All day</UiLabel>
              </div>
              <div v-if="!form.allDay" class="grid grid-cols-2 gap-3">
                <div class="grid gap-1.5">
                  <UiLabel for="event-start">Starts</UiLabel>
                  <UiInput id="event-start" v-model="form.start" type="time" />
                </div>
                <div class="grid gap-1.5">
                  <UiLabel for="event-end">Ends</UiLabel>
                  <UiInput
                    id="event-end"
                    v-model="form.end"
                    type="time"
                    :aria-invalid="!!errors.time"
                  />
                </div>
                <p v-if="errors.time" class="text-destructive col-span-2 text-sm">
                  {{ errors.time }}
                </p>
              </div>
              <div class="grid gap-1.5">
                <UiLabel for="event-place">Place</UiLabel>
                <UiInput id="event-place" v-model="form.place" placeholder="Add a room or a link" />
              </div>
              <div class="grid gap-1.5">
                <UiLabel for="event-guest">Guests</UiLabel>
                <div v-if="form.guests.length" class="flex flex-wrap gap-1.5">
                  <UiBadge
                    v-for="guest in form.guests"
                    :key="guest"
                    variant="soft"
                    shape="pill"
                    class="gap-1"
                  >
                    {{ guest }}
                    <button
                      type="button"
                      :aria-label="`Remove ${guest}`"
                      @click="form.guests = form.guests.filter((item) => item !== guest)"
                    >
                      <Icon name="lucide:x" class="size-3" />
                    </button>
                  </UiBadge>
                </div>
                <UiInput
                  id="event-guest"
                  v-model="draft"
                  type="email"
                  placeholder="Type an email and press Enter"
                  @keydown.enter.prevent="addGuest"
                />
                <p v-if="errors.guest" class="text-destructive text-sm">{{ errors.guest }}</p>
              </div>
              <div class="grid gap-1.5">
                <p id="event-color-label" class="text-sm font-medium">Color</p>
                <UiRadioGroup
                  v-model="form.color"
                  class="flex gap-2"
                  aria-labelledby="event-color-label"
                >
                  <label v-for="item in colorNames" :key="item" class="relative cursor-pointer">
                    <UiRadioGroupItem
                      :value="item"
                      :aria-label="item"
                      class="peer absolute inset-0 size-full cursor-pointer opacity-0"
                    />
                    <span
                      class="ring-offset-background peer-data-[state=checked]:ring-foreground peer-focus-visible:ring-ring block size-6 rounded-full ring-2 ring-transparent ring-offset-2"
                      :class="swatches[item]"
                    />
                  </label>
                </UiRadioGroup>
              </div>
              <div class="grid gap-1.5">
                <UiLabel for="event-repeat">Repeat</UiLabel>
                <UiSelect v-model="form.repeat">
                  <UiSelectTrigger id="event-repeat"><UiSelectValue /></UiSelectTrigger>
                  <UiSelectContent>
                    <UiSelectItem value="none">Does not repeat</UiSelectItem>
                    <UiSelectItem value="daily">Every day</UiSelectItem>
                    <UiSelectItem value="weekly">Every week</UiSelectItem>
                    <UiSelectItem value="monthly">Every month</UiSelectItem>
                  </UiSelectContent>
                </UiSelect>
              </div>
              <UiDialogFooter>
                <UiButton type="button" variant="outline" @click="open = false">Cancel</UiButton>
                <UiButton type="submit">Create event</UiButton>
              </UiDialogFooter>
            </form>
          </UiDialogContent>
        </UiDialog>
      </div>

      <ul class="mt-6 space-y-2" aria-label="Events" aria-live="polite">
        <li
          v-for="event in sorted"
          :key="event.id"
          class="flex items-center gap-3 rounded-xl border p-4"
        >
          <span class="h-10 w-1 shrink-0 rounded-full" :class="swatches[event.color]" />
          <div class="min-w-0 flex-1">
            <p class="truncate font-medium">{{ event.title }}</p>
            <p class="text-muted-foreground truncate text-sm">
              {{ longDate(event.date) }},
              {{ event.allDay ? "All day" : `${clock(event.start)} to ${clock(event.end)}` }}
              <template v-if="event.place"> at {{ event.place }}</template>
            </p>
          </div>
          <UiBadge v-if="event.repeat !== 'none'" variant="soft" shape="pill">{{
            repeatLabel[event.repeat]
          }}</UiBadge>
          <span
            v-if="event.guests.length"
            class="text-muted-foreground flex items-center gap-1 text-xs"
            ><Icon name="lucide:users" class="size-3.5" />{{ event.guests.length }}</span
          >
          <UiButton
            variant="ghost"
            size="icon-sm"
            :aria-label="`Delete ${event.title}`"
            @click="remove(event.id)"
            ><Icon name="lucide:trash-2" class="size-4"
          /></UiButton>
        </li>
        <li
          v-if="!sorted.length"
          class="text-muted-foreground rounded-xl border border-dashed py-12 text-center text-sm"
        >
          No events yet. Create your first one.
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Color = "blue" | "green" | "amber" | "rose" | "violet";
  type Repeat = "none" | "daily" | "weekly" | "monthly";
  type Event = {
    id: string;
    title: string;
    date: string;
    allDay: boolean;
    start: string;
    end: string;
    place: string;
    color: Color;
    guests: string[];
    repeat: Repeat;
  };

  const props = withDefaults(
    defineProps<{
      today?: string;
      events?: Event[];
    }>(),
    {
      today: "2026-10-18",
      events: () => [
        {
          id: "c1",
          title: "Weekly planning",
          date: "2026-10-19",
          allDay: false,
          start: "10:00",
          end: "11:00",
          place: "Meeting room 2",
          color: "blue",
          guests: ["leo@example.com", "sofia@example.com"],
          repeat: "weekly",
        },
        {
          id: "c2",
          title: "Product launch",
          date: "2026-10-22",
          allDay: true,
          start: "",
          end: "",
          place: "",
          color: "rose",
          guests: [],
          repeat: "none",
        },
      ],
    }
  );

  const colorNames: Color[] = ["blue", "green", "amber", "rose", "violet"];
  const swatches: Record<Color, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    violet: "bg-violet-500",
  };
  const repeatLabel: Record<Repeat, string> = {
    none: "",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
  };

  const blank = () => ({
    title: "",
    date: props.today,
    allDay: false as boolean,
    start: "09:00",
    end: "10:00",
    place: "",
    color: "blue" as Color,
    guests: [] as string[],
    repeat: "none" as Repeat,
  });

  const items = ref<Event[]>(
    props.events.map((event) => ({ ...event, guests: [...event.guests] }))
  );
  const open = ref(false);
  const form = reactive(blank());
  const draft = ref("");
  const errors = reactive({ title: "", time: "", guest: "" });

  const sorted = computed(() =>
    [...items.value].sort((a, b) => `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`))
  );

  const parse = (iso: string) => new Date(`${iso}T00:00:00Z`);
  const longDate = (iso: string) =>
    parse(iso).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  const clock = (time: string) => {
    const hour = Number(time.slice(0, 2));
    return `${hour % 12 || 12}:${time.slice(3, 5)} ${hour < 12 ? "AM" : "PM"}`;
  };

  function addGuest() {
    const value = draft.value.trim();
    if (!value) return;
    if (!/^\S+@\S+\.\S+$/.test(value)) {
      errors.guest = "Enter a valid email address.";
      return;
    }
    errors.guest = "";
    if (!form.guests.includes(value)) form.guests.push(value);
    draft.value = "";
  }

  function save() {
    errors.title = form.title.trim() ? "" : "Give the event a title.";
    errors.time = form.allDay || form.end > form.start ? "" : "The end must be after the start.";
    if (errors.title || errors.time) return;
    items.value.push({
      id: `new-${items.value.length}-${form.title}`,
      title: form.title.trim(),
      date: form.date,
      allDay: form.allDay,
      start: form.allDay ? "" : form.start,
      end: form.allDay ? "" : form.end,
      place: form.place.trim(),
      color: form.color,
      guests: [...form.guests],
      repeat: form.repeat,
    });
    useSonner.success("Event created");
    Object.assign(form, blank());
    draft.value = "";
    open.value = false;
  }

  function remove(id: string) {
    items.value = items.value.filter((event) => event.id !== id);
  }
</script>
