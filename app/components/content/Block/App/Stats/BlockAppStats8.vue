<template>
  <!--
    Stat card with a progress ring
    Features: Ring that fills to the value with the percentage in the middle, outline fancy icon, legend for used and remaining, upgrade link
  -->
  <UiCard>
    <UiCardContent class="flex items-center gap-6">
      <div class="relative size-28 shrink-0">
        <svg class="size-28 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="42" fill="none" stroke-width="10" class="stroke-muted" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke-width="10"
            stroke-linecap="round"
            class="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-out"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="offset"
          />
        </svg>
        <div class="absolute inset-0 flex flex-col items-center justify-center">
          <span class="text-2xl font-bold tabular-nums">{{ props.percent }}%</span>
          <span class="text-muted-foreground text-[10px] tracking-wide uppercase">used</span>
        </div>
      </div>

      <div class="min-w-0 flex-1 space-y-3">
        <div class="flex items-center gap-3">
          <slot name="icon">
            <UiFancyIcon :icon="props.icon" theme="outline" color="primary" size="sm" />
          </slot>
          <slot name="label">
            <p class="text-sm font-semibold">{{ props.label }}</p>
          </slot>
        </div>
        <ul class="space-y-1.5 text-sm">
          <li class="flex items-center justify-between">
            <span class="text-muted-foreground flex items-center gap-2">
              <span class="bg-primary size-2 rounded-full" />
              Used
            </span>
            <span class="font-medium tabular-nums">{{ props.used }}</span>
          </li>
          <li class="flex items-center justify-between">
            <span class="text-muted-foreground flex items-center gap-2">
              <span class="bg-muted-foreground/30 size-2 rounded-full" />
              Available
            </span>
            <span class="font-medium tabular-nums">{{ props.available }}</span>
          </li>
        </ul>
        <NuxtLink
          to="#"
          class="text-primary inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
        >
          Upgrade storage
          <Icon name="lucide:arrow-right" class="size-3.5" />
        </NuxtLink>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      icon?: string;
      percent?: number;
      used?: string;
      available?: string;
    }>(),
    {
      label: "Storage",
      icon: "lucide:hard-drive",
      percent: 72,
      used: "36 GB",
      available: "14 GB",
    }
  );

  const circumference = 2 * Math.PI * 42;
  // Starts empty and fills once mounted so the ring animates in.
  const shown = ref(0);
  const offset = computed(() => circumference * (1 - shown.value / 100));
  onMounted(() => {
    requestAnimationFrame(() => {
      shown.value = props.percent;
    });
  });
</script>
