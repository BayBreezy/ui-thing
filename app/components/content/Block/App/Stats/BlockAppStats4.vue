<template>
  <UiCard class="overflow-hidden p-0">
    <UiCardContent class="p-0">
      <div class="flex">
        <div :class="['flex w-16 items-center justify-center', props.accentColor || 'bg-primary']">
          <Icon :name="props.icon" class="text-primary-foreground size-8" />
        </div>
        <div class="flex-1 p-6">
          <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
          <h3 class="mt-1 text-2xl font-bold tracking-tight" v-html="props.value" />
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1 text-sm">
              <Icon name="lucide:calendar" class="text-muted-foreground size-3.5" />
              <span class="text-muted-foreground" v-html="props.period" />
            </div>
            <UiBadge variant="outline">{{ props.status }}</UiBadge>
          </div>
        </div>
      </div>
    </UiCardContent>
  </UiCard>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      label?: string;
      value?: string;
      period?: string;
      status?: string;
      icon?: string;
      accentColor?: string;
    }>(),
    {
      label: "Active Users",
      value: "2,845",
      period: "Last 30 days",
      status: "Live",
      icon: "lucide:users",
    }
  );
</script>
