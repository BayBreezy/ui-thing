<template>
  <div class="flex w-full flex-col justify-center">
    <UiLabel v-if="value" for="text-date" class="mb-2 text-sm text-muted-foreground">
      The entered date is {{ formattedValue }}
    </UiLabel>
    <UiDateField id="text-date" v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  import { getLocalTimeZone, parseDate } from "@internationalized/date";
  import { format } from "date-fns";

  const value = ref(parseDate(new Date().toISOString().substring(0, 10)));

  const formattedValue = computed(() =>
    format(value.value.toDate(getLocalTimeZone()), "eeee, MMMM d, yyyy")
  );
</script>
