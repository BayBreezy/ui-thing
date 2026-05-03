<template>
  <div class="flex w-full flex-col items-center justify-center gap-5">
    <p class="text-muted-foreground text-sm">Select your appointment date & time</p>
    <p class="text-sm font-semibold">
      Selected:
      <span class="text-emerald-500">{{
        dayjs(appointmentDate).format("MMM DD, YYYY [at] h:mmA")
      }}</span>
    </p>
    <UiDatepicker
      v-model="appointmentDate"
      mode="dateTime"
      is24hr
      is-required
      :rules="{ hours: { min: 9, max: 17 }, minutes: { interval: 15 } }"
      :min-date="new Date()"
      :disabled-dates="[
        {
          repeat: {
            weekdays: [1, 7],
          },
        },
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const appointmentDate = ref(new Date());
</script>
