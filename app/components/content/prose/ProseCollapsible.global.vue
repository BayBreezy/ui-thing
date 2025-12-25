<template>
  <UiCollapsible v-slot="{ open }" :default-open="defaultOpen" class="my-4">
    <UiCollapsibleTrigger
      class="group relative inline-flex items-center gap-1.5 rounded-xs text-sm text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      :class="triggerClass"
    >
      <ProseSmartIcon v-if="open ? openIcon : closeIcon" :name="open ? openIcon! : closeIcon!" />
      <span>{{ open ? closeTitle : openTitle }}</span>
    </UiCollapsibleTrigger>
    <UiCollapsibleContent :class="contentClass" class="*:my-1.5 *:first:mt-2 *:last:mb-0">
      <slot />
    </UiCollapsibleContent>
  </UiCollapsible>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export type ProseCollapsibleProps = {
    /**
     * Icon to show when collapsible is open
     * @default "lucide:minus"
     */
    openIcon?: string;
    /**
     * Icon to show when collapsible is closed
     * @default "lucide:plus"
     */
    closeIcon?: string;
    /**
     * Text to show when collapsible is closed (trigger to open)
     * @default "Show more"
     */
    openTitle?: string;
    /**
     * Text to show when collapsible is open (trigger to close)
     * @default "Show less"
     */
    closeTitle?: string;
    /**
     * Whether the collapsible should be open by default
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * Additional CSS classes for the trigger button
     */
    triggerClass?: HTMLAttributes["class"];
    /**
     * Additional CSS classes for the content area
     */
    contentClass?: HTMLAttributes["class"];
  };
</script>

<script lang="ts" setup>
  withDefaults(defineProps<ProseCollapsibleProps>(), {
    openIcon: "lucide:minus",
    closeIcon: "lucide:plus",
    openTitle: "Show more",
    closeTitle: "Show less",
    defaultOpen: false,
  });
</script>
