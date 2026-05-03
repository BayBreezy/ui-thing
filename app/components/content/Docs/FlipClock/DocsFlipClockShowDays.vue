<template>
  <div class="grid gap-6">
    <div class="space-y-2">
      <p class="text-muted-foreground text-sm">show-days="auto" (only when days > 0)</p>
      <UiFlipClock countdown show-days="auto" :target-date="targetDate" />
    </div>
    <div class="space-y-2">
      <p class="text-muted-foreground text-sm">show-days="always"</p>
      <UiFlipClock countdown show-days="always" :target-date="targetDate" variant="emerald" />
    </div>
    <div class="space-y-2">
      <p class="text-muted-foreground text-sm">show-days="never"</p>
      <UiFlipClock countdown show-days="never" :target-date="targetDate" variant="fuchsia" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from "dayjs";

  const targetDate = computed(() => {
    return dayjs().add(2, "day").add(5, "hour").add(30, "minute").toDate();
  });
</script>
