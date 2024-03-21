<template>
  <NavigationMenuTrigger
    v-bind="reactiveOmit(props, 'class', 'icon', 'title')"
    :class="styles({ class: props.class })"
  >
    <slot>{{ title }}</slot>
    <slot name="icon">
      <Icon
        :name="icon || 'lucide:chevron-down'"
        class="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </slot>
  </NavigationMenuTrigger>
</template>

<script lang="ts" setup>
  import { NavigationMenuTrigger } from "radix-vue";
  import type { NavigationMenuTriggerProps } from "radix-vue";

  const props = defineProps<
    NavigationMenuTriggerProps & {
      /** Custom class(es) to add to the parent */
      class?: any;
      /** Icon to show */
      icon?: string;
      /** Title to show */
      title?: string;
    }
  >();

  const styles = tv({
    base: "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50",
  });
</script>
