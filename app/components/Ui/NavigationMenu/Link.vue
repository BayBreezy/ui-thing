<template>
  <NavigationMenuLink
    :class="styles({ class: normalizeClass(props.class) || undefined })"
    data-slot="navigation-menu-link"
    v-bind="forwarded"
  >
    <slot />
  </NavigationMenuLink>
</template>

<script lang="ts" setup>
  import { NavigationMenuLink, useForwardPropsEmits } from "reka-ui";
  import { normalizeClass } from "vue";
  import type { NavigationMenuLinkEmits, NavigationMenuLinkProps } from "reka-ui";
  import type { HTMLAttributes } from "vue";

  const props = defineProps<
    NavigationMenuLinkProps & {
      class?: HTMLAttributes["class"];
    }
  >();
  const emits = defineEmits<NavigationMenuLinkEmits>();
  const forwarded = useForwardPropsEmits(props, emits);
  const styles = tv({
    base: "flex flex-col gap-1 rounded-sm p-2 text-sm transition-all outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 data-[active=true]:bg-accent/50 data-[active=true]:text-accent-foreground data-[active=true]:hover:bg-accent data-[active=true]:focus:bg-accent [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground",
  });
</script>
