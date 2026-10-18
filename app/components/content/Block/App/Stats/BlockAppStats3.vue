<template>
  <!--
    Goal card with a progress bar and milestone
    Features: Fancy icon, value against a target, progress bar with a percent badge, remaining amount, days left footer
  -->
  <UiCard>
    <UiCardContent class="space-y-5">
      <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <slot name="icon">
            <UiFancyIcon :icon="props.icon" theme="light" :color="props.color" />
          </slot>
          <div>
            <slot name="label">
              <p class="text-sm font-medium">{{ props.label }}</p>
            </slot>
            <p class="text-muted-foreground text-xs">Target {{ props.target }}</p>
          </div>
        </div>
        <UiBadge variant="secondary" class="tabular-nums">{{ props.progress }}%</UiBadge>
      </div>

      <div>
        <slot name="value">
          <p class="text-3xl font-bold tracking-tight tabular-nums">{{ props.value }}</p>
        </slot>
        <div class="bg-muted relative mt-3 h-2.5 rounded-full">
          <div
            class="bg-primary h-full rounded-full transition-[width] duration-700 ease-out"
            :style="{ width: `${props.progress}%` }"
          />
          <span
            class="bg-background ring-primary absolute top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2"
            :style="{ left: `${props.progress}%` }"
          />
        </div>
        <div class="text-muted-foreground mt-2 flex justify-between text-xs">
          <span>{{ props.remaining }} to go</span>
          <span>{{ props.target }}</span>
        </div>
      </div>

      <div class="text-muted-foreground flex items-center gap-2 border-t pt-4 text-xs">
        <Icon name="lucide:clock" class="size-3.5" />
        {{ props.daysLeft }} days left this quarter
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: string;
      target?: string;
      remaining?: string;
      progress?: number;
      daysLeft?: number;
      icon?: string;
      color?: "primary" | "gray" | "error" | "warning" | "success" | "info";
    }>(),
    {
      label: "Quarterly revenue goal",
      value: "$124,500",
      target: "$150,000",
      remaining: "$25,500",
      progress: 83,
      daysLeft: 24,
      icon: "lucide:target",
      color: "success",
    }
  );
</script>
