<template>
  <NavigationMenuItem
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    data-slot="navigation-menu-item"
    v-bind="props"
  >
    <slot />
  </NavigationMenuItem>
</template>

<script lang="ts" setup>
  import { NavigationMenuItem } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { NavigationMenuItemProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const styles = tv({ base: "relative" });

  const props = defineProps<
    NavigationMenuItemProps & {
      class?: HTMLAttributes["class"];
    }
  >();
</script>
