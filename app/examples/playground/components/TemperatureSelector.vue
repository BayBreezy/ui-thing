<script setup lang="ts">
  import type { SliderRootProps } from "reka-ui";

  const props = defineProps<{
    defaultValue: SliderRootProps["defaultValue"];
  }>();

  const value = ref(props.defaultValue);
</script>

<template>
  <div class="grid gap-2 pt-2">
    <UiHoverCard :open-delay="200">
      <UiHoverCardTrigger as-child>
        <div class="grid gap-4">
          <div class="flex items-center justify-between">
            <UiLabel for="temperature">Temperature</UiLabel>
            <span
              class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
            >
              {{ value?.[0] }}
            </span>
          </div>
          <UiSlider
            id="temperature"
            v-model="value"
            show-tooltip
            :max="1"
            :step="0.1"
            class="**:[[role=slider]]:h-4 **:[[role=slider]]:w-4"
            aria-label="Temperature"
          />
        </div>
      </UiHoverCardTrigger>
      <UiHoverCardContent align="start" class="w-[260px] text-sm" side="left">
        Controls randomness: lowering results in less random completions. As the temperature
        approaches zero, the model will become deterministic and repetitive.
      </UiHoverCardContent>
    </UiHoverCard>
  </div>
</template>
