<template>
  <div class="flex w-full items-center justify-center">
    <UIDatepicker v-model="date">
      <template #default="{ togglePopover }">
        <UIButton
          variant="outline"
          :class="[!date && 'text-muted-foreground', 'w-[260px] justify-start text-left']"
          @click="togglePopover"
        >
          <Icon name="lucide:calendar" class="h-4 w-4" />
          {{ date ? format(date, "MMMM dd, yyyy") : "Select a date" }}
        </UIButton>
      </template>
    </UIDatepicker>
  </div>
</template>

<script lang="ts" setup>
  import { addDays, format } from "date-fns";

  const date = ref();
</script>
