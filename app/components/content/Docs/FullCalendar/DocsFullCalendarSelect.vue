<template>
  <div>
    <FullCalendar ref="calendarRef" :options="calendarOptions" />

    <UiDialog v-model:open="open">
      <UiDialogContent
        title="Add event"
        :description="selection ? formatRange(selection) : 'Create a new event on your calendar.'"
      >
        <template #content>
          <form id="add-event-form" class="grid gap-4" @submit.prevent="addEvent">
            <div class="grid gap-2">
              <UiLabel for="event-title">Title</UiLabel>
              <UiInput id="event-title" v-model="title" placeholder="Team lunch" autofocus />
            </div>
            <div class="grid gap-2">
              <UiLabel for="event-notes">Notes</UiLabel>
              <UiTextarea
                id="event-notes"
                v-model="notes"
                placeholder="Add any details (optional)"
              />
            </div>
          </form>
        </template>
        <template #footer>
          <UiDialogFooter>
            <UiDialogClose as-child>
              <UiButton type="button" variant="outline">Cancel</UiButton>
            </UiDialogClose>
            <UiButton type="submit" form="add-event-form" :disabled="!title.trim()">
              Save event
            </UiButton>
          </UiDialogFooter>
        </template>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import type { CalendarOptions, DateSelectInfo } from "@fullcalendar/vue3";
  import FullCalendar from "@fullcalendar/vue3";
  import interactionPlugin from "@fullcalendar/vue3/interaction";
  import classicTheme from "@fullcalendar/vue3/themes/classic";
  import timeGridPlugin from "@fullcalendar/vue3/timegrid";
  import dayjs from "dayjs";

  const calendarRef = ref<InstanceType<typeof FullCalendar> | null>(null);
  const open = ref(false);
  const title = ref("");
  const notes = ref("");
  const selection = ref<DateSelectInfo | null>(null);

  const calendarOptions: CalendarOptions = {
    plugins: [classicTheme, timeGridPlugin, interactionPlugin],
    initialView: "timeGridWeek",
    selectable: true,
    selectMirror: true,
    editable: true,
    nowIndicator: true,
    tableHeaderSticky: true,
    select(info) {
      selection.value = info;
      title.value = "";
      notes.value = "";
      open.value = true;
    },
    headerToolbar: {
      left: "prev,today,next",
      center: "title",
      right: "timeGridWeek,timeGridDay",
    },
    events: [
      {
        title: "Team standup",
        start: dayjs().hour(9).minute(0).toDate(),
        end: dayjs().hour(9).minute(30).toDate(),
      },
    ],
  };

  function formatRange(info: DateSelectInfo) {
    const start = dayjs(info.start);
    if (info.allDay) return start.format("dddd, MMMM D, YYYY");
    return `${start.format("dddd, MMMM D, YYYY")} · ${start.format("h:mm A")} – ${dayjs(info.end).format("h:mm A")}`;
  }

  function addEvent() {
    if (!selection.value || !title.value.trim()) return;
    calendarRef.value?.getApi().addEvent({
      title: title.value,
      start: selection.value.start,
      end: selection.value.end,
      allDay: selection.value.allDay,
      extendedProps: { notes: notes.value },
    });
    calendarRef.value?.getApi().unselect();
    open.value = false;
  }
</script>
