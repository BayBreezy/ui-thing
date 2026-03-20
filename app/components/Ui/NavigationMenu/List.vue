<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    v-bind="forwarded"
    :class="styles({ class: normalizeClass(props.class) || undefined })"
  >
    <slot />
  </NavigationMenuList>
</template>

<script lang="ts" setup>
  import { NavigationMenuList } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { NavigationMenuListProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    NavigationMenuListProps & {
      /** Custom class(es) to add to the parent */
      class?: HTMLAttributes["class"];
    }
  >();
  const forwarded = reactiveOmit(props, "class");
  const styles = tv({
    base: "group flex flex-1 list-none items-center justify-center gap-1",
  });
</script>
