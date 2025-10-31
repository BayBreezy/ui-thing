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
            <UiLabel for="maxlength">Maximum Length</UiLabel>
            <span
              class="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border"
            >
              {{ value?.[0] }}
            </span>
          </div>
          <UiSlider
            id="maxlength"
            v-model="value"
            show-tooltip
            :max="4000"
            :step="10"
            class="**:[[role=slider]]:h-4 **:[[role=slider]]:w-4"
            aria-label="Maximum Length"
          />
        </div>
      </UiHoverCardTrigger>
      <UiHoverCardContent align="start" class="w-[260px] text-sm" side="left">
        The maximum number of tokens to generate. Requests can use up to 2,048 or 4,000 tokens,
        shared between prompt and completion. The exact limit varies by model.
      </UiHoverCardContent>
    </UiHoverCard>
  </div>
</template>
