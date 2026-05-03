<template>
  <UiCard class="mx-auto w-full max-w-sm">
    <UiCardHeader class="min-h-auto border-b-0">
      <UiCardTitle>Customer Reviews Summary</UiCardTitle>
      <UiCardDescription
        >Based on {{ Intl.NumberFormat().format(totalReviews) }} reviews</UiCardDescription
      >
    </UiCardHeader>
    <UiCardContent class="space-y-3">
      <div
        v-for="item in ratings"
        :key="item.stars"
        class="flex items-center justify-between gap-3"
      >
        <div class="flex items-center gap-2.5">
          <span class="w-2 text-sm font-medium">{{ item.stars }}</span>
          <UiRating :model-value="item.stars" />
        </div>
        <div class="text-muted-foreground flex items-center gap-0.5 text-sm">
          <span>{{ Intl.NumberFormat().format(item.count) }}</span>
          <span>({{ item.percentage }}%)</span>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const ratings = [
    { stars: 5, count: 745, percentage: 59.7 },
    { stars: 4, count: 312, percentage: 25.0 },
    { stars: 3, count: 124, percentage: 9.9 },
    { stars: 2, count: 41, percentage: 3.3 },
    { stars: 1, count: 25, percentage: 2.0 },
  ];

  const totalReviews = computed(() => ratings.reduce((total, item) => total + item.count, 0));
</script>
