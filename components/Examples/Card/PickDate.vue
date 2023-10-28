<template>
  <UICard>
    <template #title>
      <UICardTitle class="text-lg"> Pick a date</UICardTitle>
    </template>
    <template #content>
      <UICardContent>
        <UIDatepicker :columns="2" v-model.range="date">
          <template #default="{ togglePopover }">
            <UIButton
              variant="outline"
              :class="['w-full justify-start text-left font-normal']"
              @click="togglePopover"
            >
              <Icon name="lucide:calendar" class="h-4 w-4" />
              {{ format(date.start, "MMM dd, yyyy") }} to {{ format(date.end, "MMM dd, yyyy") }}
            </UIButton>
          </template>
        </UIDatepicker>
      </UICardContent>
    </template>
  </UICard>
</template>

<script lang="ts" setup>
  import { addDays, format, startOfMonth } from "date-fns";

  const date = ref({
    start: startOfMonth(new Date()),
    end: addDays(new Date(), 7),
  });
</script>
