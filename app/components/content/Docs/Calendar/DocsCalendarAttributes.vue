<template>
  <div class="flex flex-wrap justify-center gap-5">
    <UiCalendar :attributes="attributes" />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";
  import type { CSSProperties } from "vue";

  import type { AttributeConfig } from "~/components/Ui/Calendar.vue";

  const attributes = ref<AttributeConfig[]>([
    {
      highlight: true,
      popover: {
        label: "Out of town business trip",
      },
      dates: [
        {
          start: dayjs().startOf("month").toString(),
          span: 3,
        },
      ],
    },
    {
      popover: {
        label: "Take the dog to the vet",
      },
      dot: "red",
      dates: dayjs().startOf("month").add(5, "days").toString(),
    },
    {
      bar: "green",
      popover: {
        label: "Dinner with friends",
      },
      dates: dayjs().startOf("month").add(8, "days").toString(),
    },
    {
      dot: "purple",
      popover: {
        label: "Take the car to the mechanic",
      },
      dates: dayjs().startOf("month").add(14, "days").toString(),
    },
    {
      highlight: true,
      popover: {
        label: "Family vacation in Ibiza",
      },
      dates: {
        start: dayjs().startOf("month").add(16, "days").toString(),
        end: dayjs().startOf("month").add(24, "days").toString(),
      },
    },
    {
      dot: true,
      popover: {
        label: "Take Noah to the football game",
      },
      dates: dayjs().startOf("month").add(22, "days").toString(),
    },
    {
      highlight: true,
      popover: {
        label: "Visit the in-laws",
      },
      dates: dayjs().endOf("month").toString(),
    },
    {
      popover: { label: "Therapy Session", hideIndicator: true },
      bar: {
        style: {
          backgroundImage: "linear-gradient(to right, #f0f, #0ff)",
          borderRadius: "10px",
        } as CSSProperties,
      },
      dates: [
        {
          // get last sunday in month's date
          start: dayjs().endOf("month").day(0).toString(),
          repeat: {
            every: "month",
            ordinalWeekdays: [-1, 1],
          },
        },
      ],
    },
  ]);
</script>
