<template>
  <UiCard>
    <UiCardContent>
      <div class="flex items-start justify-between">
        <div class="space-y-1">
          <p class="text-muted-foreground text-sm font-medium" v-html="props.label" />
          <h3 class="text-3xl font-bold tracking-tight" v-html="props.value" />
        </div>
        <UiFancyIcon :icon="props.icon" :class="props.iconClass" class="bg-transparent" />
      </div>
      <UiSeparator class="my-4" />
      <div class="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-muted-foreground" v-html="props.metric1Label" />
          <p class="mt-1 font-semibold" v-html="props.metric1Value" />
        </div>
        <div>
          <p class="text-muted-foreground" v-html="props.metric2Label" />
          <p class="mt-1 font-semibold" v-html="props.metric2Value" />
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
      icon?: string;
      iconClass?: string;
      metric1Label?: string;
      metric1Value?: string;
      metric2Label?: string;
      metric2Value?: string;
    }>(),
    {
      label: "Total Orders",
      value: "1,429",
      icon: "lucide:package",
      metric1Label: "Pending",
      metric1Value: "124",
      metric2Label: "Completed",
      metric2Value: "1,305",
    }
  );
</script>
