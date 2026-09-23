<template>
  <UiCard class="mx-auto w-full max-w-sm overflow-hidden pb-0">
    <UiCardHeader>
      <UiCardTitle>Analytics</UiCardTitle>
      <UiCardDescription>
        418.2K Visitors
        <UiBadge>+10%</UiBadge>
      </UiCardDescription>
      <UiCardAction>
        <UiButton variant="outline" size="sm"> View Analytics </UiButton>
      </UiCardAction>
    </UiCardHeader>
    <svg
      viewBox="0 0 100 86"
      preserveAspectRatio="none"
      class="text-primary aspect-[1/0.35] w-full"
      role="img"
      aria-label="Visitor trend"
    >
      <path :d="areaPath" fill="currentColor" opacity="0.28" />
      <path
        :d="strokePath"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        vector-effect="non-scaling-stroke"
      />
    </svg>
  </UiCard>
</template>

<script lang="ts" setup>
  const areaPath = "M0 52L18 40L36 46L54 70L72 50L100 49V86H0Z";
  const strokePath = "M0 52L18 40L36 46L54 70L72 50L100 49";
</script>
