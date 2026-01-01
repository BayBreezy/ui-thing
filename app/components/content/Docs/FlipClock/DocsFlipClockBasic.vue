<template>
  <div class="flex flex-col gap-10">
    <section class="space-y-3">
      <p class="text-sm text-muted-foreground">Live clock</p>
      <UiFlipClock size="lg" />
    </section>

    <section class="space-y-3">
      <p class="text-sm text-muted-foreground">Countdown (shows days, violet variant)</p>
      <UiFlipClock countdown show-days="always" :target-date="targetDate" variant="violet" />
    </section>
  </div>
</template>

<script lang="ts" setup>
  const targetDate = ref(new Date(Date.now() + 1000 * 60 * 60 * 24 + 1000 * 60 * 45));
</script>
