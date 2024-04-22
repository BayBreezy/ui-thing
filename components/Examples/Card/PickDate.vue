<template>
  <UiCard>
    <template #title>
      <UiCardTitle class="text-lg"> Pick a date</UiCardTitle>
    </template>
    <template #content>
      <UiCardContent>
        <UiDatepicker v-model.range="date" :columns="2">
          <template #default="{ togglePopover }">
            <UiButton
              variant="outline"
              :class="['w-full justify-start text-left font-normal']"
              @click="togglePopover"
            >
              <Icon name="lucide:calendar" class="h-4 w-4" />
              {{ format(date.start, "MMM dd, yyyy") }} to {{ format(date.end, "MMM dd, yyyy") }}
            </UiButton>
          </template>
        </UiDatepicker>
      </UiCardContent>
    </template>
  </UiCard>
</template>

<script lang="ts" setup>
  import { addDays, format, startOfMonth } from "date-fns";

  const date = ref({
    start: startOfMonth(new Date()),
    end: addDays(new Date(), 7),
  });
</script>
