<template>
  <UiButton
    data-sidebar="trigger"
    variant="ghost"
    size="icon"
    :class="sideBarTriggerStyles({ class: props.class })"
    @click="toggleSidebar"
  >
    <Icon v-if="icon" :name="icon" />
    <span class="sr-only">{{ label }}</span>
  </UiButton>
</template>

<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export const sideBarTriggerStyles = tv({
    base: "size-7",
  });
</script>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      /**
       * The icon to display in the trigger.
       * @default "lucide:panel-left"
       */
      icon?: string;
      /**
       * Additional classes to apply to the parent element.
       */
      class?: HTMLAttributes["class"];
      /**
       * The label for the trigger.
       * @default "Toggle Sidebar"
       */
      label?: string;
    }>(),
    {
      icon: "lucide:panel-left",
      label: "Toggle Sidebar",
    }
  );

  const { toggleSidebar } = useSidebar();
</script>
