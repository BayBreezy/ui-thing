<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="forwarded"
    :class="navigationMenuTriggerStyle({ class: props.class })"
  >
    <slot>{{ title }}</slot>
    <slot name="icon">
      <Icon
        :name="icon || 'lucide:chevron-down'"
        class="relative top-px ml-1 size-3 transition duration-300 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </slot>
  </NavigationMenuTrigger>
</template>

<script lang="ts">
  import { NavigationMenuTrigger } from "reka-ui";
  import type { NavigationMenuTriggerProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  export const navigationMenuTriggerStyle = tv({
    base: "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-[color,box-shadow] outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=open]:bg-accent/50 data-[state=open]:text-accent-foreground data-[state=open]:hover:bg-accent data-[state=open]:focus:bg-accent",
  });
</script>

<script lang="ts" setup>
  const props = defineProps<
    NavigationMenuTriggerProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
      /** Icon to show */
      icon?: string;
      /** Title to show */
      title?: string;
    }
  >();
  const forwarded = reactiveOmit(props, "class", "icon", "title");
</script>
