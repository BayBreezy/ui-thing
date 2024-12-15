<template>
  <div class="flex w-full items-center justify-center">
    <UiDatepicker v-model="today" mode="dateTime" title-position="right" />
  </div>
</template>

<script lang="ts" setup>
  import { addDays } from "date-fns";

  const today = addDays(new Date(), 3);
</script>
