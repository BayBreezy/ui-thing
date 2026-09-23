<template>
  <UiCard>
    <UiCardHeader>
      <UiCardTitle>Savings Targets</UiCardTitle>
      <UiCardDescription>
        Active milestones for 2024 across your portfolio. Monitor how close you are to each savings
        goal.
      </UiCardDescription>
    </UiCardHeader>
    <UiCardContent>
      <UiItemGroup class="gap-3">
        <UiItem
          v-for="target in targets"
          :key="target.label"
          role="listitem"
          variant="muted"
          class="flex-col items-stretch"
        >
          <UiItemContent class="gap-3">
            <UiItemDescription
              class="text-muted-foreground text-xs font-medium tracking-wider uppercase"
            >
              {{ target.label }}
            </UiItemDescription>
            <span class="text-3xl font-semibold tabular-nums">{{ target.goal }}</span>
            <UiProgress
              :model-value="target.progress"
              :aria-label="`${target.label} savings progress`"
            />
          </UiItemContent>
          <UiItemFooter>
            <span class="text-muted-foreground text-sm">{{ target.progress }}% achieved</span>
            <span class="text-sm font-medium tabular-nums">{{ target.saved }}</span>
          </UiItemFooter>
        </UiItem>
      </UiItemGroup>
    </UiCardContent>
    <UiCardFooter>
      <UiCardDescription class="text-center">
        You have not met your targets for this year.
      </UiCardDescription>
    </UiCardFooter>
  </UiCard>
</template>

<script lang="ts" setup>
  const targets = [
    { label: "Retirement", goal: "$420,000", progress: 65, saved: "$273,000" },
    { label: "Real Estate", goal: "$85,000", progress: 32, saved: "$27,200" },
  ];
</script>
